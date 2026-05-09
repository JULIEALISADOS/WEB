import { fetchNextID, fetchStylists, fetchHistory, getFichaByConsecutivo, deleteFichaDb, deleteStylistDb, addStylistDb, insertFicha, uploadImg, getLastFichaByDoc } from './db.js';
import { initSignatures, clearSignature, getSignaturePads, loadSignaturesFromData, toggleSignatures, destroyPads } from './signature.js';
import { generatePDF } from './pdf.js';
import { setSede, setHairType, setChip, previewImage, validateStep, monitorMinorSettings, lockForm, initRealtimeValidation } from './ui.js';

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
const stylistPhoneInput = document.getElementById('stylistPhoneInput');
const stylistEmailInput = document.getElementById('stylistEmailInput');
const stylistSearchInput = document.getElementById('stylistSearchInput');
const responsableInput = document.getElementById('responsableInput');

let currentStep = 1;
const totalSteps = 5;
let isLocked = false;
window.isLocked = false;
window.lastGeneratedSignatures = { client: null, tech: null, tutor: null };
window.lastViewedFicha = null;
window.nextFolioID = null;

// ======================== LOGIN ========================
function login() {
    const userEl = document.getElementById('loginEmail');
    const passEl = document.getElementById('loginPass');
    const errorEl = document.getElementById('loginError');
    if (!userEl || !passEl || !errorEl) return;

    const user = userEl.value.trim();
    const pass = passEl.value.trim();

    errorEl.classList.add('hidden');

    if (!user || !pass) {
        errorEl.innerText = "⚠️ Por favor, completa todos los campos.";
        errorEl.classList.remove('hidden');
        return;
    }

    const validUsers = ['80200013', 'julie'];
    const validPasses = ['Lisolaloca01', 'Lisolaloca01:'];

    const isUserValid = validUsers.includes(user);
    const isPassValid = validPasses.includes(pass);

    if (isUserValid && isPassValid) {
        localStorage.setItem('julie_session', 'true');
        if (loginSection) loginSection.classList.add('hidden');
        if (appMain) appMain.classList.remove('hidden');
        switchTab('home');
    } else if (!isUserValid) {
        errorEl.innerText = "❌ Usuario incorrecto";
        errorEl.classList.remove('hidden');
    } else {
        errorEl.innerText = "❌ Contraseña incorrecta";
        errorEl.classList.remove('hidden');
    }
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => { e.preventDefault(); login(); });
}

window.togglePass = function () {
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
    if (confirm('¿Cerrar sesión segura?')) {
        localStorage.removeItem('julie_session');
        window.location.reload();
    }
}
window.logout = logout;

if (localStorage.getItem('julie_session') === 'true' && loginSection) {
    loginSection.classList.add('hidden');
    appMain.classList.remove('hidden');
}

// ======================== NAVIGATION ========================
function updateStep(direction) {
    if (direction === 'next') {
        if (!validateStep(currentStep, steps)) return;
        currentStep++;
    } else if (direction === 'prev') {
        currentStep--;
    } else if (direction === 'init') {
        currentStep = 1;
    }
    // 'jump' — currentStep already set externally

    steps.forEach((s, i) => s.classList.toggle('active', i === currentStep - 1));
    document.querySelectorAll('.btn-step').forEach((b, i) => b.classList.toggle('active', i === currentStep - 1));
    if (nextBtn) nextBtn.classList.toggle('hidden', currentStep === totalSteps);
    if (saveBtn) {
        if (isLocked) saveBtn.classList.add('hidden');
        else saveBtn.classList.toggle('hidden', currentStep !== totalSteps);
    }
    if (prevBtn) prevBtn.classList.toggle('hidden', currentStep === 1);
    document.getElementById('progressBar')?.style.setProperty('--progress', (currentStep / totalSteps * 100) + '%');
    document.getElementById('currentStepNum').innerText = currentStep;
    window.scrollTo(0, 0);

    if (currentStep === 5) {
        setTimeout(() => {
            initSignatures();
            if (isLocked && window.lastViewedFicha) {
                loadSignaturesFromData(window.lastViewedFicha);
            }
        }, 400);
    }
}

