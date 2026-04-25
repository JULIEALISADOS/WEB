// --- JULIEFICHA V5.0: REINICIO MAESTRO ---
// alert('🚀 JulieFicha V5.0: Sistema Actualizado a Versión 5.0 (Blindado Total)');

if (window.location.protocol === 'file:') {
    alert('⚠️ ATENCIÓN: Estás abriendo la aplicación como un archivo local. El guardado NO funcionará por seguridad del navegador. \n\nPor favor, usa la dirección web: https://juliealisados.github.io/WEB/sistema-fichas-2024/');
}

const SB_URL = 'https://hzvwruiybynkifqsekkp.supabase.co';
const SB_KEY = 'sb_publishable_TBCjJHsY-vSi_BX-sWqDUA_PR3dMwvV';
let sb;

try { sb = supabase.createClient(SB_URL, SB_KEY); } catch (e) { alert('❌ Error Supabase: ' + e.message); }

const form = document.getElementById('fichaForm');
const steps = Array.from(document.querySelectorAll('.step'));
const saveBtn = document.getElementById('saveBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const loginSection = document.getElementById('loginSection');
const appMain = document.getElementById('appMain');

let currentStep = 1;
const totalSteps = 5;
let isLocked = false;
let currentUser = localStorage.getItem('julie_user_name') || "Consultora";


// SIGNATURES GLOBALS
let padClient, padTech, padTutor;

function resizeCanvas(canvas) {
    if(!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.initSignatures = function() {
    const cC = document.getElementById('signature-pad-cliente');
    const cT = document.getElementById('signature-pad-tecnico');
    const cMinor = document.getElementById('signature-pad-tutor');
    
    if (cC && !padClient) { resizeCanvas(cC); padClient = new SignaturePad(cC); }
    if (cT && !padTech) { resizeCanvas(cT); padTech = new SignaturePad(cT); }
    const visibleMinor = !document.getElementById('tutorSignatureBox').classList.contains('hidden');
    if (cMinor && visibleMinor && !padTutor) { resizeCanvas(cMinor); padTutor = new SignaturePad(cMinor); }
};


// Elements
const historySection = document.getElementById('historySection');
const stylistSection = document.getElementById('stylistSection');
const historyList = document.getElementById('historyList');
const searchInput = document.getElementById('searchInput');
const stylistList = document.getElementById('stylistList');
const stylistInput = document.getElementById('stylistInput');
const responsableInput = document.getElementById('responsableInput');


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
document.getElementById('loginForm').addEventListener('submit', (e) => { e.preventDefault(); login(); });
if (localStorage.getItem('julie_session') === 'true') {
    loginSection.classList.add('hidden');
    appMain.classList.remove('hidden');
}

// AUTOMATIC AGE/DOC MONITOR
function monitorMinorSettings() {
    const ageValue = parseInt(document.getElementById('edadInput').value) || 0;
    const typeValue = document.getElementById('docType').value;
    const isMinor = ageValue > 0 && (ageValue < 18 || typeValue === 'TI');
    
    document.getElementById('tutorGroup').classList.toggle('hidden', !isMinor);
    document.getElementById('tutorInput').required = isMinor;
    document.getElementById('tutorSignatureBox').classList.toggle('hidden', !isMinor);
}

// NAVIGATION
function updateStep(direction) {
    if (direction === 'next') {
        if (!validateStep(currentStep)) return;
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
    document.getElementById('progressBar').style.setProperty('--progress', `${percent}%`);
    document.getElementById('currentStepNum').innerText = currentStep;
    window.scrollTo(0,0);

    if (currentStep === 5) setTimeout(initSignatures, 300);
}

// VALIDATION BLINDADA
function validateStep(idx) {
    const fields = steps[idx-1].querySelectorAll('[required]');
    let valid = true;
    
    // AGE LOGIC
    if(idx === 1) {
        const age = parseInt(document.getElementById('edadInput').value) || 0;
        const type = document.getElementById('docType').value;
        if(type === 'TI' && age >= 18) { alert('⚠️ Tarjeta de Identidad es solo para menores de 18 años.'); return false; }
        if(type === 'CC' && (age < 18 || age > 99)) { alert('⚠️ Cédula es solo para mayores de 18 años (18-99).'); return false; }
    }

    fields.forEach(f => {
        let isValueOk = f.value && f.value.trim().length > 0;
        if (f.tagName === 'TEXTAREA' && f.value.trim().length < 5) isValueOk = false;

        if(!isValueOk || (f.type==='checkbox' && !f.checked)) {
            const group = f.closest('.form-group') || f.closest('.authorization-check') || f.closest('.form-grid > div');
            if(group) group.classList.add('error');
            valid = false;
        } else {
            const group = f.closest('.form-group') || f.closest('.authorization-check') || f.closest('.form-grid > div');
            if(group) group.classList.remove('error');
        }
    });

    if(!valid) alert('⚠️ Campo obligatorio faltante o muy corto en el Paso ' + idx);
    return valid;
}


if(nextBtn) nextBtn.addEventListener('click', () => updateStep('next'));
if(prevBtn) prevBtn.addEventListener('click', () => updateStep('prev'));

window.clearSignature = function(type) {
    if(isLocked) return;
    if(type==='cliente' && padClient) padClient.clear();
    if(type==='tecnico' && padTech) padTech.clear();
    if(type==='tutor' && padTutor) padTutor.clear();
};


// SAVE DATA BLINDADO
saveBtn.addEventListener('click', async () => {
    if(!validateStep(5)) return;
    if(padClient.isEmpty() || padTech.isEmpty()) return alert('⚠️ Firmas obligatorias.');
    
    const fileA = document.querySelector('[name="foto_antes"]').files[0];
    const fileD = document.querySelector('[name="foto_despues"]').files[0];
    if(!fileA || !fileD) return alert('⚠️ Faltan fotos obligatorias del ANTES o DESPUÉS.');

    saveBtn.innerText = '⌛ GUARDANDO...';
    saveBtn.disabled = true;

    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        delete data.foto_antes; delete data.foto_despues;
        data.firma_cliente = padClient.toDataURL();
        data.firma_tecnico = padTech.toDataURL();
        if(padTutor && !padTutor.isEmpty()) data.firma_tutor_legal = padTutor.toDataURL();
        
        const pathA = `antes_${data.consecutivo}_${Date.now()}.jpg`;
        await sb.storage.from('evidencia').upload(pathA, fileA);
        const { data: dUrlA } = sb.storage.from('evidencia').getPublicUrl(pathA);
        data.foto_antes_url = dUrlA.publicUrl;

        const pathD = `despues_${data.consecutivo}_${Date.now()}.jpg`;
        await sb.storage.from('evidencia').upload(pathD, fileD);
        const { data: dUrlD } = sb.storage.from('evidencia').getPublicUrl(pathD);
        data.foto_despues_url = dUrlD.publicUrl;

        const { error } = await sb.from('fichas').insert([data]);
        if(error) throw error;
        document.getElementById('successModal').classList.remove('hidden');
    } catch (e) {
        alert('❌ Error: ' + e.message);
    } finally {
        saveBtn.innerText = 'Finalizar y Guardar';
        saveBtn.disabled = false;
    }
});

// INITIALIZERS
async function setNextID() {
    try {
        const { data } = await sb.from('fichas').select('consecutivo').order('created_at', {ascending:false}).limit(1);
        const next = (data && data.length > 0) ? parseInt(data[0].consecutivo) + 1 : 1;
        if(document.getElementById('fichaID')) {
            document.getElementById('fichaID').value = next.toString().padStart(4, '0');
        }
    } catch (e) {
        console.error("Error al obtener ID:", e);
    }
}

window.addEventListener('load', () => {
    lucide.createIcons();
    document.getElementById('currentDateTime').value = new Date().toLocaleString('es-CO');
    setNextID();
    populateStylistsSelect();
});

async function populateStylistsSelect() {
    if(!responsableInput) return;
    try {
        const { data: stylists, error } = await sb.from('estilistas').select('nombre').order('nombre');
        if (error) throw error;
        
        responsableInput.innerHTML = '<option value="">Seleccione estilista...</option>';
        stylists.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.nombre;
            opt.textContent = s.nombre;
            responsableInput.appendChild(opt);
        });
    } catch (e) {
        console.error("Error al cargar estilistas para el select:", e);
    }
}

// HELPERS GLOBALES
window.setSede = function(s) { 
    document.getElementById('sedeInput').value = s;
    document.querySelectorAll('.btn-option').forEach(b => b.classList.toggle('selected', b.innerText === s.toUpperCase()));
};
window.setHairType = function(c, f) {
    document.getElementById('hairTypeInput').value = f;
    document.getElementById('hairTypeSelectedLabel').innerText = f;
    document.querySelectorAll('.btn-hair').forEach(b => b.classList.toggle('selected', b.innerText === c));
};
window.setChip = function(p, v) {
    document.getElementById(p+'Input').value = v;
    const container = document.getElementById(p+'Input').closest('.form-group') || document.getElementById(p+'Input').closest('.form-grid > div');
    if(container) {
        container.querySelectorAll('.chip, .chip-sm').forEach(c => {
            const text = c.querySelector('strong') ? c.querySelector('strong').innerText : c.innerText;
            if(text) c.classList.toggle('selected', text.trim().toLowerCase() === v.trim().toLowerCase());
        });
    }
};
window.handleDocTypeChange = function() { monitorMinorSettings(); };
window.previewImage = function(input, previewId) {
    const prev = document.getElementById(previewId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => { prev.innerHTML = `<img src="${e.target.result}" style="width:100%; border-radius:12px; margin-top:10px;">`; };
        reader.readAsDataURL(input.files[0]);
    }
};
window.closeModal = function() { window.location.reload(); };

// VALIDACIÓN DE TECLADO
document.querySelector('[name="nombre_completo"]').addEventListener('input', function(e) { this.value = this.value.replace(/[0-9]/g, ''); });
document.querySelector('[name="telefono"]').addEventListener('input', function(e) { this.value = this.value.replace(/[^0-9]/g, ''); });

// VIGILANTE AUTOMÁTICO DE EDAD Y TUTOR
document.getElementById('edadInput').addEventListener('input', monitorMinorSettings);
document.getElementById('docType').addEventListener('change', monitorMinorSettings);

// --- BLOQUEO Y CARGA DE DATOS ---
window.lockForm = function(lock) {
    isLocked = lock;
    form.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.id !== 'fichaID' && el.id !== 'currentDateTime') {
            el.disabled = lock;
        }
    });
    // Bloquear botones de opciones (chips, sedes, etc)
    document.querySelectorAll('.btn-option, .btn-hair, .chip, .chip-sm').forEach(b => {
        b.style.pointerEvents = lock ? 'none' : 'auto';
        if(lock) b.style.opacity = '0.8';
        else b.style.opacity = '1';
    });
    // Mostrar/Ocultar botón PDF
    // Mostrar/Ocultar botón PDF en el header
    const pdfBtn = document.getElementById('pdfBtn');
    if(pdfBtn) {
        pdfBtn.classList.toggle('hidden', !lock);
        // Reiniciar iconos de lucide por si acaso
        if(typeof lucide !== 'undefined') lucide.createIcons();
    }
};

