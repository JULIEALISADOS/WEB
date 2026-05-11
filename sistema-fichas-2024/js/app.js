import { fetchNextID, fetchStylists, fetchHistory, getFichaByConsecutivo, deleteFichaDb, deleteStylistDb, addStylistDb, insertFicha, uploadImg, getLastFichaByDoc, updateStylistPassword } from './db.js';
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
    
    // Admin login
    const validAdmins = ['80200013', 'julie'];
    const validPasses = ['Lisolaloca01', 'Lisolaloca01:'];

    const isAdmin = validAdmins.includes(user) && validPasses.includes(pass);
    if (isAdmin) {
        localStorage.setItem('julie_role', 'admin');
        localStorage.setItem('julie_session', 'true');
        loginSuccess('admin');
    } else {
        checkStylistLogin(user, pass);
    }
}

async function checkStylistLogin(user, pass) {
    const errorEl = document.getElementById('loginError');
    try {
        const stylists = await fetchStylists();
        const found = stylists.find(s => (s.nombre === user || s.email === user) && s.password === pass);
        if (found) {
            localStorage.setItem('julie_role', 'stylist');
            localStorage.setItem('julie_session', 'true');
            localStorage.setItem('julie_user_name', found.nombre);
            loginSuccess('stylist');
        } else {
            errorEl.innerText = "❌ Credenciales incorrectas";
            errorEl.classList.remove('hidden');
        }
    } catch (e) {
        errorEl.innerText = "❌ Error de conexión";
        errorEl.classList.remove('hidden');
    }
}

function loginSuccess(role) {
    if (loginSection) loginSection.classList.add('hidden');
    if (appMain) appMain.classList.remove('hidden');
    applyRoleUI(role);
    switchTab('home');
}

function applyRoleUI(role) {
    const navHistory = document.querySelector('.nav-item:nth-child(3)');
    const navTeam = document.querySelector('.nav-item:nth-child(4)');
    const btnPdf = document.querySelector('.btn-pdf');
    const changePassBtn = document.getElementById('changePassBtn');

    if (role === 'stylist') {
        if (navHistory) navHistory.style.display = 'none';
        if (navTeam) navTeam.style.display = 'none';
        if (btnPdf) btnPdf.style.display = 'none';
        if (changePassBtn) changePassBtn.style.display = 'flex';
        // En el modal de éxito, ocultar botón PDF
        document.querySelector('.btn-pdf-modal')?.classList.add('hidden');
    } else {
        if (navHistory) navHistory.style.display = 'flex';
        if (navTeam) navTeam.style.display = 'flex';
        if (btnPdf) btnPdf.style.display = 'flex';
        if (changePassBtn) changePassBtn.style.display = 'none';
        document.querySelector('.btn-pdf-modal')?.classList.remove('hidden');
    }
}

window.openChangePassModal = () => document.getElementById('changePassModal').classList.remove('hidden');
window.closeChangePassModal = () => document.getElementById('changePassModal').classList.add('hidden');

window.processChangePassword = async () => {
    const newPass = document.getElementById('newPassInput').value.trim();
    const name = localStorage.getItem('julie_user_name');
    if (!newPass || newPass.length < 5) { alert('La clave debe tener al menos 5 caracteres.'); return; }
    
    try {
        await updateStylistPassword(name, newPass);
        alert('✅ Contraseña actualizada. Úsala en tu próximo ingreso.');
        closeChangePassModal();
    } catch (e) { alert('Error al actualizar clave.'); }
};

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
    applyRoleUI(localStorage.getItem('julie_role'));
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
    } catch (e) { 
        console.error('Error renderStylists:', e); 
        listEl.innerHTML = `
            <div class="error-card" style="padding:20px; text-align:center; color:var(--error);">
                <p><strong>Error al cargar equipo</strong></p>
                <small>${e.message || 'Error de conexión o base de datos'}</small>
                <p style="font-size:0.75rem; margin-top:10px;">Asegúrate de haber actualizado la tabla en Supabase.</p>
            </div>`; 
    }
}