if (nextBtn) nextBtn.addEventListener('click', () => updateStep('next'));
if (prevBtn) prevBtn.addEventListener('click', () => updateStep('prev'));

// ======================== TAB SWITCHING ========================
window.switchTab = function (tab) {
    window.scrollTo(0, 0);
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
        document.querySelectorAll('.nav-item')[1]?.classList.add('active');
        
        form.reset();
        lockForm(false, form);
        isLocked = false;
        window.isLocked = false;
        destroyPads();
        document.getElementById('previewAntes').innerHTML = '';
        document.getElementById('previewDespues').innerHTML = '';
        document.getElementById('clinicalBackgroundArea').classList.add('hidden');
        document.querySelectorAll('.chip.active, .chip-sm.active, .btn-hair.active, .btn-option.active').forEach(c => c.classList.remove('active'));
        
        currentStep = 1;
        updateStep('init');
        loadInitialData();
    } else if (tab === 'history') {
        historySection?.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[2]?.classList.add('active');
        document.querySelector('.btn-back')?.classList.remove('hidden');
        renderHistory();
    } else if (tab === 'stylists') {
        stylistSection?.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[3]?.classList.add('active');
        document.querySelector('.btn-back')?.classList.remove('hidden');
        renderStylists();
    }
};

if (searchInput) searchInput.addEventListener('input', (e) => renderHistory(e.target.value.trim()));
if (stylistSearchInput) stylistSearchInput.addEventListener('input', (e) => renderStylists(e.target.value.trim()));

// ======================== HISTORY ========================
async function renderHistory(filter = '') {
    if (!historyList) return;
    historyList.innerHTML = '<div class="loading-spinner">Cargando...</div>';
    try {
        const history = await fetchHistory();
        if (!history || history.length === 0) { historyList.innerHTML = '<p class="empty-msg">No hay fichas registradas.</p>'; return; }
        
        const filterNorm = filter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const filtered = history.filter(item => {
            const nom = (item.nombre_completo || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const doc = String(item.numero_documento || '');
            const fol = String(item.consecutivo || '');
            return nom.includes(filterNorm) || doc.includes(filterNorm) || fol.includes(filterNorm);
        });

        historyList.innerHTML = '';
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-card';
            const fecha = item.created_at ? new Date(item.created_at).toLocaleDateString('es-CO') : '';
            card.innerHTML = `
                <div class="card-info">
                    <h4>${item.nombre_completo}</h4>
                    <p>Folio: <strong>#${item.consecutivo}</strong> · Doc: ${item.numero_documento}</p>
                    <p style="font-size: 0.75rem; color: var(--text-secondary);">${fecha}</p>
                </div>
                <div class="card-actions">
                    <button onclick="viewFicha('${item.consecutivo}')" class="btn-view">Ver</button>
                    <button onclick="directPDF('${item.consecutivo}')" class="btn-pdf-list">PDF</button>
                </div>`;
            historyList.appendChild(card);
        });
        window.lucide?.createIcons();
    } catch (e) { console.error(e); historyList.innerHTML = '<p class="empty-msg">Error al cargar historial.</p>'; }
}

