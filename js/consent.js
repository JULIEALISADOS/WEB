/**
 * Julie Alisados - Consent & Privacy Manager
 * Blindaje Legal: Ley 1581 de 2012 (SIC) y Google Consent Mode v2 (Google Ads 2024-2026)
 * Paleta Libro de Marca (claro): Blanco nieve #FFF0F5, Oro antiguo #D4AF37, Negro obsidiana #111111, Rosa suave #FFD1DC
 * Opciones: "Aceptar" (todas) o "Ajustar" (panel por categorias: necesarias fijas, analiticas, publicidad).
 * Valores guardados en julie_privacy_consent: granted | denied | analytics | ads
 */

(function () {
    const CONSENT_KEY = 'julie_privacy_consent';
    const PRIVACY_ACCEPTED_KEY = 'privacyAccepted';
    const TIMESTAMP_KEY = 'julie_consent_timestamp';

    function injectStyles() {
        if (document.getElementById('julie-consent-styles')) return;
        const style = document.createElement('style');
        style.id = 'julie-consent-styles';
        style.textContent = `
            .julie-consent-banner {
                position: fixed;
                left: 50%;
                bottom: 16px;
                width: calc(100% - 32px);
                max-width: 760px;
                background: rgba(255, 240, 245, 0.82);
                backdrop-filter: blur(16px) saturate(140%);
                -webkit-backdrop-filter: blur(16px) saturate(140%);
                color: #111111;
                padding: 16px 20px;
                z-index: 999999;
                border-radius: 18px;
                border: 1px solid rgba(212, 175, 55, 0.45);
                box-shadow: 0 10px 34px rgba(17, 17, 17, 0.14);
                box-sizing: border-box;
                font-family: var(--font-body, 'Lato', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
                transform: translate(-50%, 130%);
                opacity: 0;
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
            }
            .julie-consent-banner.is-visible { transform: translate(-50%, 0); opacity: 1; }
            .julie-consent-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 18px;
            }
            .julie-consent-text {
                flex: 1;
                font-size: 0.86rem;
                line-height: 1.5;
                color: #333333;
            }
            .julie-consent-text strong { color: #111111; }
            .julie-consent-link {
                color: #8A6D12;
                text-decoration: underline;
                font-weight: 700;
            }
            .julie-consent-link:hover, .julie-consent-link:focus-visible { color: #111111; }
            .julie-consent-actions { display: flex; gap: 10px; flex-shrink: 0; }
            .julie-consent-btn {
                border-radius: 26px;
                padding: 10px 22px;
                font-family: inherit;
                font-size: 0.88rem;
                cursor: pointer;
                transition: all 0.25s ease;
                white-space: nowrap;
            }
            .julie-consent-btn-accept {
                background: #D4AF37;
                color: #111111;
                font-weight: 700;
                border: 1px solid #D4AF37;
                box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
            }
            .julie-consent-btn-accept:hover, .julie-consent-btn-accept:focus-visible {
                background: #C9A22C;
                transform: translateY(-1px);
            }
            .julie-consent-btn-adjust {
                background: rgba(255, 255, 255, 0.6);
                color: #111111;
                font-weight: 600;
                border: 1px solid rgba(17, 17, 17, 0.25);
            }
            .julie-consent-btn-adjust:hover, .julie-consent-btn-adjust:focus-visible {
                background: #FFD1DC;
                border-color: #D4AF37;
            }
            .julie-consent-panel { display: none; margin-top: 14px; border-top: 1px solid rgba(212, 175, 55, 0.35); padding-top: 12px; }
            .julie-consent-banner.is-adjusting .julie-consent-panel { display: block; }
            .julie-consent-banner.is-adjusting .julie-consent-actions { display: none; }
            .julie-consent-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 14px;
                padding: 8px 0;
                font-size: 0.84rem;
                color: #333333;
            }
            .julie-consent-row strong { display: block; color: #111111; font-size: 0.88rem; }
            .julie-switch { position: relative; width: 44px; height: 24px; flex-shrink: 0; }
            .julie-switch input { opacity: 0; width: 0; height: 0; }
            .julie-switch span {
                position: absolute; inset: 0; cursor: pointer;
                background: rgba(17, 17, 17, 0.2); border-radius: 24px; transition: 0.2s;
            }
            .julie-switch span::before {
                content: ""; position: absolute; width: 18px; height: 18px; left: 3px; top: 3px;
                background: #FFFFFF; border-radius: 50%; transition: 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.25);
            }
            .julie-switch input:checked + span { background: #D4AF37; }
            .julie-switch input:checked + span::before { transform: translateX(20px); }
            .julie-switch input:disabled + span { opacity: 0.6; cursor: not-allowed; }
            .julie-switch input:focus-visible + span { outline: 2px solid #111111; outline-offset: 2px; }
            .julie-consent-panel-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
            @media (max-width: 640px) {
                .julie-consent-banner { bottom: 10px; width: calc(100% - 20px); padding: 14px 16px; }
                .julie-consent-container { flex-direction: column; align-items: stretch; gap: 12px; }
                .julie-consent-text { font-size: 0.82rem; }
                .julie-consent-actions, .julie-consent-panel-actions { display: grid; grid-template-columns: 1fr 1fr; }
                .julie-consent-btn { width: 100%; padding: 12px 10px; }
            }
        `;
        document.head.appendChild(style);
    }

    // choice: { analytics: bool, ads: bool }
    function applyConsent(choice) {
        const ad = choice.ads ? 'granted' : 'denied';
        const an = choice.analytics ? 'granted' : 'denied';
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': ad,
                'ad_user_data': ad,
                'ad_personalization': ad,
                'analytics_storage': an
            });
        }
        if (typeof window.fbq === 'function') { try { window.fbq('consent', choice.ads ? 'grant' : 'revoke'); } catch (e) {} }
        if (window.ttq) {
            try {
                if (choice.ads && typeof window.ttq.grantConsent === 'function') {
                    window.ttq.grantConsent();
                } else if (!choice.ads && typeof window.ttq.revokeConsent === 'function') {
                    window.ttq.revokeConsent();
                }
            } catch (e) {}
        }
    }

    function choiceToValue(choice) {
        if (choice.analytics && choice.ads) return 'granted';
        if (choice.analytics) return 'analytics';
        if (choice.ads) return 'ads';
        return 'denied';
    }

    function valueToChoice(value) {
        return {
            analytics: value === 'granted' || value === 'analytics',
            ads: value === 'granted' || value === 'ads'
        };
    }

    function removeBanner(banner) {
        if (!banner) return;
        banner.classList.remove('is-visible');
        setTimeout(() => { banner.remove(); }, 400);
    }

    const SUPABASE_URL = 'https://hzvwruiybynkifqsekkp.supabase.co';
    const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dndydWl5Ynlua2lmcXNla2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NTE3MDgsImV4cCI6MjA5MDEyNzcwOH0.MmpGISOawK0LLg4roJMzHgdDkRZ6XwRxO3InbOHFYXw';

    function logConsentToCloud(value) {
        const proofId = 'proof_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        try { localStorage.setItem('julie_consent_proof_id', proofId); } catch (e) {}

        const tipos = {
            granted: 'ACEPTAR_TODAS',
            analytics: 'AJUSTE_SOLO_ANALITICAS',
            ads: 'AJUSTE_SOLO_PUBLICIDAD',
            denied: 'SOLO_NECESARIAS'
        };
        const payload = {
            pc_origen: 'WEB_CLIENT',
            categoria: 'TECH',
            accion: 'CONSENTIMIENTO_COOKIES_' + tipos[value],
            resultado: 'EXITO',
            detalles: {
                proof_id: proofId,
                decision: value,
                tipo_consentimiento: tipos[value],
                politica_version: 'Politica_Privacidad_y_Cookies_v3_2026-10-05',
                timestamp_colombia: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
                timestamp_iso: new Date().toISOString(),
                user_agent: (navigator && navigator.userAgent) ? navigator.userAgent : 'Desconocido',
                idioma: (navigator && navigator.language) ? navigator.language : 'es-CO',
                pantalla: (window.screen ? window.screen.width + 'x' + window.screen.height : 'N/A'),
                origen: window.location.href || 'https://juliealisados.com/'
            }
        };

        try {
            fetch(SUPABASE_URL + '/rest/v1/cerebro_bitacora', {
                method: 'POST',
                headers: {
                    'apikey': ANON_KEY,
                    'Authorization': 'Bearer ' + ANON_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(function () {});
        } catch (err) {}
    }

    function saveChoice(choice, banner) {
        const value = choiceToValue(choice);
        try {
            localStorage.setItem(CONSENT_KEY, value);
            localStorage.setItem(PRIVACY_ACCEPTED_KEY, value === 'granted' ? 'true' : 'false');
            localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
            logConsentToCloud(value);
        } catch (e) {
            console.warn('Error al almacenar consentimiento:', e);
        }
        applyConsent(choice);
        removeBanner(banner);
    }

    function showConsentBanner(openAdjust) {
        if (document.getElementById('julie-consent-banner')) return;

        injectStyles();

        let previous = { analytics: false, ads: false };
        try {
            const saved = localStorage.getItem(CONSENT_KEY);
            if (saved) previous = valueToChoice(saved);
        } catch (e) {}

        const banner = document.createElement('section');
        banner.id = 'julie-consent-banner';
        banner.className = 'julie-consent-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Consentimiento de cookies y protección de datos');

        banner.innerHTML = `
            <div class="julie-consent-container">
                <div class="julie-consent-text">
                    \u{1F338} En <strong>Julie Alisados</strong> cuidamos tu cabello y también tu privacidad.
                    Usamos cookies para que la web funcione bien, saber qué te gusta y mostrarte promociones que de verdad te interesen.
                    Puedes aceptarlas o ajustar cuáles permites. Tus datos se tratan con respeto y conforme a la Ley 1581 de 2012.
                    Lee nuestra <a href="politica-cookies.html" target="_blank" rel="noopener noreferrer" class="julie-consent-link">Política de Cookies</a>
                    y nuestra <a href="politica-datos.html" target="_blank" rel="noopener noreferrer" class="julie-consent-link">Política de Datos</a>.
                </div>
                <div class="julie-consent-actions">
                    <button type="button" id="btn-consent-adjust" class="julie-consent-btn julie-consent-btn-adjust" aria-expanded="false" aria-controls="julie-consent-panel">Ajustar</button>
                    <button type="button" id="btn-consent-accept" class="julie-consent-btn julie-consent-btn-accept">Aceptar</button>
                </div>
            </div>
            <div class="julie-consent-panel" id="julie-consent-panel">
                <div class="julie-consent-row">
                    <div><strong>Necesarias</strong>Para que la web funcione. Siempre activas.</div>
                    <label class="julie-switch"><input type="checkbox" checked disabled aria-label="Cookies necesarias, siempre activas"><span></span></label>
                </div>
                <div class="julie-consent-row">
                    <div><strong>Analíticas</strong>Nos dicen qué páginas se visitan para mejorar la web.</div>
                    <label class="julie-switch"><input type="checkbox" id="julie-consent-analytics" aria-label="Cookies analíticas"><span></span></label>
                </div>
                <div class="julie-consent-row">
                    <div><strong>Publicidad</strong>Para mostrarte promociones en Facebook, Instagram, TikTok y Google.</div>
                    <label class="julie-switch"><input type="checkbox" id="julie-consent-ads" aria-label="Cookies de publicidad"><span></span></label>
                </div>
                <div class="julie-consent-panel-actions">
                    <button type="button" id="btn-consent-save" class="julie-consent-btn julie-consent-btn-adjust">Guardar</button>
                    <button type="button" id="btn-consent-accept-all" class="julie-consent-btn julie-consent-btn-accept">Aceptar todas</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        const chkAnalytics = document.getElementById('julie-consent-analytics');
        const chkAds = document.getElementById('julie-consent-ads');
        chkAnalytics.checked = previous.analytics;
        chkAds.checked = previous.ads;

        const btnAdjust = document.getElementById('btn-consent-adjust');
        function openPanel() {
            banner.classList.add('is-adjusting');
            btnAdjust.setAttribute('aria-expanded', 'true');
            chkAnalytics.focus();
        }
        btnAdjust.addEventListener('click', openPanel);
        if (openAdjust) openPanel();

        const all = { analytics: true, ads: true };
        document.getElementById('btn-consent-accept').addEventListener('click', () => saveChoice(all, banner));
        document.getElementById('btn-consent-accept-all').addEventListener('click', () => saveChoice(all, banner));
        document.getElementById('btn-consent-save').addEventListener('click', () => {
            saveChoice({ analytics: chkAnalytics.checked, ads: chkAds.checked }, banner);
        });

        requestAnimationFrame(() => {
            setTimeout(() => { banner.classList.add('is-visible'); }, 50);
        });
    }

    // Funcion publica global para reabrir el panel desde enlaces del footer o politicas
    window.openJulieConsentBanner = function () {
        showConsentBanner(true);
    };

    function init() {
        try {
            const consent = localStorage.getItem(CONSENT_KEY);
            if (!consent) {
                showConsentBanner(false);
            } else {
                applyConsent(valueToChoice(consent));
            }
        } catch (e) {
            showConsentBanner(false);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
