/* Encabezado en celular y tableta (en PC las reglas CSS no aplican):
   - al bajar por la pagina el encabezado DESAPARECE (orden del Director 26-nov: "la barra de titulo debe desaparecer al mover la pantalla");
   - al subir vuelve, mas delgado y solo con JULIE ALISADOS (clase cab-compacta);
   - arriba del todo se ve completo, con la firma By Julie Valencia.
   Con margenes para que no parpadee. */
(function () {
  'use strict';
  var html = document.documentElement, compacta = false, oculta = false, raf = 0, ultimo = 0;
  function menuAbierto() {
    var d = document.getElementById('drawer') || document.querySelector('.v3-drawer');
    return !!(d && (d.classList.contains('open') || d.classList.contains('abierto')));
  }
  function revisar() {
    raf = 0;
    var y = window.scrollY || window.pageYOffset || 0, dy = y - ultimo;
    if (!compacta && y > 60) { compacta = true; html.classList.add('cab-compacta'); }
    else if (compacta && y < 10) { compacta = false; html.classList.remove('cab-compacta'); }
    if (y < 80 || menuAbierto()) { if (oculta) { oculta = false; html.classList.remove('cab-oculta'); } }
    else if (dy > 6 && !oculta) { oculta = true; html.classList.add('cab-oculta'); }
    else if (dy < -6 && oculta) { oculta = false; html.classList.remove('cab-oculta'); }
    if (Math.abs(dy) > 6 || y < 80) ultimo = y;
  }
  window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(revisar); }, { passive: true });
  revisar();
})();
