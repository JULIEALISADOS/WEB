import { fetchNextID, fetchStylists, fetchHistory, getFichaByConsecutivo, deleteFichaDb, deleteStylistDb, addStylistDb, insertFicha, uploadImg, getLastFichaByDoc, updateStylistPassword } from './db.js';
import { initSignatures, clearSignature, getSignaturePads, loadSignaturesFromData, toggleSignatures, destroyPads } from './signature.js';
import { generatePDF } from './pdf.js';
import { setSede, setHairType, setChip, previewImage, validateStep, monitorMinorSettings, lockForm, initRealtimeValidation } from './ui.js';
import { initJuliePixel, getMarketingContext } from './pixel-propio.js';

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
const totalSteps = 6;
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
        if (document.getElementById('rememberMe')?.checked) {
            localStorage.setItem('julie_remember_user', user);
            localStorage.setItem('julie_remember_pass', pass);
        } else {
            localStorage.removeItem('julie_remember_user');
            localStorage.removeItem('julie_remember_pass');
        }
        localStorage.setItem('julie_role', 'admin');
        localStorage.setItem('julie_session', 'true');
        sessionStorage.setItem('julie_admin_auth', 'true'); // Sincronización para admin.html
        loginSuccess('admin');
    } else {
        checkStylistLogin(user, pass);
    }
}

window.togglePass = () => {
    const p = document.getElementById('loginPass');
    const i = document.getElementById('passIcon');
    if (p.type === 'password') {
        p.type = 'text';
        i.setAttribute('data-lucide', 'eye-off');
    } else {
        p.type = 'password';
        i.setAttribute('data-lucide', 'eye');
    }
    if (window.lucide) window.lucide.createIcons();
};

