/**
 * Julie Alisados - Consent & Privacy Manager (Ley 1581 / GDPR)
 */
document.addEventListener('DOMContentLoaded', () => {
    const consentKey = 'julie_privacy_consent';
    const hasConsent = localStorage.getItem(consentKey);

    if (!hasConsent) {
        showConsentBanner();
    }

    function showConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'privacy-banner-container';
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(10px);
            color: #ffffff;
            padding: 16px 20px;
            z-index: 10000;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
            border-top: 1px solid rgba(212, 175, 55, 0.4);
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            font-family: var(--font-body, 'Lato', sans-serif);
            font-size: 0.9rem;
        `;

        banner.innerHTML = `
            <div style="max-width: 850px; line-height: 1.4;">
                🔒 En <strong>Julie Alisados</strong> cuidamos tu privacidad (Ley 1581 de 2012). Usamos cookies propias y de analítica para ofrecerte la mejor experiencia y atención personalizada. Puedes consultar nuestra 
                <a href="https://juliealisados.com/politica-datos.html" target="_blank" rel="noopener noreferrer" style="color: var(--gold-light, #F2D06B); text-decoration: underline;">Política de Datos y Privacidad</a>.
            </div>
            <div style="display: flex; gap: 10px; flex-shrink: 0;">
                <button id="btn-accept-privacy" style="background: linear-gradient(135deg, #D4AF37 0%, #A68612 100%); color: #fff; border: none; padding: 8px 18px; border-radius: 20px; font-weight: 700; cursor: pointer;">Aceptar</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('btn-accept-privacy').addEventListener('click', () => {
            localStorage.setItem(consentKey, 'granted');
            localStorage.setItem('privacyAccepted', 'true');
            banner.remove();

            // Activar modos de consentimiento oficiales en Google
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'analytics_storage': 'granted'
                });
            }
        });
    }
});
