/* anclas-estables.js
 * Arregla los enlaces internos (#legal, #dudas, #sedes...): la pagina carga mapas y fotos despues de tocar el enlace
 * y empujaba el destino hacia abajo, dejando a la visitante en otra seccion. Aqui se vuelve a alinear el destino
 * unos segundos, y se detiene apenas la persona mueve la pagina con el dedo o la rueda.
 */
(function () {
  'use strict';
  var parar = false, timers = [];

  function limpiar() { timers.forEach(clearTimeout); timers = []; }

  function ir(el) {
    var margen = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    var y = el.getBoundingClientRect().top + window.pageYOffset - margen;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, Math.min(y, max)), left: 0, behavior: 'instant' });
  }

  function fijar(id) {
    var el = document.getElementById(id);
    if (!el) return;
    limpiar(); parar = false;
    ir(el);
    [150, 400, 800, 1400, 2200, 3500].forEach(function (ms) {
      timers.push(setTimeout(function () { if (!parar) ir(el); }, ms));
    });
    window.addEventListener('load', function () { if (!parar) ir(el); }, { once: true });
  }

  ['wheel', 'touchmove', 'keydown'].forEach(function (ev) {
    window.addEventListener(ev, function () { parar = true; limpiar(); }, { passive: true });
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    history.pushState(null, '', '#' + id);
    fijar(id);
  });

  // 25-nov (V3): anclas viejas del inicio que pueden venir de anuncios, Google o mensajes -> sección nueva equivalente
  var ALIAS = { servicios: 'terapias', testimonios: 'opiniones', pagos: 'promociones', diagnostico: 'test', 'cuidado-ja': 'cuidado', 'ven-a-vernos': 'sedes', 'porque-elegirnos': 'porque' };
  if (window.location.hash.length > 1) {
    var h0 = decodeURIComponent(window.location.hash.slice(1));
    if (!document.getElementById(h0)) {
      if (h0 === 'legal' && !/legal\.html$/.test(window.location.pathname)) { window.location.replace('/legal.html'); return; }
      if (ALIAS[h0]) { try { history.replaceState(null, '', '#' + ALIAS[h0]); } catch (e) {} }
    }
  }

  // Visita que llega ya con #legal en el enlace (por ejemplo desde un mensaje de WhatsApp)
  if (window.location.hash.length > 1) {
    var id0 = decodeURIComponent(window.location.hash.slice(1));
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { fijar(id0); });
    else fijar(id0);
  }
})();
