import { fetchNextID, fetchStylists, fetchHistory, getFichaByConsecutivo, deleteFichaDb, deleteStylistDb, addStylistDb, insertFicha, uploadImg, getLastFichaByDoc } from './db.js';
import { initSignatures, clearSignature, getSignaturePads, loadSignaturesFromData, toggleSignatures } from './signature.js';
import { generatePDF } from './pdf.js';
import { setSede, setHairType, setChip, previewImage, validateStep, monitorMinorSettings, lockForm } from './ui.js';

const form = document.getElementById('fichaForm');
const steps = Array.from(document.querySelectorAll('.step'));
const saveBtn = document.getElementById('saveBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const loginSection = document.getElementById('loginSection');
const appMain = document.getElementById('appMain');
const homeSection = document.getElementById('homeSection');
const historySection = document.getElementById('historySection');
const stylistSection = document.getElementById('stylistSection');
const historyList = document.getElementById('historyList');
const searchInput = document.getElementById('searchInput');
const stylistList = document.getElementById('stylistList');
const stylistInput = document.getElementById('stylistInput');
const responsableInput = document.getElementById('responsableInput');

let currentStep = 1;
const totalSteps = 5;
let isLocked = false;
window.lastGeneratedSignatures = { client: null, tech: null, tutor: null };

// LOGIN
function login() {
    const userEl = document.getElementById('loginEmail');
    const passEl = document.getElementById('loginPass');
    if(!userEl || !passEl) return;
    const CACHE_NAME = 'julie-ficha-v2.6';
    const user = userEl.value.trim();
    const pass = passEl.value.trim();
    if ((user === '80200013' || user === 'julie') && (pass === 'Lisolaloca01' || pass === 'Lisolaloca01:')) {
        localStorage.setItem('julie_session', 'true');
        if(loginSection) loginSection.classList.add('hidden');
        if(appMain) appMain.classList.remove('hidden');
        switchTab('home');
    } else {
        document.getElementById('loginError')?.classList.remove('hidden');
    }
}
if(document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => { e.preventDefault(); login(); });
}
window.togglePass = function() {
    const passInput = document.getElementById('loginPass');
    const eyeIcon = document.getElementById('eyeIcon');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        eyeIcon?.setAttribute('data-lucide', 'eye-off');
    } else {
        passInput.type = 'password';
        eyeIcon?.setAttribute('data-lucide', 'eye');
    }
    window.lucide?.createIcons();
};

function logout() {
    if(confirm('¿Cerrar sesión segura?')) {
        localStorage.removeItem('julie_session');
        window.location.reload();
    }
}
window.logout = logout;

if (localStorage.getItem('julie_session') === 'true' && loginSection) {
    loginSection.classList.add('hidden');
    appMain.classList.remove('hidden');
}

// NAVIGATION
function updateStep(direction) {
    if (direction === 'next') {
        if (!validateStep(currentStep, steps)) return;
        currentStep++;
    } else if (direction === 'prev') {
        currentStep--;
    } else if (direction === 'init') {
        currentStep = 1;
    }
    steps.forEach((s, i) => s.classList.toggle('active', i === currentStep - 1));
    document.querySelectorAll('.btn-step').forEach((b, i) => b.classList.toggle('active', i === currentStep - 1));
    if(nextBtn) nextBtn.classList.toggle('hidden', currentStep === totalSteps);
    if(saveBtn) {
        if (isLocked) saveBtn.classList.add('hidden');
        else saveBtn.classList.toggle('hidden', currentStep !== totalSteps);
    }
    if(prevBtn) prevBtn.classList.toggle('hidden', currentStep === 1);
    document.getElementById('progressBar')?.style.setProperty('--progress', (currentStep / totalSteps * 100) + '%');
    document.getElementById('currentStepNum').innerText = currentStep;
    window.scrollTo(0,0);
    if (currentStep === 5) {
        setTimeout(() => {
            initSignatures();
            if(isLocked && window.lastViewedFicha) loadSignaturesFromData(window.lastViewedFicha);
        }, 400);
    }
}

if(nextBtn) nextBtn.addEventListener('click', () => updateStep('next'));
if(prevBtn) prevBtn.addEventListener('click', () => updateStep('prev'));