async function checkStylistLogin(user, pass) {
    const errorEl = document.getElementById('loginError');
    try {
        const stylists = await fetchStylists();
        const found = stylists.find(s => (s.nombre === user || s.email === user) && s.password === pass);
        if (found) {
            if (document.getElementById('rememberMe')?.checked) {
                localStorage.setItem('julie_remember_user', user);
                localStorage.setItem('julie_remember_pass', pass);
            } else {
                localStorage.removeItem('julie_remember_user');
                localStorage.removeItem('julie_remember_pass');
            }
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
        if (btnPdf) btnPdf.style.display = 'none'; // Revertido: Solo admin ve PDF
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

    // Auto-relleno de credenciales guardadas
    const savedUser = localStorage.getItem('julie_remember_user');
    const savedPass = localStorage.getItem('julie_remember_pass');
    if (savedUser && savedPass) {
        const u = document.getElementById('loginEmail');
        const p = document.getElementById('loginPass');
        const r = document.getElementById('rememberMe');
        if (u) u.value = savedUser;
        if (p) p.value = savedPass;
        if (r) r.checked = true;
    }

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

    if (currentStep === 6) {
        // Marketing: AddPaymentInfo en TikTok al llegar a firmas
        if (typeof ttq === 'object') {
            ttq.track('AddPaymentInfo', {
                contents: [{
                    content_id: 'diagnostico_final',
                    content_name: 'Consentimiento y Firmas',
                    content_type: 'product'
                }]
            });
        }
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
        // Marketing: ViewContent y AddToCart en TikTok al iniciar nueva ficha
        if (typeof ttq === 'object') {
            ttq.track('ViewContent', {
                contents: [{
                    content_id: 'nuevo_folio',
                    content_name: 'Nueva Ficha Técnica',
                    content_type: 'product'
                }]
            });
            ttq.track('AddToCart', {
                contents: [{
                    content_id: 'nuevo_folio',
                    content_name: 'Nueva Ficha Técnica',
                    content_type: 'product'
                }],
                value: 0,
                currency: 'COP'
            });
        }

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

window.jumpToStep = (step) => {
    if (step > currentStep) {
        if (!validateStep(currentStep, steps)) return;
    }
    currentStep = step;
    updateStep('jump');

    // Marketing: InitiateCheckout en TikTok al avanzar al paso 2
    if (step === 2 && typeof ttq === 'object') {
        ttq.track('InitiateCheckout', {
            contents: [{
                content_id: 'diagnostico_paso2',
                content_name: 'Inicio de Diagnóstico',
                content_type: 'product'
            }]
        });
    }
};

if (searchInput) searchInput.addEventListener('input', (e) => renderHistory(e.target.value.trim()));
if (stylistSearchInput) stylistSearchInput.addEventListener('input', (e) => renderStylists(e.target.value.trim()));

// ======================== HISTORY ========================
async function renderHistory(filter = '') {
    const listEl = document.getElementById('historyList');
    if (!listEl) return;
    listEl.innerHTML = '<div class="loading-spinner">Cargando folios...</div>';
    try {
        const history = await fetchHistory();
        if (!history || history.length === 0) { 
            listEl.innerHTML = '<div class="empty-msg" style="text-align:center; padding:40px; color:#888;"><i data-lucide="database-backup" style="width:40px; height:40px; margin-bottom:10px;"></i><p>No hay fichas registradas en la base de datos.</p></div>'; 
            if (window.lucide) window.lucide.createIcons();
            return; 
        }
        
        const filterNorm = filter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const filtered = history.filter(item => {
            const nom = (item.nombre_completo || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const doc = String(item.numero_documento || '');
            const fol = String(item.consecutivo || '');
            return nom.includes(filterNorm) || doc.includes(filterNorm) || fol.includes(filterNorm);
        });

        listEl.innerHTML = '';
        if (filtered.length === 0) {
            listEl.innerHTML = '<p class="empty-msg" style="text-align:center; padding:20px;">No se encontraron resultados para su búsqueda.</p>';
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.style = 'background: white; padding: 16px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; border-left: 5px solid var(--gold-primary); margin-bottom: 10px;';
            const fecha = item.created_at ? new Date(item.created_at).toLocaleDateString('es-CO') : 'Sin fecha';
            
            card.innerHTML = `
                <div style="flex: 1;">
                    <h4 style="margin:0; color: var(--gold-dark); font-size: 1rem;">${item.nombre_completo}</h4>
                    <p style="margin:3px 0; font-size:0.8rem; color:#666;">Folio: <strong>#${item.consecutivo}</strong> | Doc: ${item.numero_documento}</p>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        <span style="font-size:0.7rem; background:#f0f0f0; padding:2px 8px; border-radius:10px;">${fecha}</span>
                        <span style="font-size:0.7rem; background:rgba(212,175,55,0.1); color:var(--gold-dark); padding:2px 8px; border-radius:10px;">${item.sede || 'Sede Julie'}</span>
                    </div>
                </div>
                <div style="display:flex; gap:8px;">
                    <button onclick="viewFicha('${item.consecutivo}')" class="btn-view" style="background:#f8f9fa; border:1px solid #ddd; padding:8px 12px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button onclick="directPDF('${item.consecutivo}')" class="btn-pdf-list" style="background:var(--gold-gradient); color:white; border:none; padding:8px 12px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                    </button>
                </div>`;
            listEl.appendChild(card);
        });
        window.lucide?.createIcons();
    } catch (e) { 
        console.error('Error renderHistory:', e); 
        listEl.innerHTML = '<div class="error-card" style="padding:20px; color:red; text-align:center;">Error al conectar con Supabase. Verifica tu internet.</div>'; 
    }
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
                setChip('tipo_cliente', 'Recurrente');
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
                setChip('tipo_cliente', 'Nueva');
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
window.handleAdminClick = () => {
    if (!window.adminClicks) window.adminClicks = 0;
    window.adminClicks++;
    clearTimeout(window.adminTimer);
    window.adminTimer = setTimeout(() => { window.adminClicks = 0; }, 3000);

    if (window.adminClicks >= 5) {
        window.adminClicks = 0;
        document.getElementById('adminLoginModal').classList.remove('hidden');
        document.getElementById('adminPassInput').focus();
    }
};

window.verifyAdminAccess = () => {
    const pass = document.getElementById('adminPassInput').value;
    // CLAVE MAESTRA TEMPORAL: JulieAdmin2024
    if (pass === 'JulieAdmin2024') {
        sessionStorage.setItem('julie_admin_auth', 'true');
        location.href = 'admin.html?v=' + new Date().getTime();
    } else {
        alert('❌ Clave de Seguridad Incorrecta. Acceso denegado.');
        document.getElementById('adminPassInput').value = '';
        document.getElementById('adminLoginModal').classList.add('hidden');
    }
};

window.openScheduling = () => {
    // Marketing: Schedule en TikTok
    if (typeof ttq === 'object') {
        ttq.track('Schedule', {
            contents: [{
                content_id: 'agendar_cita',
                content_name: 'Agendar Cita WhatsApp',
                content_type: 'product'
            }]
        });
    }
    // Abrir WhatsApp oficial para agendar
    window.open('https://wa.me/573043588180?text=Hola,%20quisiera%20agendar%20una%20cita%20para%20un%20servicio%20en%20Julie%20Alisados', '_blank');
};

window.goBack = function () {
    if (homeSection && !homeSection.classList.contains('hidden')) {
        if (confirm('¿Salir?')) window.location.reload();
    } else {
        switchTab('home');
    }
};

// ======================== SAVE HANDLER ========================
if (saveBtn) saveBtn.addEventListener('click', async () => {
    if (!validateStep(6, steps)) return;

    const { padClient, padTech, padTutor } = getSignaturePads();
    if (!padClient || padClient.isEmpty() || !padTech || padTech.isEmpty()) {
        alert('⚠️ Firmas obligatorias. Debes firmar como CLIENTE y como TÉCNICO.');
        return;
    }

    // Validación firma tutor para menores
    const isMinor = parseInt(document.getElementById('edadInput')?.value) < 18;
    if (isMinor && (!padTutor || padTutor.isEmpty())) {
        alert('⚠️ Firma del TUTOR obligatoria para menores de edad.');
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
        
        // --- INTEGRACIÓN CRM & MARKETING ---
        const marketing = getMarketingContext();
        cleanData.utm_source = marketing.utm_source;
        cleanData.utm_medium = marketing.utm_medium;
        cleanData.utm_campaign = marketing.utm_campaign;
        cleanData.ubicacion_gps = marketing.ubicacion; // Ubicación capturada por IP
        // El genero ya viene en cleanData por el input hidden
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
        if (isMinor && padTutor) {
            cleanData.firma_tutor_legal = padTutor.toDataURL();
            cleanData.nombre_tutor = document.getElementById('tutorNameInput')?.value || '---';
        }

        // --- ENCRIPTACIÓN DE PRIVACIDAD (HASHING SHA-256) ---
        const hashData = async (str) => {
            if (!str) return null;
            const msgBuffer = new TextEncoder().encode(str.trim().toLowerCase());
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        };

        const hashedEmail = await hashData(cleanData.email);
        const hashedPhone = await hashData(cleanData.telefono);

        await insertFicha(cleanData);

        // Reportar conversión a Google (Enhanced Conversions)
        if (typeof gtag === 'function') {
            gtag('event', 'purchase', {
                'transaction_id': cleanData.consecutivo,
                'value': 0,
                'currency': 'COP',
                'user_data': {
                    'sha256_email_address': hashedEmail,
                    'sha256_phone_number': hashedPhone
                },
                'items': [{ 'item_id': cleanData.procedimiento, 'item_name': 'Servicio de Alisado' }]
            });
        }
        
        // Reportar conversión a Meta (Advanced Matching)
        if (typeof fbq === 'function') {
            fbq('track', 'Purchase', {
                value: 0,
                currency: 'COP',
                content_name: cleanData.procedimiento,
                content_ids: [cleanData.consecutivo]
            }, {
                em: hashedEmail,
                ph: hashedPhone
            });
        }
        
        // Reportar conversión a TikTok (Identify + Track con ID de Contenido)
        if (typeof ttq === 'object') {
            ttq.identify({
                email: hashedEmail,
                phone_number: hashedPhone
            });
            ttq.track('CompletePayment', {
                contents: [{
                    content_id: cleanData.consecutivo,
                    content_name: cleanData.procedimiento,
                    content_type: 'product',
                    quantity: 1,
                    price: 0
                }],
                value: 0,
                currency: 'COP'
            });
        }

        // --- LÓGICA DE ENVÍO A WHATSAPP ---
        const btnWA = document.getElementById('btnSendWhatsApp');
        if (btnWA) {
            btnWA.onclick = () => {
                const nombre = cleanData.nombre_completo.split(' ')[0];
                const folio = cleanData.consecutivo;
                const tel = cleanData.telefono.startsWith('57') ? cleanData.telefono : '57' + cleanData.telefono;
                
                let reco = "";
                if (cleanData.porosidad === 'Alta') reco += "• Mascarilla Oro Líquido o R.C.P Profesional\n";
                if (cleanData.elasticidad === 'Baja') reco += "• Reposición de Aminoácidos y Ampolla S.O.S\n";
                if (cleanData.piel_cabelluda === 'Seca' || cleanData.piel_cabelluda === 'Grasa') reco += "• Shampoo Extractos Naturales (12 Extractos)\n";
                
                if (!reco) reco = "• Línea de Argán (Shampoo + Acondicionador)\n• Termoprotector con Perfume Capilar\n";
                reco += "• Aceite Reparador de Argán (para sellar puntas)";

                const message = `Hola *${nombre}*, ¡gracias por elegir Julie Alisados! ✨%0A%0ASegún tu diagnóstico capilar de hoy (Folio *#${folio}*), te recomendamos los siguientes productos originales para mantener tu liso impecable y sano:%0A%0A${reco.replace(/\n/g, '%0A')}%0A%0APuedes pedirlos con *envío nacional* aquí: https://wa.me/573043588180%0A%0A¡Fue un gusto atenderte! 💖`;
                
                window.open(`https://wa.me/${tel}?text=${message}`, '_blank');
            };
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
    initJuliePixel(); // Activar rastreo de ventas

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
