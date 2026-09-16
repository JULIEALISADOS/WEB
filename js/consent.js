/**
 * Julie Alisados - Consent & Privacy Manager
 * Blindaje Legal: Ley 1581 de 2012 (SIC) y Google Consent Mode v2 (Google Ads 2024-2026)
 * Paleta de Diseno: Obsidian & Gold (#1A1A1A, #D4AF37, #F2D06B)
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
                bottom: 0;
                left: 0;
                width: 100%;
                background: linear-gradient(180deg, rgba(26, 26, 26, 0.98) 0%, rgba(18, 16, 16, 0.99) 100%);
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                color: #FDF9F7;
                padding: 16px 24px;
                z-index: 99990;
                box-shadow: 0 -8px 35px rgba(0, 0, 0, 0.65), 0 0 1px rgba(212, 175, 55, 0.35);
                border-top: 1.5px solid rgba(212, 175, 55, 0.55);
                box-sizing: border-box;
                font-family: var(--font-body, 'Lato', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
                transform: translateY(100%);
                opacity: 0;
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
            }
            .julie-consent-banner.is-visible {
                transform: translateY(0);
                opacity: 1;
            }
            .julie-consent-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 24px;
            }
            .julie-consent-content {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                flex: 1;
                font-size: 0.86rem;
                line-height: 1.55;
                color: #E6DFDC;
            }
            .julie-consent-icon {
                font-size: 1.2rem;
                flex-shrink: 0;
                margin-top: 2px;
            }
            .julie-consent-text strong {
                color: #FFFFFF;
                font-weight: 700;
            }
            .julie-consent-link {
                color: #F2D06B;
                text-decoration: underline;
                font-weight: 600;
                transition: color 0.2s ease, text-decoration-color 0.2s ease;
            }
            .julie-consent-link:hover,
            .julie-consent-link:focus-visible {
                color: #FFE699;
                text-decoration-color: #FFE699;
            }
            .julie-consent-actions {
                display: flex;
                align-items: center;
                gap: 12px;
                flex-shrink: 0;
            }
            .julie-consent-btn {
                border-radius: 26px;
                padding: 10px 22px;
                font-family: inherit;
                font-size: 0.86rem;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                white-space: nowrap;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                outline: none;
            }
            .julie-consent-btn-accept {
                background: linear-gradient(135deg, #D4AF37 0%, #A68612 100%);
                color: #1A1A1A;
                font-weight: 700;
                border: 1px solid rgba(255, 230, 153, 0.5);
                box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35);
            }
            .julie-consent-btn-accept:hover,
            .julie-consent-btn-accept:focus-visible {
                background: linear-gradient(135deg, #E5C358 0%, #CFA528 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 22px rgba(212, 175, 55, 0.55);
            }
            .julie-consent-btn-reject {
                background: transparent;
                color: #F2D06B;
                font-weight: 600;
                border: 1.5px solid rgba(212, 175, 55, 0.55);
            }
            .julie-consent-btn-reject:hover,
            .julie-consent-btn-reject:focus-visible {
                background: rgba(212, 175, 55, 0.12);
                border-color: #D4AF37;
                color: #FFFFFF;
                transform: translateY(-2px);
            }
            @media (max-width: 900px) {
                .julie-consent-container {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 16px;
                }
                .julie-consent-actions {
                    justify-content: flex-end;
                    width: 100%;
                }
            }
            @media (max-width: 540px) {
                .julie-consent-banner {
                    padding: 16px 18px 20px 18px;
                }
                .julie-consent-content {
                    font-size: 0.82rem;
                    line-height: 1.5;
                }
                .julie-consent-actions {
                    flex-direction: column-reverse;
                    gap: 10px;
                }
                .julie-consent-btn {
                    width: 100%;
                    padding: 12px 18px;
                    font-size: 0.88rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function applyGtagConsent(status) {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': status,
                'ad_user_data': status,
                'ad_personalization': status,
                'analytics_storage': status
            });
        }
        // Sincronizacion preventiva con TikTok Pixel
        if (window.ttq) {
            try {
                if (status === 'granted' && typeof window.ttq.grantConsent === 'function') {
                    window.ttq.grantConsent();
                } else if (status === 'denied' && typeof window.ttq.revokeConsent === 'function') {
                    window.ttq.revokeConsent();
                }
            } catch (e) {
                // Silencioso
            }
        }
    }

    function removeBanner(banner) {
        if (!banner) return;
        banner.classList.remove('is-visible');
        setTimeout(() => {
            banner.remove();
        }, 400);
    }

    function showConsentBanner() {
        const existing = document.getElementById('julie-consent-banner');
        if (existing) return;

        injectStyles();

        const banner = document.createElement('section');
        banner.id = 'julie-consent-banner';
        banner.className = 'julie-consent-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Consentimiento de cookies y protecci\u00F3n de datos');

        banner.innerHTML = `
            <div class="julie-consent-container">
                <div class="julie-consent-content">
                    <span class="julie-consent-icon" aria-hidden="true">&#128274;</span>
                    <div class="julie-consent-text">
                        En <strong>Julie Alisados</strong> respetamos tu privacidad y protegemos tus datos (Ley 1581 de 2012 y SIC). Empleamos cookies t\u00E9cnicas esenciales para el funcionamiento seguro del sitio, y cookies anal\u00EDticas y publicitarias para optimizar tu navegaci\u00F3n y personalizar ofertas. Puedes aceptar todas las cookies o continuar solo con las necesarias. Consulta nuestra 
                        <a href="politica-datos.html" target="_blank" rel="noopener noreferrer" class="julie-consent-link">Pol\u00EDtica de Datos</a> y nuestra 
                        <a href="politica-cookies.html" target="_blank" rel="noopener noreferrer" class="julie-consent-link">Pol\u00EDtica de Cookies</a>.
                    </div>
                </div>
                <div class="julie-consent-actions">
                    <button type="button" id="btn-consent-reject" class="julie-consent-btn julie-consent-btn-reject" aria-label="Rechazar cookies no esenciales">
                        Solo Necesarias
                    </button>
                    <button type="button" id="btn-consent-accept" class="julie-consent-btn julie-consent-btn-accept" aria-label="Aceptar todas las cookies">
                        Aceptar Todas
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        requestAnimationFrame(() => {
            setTimeout(() => {
                banner.classList.add('is-visible');
            }, 50);
        });

        const btnAccept = document.getElementById('btn-consent-accept');
        const btnReject = document.getElementById('btn-consent-reject');

        if (btnAccept) {
            btnAccept.addEventListener('click', () => {
                try {
                    localStorage.setItem(CONSENT_KEY, 'granted');
                    localStorage.setItem(PRIVACY_ACCEPTED_KEY, 'true');
                    localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
                } catch (e) {
                    console.warn('Error al almacenar consentimiento:', e);
                }
                applyGtagConsent('granted');
                removeBanner(banner);
            });
        }

        if (btnReject) {
            btnReject.addEventListener('click', () => {
                try {
                    localStorage.setItem(CONSENT_KEY, 'denied');
                    localStorage.setItem(PRIVACY_ACCEPTED_KEY, 'false');
                    localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
                } catch (e) {
                    console.warn('Error al almacenar consentimiento:', e);
                }
                applyGtagConsent('denied');
                removeBanner(banner);
            });
        }
    }

    // Funcion publica global para reabrir el panel desde enlaces del footer o politicas
    window.openJulieConsentBanner = function () {
        showConsentBanner();
    };

    function init() {
        try {
            const consent = localStorage.getItem(CONSENT_KEY);
            if (!consent) {
                // Sin decision previa: mostrar banner
                showConsentBanner();
            } else if (consent === 'granted') {
                applyGtagConsent('granted');
            } else if (consent === 'denied') {
                applyGtagConsent('denied');
            }
        } catch (e) {
            showConsentBanner();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
