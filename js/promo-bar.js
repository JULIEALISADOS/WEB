/* ==========================================================================
   Franja superior de promociones - Julie Alisados (estilo noticiero)
   >>> ACTUALIZAR UNA VEZ AL MES (solo este archivo; aplica a todas las paginas) <<<
   Los mensajes pasan de derecha a izquierda sin parar; al tocar o pasar el mouse se detienen.
   Reglas de la marca: Emulsion Zero y Aminoacidos son TERAPIAS (no se anuncian como alisado);
   las promociones aplican con pago directo, no con Addi; sin promesas absolutas.
   Solo el Alisado Saludable incluye regalos (Crioterapia, Reposicion Hidrolipidica y kit).
   Precios de referencia usados: kit mas costoso $74.000 y Termoprotector $35.000 (precios de venta).
   ========================================================================== */
(function () {
    var BASE = 'https://juliealisados.com/promociones-condiciones.html';
    var WA = 'https://wa.me/573043588180?text=' + encodeURIComponent('Hola Julie Alisados! Quiero agendar mi cita.');
    var PROMOS = [
        { href: BASE, loc: 'promociones', t: '✨ <strong>Tu liso perfecto, a precio de promo</strong> · solo hasta el 31 de octubre' },
        { href: BASE + '#alisado-saludable', loc: 'alisado-saludable', t: '💎 <strong>Alisado Saludable $250.000</strong> + Crioterapia, Reposición Hidrolipídica y kit de regalo' },
        { href: BASE + '#alisado-saludable', loc: 'alisado-saludable', t: '🎁 Con tu Alisado Saludable, <strong>kit de regalo de hasta $74.000</strong>' },
        { href: BASE + '#alisado-classic', loc: 'alisado-classic', t: '👑 <strong>Alisado Classic $160.000</strong> · liso que dura de 4 a 6 meses' },
        { href: BASE + '#alisado-classic', loc: 'alisado-classic', t: '🌿 <strong>Liso sin formol</strong> desde $160.000' },
        { href: BASE + '#reposicion-aminoacidos', loc: 'reposicion-aminoacidos', t: '💫 <strong>Menos frizz</strong> · Reposición de Aminoácidos $150.000' },
        { href: BASE + '#emulsion-zero', loc: 'emulsion-zero', t: '🌸 <strong>Emulsión Zero $170.000</strong> + Termoprotector de $35.000 de regalo' },
        { href: BASE + '#hidra-complex', loc: 'hidra-complex', t: '👭 <strong>Trae a tu amiga</strong> · 2x1 hidratación profunda $110.000' },
        { href: BASE, loc: 'promociones', t: '💖 <strong>10% de descuento</strong> en terapias del día 8 al 10 de tu alisado' },
        { href: WA, t: '📲 <strong>Agenda tu cita</strong> por WhatsApp · cupos limitados por agenda' }
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
            '.top-announcement-bar.ticker .tk-track{display:inline-flex;align-items:center;height:36px;will-change:transform;animation:tkMove var(--tk-dur,60s) linear infinite}' +
            '.top-announcement-bar.ticker.tk-pausa .tk-track{animation-play-state:paused}' +
            '.top-announcement-bar.ticker .announcement-item{display:inline-flex !important;align-items:center;animation:none !important;max-width:none !important;overflow:visible !important;text-overflow:clip !important;padding:0 22px;cursor:pointer;flex:0 0 auto}' +
            '.top-announcement-bar.ticker .announcement-item::after{content:"\\2726";margin-left:44px;color:#D4AF37;font-weight:400}' +
            '@keyframes tkMove{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
            '@media (prefers-reduced-motion: reduce){.top-announcement-bar.ticker{overflow-x:auto}.top-announcement-bar.ticker .tk-track{animation:none}}';
        document.head.appendChild(s);
    }

    function iniciar() {
        var bar = document.querySelector('.top-announcement-bar');
        if (!bar || bar.getAttribute('data-promo-bar') === 'ticker') return;
        bar.setAttribute('data-promo-bar', 'ticker');
        estilos();
        bar.classList.add('ticker');
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', 'Promociones de octubre');
        bar.innerHTML = '';
        var track = document.createElement('div');
        track.className = 'tk-track';
        // dos copias seguidas para que el movimiento sea continuo, sin saltos
        for (var copia = 0; copia < 2; copia++) {
            PROMOS.forEach(function (p) {
                var d = document.createElement('a');
                d.className = 'announcement-item';
                d.href = destino(p);
                if (p.href.indexOf('wa.me') > -1) { d.target = '_blank'; d.rel = 'noopener noreferrer'; }
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
