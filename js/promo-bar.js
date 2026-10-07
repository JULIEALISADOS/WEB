/* ==========================================================================
   Franja superior de promociones — Julie Alisados
   >>> ACTUALIZAR UNA VEZ AL MES (solo este archivo; aplica a todas las páginas) <<<
   Cada promoción tiene dos textos: "full" (computador) y "short" (celular, máx. ~45 caracteres).
   Reglas de la marca: Emulsión Zero y Aminoácidos son TERAPIAS (no se anuncian como alisado);
   las promociones aplican con pago directo, no con Addi; sin promesas absolutas.
   ========================================================================== */
(function () {
    var BASE = 'https://juliealisados.com/promociones-condiciones.html';
    var PROMOS = [
        { href: BASE, full: '🔥 <strong>Promos de octubre</strong> con cupos limitados por agenda · vigentes hasta el 31 <u>Ver</u>', short: '🔥 <strong>Promos de octubre</strong> · cupos limitados <u>Ver</u>' },
        { href: BASE + '#alisado-saludable', full: '💎 <strong>Alisado Saludable $250.000</strong> · incluye Kit Dúo post-cuidado ✨ <u>Ver</u>', short: '💎 <strong>Liso espejo $250.000</strong> + Kit de regalo <u>Ver</u>' },
        { href: BASE + '#alisado-classic', full: '👑 <strong>Alisado Classic $160.000</strong> · liso natural de 4 a 6 meses ✨ <u>Ver</u>', short: '👑 <strong>Alisado Classic $160.000</strong> · dura 4-6 meses <u>Ver</u>' },
        { href: BASE + '#emulsion-zero', full: '🌸 <strong>Terapia Emulsión Zero $170.000</strong> · para cabello sensible y niñas, con Termoprotector de regalo 🎁 <u>Ver</u>', short: '🌸 <strong>Emulsión Zero $170.000</strong> + regalo 🎁 <u>Ver</u>' },
        { href: BASE + '#reposicion-aminoacidos', full: '🌿 <strong>Reposición de Aminoácidos $150.000</strong> · terapia que ayuda a controlar el frizz sin alisar <u>Ver</u>', short: '🌿 <strong>Menos frizz</strong> · Aminoácidos $150.000 <u>Ver</u>' },
        { href: BASE + '#hidra-complex', full: '👭 <strong>Plan Amigas 2x1 $110.000</strong> · 2 hidrataciones profundas para ti y tu amiga 💕 <u>Ver</u>', short: '👭 <strong>Trae a tu amiga</strong> · 2x1 por $110.000 <u>Ver</u>' },
        { href: 'https://wa.me/573043588180?text=' + encodeURIComponent('Hola Julie Alisados! Quiero agendar mi cita.'), full: '📲 <strong>Agenda tu cita por WhatsApp</strong> · promos con pago directo (efectivo, Bre-B o transferencia) <u>Agendar</u>', short: '📲 <strong>Agenda tu cita</strong> por WhatsApp <u>Ver</u>' }
    ];
    var INTERVALO_MS = 5000;

    function iniciar() {
        var bar = document.querySelector('.top-announcement-bar');
        if (!bar || bar.getAttribute('data-promo-bar') === 'ok') return;
        bar.setAttribute('data-promo-bar', 'ok');
        bar.setAttribute('aria-live', 'polite');
        bar.innerHTML = '';
        PROMOS.forEach(function (p, i) {
            var d = document.createElement('div');
            d.className = 'announcement-item' + (i === 0 ? ' active' : '');
            d.setAttribute('data-index', String(i));
            d.setAttribute('role', 'link');
            d.setAttribute('tabindex', '0');
            d.style.cursor = 'pointer';
            d.innerHTML = '<span class="bar-full">' + p.full + '</span><span class="bar-short">' + p.short + '</span>';
            var ir = function () { window.location.href = p.href; };
            d.addEventListener('click', ir);
            d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ir(); } });
            bar.appendChild(d);
        });
        var items = bar.querySelectorAll('.announcement-item'), actual = 0, pausa = false;
        bar.addEventListener('mouseenter', function () { pausa = true; });
        bar.addEventListener('mouseleave', function () { pausa = false; });
        bar.addEventListener('focusin', function () { pausa = true; });
        bar.addEventListener('focusout', function () { pausa = false; });
        setInterval(function () {
            if (pausa || document.hidden) return;
            items[actual].classList.remove('active');
            actual = (actual + 1) % items.length;
            items[actual].classList.add('active');
        }, INTERVALO_MS);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
