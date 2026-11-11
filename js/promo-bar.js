/* ==========================================================================
   Franja superior de promociones - Julie Alisados (estilo noticiero). Sirve a la web vieja (.top-announcement-bar) y a la nueva (.marq, franja negra sobria con neon)
   >>> ACTUALIZAR UNA VEZ AL MES (solo este archivo; aplica a todas las paginas) <<<
   Los mensajes pasan de derecha a izquierda sin parar; al tocar o pasar el mouse se detienen.
   Reglas de la marca: Emulsion Zero y Aminoacidos son TERAPIAS (no se anuncian como alisado);
   las promociones aplican con pago directo, no con Addi; sin promesas absolutas.
   Solo el Alisado Saludable incluye regalos (Crioterapia, Reposicion Hidrolipidica y kit).
   Precios de referencia usados: kit mas costoso $74.000 y Termoprotector $35.000 (precios de venta).
   ========================================================================== */
(function () {
    var BASE = '/promociones-condiciones.html';
    var WA = '/wa.html?utm_source=web&utm_medium=franja&utm_campaign=web-promos&tipo=cita&text=' + encodeURIComponent('¡Hola, Julie Alisados! Quiero más información');
    var PROMOS = [
        { href: BASE, loc: 'promociones', t: '✨ <strong>Tu liso perfecto, a precio de promo</strong> · solo hasta el 30 de noviembre' },
        { href: BASE + '#alisado-saludable', loc: 'alisado-saludable', t: '💎 <strong>Alisado Saludable $250.000</strong> + Crioterapia, Reposición Hidrolipídica y kit de regalo' },
        { href: 'https://maps.app.goo.gl/WpeYPMuyPrf6tCqq6', t: "<span style=\"color:#C9A24A;letter-spacing:2px\">★★★★★</span> <em>“Ame mi alisado, sin duda alguno los mejores resultados y me enamore de como sus productos han mejorado mi pelo. Super recomendado en Tunja”</em> · Olga M. · Reseña en Google" }, /*op*/
        { href: '/linea-cuidado.html#shampoo-extractos', t: "🧴 <strong>Shampoo Extractos Naturales JA $38.000</strong> · Ayuda a controlar la grasa del cuero cabelludo" }, /*op*/
        { href: BASE + '#alisado-saludable', loc: 'alisado-saludable', t: '🎁 Con tu Alisado Saludable, <strong>kit de regalo de hasta $74.000</strong>' },
        { href: BASE + '#alisado-classic', loc: 'alisado-classic', t: '👑 <strong>Alisado Classic $160.000</strong> · liso que dura de 4 a 6 meses' },
        { href: 'https://maps.app.goo.gl/WpeYPMuyPrf6tCqq6', t: "<span style=\"color:#C9A24A;letter-spacing:2px\">★★★★★</span> <em>“Excelente  servicio y excelentes productos  muy profesional el personal que atiende la sede especialmente  la señorita  Maria Fernanda”</em> · Camila A. · Reseña en Google" }, /*op*/
        { href: '/linea-cuidado.html#acondicionador-extractos', t: "🧴 <strong>Acondicionador Extractos Naturales JA $39.000</strong> · desenreda, suaviza y da brillo" }, /*op*/
        { href: BASE + '#alisado-classic', loc: 'alisado-classic', t: '🌿 <strong>Liso sin formol</strong> desde $160.000' },
        { href: BASE + '#reposicion-aminoacidos', loc: 'reposicion-aminoacidos', t: '💫 <strong>Menos frizz</strong> · Reposición de Aminoácidos $160.000' },
        { href: 'https://maps.google.com/maps?cid=16783253677649927441', t: "<span style=\"color:#C9A24A;letter-spacing:2px\">★★★★★</span> <em>“Excelente producto y atención recomendado.”</em> · Diana C. · Reseña en Google" }, /*op*/
        { href: '/linea-cuidado.html#combo-extractos', t: "🎀 <strong>Combo Extractos Naturales JA $74.000</strong> · La rutina completa, en una sola compra" }, /*op*/
                { href: BASE + '#emulsion-zero', loc: 'emulsion-zero', t: '🌸 <strong>Emulsión Zero $170.000</strong> · un solo precio, sin importar el largo ni la cantidad' },
                { href: BASE + '#rcp-restauracion', loc: 'rcp-restauracion', t: '✨ <strong>R.C.P. Restauración Capilar Profunda $110.000</strong> · un solo precio' },
        { href: 'https://maps.google.com/maps?cid=16783253677649927441', t: "<span style=\"color:#C9A24A;letter-spacing:2px\">★★★★★</span> <em>“Me encantó! Amo el alisado, los productos calidad 100 de 💯”</em> · July G. · Reseña en Google" }, /*op*/
        { href: '/linea-cuidado.html#mascarilla-oro', t: "✨ <strong>Mascarilla Oro Líquido 3 en 1 $35.000</strong> · nutre e hidrata" }, /*op*/
        { href: BASE, loc: 'promociones', t: '💖 <strong>10% de descuento</strong> en terapias del día 8 al 10 de tu alisado' },
        { href: WA, t: '📲 <strong>Agenda tu cita</strong> por WhatsApp · cupos limitados por agenda' },
        { href: 'https://maps.google.com/maps?cid=16783253677649927441', t: "<span style=\"color:#C9A24A;letter-spacing:2px\">★★★★★</span> <em>“Los mejores en alizsdos excelente atención y los productos son geniales”</em> · Jessica P. · Reseña en Google" }, /*op*/
        { href: '/linea-cuidado.html#termoprotector', t: "🌸 <strong>Termoprotector y Perfume Capilar $35.000</strong> · proteger tu cabello del daño del calor del secador y la plancha" }, /*op*/
        { href: 'https://maps.google.com/maps?cid=16783253677649927441', t: "<span style=\"color:#C9A24A;letter-spacing:2px\">★★★★★</span> <em>“Es un lugar bonito, fui a recoger unos productos que me han parecido excelentes, el shampoo, el acondicionador, el termo protector”</em> · Carolina L. · Reseña en Google" }, /*op*/
        { href: '/linea-cuidado.html#aceite-argan', t: "💧 <strong>Aceite de Argán y Macadamia $28.000</strong> · deja el cabello sin encrespado y sin enredos" }, /*op*/
        { href: 'https://maps.google.com/maps?cid=16783253677649927441', t: "<span style=\"color:#C9A24A;letter-spacing:2px\">★★★★★</span> <em>“Excelentes resultados ! Sus productos son muy buenos ! Estoy muy feliz con el resultado del alisado al lavar mi cabello. Bendiciones !”</em> · María E. · Reseña en Google" } /*op*/
    ];
    var VELOCIDAD_PX_S = 70; // lenta, para que se alcance a leer

    // En las paginas de sede, cada mensaje baja a su propia tarjeta de promocion en esa misma pagina
    function destino(p) {
        if (!p.loc) return p.href;
        var ids = [p.loc + '-t', p.loc + '-m', p.loc];
        for (var i = 0; i < ids.length; i++) {
            if (document.getElementById(ids[i]) && document.querySelector('.sd-promos')) return '#' + ids[i];
        }
        return p.href;
    }

    function estilos() {
        if (document.getElementById('promo-ticker-css')) return;
        var s = document.createElement('style');
        s.id = 'promo-ticker-css';
        s.textContent =
            '.top-announcement-bar.ticker{display:block !important;text-align:left !important;padding:0 !important;white-space:nowrap;overflow:hidden}' +
            '.top-announcement-bar.ticker .tk-track,.marq.ticker .tk-track{display:inline-flex;align-items:center;height:36px;will-change:transform;animation:tkMove var(--tk-dur,60s) linear infinite}' +
            '.top-announcement-bar.ticker.tk-pausa .tk-track,.marq.ticker.tk-pausa .tk-track{animation-play-state:paused}' +
            '.marq.ticker{white-space:nowrap;overflow:hidden;text-align:left !important;padding:0 !important}' +
            '.marq.ticker .announcement-item{display:inline-flex !important;align-items:center;flex:0 0 auto;cursor:pointer}' +
            '.marq.ticker .announcement-item::after{content:"\\2726";color:#D4AF37;font-weight:400}' +
            '.top-announcement-bar.ticker .announcement-item{display:inline-flex !important;align-items:center;animation:none !important;max-width:none !important;overflow:visible !important;text-overflow:clip !important;padding:0 22px;cursor:pointer;flex:0 0 auto}' +
            '.top-announcement-bar.ticker .announcement-item::after{content:"\\2726";margin-left:44px;color:#D4AF37;font-weight:400}' +
            '.marq.ticker{background:#141012 !important;color:#EFE7DD !important;height:36px;display:block !important;font:400 12.5px/36px Lato,Arial,sans-serif !important;letter-spacing:.03em !important;text-transform:none !important;border-bottom:1px solid rgba(255,61,154,.35)}' +
            '.marq.ticker .tk-track{height:36px}' +
            '.marq.ticker .announcement-item{color:#EFE7DD !important;padding:0 18px}' +
            '.marq.ticker .announcement-item:hover{text-decoration:underline !important;text-decoration-color:#FF3D9A !important}' +
            '.marq.ticker strong{color:#FF3D9A;font-weight:700;text-shadow:0 0 8px rgba(255,61,154,.45)}' +
            '.marq.ticker em{font-style:italic;color:#D9CFC2}' +
            '.marq.ticker .announcement-item::after{margin-left:36px}' +
            /* Barra fucsia con letras blancas en todo el sitio (orden del Director 10-nov-2026) */
            '.marq.ticker{background:#FF3D9A !important;color:#fff !important;border-bottom:0 !important}' +
            '.marq.ticker .announcement-item,.marq.ticker em,.marq.ticker strong{color:#fff !important;text-shadow:none !important}' +
            '.marq.ticker .announcement-item span[style]{color:#fff !important}' +
            '.marq.ticker .announcement-item::after{color:#fff !important}' +
            '.marq.ticker .announcement-item:hover{text-decoration-color:#fff !important}' +
            /* Avisos emergentes en translucido perlado/satinado (orden del Director 11-nov-2026) */
            '.booking-bottom-bar,#julie-consent-banner.julie-consent-banner{background:linear-gradient(120deg,rgba(255,255,255,.62),rgba(253,236,242,.55) 45%,rgba(246,236,220,.58)) !important;-webkit-backdrop-filter:blur(22px) saturate(160%) !important;backdrop-filter:blur(22px) saturate(160%) !important;box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 18px 44px -20px rgba(0,0,0,.35) !important}' +
            '#julie-consent-banner.julie-consent-banner{border:1px solid rgba(255,255,255,.75) !important}' +
            '.booking-bottom-bar{border-top:1px solid rgba(255,255,255,.8) !important}' +
            '@keyframes tkMove{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
            '@media (prefers-reduced-motion: reduce){.top-announcement-bar.ticker{overflow-x:auto}.top-announcement-bar.ticker .tk-track{animation:none}}';
        document.head.appendChild(s);
    }

    function iniciar() {
        var bar = document.querySelector('.top-announcement-bar') || document.querySelector('.marq');
        if (!bar || bar.getAttribute('data-promo-bar') === 'ticker') return;
        bar.setAttribute('data-promo-bar', 'ticker');
        estilos();
        bar.classList.add('ticker');
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', 'Promociones de noviembre');
        bar.innerHTML = '';
        var track = document.createElement('div');
        track.className = 'tk-track';
        // dos copias seguidas para que el movimiento sea continuo, sin saltos
        for (var copia = 0; copia < 2; copia++) {
            PROMOS.forEach(function (p) {
                var d = document.createElement('a');
                d.className = 'announcement-item';
                d.href = destino(p);
                if (p.href.indexOf('maps.') > -1) { d.target = '_blank'; d.rel = 'noopener noreferrer'; }
                d.style.color = 'inherit';
                d.style.textDecoration = 'none';
                d.innerHTML = p.t;
                if (copia === 1) { d.setAttribute('aria-hidden', 'true'); d.tabIndex = -1; }
                track.appendChild(d);
            });
        }
        bar.appendChild(track);
        // duracion segun el ancho real: velocidad constante en cualquier pantalla
        requestAnimationFrame(function () {
            var mitad = track.scrollWidth / 2;
            if (mitad > 0) track.style.setProperty('--tk-dur', Math.round(mitad / VELOCIDAD_PX_S) + 's');
        });
        var reanudar;
        function pausar() { clearTimeout(reanudar); bar.classList.add('tk-pausa'); }
        function seguir(ms) { clearTimeout(reanudar); reanudar = setTimeout(function () { bar.classList.remove('tk-pausa'); }, ms); }
        bar.addEventListener('mouseenter', pausar);
        bar.addEventListener('mouseleave', function () { seguir(0); });
        bar.addEventListener('focusin', pausar);
        bar.addEventListener('focusout', function () { seguir(0); });
        bar.addEventListener('touchstart', pausar, { passive: true });
        bar.addEventListener('touchend', function () { seguir(2500); }, { passive: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
