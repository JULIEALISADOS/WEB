import { fetchNextID, fetchStylists, fetchHistory, getFichaByConsecutivo, deleteFichaDb, deleteStylistDb, addStylistDb, insertFicha, uploadImg } from './db.js';
import { initSignatures, clearSignature, getSignaturePads, loadSignaturesFromData } from './signature.js';
import { generatePDF } from './pdf.js';
import { setSede, setHairType, setChip, previewImage, validateStep, monitorMinorSettings, lockForm } from './ui.js';

const form = document.getElementById('fichaForm');
const steps = Array.from(document.querySelectorAll('.step'));
const saveBtn = document.getElementById('saveBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const loginSection = document.getElementById('loginSection');
const appMain = document.getElementById('appMain');
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

// LOGIN
function login() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if (email === '80200013' && pass === 'Lisolaloca01:') {
        localStorage.setItem('julie_session', 'true');
        localStorage.setItem('julie_user_name', "Julia Alisados");
        loginSection.classList.add('hidden');
        appMain.classList.remove('hidden');
        updateStep('init');
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
}
if(document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => { e.preventDefault(); login(); });
}
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
    } else {
        currentStep = 1;
    }

    steps.forEach((s, i) => s.classList.toggle('active', i === currentStep - 1));
    
    if(nextBtn) nextBtn.classList.toggle('hidden', currentStep === totalSteps);
    if(saveBtn) saveBtn.classList.toggle('hidden', currentStep !== totalSteps);
    if(prevBtn) prevBtn.classList.toggle('hidden', currentStep === 1);

    const percent = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.setProperty('--progress', percent + '%');
    document.getElementById('currentStepNum').innerText = currentStep;
    window.scrollTo(0,0);

    if (currentStep === 5) setTimeout(initSignatures, 300);
}

if(nextBtn) nextBtn.addEventListener('click', () => updateStep('next'));
if(prevBtn) prevBtn.addEventListener('click', () => updateStep('prev'));

// TABS
window.switchTab = function(tab) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('.form-wrapper').classList.add('hidden');
    document.querySelector('.form-footer').classList.add('hidden');
    if(historySection) historySection.classList.add('hidden');
    if(stylistSection) stylistSection.classList.add('hidden');

    if (tab === 'new') {
        document.querySelector('.form-wrapper').classList.remove('hidden');
        document.querySelector('.form-footer').classList.remove('hidden');
        document.querySelectorAll('.nav-item')[0].classList.add('active');
        if(isLocked) {
             form.reset();
             lockForm(false, form);
             isLocked = false;
             document.getElementById('previewAntes').innerHTML = '';
             document.getElementById('previewDespues').innerHTML = '';
             loadInitialData(); 
        }
    } else if (tab === 'history') {
        if(historySection) historySection.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[1].classList.add('active');
        renderHistory();
    } else if (tab === 'stylists') {
        if(stylistSection) stylistSection.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[2].classList.add('active');
        renderStylists();
    }
};

// LOADERS
async function loadInitialData() {
    try {
        const nextId = await fetchNextID();
        if(document.getElementById('fichaID')) {
            document.getElementById('fichaID').value = nextId.toString().padStart(4, '0');
        }
    } catch(e) { console.error('Error ID:', e); }

    if(!responsableInput) return;
    try {
        const stylists = await fetchStylists();
        responsableInput.innerHTML = '<option value="">Seleccione estilista...</option>';
        if (stylists && stylists.length > 0) {
            stylists.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.nombre; opt.textContent = s.nombre;
                responsableInput.appendChild(opt);
            });
        }
    } catch(e) { console.error('Error Stylists:', e); }
}

window.addEventListener('load', () => {
    if(typeof window.lucide !== 'undefined') window.lucide.createIcons();
    document.getElementById('currentDateTime').value = new Date().toLocaleString('es-CO');
    loadInitialData();
    setTimeout(preFillTestData, 800);
});

// EVENT LISTENERS Y WINDOW BINDS
window.setSede = setSede;
window.setHairType = setHairType;
window.setChip = setChip;
window.previewImage = previewImage;
window.handleDocTypeChange = monitorMinorSettings;
window.clearSignature = (type) => clearSignature(type, isLocked);
window.generatePDF = () => generatePDF(currentStep);
window.closeModal = () => window.location.reload();
window.resetForm = () => window.location.reload();
window.goBack = function() {
    if(!historySection.classList.contains('hidden') || !stylistSection.classList.contains('hidden')) {
        window.switchTab('new');
    } else if (currentStep > 1) {
        updateStep('prev');
    } else {
        if(confirm('¿Salir de la aplicación?')) window.location.reload();
    }
};