window.deleteStylist = async (id) => { if (confirm('¿Eliminar estilista?')) { await deleteStylistDb(id); renderStylists(); loadInitialData(); } };
window.addStylist = async () => { 
    const name = stylistInput.value.trim(); 
    const phone = document.getElementById('stylistPhoneInput').value.trim();
    const email = document.getElementById('stylistEmailInput').value.trim();
    const pass = document.getElementById('stylistPassInput').value.trim();

    if (!name || !pass) { alert('Nombre y Contraseña son obligatorios'); return; }
    try {
        await addStylistDb({ nombre: name, telefono: phone, email: email, password: pass });
        document.getElementById('stylistInput').value = '';
        document.getElementById('stylistPhoneInput').value = '';
        document.getElementById('stylistEmailInput').value = '';
        document.getElementById('stylistPassInput').value = '';
        renderStylists();
        loadInitialData();
        alert('Estilista agregada con éxito');
    } catch (e) { alert('Error al agregar'); }
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
            const lastFicha = await getLastFichaByDoc(val);
            const area = document.getElementById('clinicalBackgroundArea');
            const badge = document.getElementById('visitTypeBadge');
            const bgText = document.getElementById('backgroundText');

            if (lastFicha) {
                if (badge) { badge.innerText = 'FOLIO ADICIONAL'; badge.className = 'visit-badge recurring'; }
                if (area && bgText) {
                    area.classList.remove('hidden');
                    bgText.innerHTML = `
                        📌 <strong>ÚLTIMA VISITA:</strong> ${new Date(lastFicha.created_at).toLocaleDateString()}<br>
                        💇‍♀️ <strong>PROCEDIMIENTO:</strong> ${lastFicha.procedimiento}<br>
                        ✨ <strong>LISO:</strong> ${lastFicha.porcentaje_liso || '100%'}<br>
                        <button type="button" onclick="viewQuickHistory('${val}')" style="margin-top:10px; background:var(--gold-dark); color:white; border:none; padding:8px 12px; border-radius:8px; font-size:0.75rem; cursor:pointer; width:100%;">
                            📂 VER HISTORIAL CLÍNICO
                        </button>
                    `;
                }
                
                // Pre-llenar solo datos personales
                form.querySelector('[name="nombre_completo"]').value = lastFicha.nombre_completo || '';
                form.querySelector('[name="telefono"]').value = lastFicha.telefono || '';
                form.querySelector('[name="email"]').value = lastFicha.email || '';
                const edadInp = document.getElementById('edadInput');
                if (edadInp) {
                    edadInp.value = lastFicha.edad || '';
                    monitorMinorSettings();
                }

                // Mostrar botón de historial en el header
                const hBtn = document.getElementById('headerHistoryBtn');
                if (hBtn) hBtn.classList.remove('hidden');
            } else {
                if (badge) { badge.innerText = 'NUEVA CLIENTE'; badge.className = 'visit-badge'; }
                if (area) area.classList.add('hidden');
                
                // Si es nueva, ocultamos el botón del header por ahora (o lo dejamos si queremos que busquen de todos modos)
                const hBtn = document.getElementById('headerHistoryBtn');
                if (hBtn) hBtn.classList.add('hidden');
            }
        } catch (e) { console.error('Recurrence check error:', e); }
    });
}

window.viewQuickHistory = async (doc) => {
    try {
        const history = await fetchHistory();
        const clientFolios = history.filter(f => f.numero_documento === doc);
        let html = '<div style="max-height:400px; overflow-y:auto; padding:5px;">';
        
        if (clientFolios.length === 0) {
            html += '<p style="text-align:center; padding:20px; color:#666;">No hay folios previos.</p>';
        }

        clientFolios.forEach(f => {
            html += `
                <div style="border: 1px solid #eee; border-radius: 12px; padding:12px; margin-bottom: 10px; background: #fafafa;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
                        <strong style="color:var(--gold-dark);">Folio #${f.consecutivo}</strong>
                        <small style="font-weight: bold; color: #888;">${new Date(f.created_at).toLocaleDateString()}</small>
                    </div>
                    <p style="font-size:0.85rem; margin:5px 0;"><strong>Servicio:</strong> ${f.procedimiento}</p>
                    <button type="button" onclick="openFichaDetail('${f.consecutivo}')" style="margin-top:8px; background:var(--gold-gradient); color:white; border:none; padding:8px 12px; border-radius:8px; font-size:0.75rem; cursor:pointer; width:100%; font-weight: bold;">
                        📄 VER DETALLE COMPLETO
                    </button>
                </div>
            `;
        });
        html += '</div>';
        
        const modal = document.getElementById('quickHistoryModal');
        document.getElementById('quickHistoryBody').innerHTML = html;
        modal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    } catch (e) { console.error(e); alert('Error al cargar historial.'); }
};

