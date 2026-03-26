
// Configuración de Google API
const CONFIG = {
    CLIENT_ID: '172186546228-3ud7v5s4u6hq9dh8gkckm8fm3230104t.apps.googleusercontent.com',
    API_KEY: 'AIzaSyCJ_FCdnf7elw4PBiXpPZKbR6TEIJdRQb4',
    DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    SCOPES: 'https://www.googleapis.com/auth/calendar.readonly'
};

// Configuración inicial y Estado de la App
const state = {
    user: null,
    sede: 'tunja',
    view: 'dia', // dia, mes, anio
    date: new Date().toISOString().split('T')[0],
    services: JSON.parse(localStorage.getItem('julie_services')) || [
        { name: 'Alisado Saludable', price: 200000, payToStylist: 80000 },
        { name: 'Keratina', price: 180000, payToStylist: 70000 },
        { name: 'Hidratación', price: 80000, payToStylist: 25000 },
        { name: 'Corte', price: 50000, payToStylist: 25000 }
    ],
    lastSync: null
};

// Elementos del DOM
const screens = {
    login: document.getElementById('login-screen'),
    main: document.getElementById('main-screen')
};

const tabs = {
    resumen: document.getElementById('tab-resumen'),
    servicios: document.getElementById('tab-servicios')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    loadGoogleGapi();
});

function loadGoogleGapi() {
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => gapi.load('client', initializeGapiClient);
    document.body.appendChild(script);

    const scriptGsi = document.createElement('script');
    scriptGsi.src = "https://accounts.google.com/gsi/client";
    scriptGsi.onload = initializeTokenClient;
    document.body.appendChild(scriptGsi);
}

let tokenClient;
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: CONFIG.API_KEY,
        discoveryDocs: [CONFIG.DISCOVERY_DOC],
    });
}

function initializeTokenClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CONFIG.CLIENT_ID,
        scope: CONFIG.SCOPES,
        callback: async (resp) => {
            if (resp.error !== undefined) throw (resp);
            screens.login.classList.add('hidden');
            screens.main.classList.remove('hidden');
            state.user = { name: 'Julie Admin' };
            renderResumen();
        },
    });
}

function handleAuthClick() {
    tokenClient.requestAccessToken({ prompt: 'consent' });
}

function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        screens.main.classList.add('hidden');
        screens.login.classList.remove('hidden');
    }
}

function initApp() {
    // Escuchar el selector de fecha
    const datePicker = document.getElementById('date-picker');
    datePicker.value = state.date;

    renderServices();
    renderResumen();
}

function setupEventListeners() {
    // Verificación de Contraseña Segura
    document.getElementById('btn-verify').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;
        if (email === 'admin@juliealisados.com' && pass === 'julie2024') {
            document.getElementById('password-login').classList.add('hidden');
            document.getElementById('btn-login').classList.remove('hidden');
            document.getElementById('loginError').classList.add('hidden');
        } else {
            document.getElementById('loginError').classList.remove('hidden');
        }
    });

    document.getElementById('btn-login').addEventListener('click', handleAuthClick);
    document.getElementById('btn-logout').addEventListener('click', handleSignoutClick);

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.dataset.tab;
            Object.keys(tabs).forEach(key => {
                tabs[key].classList.toggle('hidden', key !== target);
            });
        });
    });

    // Cambiar Fecha
    document.getElementById('date-picker').addEventListener('change', (e) => {
        state.date = e.target.value;
        renderResumen();
    });

    // Cambiar Sede
    document.getElementById('sede-selector').addEventListener('change', (e) => {
        state.sede = e.target.value;
        renderResumen();
    });

    // Cambiar Vista (Día/Mes/Año)
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.view = btn.dataset.view;
            updateDatePickerFormat();
            renderResumen();
        });
    });

    // Modal de Servicios
    document.getElementById('btn-add-service').addEventListener('click', () => {
        document.getElementById('modal-service').classList.remove('hidden');
    });

    document.getElementById('btn-cancel-service').addEventListener('click', () => {
        document.getElementById('modal-service').classList.add('hidden');
    });

    document.getElementById('btn-save-service').addEventListener('click', () => {
        const name = document.getElementById('service-name').value;
        const price = parseInt(document.getElementById('service-price').value);
        const payToStylist = parseInt(document.getElementById('service-pay').value);

        if (name && price && payToStylist) {
            state.services.push({ name, price, payToStylist });
            saveServices();
            renderServices();
            document.getElementById('modal-service').classList.add('hidden');
            // Limpiar inputs
            document.getElementById('service-name').value = '';
            document.getElementById('service-price').value = '';
            document.getElementById('service-pay').value = '';
        } else {
            alert('Por favor completa todos los campos');
        }
    });
}