window.loadFichaData = function(data) {
    // Llenar campos simples
    for (let key in data) {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') input.checked = data[key];
            else input.value = data[key];
        }
    }

    // Llenar campos especiales (Sede, Cabello, Chips)
    if (data.sede) setSede(data.sede);
    if (data.tipo_cabello) {
        const hash = data.tipo_cabello.split(':')[0].trim();
        setHairType(hash, data.tipo_cabello);
    }
    
    // Chips (buscamos por valor en los grupos correspondientes)
    ['longitud', 'textura', 'elasticidad', 'resistencia', 'porosidad', 'densidad', 'piel', 'lavado', 'dermatitis', 'caida', 'descamacion', 'embarazo', 'alergias', 'procedimiento', 'porcentaje'].forEach(p => {
        if(data[p]) setChip(p, data[p]);
    });

    // Estados de cabello (Crecimiento, Medios, Puntas)
    if(data.estado_crecimiento) setChip('crecimiento', data.estado_crecimiento);
    if(data.estado_medios) setChip('medios', data.estado_medios);
    if(data.estado_puntas) setChip('puntas', data.estado_puntas);

    // Condicionales
    if(data.embarazo === 'Si') showConditional('pregnancyDetail', true);
    if(data.alergias === 'Si') showConditional('alergiasDetail', true);
    if(data.tipo_documento === 'TI') monitorMinorSettings();

    // Previsualizaciones de fotos
    if(data.foto_antes_url) document.getElementById('previewAntes').innerHTML = `<img src="${data.foto_antes_url}" style="width:100%; border-radius:12px; margin-top:10px;">`;
    if(data.foto_despues_url) document.getElementById('previewDespues').innerHTML = `<img src="${data.foto_despues_url}" style="width:100%; border-radius:12px; margin-top:10px;">`;

    // Cargar Firmas (Flash técnico al paso 5 para redimensionar y pintar)
    setTimeout(() => {
        const originalStep = currentStep;
        steps.forEach((s, idx) => s.classList.toggle('active', idx === 4));
        
        setTimeout(() => {
            initSignatures();
            if(data.firma_cliente && padClient) padClient.fromDataURL(data.firma_cliente);
            if(data.firma_tecnico && padTech) padTech.fromDataURL(data.firma_tecnico);
            if(data.firma_tutor_legal && padTutor) padTutor.fromDataURL(data.firma_tutor_legal);
            
            setTimeout(() => {
                steps.forEach((s, idx) => s.classList.toggle('active', idx === 0));
                currentStep = 1;
            }, 300);
        }, 500);
    }, 100);
};