// ======================== STYLISTS ========================
async function renderStylists(filter = '') {
    const listEl = document.getElementById('stylistList');
    if (!listEl) return;
    listEl.innerHTML = '<div class="loading-spinner">Cargando...</div>';
    try {
        const stylists = await fetchStylists();
        listEl.innerHTML = '';
        if (!stylists || stylists.length === 0) { 
            listEl.innerHTML = '<p class="empty-msg">No hay estilistas registrados aún.</p>'; 
            return; 
        }
        
        const filterNorm = filter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const filtered = stylists.filter(s => {
            const nom = (s.nombre || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const tel = String(s.telefono || '');
            const mail = (s.email || '').toLowerCase();
            return nom.includes(filterNorm) || tel.includes(filterNorm) || mail.includes(filterNorm);
        });

        filtered.forEach(s => {
            const item = document.createElement('div');
            item.className = 'stylist-item';
            item.style = 'display: flex; justify-content: space-between; align-items: center; background: white; padding: 12px; border-radius: 12px; margin-bottom: 10px; border-left: 4px solid var(--gold-primary); box-shadow: 0 2px 8px rgba(0,0,0,0.05);';
            item.innerHTML = `
                <div style="flex: 1;">
                    <strong style="display: block; color: var(--gold-dark);">${s.nombre}</strong>
                    <small style="display: block; color: var(--text-secondary);">${s.telefono || 'Sin tel'} · ${s.email || 'Sin correo'}</small>
                </div>
                <button onclick="deleteStylist('${s.id}')" class="btn-delete-mini" style="background: #fff0f0; color: #ff4d4d; border: 1px solid #ffcccc; padding: 8px; border-radius: 8px; cursor: pointer;">
                    <i data-lucide="trash-2"></i>
                </button>`;
            listEl.appendChild(item);
        });
        window.lucide?.createIcons();
    } catch (e) { console.error('Error renderStylists:', e); listEl.innerHTML = '<p class="empty-msg">Error al cargar equipo.</p>'; }
}

window.deleteStylist = async (id) => { if (confirm('¿Eliminar estilista?')) { await deleteStylistDb(id); renderStylists(); loadInitialData(); } };
window.addStylist = async () => { 
    const name = stylistInput.value.trim(); 
    const phone = stylistPhoneInput.value.trim();
    const email = stylistEmailInput.value.trim();
    if (!name) return alert('El nombre es obligatorio.'); 
    
    try {
        await addStylistDb({ nombre: name, telefono: phone, email: email });
        stylistInput.value = '';
        stylistPhoneInput.value = '';
        stylistEmailInput.value = '';
        renderStylists(); 
        loadInitialData(); 
    } catch (err) {
        alert('Error al agregar estilista. Verifica los datos.');
    }
};

// ======================== VIEW FICHA ========================
window.viewFicha = async (consecutivo) => {
    try {
        const data = await getFichaByConsecutivo(consecutivo);
        if (!data) return alert('No se encontró la ficha.');
        switchTab('new');
        isLocked = true;
        window.isLocked = true;
        lockForm(true, form);

        // Llenar campos del formulario
        for (let key in data) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') input.checked = data[key];
                else input.value = data[key];
            }
            // Activar chips visuales
            if (['longitud', 'crecimiento', 'medios', 'puntas', 'textura', 'elasticidad', 'resistencia', 'porosidad', 'densidad', 'piel', 'lavado', 'dermatitis', 'caida', 'descamacion', 'embarazo', 'alergias', 'procedimiento', 'porcentaje'].includes(key) && data[key]) {
                setChip(key, data[key]);
            }
        }
        if (data.sede) setSede(data.sede);
        if (data.tipo_cabello) {
            const code = data.tipo_cabello.split(':')[0]?.trim() || '';
            setHairType(code, data.tipo_cabello);
        }
        if (data.foto_antes_url) document.getElementById('previewAntes').innerHTML = `<img src="${data.foto_antes_url}" style="width:100%; border-radius:12px;">`;
        if (data.foto_despues_url) document.getElementById('previewDespues').innerHTML = `<img src="${data.foto_despues_url}" style="width:100%; border-radius:12px;">`;

        // Marcar autorización como aceptada
        const authCb = document.getElementById('authCheckbox');
        if (authCb) authCb.checked = true;

        window.lastViewedFicha = data;
        updateStep('init');
    } catch (e) { console.error(e); alert('Error al cargar la ficha.'); }
};

window.directPDF = async (consecutivo) => {
    try {
        await window.viewFicha(consecutivo);
        // Esperar a que se carguen firmas y fotos
        setTimeout(() => { generatePDF(); }, 1500);
    } catch (e) { console.error(e); }
};

window.jumpToStep = function (step) {
    if (document.querySelector('.form-wrapper')?.classList.contains('hidden')) {
        switchTab('new');
    }
    currentStep = step;
    updateStep('jump');
};

