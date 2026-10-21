/* promo-carrusel-sedes.js
 * Banner "Promociones del mes" (mismo diseno de la pagina central) para las paginas de sede.
 * Uso: <div id="promo-sede-banner" data-sede="Tunja"></div>   (o "Moniquira")
 * - Movimiento continuo, se pausa al tocar/deslizar; los videos solo corren cuando estan a la vista.
 * - Al tocar una tarjeta se abre el video grande con el boton "Lo quiero" que va a WhatsApp de esa sede
 *   (js/wa-enlaces.js lo pasa por wa.html con el codigo de origen y la medicion).
 * Cambiar promos del mes: editar la lista PROMOS (video, titulo, mensaje).
 */
(function () {
  'use strict';
  var host = document.getElementById('promo-sede-banner');
  if (!host) return;
  var sede = host.getAttribute('data-sede') || '';
  var enSede = sede ? ' en la sede ' + sede : '';

  var PROMOS = [
    { v: 'promo-octubre-intro.mp4', t: 'Promociones del Mes de Octubre 2026', m: '¡Hola, Julie Alisados! Vi las promociones de octubre en su página y quiero más información' + enSede },
    { v: 'promo-alisado-saludable-octubre.mp4', t: 'Alisado Saludable + Crioterapia + Kit Dúo Gratis', m: '¡Hola, Julie Alisados! Vi la promo del Alisado Saludable y quiero más información' + enSede },
    { v: 'promo-emulsion-zero-octubre.mp4', t: 'Emulsión Zero + Termoprotector Gratis', m: '¡Hola, Julie Alisados! Vi la promo de Emulsión Zero y quiero más información' + enSede },
    { v: 'promo-reposicion-aminoacidos-octubre.mp4', t: 'Reposición de Aminoácidos ($150.000)', m: '¡Hola, Julie Alisados! Vi la promo de Reposición de Aminoácidos y quiero más información' + enSede },
    { v: 'promo-hidracomplex-octubre.mp4', t: 'Hidra Complex - Plan Amigas (2 x $110.000)', m: '¡Hola, Julie Alisados! Vi el Plan Amigas de Hidra Complex y quiero más información' + enSede },
    { v: 'promo-alisado-classic-octubre.mp4', t: 'Alisado Classic ($160.000)', m: '¡Hola, Julie Alisados! Vi la promo del Alisado Classic y quiero más información' + enSede }
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  // ---- HTML del banner (mismas clases que style.css de la pagina central)
  var cards = PROMOS.map(function (p, i) {
    return '<div class="image-card video-card-container" data-i="' + i + '" role="button" tabindex="0" aria-label="Ver video: ' + esc(p.t) + '">' +
      '<video muted loop playsinline webkit-playsinline preload="metadata" src="' + p.v + '" class="lazy-img-clickable"></video></div>';
  }).join('');
  host.className = 'hero-image-banner fade-in visible';
  host.innerHTML =
    '<div class="banner-title"><h3>PROMOCIONES DEL MES DE OCTUBRE</h3></div>' +
    '<div class="image-banner-wrapper promo-slider-wrapper"><div class="image-banner-track manual-track" id="promo-track-sede">' + cards + '</div></div>' +
    '<div style="text-align:center;margin:8px auto 14px;"><a href="promociones-condiciones.html" style="color:var(--gold-dark);font-size:.82rem;letter-spacing:1px;text-transform:uppercase;font-weight:700;text-decoration:none;opacity:.85;">✦ Ver Términos y Condiciones del Mes ✦</a></div>';

  var track = document.getElementById('promo-track-sede');
  var wrapper = host.querySelector('.promo-slider-wrapper');

  // ---- Duplicar tarjetas para el bucle continuo (los clones no reproducen hasta estar a la vista)
  Array.prototype.slice.call(track.children).forEach(function (c) {
    var k = c.cloneNode(true);
    k.setAttribute('aria-hidden', 'true'); k.removeAttribute('tabindex');
    track.appendChild(k);
  });

  // ---- Movimiento continuo + arrastre con el dedo
  var x = 0, block = 0, pausado = false, arrastre = false, sx = 0, sy = 0, base = 0, dist = 0, vel = 0, lx = 0, lt = 0, timer = null, modalAbierto = false;
  function medir() {
    var c = track.querySelector('.image-card'); if (!c) return;
    var mr = parseFloat(getComputedStyle(c).marginRight) || 0;
    block = (c.offsetWidth + mr) * PROMOS.length;
  }
  function normalizar() { if (block > 0) { while (x > 0) x -= block; while (x < -block) x += block; } }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function animar() {
    if (!pausado && !arrastre && !modalAbierto && !reduce && block > 0) {
      x -= 0.7; if (Math.abs(x) >= block) x = 0;
      track.style.transform = 'translateX(' + x + 'px)';
    }
    requestAnimationFrame(animar);
  })();
  medir(); window.addEventListener('resize', medir); window.addEventListener('load', medir);

  wrapper.addEventListener('touchstart', function (e) {
    arrastre = true; clearTimeout(timer);
    sx = lx = e.touches[0].clientX; sy = e.touches[0].clientY; base = x; dist = 0; vel = 0; lt = performance.now();
  }, { passive: true });
  wrapper.addEventListener('touchmove', function (e) {
    if (!arrastre) return;
    var cx = e.touches[0].clientX, dx = cx - sx, dy = e.touches[0].clientY - sy;
    dist = Math.abs(dx);
    if (Math.abs(dx) > Math.abs(dy) && e.cancelable) e.preventDefault();
    var now = performance.now(), dt = now - lt; if (dt > 0) vel = (cx - lx) / dt; lx = cx; lt = now;
    x = base + dx; normalizar(); track.style.transform = 'translateX(' + x + 'px)';
  }, { passive: false });
  function soltar() {
    if (!arrastre) return; arrastre = false;
    var m = vel * 120; if (Math.abs(m) > 280) m = Math.sign(m) * 280; x += m; normalizar();
    track.style.transition = 'transform .4s cubic-bezier(.25,1,.5,1)'; track.style.transform = 'translateX(' + x + 'px)';
    setTimeout(function () { track.style.transition = 'none'; }, 420);
    pausado = true; clearTimeout(timer); timer = setTimeout(function () { pausado = false; }, 2500);
  }
  wrapper.addEventListener('touchend', soltar); wrapper.addEventListener('touchcancel', soltar);
  wrapper.addEventListener('mouseenter', function () { pausado = true; });
  wrapper.addEventListener('mouseleave', function () { pausado = false; });

  // ---- Los videos solo se reproducen cuando estan a la vista (ahorra datos y bateria)
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var v = en.target.querySelector('video'); if (!v) return;
        if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else if (!v.paused) v.pause();
      });
    }, { root: null, threshold: 0.35 });
    Array.prototype.forEach.call(track.querySelectorAll('.video-card-container'), function (c) { io.observe(c); });
  }

  // ---- Video grande con boton "Lo quiero"
  var st = document.createElement('style');
  st.textContent =
    '.jps-modal{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;background:rgba(10,10,10,.88);padding:16px}' +
    '.jps-modal.on{display:flex}.jps-box{position:relative;width:min(92vw,380px);max-height:94vh;display:flex;flex-direction:column;gap:12px;align-items:center}' +
    '.jps-box video{width:100%;max-height:72vh;border-radius:16px;background:#000;object-fit:contain}' +
    '.jps-t{color:#fff;font-weight:700;text-align:center;font-size:1rem;line-height:1.3}' +
    '.jps-cta{display:block;width:100%;text-align:center;padding:14px 16px;border-radius:30px;font-weight:700;text-decoration:none;color:#3a2a00;background:linear-gradient(135deg,#f3d77a,#d4af37);box-shadow:0 8px 20px rgba(212,175,55,.35)}' +
    '.jps-x{position:absolute;top:-6px;right:-6px;width:40px;height:40px;border-radius:50%;border:0;background:#fff;color:#222;font-size:1.2rem;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.3)}' +
    '.jps-snd{position:absolute;left:8px;top:8px;width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.9);font-size:1.1rem;cursor:pointer}';
  document.head.appendChild(st);
  var m = document.createElement('div');
  m.className = 'jps-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', 'Video de promoción');
  m.innerHTML = '<div class="jps-box"><button class="jps-x" aria-label="Cerrar">✕</button><video playsinline loop muted></video><button class="jps-snd" aria-label="Activar sonido">🔇</button><div class="jps-t"></div><a class="jps-cta" href="#">💖 ¡Lo quiero! Agendar por WhatsApp</a></div>';
  document.body.appendChild(m);
  var mv = m.querySelector('video'), mt = m.querySelector('.jps-t'), cta = m.querySelector('.jps-cta'), snd = m.querySelector('.jps-snd');
  function abrir(i) {
    var p = PROMOS[i]; if (!p) return;
    mv.src = p.v; mv.muted = true; snd.textContent = '🔇'; mt.textContent = p.t;
    cta.href = 'https://wa.me/573043588180?text=' + encodeURIComponent(p.m);
    m.classList.add('on'); document.body.style.overflow = 'hidden'; modalAbierto = true;
    var pr = mv.play(); if (pr && pr.catch) pr.catch(function () {});
  }
  function cerrar() { m.classList.remove('on'); document.body.style.overflow = ''; mv.pause(); mv.removeAttribute('src'); mv.load(); modalAbierto = false; }
  track.addEventListener('click', function (e) {
    if (dist > 10) { dist = 0; return; }
    var c = e.target.closest('.video-card-container'); if (!c) return;
    abrir(parseInt(c.getAttribute('data-i'), 10));
  });
  track.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var c = e.target.closest('.video-card-container'); if (!c) return; e.preventDefault(); abrir(parseInt(c.getAttribute('data-i'), 10));
  });
  snd.addEventListener('click', function () { mv.muted = !mv.muted; snd.textContent = mv.muted ? '🔇' : '🔊'; });
  m.querySelector('.jps-x').addEventListener('click', cerrar);
  m.addEventListener('click', function (e) { if (e.target === m) cerrar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && m.classList.contains('on')) cerrar(); });
})();