window.generatePDF = function() {
    const element = document.getElementById('fichaForm');
    const pdfBtn = document.getElementById('pdfBtn');
    
    if(pdfBtn) pdfBtn.innerHTML = '⌛'; // Indicador de carga
    
    const opt = {
        margin: 10,
        filename: `Ficha_${document.getElementById('fichaID').value||'SinID'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Mostramos todos los pasos para el PDF
    const allSteps = document.querySelectorAll('.step');
    allSteps.forEach(s => s.classList.add('active'));
    
    html2pdf().set(opt).from(element).save().then(() => {
        allSteps.forEach((s, i) => s.classList.toggle('active', i === currentStep - 1));
        if(pdfBtn) {
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(typeof lucide !== 'undefined') lucide.createIcons();
        }
    }).catch(err => {
        console.error(err);
        alert('Error generando PDF: ' + (err.message || err));
        allSteps.forEach((s, i) => s.classList.toggle('active', i === currentStep - 1));
        if(pdfBtn) {
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(typeof lucide !== 'undefined') lucide.createIcons();
        }
    });
};



// --- NAVEGACIÓN ENTRE SECCIONES (TABS) ---
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
        // Si el formulario estaba bloqueado (por Ver Detalle), lo desbloqueamos para una nueva ficha
        if(isLocked) {
             form.reset();
             lockForm(false);
             document.getElementById('previewAntes').innerHTML = '';
             document.getElementById('previewDespues').innerHTML = '';
             setNextID(); // Recargar el ID consecutivo
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

// --- HISTORIAL ---
async function renderHistory(filter = '') {
    if(!historyList) return;
    historyList.innerHTML = '<p class="empty-msg">Cargando historial...</p>';
    
    try {
        const { data: history, error } = await sb.from('fichas').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        
        const term = filter ? filter.toLowerCase() : '';
        const filtered = history.filter(item => {
            const nombre = item.nombre_completo ? String(item.nombre_completo).toLowerCase() : '';
            const doc = item.numero_documento ? String(item.numero_documento).toLowerCase() : '';
            return nombre.includes(term) || doc.includes(term);
        });

        if (filtered.length === 0) {
            historyList.innerHTML = '<p class="empty-msg">Sin resultados.</p>';
            return;
        }

        historyList.innerHTML = '';
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.innerHTML = `
                <div class="card-info">
                    <h4>${item.nombre_completo}</h4>
                    <p>N° ${item.consecutivo} | Doc: ${item.numero_documento}</p>
                    <small>${new Date(item.created_at).toLocaleDateString()}</small>
                </div>
                <div class="card-actions">
                    <button onclick="viewFichaDetails('${item.consecutivo}')" class="btn-view">Ver</button>
                    <button onclick="downloadPDFFromHistory('${item.consecutivo}')" class="btn-pdf-list" style="background:#555; color:white; border:none; padding:8px; border-radius:8px; cursor:pointer;"><i data-lucide="download"></i></button>
                    <button onclick="deleteFicha('${item.consecutivo}')" class="btn-delete-record">Borrar</button>
                </div>
            `;
            historyList.appendChild(card);
        });
        if(typeof lucide !== 'undefined') lucide.createIcons();
    } catch (e) {
        historyList.innerHTML = '<p class="empty-msg">Error: ' + e.message + '</p>';
    }
}

if(searchInput) searchInput.addEventListener('input', (e) => renderHistory(e.target.value));

// --- GESTIÓN DE ESTILISTAS ---
async function renderStylists() {
    if(!stylistList) return;
    stylistList.innerHTML = '<p class="empty-msg">Cargando estilistas...</p>';
    
    try {
        const { data: stylists, error } = await sb.from('estilistas').select('*').order('nombre');
        if (error) throw error;

        if (stylists.length === 0) {
            stylistList.innerHTML = '<p class="empty-msg">No hay estilistas registradas.</p>';
            return;
        }

        stylistList.innerHTML = '';
        stylists.forEach(s => {
            const item = document.createElement('div');
            item.className = 'stylist-item';
            item.innerHTML = `
                <span>${s.nombre}</span>
                <button onclick="deleteStylist('${s.id}')" class="btn-delete">Eliminar</button>
            `;
            stylistList.appendChild(item);
        });
    } catch (e) {
        stylistList.innerHTML = '<p class="empty-msg">Error: ' + e.message + '</p>';
    }
}

window.addStylist = async function() {
    const nombre = stylistInput.value.trim();
    if (!nombre) return;
    
    try {
        const { error } = await sb.from('estilistas').insert([{ nombre }]);
        if (error) throw error;
        stylistInput.value = '';
        renderStylists();
    } catch (e) {
        alert('Error al añadir: ' + e.message);
    }
};

window.deleteStylist = async function(id) {
    if (!confirm('¿Eliminar a esta estilista?')) return;
    try {
        const { error } = await sb.from('estilistas').delete().eq('id', id);
        if (error) throw error;
        renderStylists();
    } catch (e) {
        alert('Error al eliminar: ' + e.message);
    }
};

// --- DETALLES Y BORRADO DE FICHAS ---
window.viewFichaDetails = async function(consecutivo) {
    try {
        const { data, error } = await sb.from('fichas').select('*').eq('consecutivo', consecutivo).single();
        if (error) throw error;
        
        switchTab('new');
        loadFichaData(data);
        lockForm(true);
        updateStep('init');
        alert('ℹ️ Estás viendo la ficha N° ' + consecutivo + ' (Modo Lectura)');
    } catch (e) {
        alert('Error al cargar detalle: ' + e.message);
    }
};

window.goBack = function() {
    if(!historySection.classList.contains('hidden') || !stylistSection.classList.contains('hidden')) {
        switchTab('new');
    } else if (currentStep > 1) {
        updateStep('prev');
    } else {
        if(confirm('¿Salir de la aplicación?')) {
            window.location.reload();
        }
    }
};



window.deleteFicha = async function(consecutivo) {
    if (localStorage.getItem('julie_user_name') !== "Julia Alisados") return alert('Solo admin puede borrar.');
    if (!confirm('¿Seguro quieres borrar la ficha ' + consecutivo + '? Esta acción es irreversible.')) return;
    
    try {
        const { error } = await sb.from('fichas').delete().eq('consecutivo', consecutivo);
        if (error) throw error;
        renderHistory();
    } catch (e) {
        alert('Error al borrar: ' + e.message);
    }
};

window.downloadPDFFromHistory = async function(consecutivo) {
    try {
        const { data, error } = await sb.from('fichas').select('*').eq('consecutivo', consecutivo).single();
        if (error) throw error;
        
        switchTab('new');
        loadFichaData(data);
        lockForm(true);
        updateStep('init');
        
        // Damos más tiempo para que las imágenes de Supabase carguen (CORS) y las firmas se pinten
        setTimeout(() => {
            generatePDF();
        }, 1500);
    } catch (e) {
        alert('Error al descargar PDF: ' + e.message);
    }
};

window.resetForm = function() {
    window.location.reload();
};
