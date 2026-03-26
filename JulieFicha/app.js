// --- DEBUG: ¡App Iniciando! ---
alert('🚀 JulieFicha: Iniciando App con Supabase...');

// --- Supabase Config ---
const SB_URL = 'https://hzvwruiybynkifqsekkp.supabase.co';
const SB_KEY = 'sb_publishable_TBCjJHsY-vSi_BX-sWqDUA_PR3dMwvV';
let sb;

try {
    sb = supabase.createClient(SB_URL, SB_KEY);
    console.log('Supabase initialized');
} catch (e) {
    alert('Error al conectar con Supabase: ' + e.message);
}

// --- Icons & UI Globals ---
lucide.createIcons();

let currentStep = 1;
const totalSteps = 5;
let isLocked = false;
let currentUser = localStorage.getItem('julie_user_name') || "Consultora";

// Elements
const loginSection = document.getElementById('loginSection');
const appMain = document.getElementById('appMain');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const form = document.getElementById('fichaForm');
const steps = Array.from(document.querySelectorAll('.step'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const saveBtn = document.getElementById('saveBtn');
const pdfBtn = document.getElementById('pdfBtn');
const progressBar = document.getElementById('progressBar');
const currentStepNum = document.getElementById('currentStepNum');

// Tabs
const historySection = document.getElementById('historySection');
const stylistSection = document.getElementById('stylistSection');
const historyList = document.getElementById('historyList');
const searchInput = document.getElementById('searchInput');

// --- Security ---
if (localStorage.getItem('julie_session') === 'true') {
    loginSection.classList.add('hidden');
    appMain.classList.remove('hidden');
    const resp = document.getElementById('responsableInput');
    if(resp) resp.value = currentUser;
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    if (email === 'admin@juliealisados.com' && pass === 'julie2024') {
        currentUser = "Julia Alisados";
        localStorage.setItem('julie_session', 'true');
        localStorage.setItem('julie_user_name', currentUser);
        loginSection.classList.add('hidden');
        appMain.classList.remove('hidden');
        const resp = document.getElementById('responsableInput');
        if(resp) resp.value = currentUser;
        updateStep('init');
    } else {
        loginError.classList.remove('hidden');
    }
});

// --- Navigation ---
function updateStep(direction) {
    if (direction === 'next' && currentStep < totalSteps) {
        if (!validateStep(currentStep)) return;
        currentStep++;
    } else if (direction === 'prev' && currentStep > 1) {
        currentStep--;
    } else if (direction === 'init') {
        currentStep = 1;
    }

    steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep - 1);
    });

    if(prevBtn) prevBtn.classList.toggle('hidden', currentStep === 1);
    if(nextBtn) nextBtn.classList.toggle('hidden', currentStep === totalSteps);
    if(saveBtn) saveBtn.classList.toggle('hidden', currentStep !== totalSteps);
    if(pdfBtn) pdfBtn.classList.toggle('hidden', !isLocked);

    if (progressBar) {
        const percent = (currentStep / totalSteps) * 100;
        progressBar.style.setProperty('--progress', `${percent}%`);
    }
    if (currentStepNum) currentStepNum.innerText = currentStep;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (currentStep === 5) {
        setTimeout(initSignatures, 200);
    }
}

function validateStep(stepIndex) {
    if (isLocked) return true;
    const fields = steps[stepIndex - 1].querySelectorAll('[required]');
    let valid = true;
    fields.forEach(f => {
        if (!f.value || (f.type === 'checkbox' && !f.checked)) {
            f.closest('.form-group').classList.add('error');
            valid = false;
        } else {
            f.closest('.form-group').classList.remove('error');
        }
    });
    if (!valid) alert('Faltan campos obligatorios en este paso.');
    return valid;
}

if(prevBtn) prevBtn.addEventListener('click', () => updateStep('prev'));
if(nextBtn) nextBtn.addEventListener('click', () => updateStep('next'));

// --- Form Tools ---
function setSede(sede) {
    if(isLocked) return;
    document.getElementById('sedeInput').value = sede;
    document.querySelectorAll('.sede-options .btn-option').forEach(b => 
        b.classList.toggle('selected', b.innerText === sede.toUpperCase()));
}

function setHairType(code, full) {
    if(isLocked) return;
    document.getElementById('hairTypeInput').value = full;
    document.getElementById('hairTypeSelectedLabel').innerText = `Seleccionado: ${full}`;
    document.querySelectorAll('.btn-hair').forEach(b => b.classList.toggle('selected', b.innerText === code));
}

function setChip(prefix, value) {
    if(isLocked) return;
    const input = document.getElementById(`${prefix}Input`);
    if(input) input.value = value;
    const container = input.closest('.form-group');
    container.querySelectorAll('.chip, .chip-sm, .chip.descriptive').forEach(c => {
        const text = c.querySelector('strong') ? c.querySelector('strong').innerText : c.innerText;
        if(text) c.classList.toggle('selected', text.trim().toLowerCase() === value.trim().toLowerCase());
    });
}

function showConditional(id, show) {
    const el = document.getElementById(id);
    if(el) {
        el.classList.toggle('hidden', !show);
        const inp = el.querySelector('input, textarea');
        if(inp) inp.required = show && !isLocked;
    }
}

function handleDocTypeChange() {
    if(isLocked) return;
    const type = document.getElementById('docType').value;
    const isMinor = type === 'TI';
    const tutorBox = document.getElementById('tutorGroup');
    const tutorSig = document.getElementById('tutorSignatureBox');
    if(tutorBox) {
        tutorBox.classList.toggle('hidden', !isMinor);
        tutorBox.querySelector('input').required = isMinor;
    }
    if(tutorSig) tutorSig.classList.toggle('hidden', !isMinor);
}