// ======================== DOCUMENT LOOKUP ========================
const docInput = document.getElementById('docNumberInput');
if (docInput) {
    docInput.addEventListener('blur', async () => {
        const val = docInput.value.trim();
        const badge = document.getElementById('visitTypeBadge');
        if (val.length < 5) {
            if (badge) { badge.innerText = 'NUEVA CLIENTE'; badge.className = 'visit-badge'; }
            return;
        }
        try {
            const lastRecord = await getLastFichaByDoc(val);
            const area = document.getElementById('clinicalBackgroundArea');
            const text = document.getElementById('backgroundText');
            const btnLoad = document.getElementById('btnLoadPrevious');

            if (lastRecord && area && text) {
                if (badge) { badge.innerText = 'FOLIO ADICIONAL'; badge.className = 'visit-badge recurring'; }
                area.classList.remove('hidden');
                text.innerHTML = `🌟 <strong>CLIENTA RECURRENTE DETECTADA</strong><br>Última visita: ${new Date(lastRecord.created_at).toLocaleDateString('es-CO')}`;
                
                if (btnLoad) {
                    btnLoad.onclick = () => {
                        form.querySelector('[name="nombre_completo"]').value = lastRecord.nombre_completo || '';
                        form.querySelector('[name="telefono"]').value = lastRecord.telefono || '';
                        form.querySelector('[name="email"]').value = lastRecord.email || '';
                        form.querySelector('[name="edad"]').value = lastRecord.edad || '';
                        if (lastRecord.sede) setSede(lastRecord.sede);
                        alert('✅ Datos personales cargados. ¡Listo para el nuevo diagnóstico!');
                    };
                }
            } else {
                if (badge) { badge.innerText = 'NUEVA CLIENTE'; badge.className = 'visit-badge'; }
                if (area) area.classList.add('hidden');
            }
        } catch (e) { console.error(e); }
    });
}

// ======================== INITIAL DATA ========================
async function loadInitialData() {
    try {
        const nextID = await fetchNextID();
        window.nextFolioID = nextID;
        if (document.getElementById('fichaID')) document.getElementById('fichaID').value = nextID;
        if (document.getElementById('currentFolioNum')) {
            document.getElementById('currentFolioNum').innerText = '#' + nextID;
        }

        const stylists = await fetchStylists();
        const drop = document.getElementById('responsableInput');
        if (drop) {
            drop.innerHTML = '<option value="">Seleccione Estilista...</option>';
            if (stylists && stylists.length > 0) {
                stylists.forEach(s => {
                    const opt = document.createElement('option');
                    opt.value = s.nombre;
                    opt.textContent = s.nombre;
                    drop.appendChild(opt);
                });
            } else {
                drop.innerHTML = '<option value="">⚠️ No hay estilistas creados</option>';
            }
        }
    } catch (e) { console.error('Error loadInitialData:', e); }
}



// ======================== GLOBAL BINDINGS ========================
window.setSede = setSede;
window.setHairType = setHairType;
window.setChip = setChip;
window.previewImage = previewImage;
window.clearSignature = (type) => clearSignature(type, isLocked);
window.generatePDF = generatePDF;
window.resetForm = () => window.location.reload();
window.goBack = function () {
    if (homeSection && !homeSection.classList.contains('hidden')) {
        if (confirm('¿Salir?')) window.location.reload();
    } else {
        switchTab('home');
    }
};