function updateDatePickerFormat() {
    const picker = document.getElementById('date-picker');
    if (state.view === 'dia') picker.type = 'date';
    if (state.view === 'mes') picker.type = 'month';
    if (state.view === 'anio') {
        // Para año, mantendremos date pero solo usaremos el año en la lógica
        picker.type = 'number';
        picker.value = new Date().getFullYear();
        picker.min = 2024;
        picker.max = 2030;
    }
}

function saveServices() {
    localStorage.setItem('julie_services', JSON.stringify(state.services));
}

function deleteService(index) {
    if (confirm('¿Eliminar este servicio?')) {
        state.services.splice(index, 1);
        saveServices();
        renderServices();
    }
}

// Lógica de Renderizado
function renderServices() {
    const list = document.getElementById('services-list');
    list.innerHTML = state.services.map((s, index) => `
        <div class="service-item stat-card" style="margin-bottom: 15px; flex-direction: row; justify-content: space-between; align-items: center; border-left: 5px solid var(--gold);">
            <div>
                <div style="font-weight: 600; font-size: 1.1rem;">${s.name}</div>
                <div style="font-size: 0.9rem; color: var(--grey);">Venta: $${s.price.toLocaleString()} | Pago Estilista: $${s.payToStylist.toLocaleString()}</div>
            </div>
            <button class="btn-text" style="color: #ff4444; font-weight: 600;" onclick="window.deleteService(${index})">Eliminar</button>
        </div>
    `).join('');
}

// Hacer deleteService global para el onclick
window.deleteService = deleteService;


async function renderResumen() {
    const list = document.getElementById('estilistas-list');
    list.innerHTML = '<p class="loading">Sincronizando con Google Calendar...</p>';

    try {
        const calendars = await gapi.client.calendar.calendarList.list();
        // Buscamos el calendario que coincida con la sede (ej. "Tunja")
        const cal = calendars.result.items.find(c => c.summary.toLowerCase().includes(state.sede));

        if (!cal) {
            list.innerHTML = `<p class="error">No encontré un calendario llamado "${state.sede.toUpperCase()}". Por favor créalo en Google Calendar.</p>`;
            return;
        }

        // Definir rango de tiempo según la vista
        let timeMin = new Date(state.date);
        timeMin.setHours(0, 0, 0, 0);
        let timeMax = new Date(state.date);

        if (state.view === 'dia') {
            timeMax.setDate(timeMax.getDate() + 1);
        } else if (state.view === 'mes') {
            timeMin = new Date(timeMin.getFullYear(), timeMin.getMonth(), 1);
            timeMax = new Date(timeMin.getFullYear(), timeMin.getMonth() + 1, 0, 23, 59, 59);
        }

        const response = await gapi.client.calendar.events.list({
            'calendarId': cal.id,
            'timeMin': timeMin.toISOString(),
            'timeMax': timeMax.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime',
        });

        const events = response.result.items;
        if (!events || events.length === 0) {
            list.innerHTML = '<p class="empty-state">No hay procedimientos registrados para esta fecha.</p>';
            updateTotals(0, 0);
            return;
        }

        let totalVenta = 0;
        let totalPagar = 0;
        const processedRows = events.map(event => {
            // Intentar detectar procedimiento y estilista del título
            // Formato esperado: "Alisado Saludable - Diana"
            const parts = event.summary.split('-').map(p => p.trim());
            const serviceName = parts[0];
            const stylistName = parts[1] || 'Sin asignar';

            const service = state.services.find(s => s.name.toLowerCase() === serviceName.toLowerCase());
            const price = service ? service.price : 0;
            const pay = service ? service.payToStylist : 0;

            totalVenta += price;
            totalPagar += pay;

            return `
                <div class="estilista-row">
                    <div>
                        <div class="estilista-name">${stylistName}</div>
                        <div style="font-size: 0.75rem; color: var(--grey);">${serviceName} ($${price.toLocaleString()})</div>
                    </div>
                    <div class="estilista-pay">$${pay.toLocaleString()}</div>
                </div>
            `;
        });

        list.innerHTML = processedRows.join('');
        updateTotals(totalVenta, totalVenta - totalPagar);

    } catch (err) {
        console.error(err);
        list.innerHTML = '<p class="error">Error al conectar con Google. Asegúrate de estar conectada.</p>';
    }
}

function updateTotals(total, salon) {
    document.getElementById('total-dia').innerText = `$${total.toLocaleString()}`;
    document.getElementById('total-salon').innerText = `$${salon.toLocaleString()}`;
}