function previewImage(input, previewId) {
    const prev = document.getElementById(previewId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            prev.innerHTML = `<img src="${e.target.result}" style="width:100%; border-radius:12px; margin-top:10px;">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// --- Signatures ---
let padClient, padTutor, padTech;

function initSignatures() {
    const canvasC = document.getElementById('signature-pad-cliente');
    const canvasT = document.getElementById('signature-pad-tutor');
    const canvasTech = document.getElementById('signature-pad-tecnico');

    if (canvasC && !padClient) {
        resizeCanvas(canvasC);
        padClient = new SignaturePad(canvasC);
    }
    if (canvasTech && !padTech) {
        resizeCanvas(canvasTech);
        padTech = new SignaturePad(canvasTech);
    }
    if (canvasT && !padTutor) {
        const visible = !canvasT.closest('.form-group').classList.contains('hidden');
        if(visible) {
            resizeCanvas(canvasT);
            padTutor = new SignaturePad(canvasT);
        }
    }
}

function resizeCanvas(canvas) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

function clearSignature(type) {
    if(isLocked) return;
    if(type === 'cliente' && padClient) padClient.clear();
    if(type === 'tutor' && padTutor) padTutor.clear();
    if(type === 'tecnico' && padTech) padTech.clear();
}

// --- Supabase Operations ---
async function uploadPhoto(file, path) {
    if(!file) return null;
    try {
        const { data, error } = await sb.storage.from('evidencia').upload(path, file);
        if(error) throw error;
        const { data: { publicUrl } } = sb.storage.from('evidencia').getPublicUrl(path);
        return publicUrl;
    } catch (e) {
        console.error('Error uploading:', e);
        return null;
    }
}

async function renderHistory(filter = '') {
    historyList.innerHTML = '<p class="empty-msg">Cargando...</p>';
    const { data: history, error } = await sb.from('fichas').select('*').order('created_at', { ascending: false });
    
    if (error || !history) {
        historyList.innerHTML = '<p class="empty-msg">Error al cargar historial o no hay datos.</p>';
        return;
    }

    const filtered = history.filter(item => 
        item.nombre_completo.toLowerCase().includes(filter.toLowerCase()) ||
        item.numero_documento.includes(filter)
    );

    if (filtered.length === 0) {
        historyList.innerHTML = '<p class="empty-msg">Sin resultados.</p>';
        return;
    }

    historyList.innerHTML = '';
    filtered.forEach(item => {
        const isAdmin = localStorage.getItem('julie_user_name') === "Julia Alisados";
        const card = document.createElement('div');
        card.className = 'history-card';
        card.innerHTML = `
            <div class="card-info">
                <h4>${item.nombre_completo}</h4>
                <p>N° ${item.consecutivo} | Doc: ${item.numero_documento}</p>
            </div>
            <div class="card-actions">
                <button onclick="viewFichaDetails('${item.consecutivo}')" class="btn-view">Ver</button>
                <button onclick="startNewSession('${item.consecutivo}')" class="btn-followup">Seguimiento</button>
                ${isAdmin ? `<button onclick="deleteFicha('${item.consecutivo}')" class="btn-delete-record">Borrar</button>` : ''}
            </div>
        `;
        historyList.appendChild(card);
    });
}

function switchTab(tab) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('.form-wrapper').classList.add('hidden');
    document.querySelector('.form-footer').classList.add('hidden');
    historySection.classList.add('hidden');
    stylistSection.classList.add('hidden');

    if (tab === 'new') {
        document.querySelector('.form-wrapper').classList.remove('hidden');
        document.querySelector('.form-footer').classList.remove('hidden');
        document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else if (tab === 'history') {
        historySection.classList.remove('hidden');
        document.querySelectorAll('.nav-item')[1].classList.add('active');
        renderHistory();
    }
}

// --- Final Save ---
saveBtn.addEventListener('click', async () => {
    if(!validateStep(5)) return;
    if(padClient.isEmpty() || padTech.isEmpty()) return alert('Firmas de cliente y técnico obligatorias.');

    saveBtn.innerText = 'GUARDANDO... ESPERE';
    saveBtn.disabled = true;

    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.firma_cliente = padClient.toDataURL();
        data.firma_tecnico = padTech.toDataURL();
        if(padTutor && !padTutor.isEmpty()) data.firma_tutor_legal = padTutor.toDataURL();

        const fileA = document.querySelector('[name="foto_antes"]').files[0];
        const fileD = document.querySelector('[name="foto_despues"]').files[0];
        
        if(fileA) data.foto_antes_url = await uploadPhoto(fileA, `antes_${data.consecutivo}_${Date.now()}.jpg`);
        if(fileD) data.foto_despues_url = await uploadPhoto(fileD, `despues_${data.consecutivo}_${Date.now()}.jpg`);

        const { error } = await sb.from('fichas').insert([data]);

        if (error) throw error;

        isLocked = true;
        document.getElementById('successModal').classList.remove('hidden');
    } catch (e) {
        alert('❌ Error al guardar en la nube: ' + e.message);
    } finally {
        saveBtn.innerText = 'Finalizar y Guardar';
        saveBtn.disabled = false;
    }
});

// --- Inits ---
async function setNextID() {
    const { data } = await sb.from('fichas').select('consecutivo').order('created_at', { ascending: false }).limit(1);
    const lastNum = (data && data.length > 0) ? parseInt(data[0].consecutivo) : 0;
    const el = document.getElementById('fichaID');
    if(el) el.value = (lastNum + 1).toString().padStart(4, '0');
}

function updateDateTime() {
    const el = document.getElementById('currentDateTime');
    if(el) el.value = new Date().toLocaleString('es-CO');
}

window.addEventListener('load', () => {
    updateDateTime();
    setNextID();
});