document.getElementById('edadInput').addEventListener('input', monitorMinorSettings);
document.getElementById('docType').addEventListener('change', monitorMinorSettings);

// RACE CONDITION FIXED: GUARDADO SEGURO
if(saveBtn) saveBtn.addEventListener('click', async () => {
    console.log('🔵 BOTÓN GUARDAR PRESIONADO');
    if(responsableInput && (!responsableInput.value || responsableInput.value === '')) {
        if(responsableInput.options.length > 1) responsableInput.selectedIndex = 1;
    }
    
    if(!validateStep(5, steps)) return;
    const { padClient, padTech, padTutor } = getSignaturePads();
    if(padClient && padClient.isEmpty()) return alert('⚠️ Por favor, firma en el recuadro de FIRMA DE LA CLIENTE.');
    if(padTech && padTech.isEmpty()) return alert('⚠️ Por favor, firma en el recuadro de FIRMA DEL TÉCNICO.');
    
    const fileA = document.querySelector('[name="foto_antes"]').files[0];
    const fileD = document.querySelector('[name="foto_despues"]').files[0];
    if(!fileA || !fileD) return alert('⚠️ Es obligatorio subir las fotos del ANTES y DESPUÉS.');

    saveBtn.innerText = '⌛ PROCESANDO...';
    saveBtn.classList.add('loading');
    saveBtn.disabled = true;

    try {
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData.entries());
        const cleanData = {};
        for (let key in rawData) cleanData[key] = rawData[key] ? rawData[key].toString().trim() : '';
        delete cleanData.foto_antes; delete cleanData.foto_despues;

        cleanData.firma_cliente = padClient.toDataURL();
        cleanData.firma_tecnico = padTech.toDataURL();
        if(padTutor && !padTutor.isEmpty()) cleanData.firma_tutor_legal = padTutor.toDataURL();

        console.log('Subiendo imágenes en paralelo (FIXED RACE CONDITION)...');
        const [urlAntes, urlDespues] = await Promise.all([
            uploadImg(fileA, 'antes', cleanData.consecutivo),
            uploadImg(fileD, 'despues', cleanData.consecutivo)
        ]);

        cleanData.foto_antes_url = urlAntes;
        cleanData.foto_despues_url = urlDespues;

        console.log('Insertando en PostgreSQL...');
        await insertFicha(cleanData);

        document.getElementById('successModal').classList.remove('hidden');
        if(typeof window.lucide !== 'undefined') window.lucide.createIcons();

    } catch (e) {
        console.error('FALLO TOTAL EN GUARDADO:', e);
        alert('❌ ERROR AL GUARDAR:\n' + e.message);
    } finally {
        saveBtn.innerText = 'Finalizar y Guardar';
        saveBtn.classList.remove('loading');
        saveBtn.disabled = false;
    }
});

// PREFILL
function preFillTestData() {
    const f = document.getElementById('fichaForm');
    if(!f) return;
    setSede('Moniquira');
    f.querySelector('[name="tipo_documento"]').value = 'CC';
    f.querySelector('[name="numero_documento"]').value = '80200013';
    f.querySelector('[name="edad"]').value = '35';
    f.querySelector('[name="nombre_completo"]').value = 'CLIENTA DE PRUEBA JULIE';
    f.querySelector('[name="telefono"]').value = '3101234567';
    setHairType('2B', '2B: Ondas mas definidas');
    setChip('longitud', 'Largo'); setChip('crecimiento', 'Natural');
    setChip('medios', 'Alisado'); setChip('puntas', 'Alisado');
    f.querySelector('[name="procesos_quimicos"]').value = 'Ninguno';
    f.querySelector('[name="terapias_capilares"]').value = 'Ninguna';
    setChip('textura', 'Medio'); setChip('elasticidad', 'Media');
    setChip('resistencia', 'Media'); setChip('porosidad', 'Media'); setChip('densidad', 'Regular');
    setChip('piel', 'Equilibrado'); setChip('lavado', 'Dia por medio');
    setChip('dermatitis', 'No presenta'); setChip('caida', 'Normal'); setChip('descamacion', 'No presenta');
    setChip('embarazo', 'No'); setChip('alergias', 'No');
    setChip('procedimiento', 'Alisado Saludable'); setChip('porcentaje', '100%');
    f.querySelector('[name="tecnica_utilizada"]').value = 'Tecnica Julie';
}