window.switchTab = function(tab) {
    window.scrollTo(0,0);
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('.form-wrapper')?.classList.add('hidden');
    document.querySelector('.form-footer')?.classList.add('hidden');
    homeSection?.classList.add('hidden');
    historySection?.classList.add('hidden');
    stylistSection?.classList.add('hidden');
    document.querySelector('.progress-container')?.classList.add('hidden');
    document.querySelector('.btn-back')?.classList.add('hidden');

    if (tab === 'home') {
        homeSection?.classList.remove('hidden');
    } else if (tab === 'new') {
        document.querySelector('.form-wrapper')?.classList.remove('hidden');
        document.querySelector('.form-footer')?.classList.remove('hidden');
        document.querySelector('.progress-container')?.classList.remove('hidden');
        document.querySelector('.btn-back')?.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[1].classList.add('active');
        if(isLocked) {
             form.reset(); lockForm(false, form); isLocked = false;
             document.getElementById('previewAntes').innerHTML = '';
             document.getElementById('previewDespues').innerHTML = '';
             document.getElementById('clinicalBackgroundArea').classList.add('hidden');
             loadInitialData(); 
        }
    } else if (tab === 'history') {
        historySection?.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[2].classList.add('active');
        document.querySelector('.btn-back')?.classList.remove('hidden');
        renderHistory();
    } else if (tab === 'stylists') {
        stylistSection?.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[3].classList.add('active');
        document.querySelector('.btn-back')?.classList.remove('hidden');
        renderStylists();
    }
};

if(searchInput) searchInput.addEventListener('input', (e) => renderHistory(e.target.value.trim()));

async function renderHistory(filter = '') {
    if(!historyList) return;
    historyList.innerHTML = '<div class="loading-spinner">Cargando...</div>';
    try {
        const history = await fetchHistory();
        if(!history || history.length === 0) { historyList.innerHTML = '<p class="empty-msg">No hay fichas.</p>'; return; }
        const filtered = history.filter(item => 
            item.nombre_completo.toLowerCase().includes(filter.toLowerCase()) ||
            item.numero_documento.includes(filter) || item.consecutivo.includes(filter)
        );
        historyList.innerHTML = '';
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.innerHTML = `<div class="card-info"><h4>${item.nombre_completo}</h4><p>Ficha: ${item.consecutivo}</p></div><div class="card-actions"><button onclick="viewFicha('${item.consecutivo}')" class="btn-view">Ver</button><button onclick="directPDF('${item.consecutivo}')" class="btn-pdf-list">PDF</button></div>`;
            historyList.appendChild(card);
        });
        window.lucide?.createIcons();
    } catch(e) { console.error(e); }
}

async function renderStylists() {
    if(!stylistList) return;
    stylistList.innerHTML = '<div class="loading-spinner">Cargando...</div>';
    try {
        const stylists = await fetchStylists();
        stylistList.innerHTML = '';
        stylists.forEach(s => {
            const item = document.createElement('div');
            item.className = 'stylist-item';
            item.innerHTML = `<span>${s.nombre}</span><button onclick="deleteStylist('${s.id}')" class="btn-delete-mini"><i data-lucide="trash-2"></i></button>`;
            stylistList.appendChild(item);
        });
        window.lucide?.createIcons();
    } catch(e) { console.error(e); }
}

window.deleteStylist = async (id) => { if(confirm('¿Eliminar?')) { await deleteStylistDb(id); renderStylists(); loadInitialData(); } };
window.addStylist = async () => { const name = stylistInput.value.trim(); if(!name) return; await addStylistDb(name); stylistInput.value = ''; renderStylists(); loadInitialData(); };

window.viewFicha = async (consecutivo) => {
    try {
        const data = await getFichaByConsecutivo(consecutivo);
        if(!data) return alert('No se encontró');
        switchTab('new');
        isLocked = true; lockForm(true, form);
        for(let key in data) {
            const input = form.querySelector(`[name="${key}"]`);
            if(input) { if(input.type === 'checkbox') input.checked = data[key]; else input.value = data[key]; }
            if(['longitud', 'crecimiento', 'medios', 'puntas', 'textura', 'elasticidad', 'resistencia', 'porosidad', 'densidad', 'piel', 'lavado', 'dermatitis', 'caida', 'descamacion', 'embarazo', 'alergias', 'procedimiento', 'porcentaje'].includes(key)) setChip(key, data[key]);
        }
        if(data.sede) setSede(data.sede);
        if(data.tipo_cabello) setHairType('', data.tipo_cabello);
        if(data.foto_antes_url) document.getElementById('previewAntes').innerHTML = `<img src="${data.foto_antes_url}" style="width:100%;">`;
        if(data.foto_despues_url) document.getElementById('previewDespues').innerHTML = `<img src="${data.foto_despues_url}" style="width:100%;">`;
        updateStep('init');
        window.lastViewedFicha = data;
    } catch(e) { console.error(e); }
};

