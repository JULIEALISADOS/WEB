/* Encabezado compacto: al bajar por la pagina el encabezado se hace mas pequeno (celular y tableta; en PC la regla CSS no aplica).
   Con margen (entra a 60 px, sale a 10 px) para que no parpadee. */
(function () {
  'use strict';
  var html = document.documentElement, on = false, raf = 0;
  function revisar() {
    raf = 0;
    var y = window.scrollY || window.pageYOffset || 0;
    if (!on && y > 60) { on = true; html.classList.add('cab-compacta'); }
    else if (on && y < 10) { on = false; html.classList.remove('cab-compacta'); }
  }
  window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(revisar); }, { passive: true });
  revisar();
})();
