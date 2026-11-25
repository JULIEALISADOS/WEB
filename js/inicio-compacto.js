/* Inicio mas corto en celular SIN quitar texto (orden del Director 25-nov):
   - pie: cada columna de enlaces se pliega bajo su titulo;
   - JA Hair System: el parrafo largo y el cierre quedan en "Ver mas del metodo".
   Todo el texto sigue en la pagina (Google lo lee igual); solo se pliega en pantallas < 768 px. */
(function () {
  'use strict';
  function boton(texto, controla) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'plg-btn'; b.setAttribute('aria-expanded', 'false');
    if (controla) b.setAttribute('aria-controls', controla);
    b.innerHTML = '<span>' + texto + '</span><i aria-hidden="true">+</i>';
    return b;
  }
  function init() {
    /* 1) Pie: columnas plegables */
    Array.prototype.forEach.call(document.querySelectorAll('footer.pie .cols > div'), function (col, i) {
      var titulo = col.firstElementChild;
      if (!titulo || col.querySelector('.plg-btn')) return;
      var id = 'pie-col-' + i, cuerpo = document.createElement('div');
      cuerpo.className = 'plg-cuerpo'; cuerpo.id = id;
      while (titulo.nextSibling) cuerpo.appendChild(titulo.nextSibling);
      var b = boton(titulo.textContent.trim(), id);
      titulo.classList.add('plg-titulo-orig');
      col.appendChild(b); col.appendChild(cuerpo); col.classList.add('plg');
      b.addEventListener('click', function () {
        var abierto = col.classList.toggle('abierto'); b.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      });
    });
    /* 2) JA Hair System: parrafo largo y cierre en "Ver mas del metodo" */
    var sec = document.getElementById('ja-hair-system');
    if (sec && !sec.querySelector('.plg-btn')) {
      var leads = sec.querySelectorAll(':scope > p.lead'), cierre = sec.querySelector(':scope > p.cierre');
      var extra = [];
      if (leads.length > 1) extra.push(leads[1]);
      if (cierre) extra.push(cierre);
      if (extra.length) {
        var caja = document.createElement('div'); caja.className = 'plg-cuerpo'; caja.id = 'jahs-mas';
        extra[0].parentNode.insertBefore(caja, extra[0]);
        extra.forEach(function (e) { caja.appendChild(e); });
        var pasos = sec.querySelector('.pasos');
        var b2 = boton('Ver más del método', 'jahs-mas');
        var envoltura = document.createElement('div'); envoltura.className = 'plg plg-jahs';
        caja.parentNode.insertBefore(envoltura, caja);
        envoltura.appendChild(b2); envoltura.appendChild(caja);
        if (pasos) pasos.parentNode.insertBefore(envoltura, pasos.nextSibling);
        b2.addEventListener('click', function () {
          var abierto = envoltura.classList.toggle('abierto'); b2.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