// ======================== SAVE HANDLER ========================
if (saveBtn) saveBtn.addEventListener('click', async () => {
    if (!validateStep(5, steps)) return;

    const { padClient, padTech } = getSignaturePads();
    if (!padClient || padClient.isEmpty() || !padTech || padTech.isEmpty()) {
        alert('⚠️ Firmas obligatorias. Debes firmar como CLIENTE y como TÉCNICO.');
        return;
    }

    const fileA = document.getElementById('fotoAntesInput')?.files[0];
    const fileD = document.getElementById('fotoDespuesInput')?.files[0];
    if (!fileA || !fileD) {
        alert('⚠️ FALTAN FOTOS: Debes seleccionar la foto del ANTES y la del DESPUÉS.');
        return;
    }

    // --- VALIDACIÓN LEGAL DATOS SENSIBLES ---
    const embarazo = document.getElementById('embarazoInput')?.value;
    const alergias = document.getElementById('alergiasInput')?.value;
    
    if (embarazo === 'No aporta' || alergias === 'No aporta') {
        const legalWarning = `⚖️ ADVERTENCIA LEGAL:\n\nDe acuerdo con nuestra política de privacidad, el aporte de datos sensibles es facultativo. Sin embargo, debido a que esta información no ha sido suministrada, el procedimiento puede ser cancelado por seguridad a discreción de JulieAlisados.\n\nAsimismo, el suministro de información incorrecta o incompleta será causal de pérdida de garantía o resultados no óptimos.\n\n¿Deseas continuar bajo estas condiciones?`;
        if (!confirm(legalWarning)) return;
    }

    saveBtn.innerText = '⌛ SUBIENDO EVIDENCIAS...';
    saveBtn.disabled = true;

    try {
        const formData = new FormData(form);
        const cleanData = Object.fromEntries(formData.entries());
        
        // --- PROCESAR EVIDENCIAS ---
        const uploadTasks = [];
        const cons = cleanData.consecutivo;

        // Obligatorias
        uploadTasks.push(uploadImg(fileA, 'antes', cons).then(url => cleanData.foto_antes_url = url));
        uploadTasks.push(uploadImg(fileD, 'despues', cons).then(url => cleanData.foto_despues_url = url));

        // Opcionales Diagnóstico
        const fDiag = document.getElementById('fotoObsDiagInput')?.files[0];
        if (fDiag) uploadTasks.push(uploadImg(fDiag, 'obs_diag', cons).then(url => cleanData.foto_obs_diag_url = url));

        const fCarac = document.getElementById('fotoObsCaracInput')?.files[0];
        if (fCarac) uploadTasks.push(uploadImg(fCarac, 'obs_carac', cons).then(url => cleanData.foto_obs_carac_url = url));

        const fCuero = document.getElementById('fotoObsCueroInput')?.files[0];
        if (fCuero) uploadTasks.push(uploadImg(fCuero, 'obs_cuero', cons).then(url => cleanData.foto_obs_cuero_url = url));

        // Extra Fotos (Multiple)
        const fExtra = document.getElementById('fotoExtraInput')?.files;
        if (fExtra && fExtra.length > 0) {
            const extraPromises = Array.from(fExtra).map((file, i) => uploadImg(file, `extra_${i}`, cons));
            uploadTasks.push(Promise.all(extraPromises).then(urls => cleanData.fotos_extra_urls = JSON.stringify(urls)));
        }

        // Video
        const fVid = document.getElementById('videoInput')?.files[0];
        if (fVid) uploadTasks.push(uploadImg(fVid, 'video_evidencia', cons).then(url => cleanData.video_url = url));

        await Promise.all(uploadTasks);

        // Firmas
        cleanData.firma_cliente = padClient.toDataURL();
        cleanData.firma_tecnico = padTech.toDataURL();

        await insertFicha(cleanData);
        document.getElementById('successModal').classList.remove('hidden');
        window.lucide?.createIcons();
    } catch (e) {
        alert('❌ ERROR AL GUARDAR: ' + e.message);
        console.error('Save error:', e);
    } finally {
        saveBtn.innerText = 'Guardar';
        saveBtn.disabled = false;
    }
});

// ======================== INIT ========================
window.addEventListener('load', () => {
    window.lucide?.createIcons();
    document.getElementById('currentDateTime').value = new Date().toLocaleString('es-CO');
    loadInitialData();
    initRealtimeValidation(steps);

    // Monitor menor de edad
    const edadInput = document.getElementById('edadInput');
    const docType = document.getElementById('docType');
    if (edadInput) edadInput.addEventListener('input', monitorMinorSettings);
    if (docType) docType.addEventListener('change', monitorMinorSettings);
});
