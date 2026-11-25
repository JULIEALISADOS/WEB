/* Banner deslizable V3. Uso: <section class="bn" data-bn data-ms="6000"> con .bn__track > .bn__s.
   - Dedo: lo hace el navegador (scroll-snap). Mouse: arrastre. Teclado: flechas.
   - Cambia solo; se detiene al tocar/pasar el mouse, con la pestaña oculta o fuera de pantalla.
   - Sin animación automática si la persona pidió menos movimiento. */
(function () {
  'use strict';
  var reducido = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function iniciar(bn) {
    var pista = bn.querySelector('.bn__track');
    var slides = bn.querySelectorAll('.bn__s');
    var n = slides.length;
    if (!pista || n < 2) return;
    var ms = parseInt(bn.getAttribute('data-ms'), 10) || 6000;
    var actual = 0, timer = null, visible = true, pausado = false, raf = 0;

    /* puntos */
    var dots = document.createElement('div');
    dots.className = 'bn__dots';
    var botones = [];
    for (var i = 0; i < n; i++) {
      (function (k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'bn__dot';
        b.setAttribute('aria-label', 'Ir al banner ' + (k + 1) + ' de ' + n);
        b.addEventListener('click', function () { ir(k); reiniciar(); });
        dots.appendChild(b); botones.push(b);
      })(i);
    }
    bn.appendChild(dots);

    /* flechas (solo se ven con mouse) */
    ['izq', 'der'].forEach(function (lado) {
      var f = document.createElement('button');
      f.type = 'button';
      f.className = 'bn__nav ' + lado;
      f.setAttribute('aria-label', lado === 'izq' ? 'Banner anterior' : 'Banner siguiente');
      f.textContent = lado === 'izq' ? '‹' : '›';
      f.addEventListener('click', function () { ir(actual + (lado === 'izq' ? -1 : 1)); reiniciar(); });
      bn.appendChild(f);
    });

    function marcar(k) {
      actual = k;
      for (var j = 0; j < n; j++) {
        botones[j].setAttribute('aria-current', j === k ? 'true' : 'false');
        slides[j].setAttribute('aria-hidden', j === k ? 'false' : 'true');
      }
    }
    function ir(k) {
      k = (k + n) % n;
      pista.scrollTo({ left: k * pista.clientWidth, behavior: reducido ? 'auto' : 'smooth' });
      marcar(k);
    }
    function alScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var k = Math.round(pista.scrollLeft / pista.clientWidth);
        if (k !== actual && k >= 0 && k < n) marcar(k);
      });
    }
    pista.addEventListener('scroll', alScroll, { passive: true });
    window.addEventListener('resize', function () { pista.scrollLeft = actual * pista.clientWidth; });

    /* automático */
    function parar() { clearInterval(timer); timer = null; }
    function arrancar() {
      parar();
      if (reducido || pausado || !visible || document.hidden) return;
      timer = setInterval(function () { ir(actual + 1); }, ms);
    }
    function reiniciar() { arrancar(); }

    bn.addEventListener('mouseenter', function () { pausado = true; parar(); });
    bn.addEventListener('mouseleave', function () { pausado = false; arrancar(); });
    bn.addEventListener('focusin', function () { pausado = true; parar(); });
    bn.addEventListener('focusout', function () { pausado = false; arrancar(); });
    pista.addEventListener('touchstart', function () { pausado = true; parar(); }, { passive: true });
    pista.addEventListener('touchend', function () { setTimeout(function () { pausado = false; arrancar(); }, 4000); }, { passive: true });
    document.addEventListener('visibilitychange', arrancar);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; arrancar(); }, { threshold: 0.25 }).observe(bn);
    }

    /* arrastre con mouse en PC (el dedo ya funciona solo) */
    var abajo = false, x0 = 0, s0 = 0, movio = false;
    pista.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      abajo = true; movio = false; x0 = e.clientX; s0 = pista.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!abajo) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 5) { movio = true; pista.classList.add('arrastrando'); }
      if (movio) pista.scrollLeft = s0 - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!abajo) return;
      abajo = false;
      if (movio) {
        pista.classList.remove('arrastrando');
        ir(Math.round(pista.scrollLeft / pista.clientWidth));
        reiniciar();
      }
    });
    pista.addEventListener('click', function (e) { if (movio) { e.preventDefault(); movio = false; } }, true);
    pista.addEventListener('dragstart', function (e) { e.preventDefault(); });

    /* teclado */
    bn.setAttribute('tabindex', '0');
    bn.setAttribute('role', 'region');
    bn.setAttribute('aria-roledescription', 'carrusel');
    bn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { ir(actual - 1); reiniciar(); }
      else if (e.key === 'ArrowRight') { ir(actual + 1); reiniciar(); }
    });

    marcar(0);
    arrancar();
  }

  function todos() { Array.prototype.forEach.call(document.querySelectorAll('[data-bn]'), iniciar); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', todos); else todos();
})();