window.directPDF = async (consecutivo) => { try { await viewFicha(consecutivo); setTimeout(() => { generatePDF(); }, 1200); } catch(e) { console.error(e); } };
window.jumpToStep = function(step) { switchTab('new'); currentStep = step; updateStep('jump'); };

const docInput = form.querySelector('[name="numero_documento"]');
if(docInput) {
    docInput.addEventListener('blur', async () => {
        const val = docInput.value.trim(); if(val.length < 5) return;
        try {
            const lastRecord = await getLastFichaByDoc(val);
            if(lastRecord) {
                const area = document.getElementById('clinicalBackgroundArea');
                const text = document.getElementById('backgroundText');
                if(area && text) {
                    area.classList.remove('hidden');
                    text.innerHTML = `<strong>Última visita:</strong> ${new Date(lastRecord.created_at).toLocaleDateString()}<br><strong>Previo:</strong> ${lastRecord.procedimiento}`;
                }
            }
        } catch(e) { console.error(e); }
    });
}

async function loadInitialData() {
    try { const nextId = await fetchNextID(); if(document.getElementById('fichaID')) document.getElementById('fichaID').value = nextId.toString().padStart(4, '0'); } catch(e) { console.error(e); }
    if(!responsableInput) return;
    try {
        const stylists = await fetchStylists();
        responsableInput.innerHTML = '<option value="">Seleccione...</option>';
        stylists.forEach(s => { const opt = document.createElement('option'); opt.value = s.nombre; opt.textContent = s.nombre; responsableInput.appendChild(opt); });
    } catch(e) { console.error(e); }
}

window.addEventListener('load', () => { window.lucide?.createIcons(); document.getElementById('currentDateTime').value = new Date().toLocaleString('es-CO'); loadInitialData(); });

window.setSede = setSede; window.setHairType = setHairType; window.setChip = setChip; window.previewImage = previewImage;
window.clearSignature = (type) => clearSignature(type, isLocked);
window.generatePDF = generatePDF; window.resetForm = () => window.location.reload();
window.goBack = function() { if(homeSection && !homeSection.classList.contains('hidden')) { if(confirm('¿Salir?')) window.location.reload(); } else { switchTab('home'); } };

if(saveBtn) saveBtn.addEventListener('click', async () => {
    if(!validateStep(5, steps)) return;
    const { padClient, padTech } = getSignaturePads();
    if(padClient.isEmpty() || padTech.isEmpty()) return alert('⚠️ Firmas obligatorias.');
    window.lastGeneratedSignatures = { client: padClient.toDataURL(), tech: padTech.toDataURL() };
    const fileA = document.getElementById('fotoAntesInput').files[0];
    const fileD = document.getElementById('fotoDespuesInput').files[0];
    if(!fileA || !fileD) return alert('⚠️ Fotos obligatorias.');
    saveBtn.innerText = '⌛ PROCESANDO...'; saveBtn.disabled = true;
    try {
        const formData = new FormData(form);
        const cleanData = Object.fromEntries(formData.entries());
        delete cleanData.foto_antes; delete cleanData.foto_despues;
        cleanData.firma_cliente = padClient.toDataURL();
        cleanData.firma_tecnico = padTech.toDataURL();
        const [urlA, urlD] = await Promise.all([uploadImg(fileA, 'antes', cleanData.consecutivo), uploadImg(fileD, 'despues', cleanData.consecutivo)]);
        cleanData.foto_antes_url = urlA; cleanData.foto_despues_url = urlD;
        await insertFicha(cleanData);
        document.getElementById('successModal').classList.remove('hidden');
        window.lucide?.createIcons();
    } catch (e) { alert('❌ ERROR: ' + e.message); }
    finally { saveBtn.innerText = 'Guardar'; saveBtn.disabled = false; }
});
