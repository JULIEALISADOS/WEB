/* Videos de promociones: al hacer clic se abren en grande (pantalla completa), con sonido y controles.
   Aplica al carrusel "lo que hacemos" (tarjeta activa) y al video del bloque "Alisado a tu medida".
   Cerrar: boton X, tecla Esc o clic fuera del video. */
(function () {
  'use strict';
  var css = '.vz{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:0}'
    + '.vz video{max-width:100vw;max-height:100vh;width:auto;height:auto;background:#000;outline:0}'
    + '.vz__x{position:absolute;top:14px;right:14px;width:48px;height:48px;border:0;border-radius:50%;background:#fff;color:#111;font:400 30px/1 Lato,Arial,sans-serif;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center}'
    + '.vz__x:focus-visible{outline:3px solid #FF3D9A;outline-offset:2px}'
    + '.vc__card.activa .vc__media,.dividida video{cursor:zoom-in}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var abierto = null, reproduciendo = [], x0 = 0, y0 = 0, antes = null;

  function abrir(origen) {
    if (abierto) return;
    var src = (origen.currentSrc || origen.src || '').split('#')[0];
    if (!src) return;
    reproduciendo = [];
    Array.prototype.forEach.call(document.querySelectorAll('video'), function (v) {
      if (!v.paused) { reproduciendo.push(v); v.pause(); }
    });
    antes = document.activeElement;
    var ov = document.createElement('div');
    ov.className = 'vz'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Video ampliado');
    var v = document.createElement('video');
    v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.loop = true;
    var x = document.createElement('button');
    x.type = 'button'; x.className = 'vz__x'; x.setAttribute('aria-label', 'Cerrar video'); x.textContent = '×';
    ov.appendChild(v); ov.appendChild(x); document.body.appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    window.dragging = true; /* detiene el cambio automatico del carrusel mientras el video esta ampliado */
    abierto = ov;
    var p = v.play(); if (p && p.catch) p.catch(function () { v.muted = true; v.play(); });
    x.focus();
    x.addEventListener('click', cerrar);
    ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
  }
  function cerrar() {
    if (!abierto) return;
    var v = abierto.querySelector('video'); if (v) v.pause();
    abierto.remove(); abierto = null;
    document.documentElement.style.overflow = '';
    window.dragging = false;
    reproduciendo.forEach(function (p) {
      var c = p.closest && p.closest('.vc__card');
      if (c && !c.classList.contains('activa')) return;
      try { p.play(); } catch (e) {}
    });
    if (antes && antes.focus) { try { antes.focus(); } catch (e) {} }
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });

  /* distinguir clic de arrastre del carrusel */
  document.addEventListener('pointerdown', function (e) { x0 = e.clientX; y0 = e.clientY; }, true);
  document.addEventListener('click', function (e) {
    if (abierto) return;
    if (Math.abs(e.clientX - x0) > 8 || Math.abs(e.clientY - y0) > 8) return;
    var t = e.target;
    if (t.closest && t.closest('button, a')) return;
    var m = t.closest && t.closest('.vc__card.activa .vc__media');
    var v = m ? m.querySelector('video') : (t.closest && t.closest('.dividida video'));
    if (v) abrir(v);
  });
})();
