/* Sitio mas corto en celular SIN quitar texto (orden del Director 25-nov: "aplicalo a todo el sitio").
   - Pie de pagina: cada columna de enlaces se pliega bajo su titulo (como en el inicio).
   Las filas deslizables van solo en CSS (v3-ajustes.css). Todo el texto sigue en la pagina;
   solo cambia la vista en pantallas < 768 px. */
(function () {
  'use strict';
  function plegarColumna(col, i) {
    if (col.classList.contains('plg')) return;
    var titulo = col.firstElementChild;
    if (!titulo || !/^H[2-6]$/.test(titulo.tagName)) return;
    var id = 'pie-plg-' + i, cuerpo = document.createElement('div');
    cuerpo.className = 'plg-cuerpo'; cuerpo.id = id;
    while (titulo.nextSibling) cuerpo.appendChild(titulo.nextSibling);
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'plg-btn'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', id);
    b.innerHTML = '<span></span><i aria-hidden="true">+</i>';
    b.firstChild.textContent = titulo.textContent.trim();
    titulo.classList.add('plg-titulo-orig');
    col.appendChild(b); col.appendChild(cuerpo); col.classList.add('plg');
    b.addEventListener('click', function () {
      var abierto = col.classList.toggle('abierto');
      b.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }
  function init() {
    var cols = document.querySelectorAll('.v3-pie .v3-cols > div, footer.pie .cols > div');
    Array.prototype.forEach.call(cols, plegarColumna);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