window.openFichaDetail = async (consecutivo) => {
    try {
        const data = await getFichaByConsecutivo(consecutivo);
        if (!data) return alert('No se encontró la ficha.');

        const body = document.getElementById('fichaDetailBody');
        document.getElementById('detailFichaTitle').innerText = `Detalle Folio #${data.consecutivo}`;
        
        let html = `
            <div style="display: grid; gap: 15px;">
                <div style="background: #fdfaf0; padding: 12px; border-radius: 12px; border: 1px solid var(--border-gold);">
                    <h4 style="color: var(--gold-dark); margin-bottom: 5px; border-bottom: 1px solid var(--gold-light);">DATOS GENERALES</h4>
                    <p><strong>Fecha:</strong> ${data.fecha_diligenciamiento}</p>
                    <p><strong>Estilista:</strong> ${data.estilista_responsable}</p>
                    <p><strong>Sede:</strong> ${data.sede}</p>
                    <p><strong>Origen:</strong> ${data.como_nos_conociste || 'N/A'}</p>
                </div>
                
                <div style="padding: 10px;">
                    <h4 style="color: var(--gold-dark); margin-bottom: 5px;">DIAGNÓSTICO Y TÉCNICA</h4>
                    <p><strong>Patrón:</strong> ${data.tipo_cabello}</p>
                    <p><strong>Procedimiento:</strong> ${data.procedimiento}</p>
                    <p><strong>Técnica:</strong> ${data.tecnica_utilizada}</p>
                    <p><strong>Garantía:</strong> ${data.porcentaje_liso}</p>
                </div>

                <div style="padding: 10px; background: #fafafa; border-radius: 10px;">
                    <h4 style="color: var(--gold-dark); margin-bottom: 5px;">OBSERVACIONES</h4>
                    <p><strong>Técnica:</strong> ${data.observaciones_diagnostico}</p>
                    <p><strong>Capilar:</strong> ${data.observaciones_caracteristicas}</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    ${data.foto_antes_url ? `<div><p style="font-size:0.7rem; font-weight:bold; color:var(--gold-dark);">ANTES</p><img src="${data.foto_antes_url}" style="width:100%; border-radius:8px;"></div>` : ''}
                    ${data.foto_despues_url ? `<div><p style="font-size:0.7rem; font-weight:bold; color:var(--gold-dark);">DESPUÉS</p><img src="${data.foto_despues_url}" style="width:100%; border-radius:8px;"></div>` : ''}
                </div>
            </div>
        `;

        body.innerHTML = html;
        document.getElementById('btnPdfDetail').onclick = () => window.directPDF(consecutivo);
        document.getElementById('fichaDetailModal').classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    } catch (e) { console.error(e); alert('Error al cargar detalle.'); }
};


window.triggerQuickHistory = () => {
    const doc = document.getElementById('docNumberInput')?.value.trim();
    if (doc && doc.length >= 5) {
        window.viewQuickHistory(doc);
    } else {
        alert('⚠️ Por favor ingresa el documento de la cliente primero en el Paso 1.');
    }
};

// ======================== INITIAL DATA ========================
async function loadInitialData() {
    try {
        if (document.getElementById('currentDateTime')) {
            document.getElementById('currentDateTime').value = new Date().toLocaleString('es-CO');
        }
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
        const legalWarning = `📝 NOTA IMPORTANTE DE SEGURIDAD:\n\nEn Julie Alisados, tu salud y seguridad son nuestra prioridad. De acuerdo con nuestra política de privacidad, el suministro de datos sobre salud (embarazo o alergias) es totalmente opcional.\n\nSin embargo, para garantizar un procedimiento 100% seguro y resultados óptimos, te informamos que la falta de esta información o el aporte de datos incompletos podría limitar la aplicación de garantías o la aplicabilidad del servicio por tu bienestar.\n\n¿Deseas continuar con el proceso bajo estas condiciones de seguridad?`;
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

        // Reportar conversión a Google
        if (typeof gtag === 'function') {
            gtag('event', 'purchase', {
                'transaction_id': cleanData.consecutivo,
                'value': 0, // Podrías poner un valor estimado si quisieras
                'currency': 'COP',
                'items': [{ 'item_id': cleanData.procedimiento, 'item_name': 'Servicio de Alisado' }]
            });
        }
        // Reportar conversión a Meta
        if (typeof fbq === 'function') {
            fbq('track', 'Purchase', {
                value: 0,
                currency: 'COP',
                content_name: cleanData.procedimiento,
                content_ids: [cleanData.consecutivo]
            });
        }
        // Reportar conversión a TikTok
        if (typeof ttq === 'object') {
            ttq.track('CompletePayment', {
                content_name: cleanData.procedimiento,
                quantity: 1,
                price: 0,
                value: 0,
                currency: 'COP'
            });
        }

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
    loadInitialData();
    initRealtimeValidation(steps);

    // Ocultar pantalla de carga (Splash Screen)
    setTimeout(() => {
        const splash = document.getElementById('splashScreen');
        if (splash) splash.classList.add('splash-hidden');
    }, 2500);

    // Monitor menor de edad
    const edadInput = document.getElementById('edadInput');
    const docType = document.getElementById('docType');
    if (edadInput) edadInput.addEventListener('input', monitorMinorSettings);
    if (docType) docType.addEventListener('change', monitorMinorSettings);
});
