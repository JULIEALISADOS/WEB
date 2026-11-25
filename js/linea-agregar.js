/* Linea de Cuidado: boton negro "Agregar al carrito" (estilo K18) sobre el selector de cantidad existente.
   Al primer clic suma 1 con la misma funcion del carrito (changeQty); despues aparece el selector - n +.
   Si la cantidad vuelve a 0, regresa el boton. No cambia precios, carrito ni pago. */
(function () {
  'use strict';
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('.qty-selector-container'), function (box) {
      if (box.querySelector('.lc-add')) return;
      var btns = box.querySelectorAll('.qty-btn'), disp = box.querySelector('.qty-display');
      if (btns.length < 2 || !disp) return;
      var plus = btns[1];
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'lc-add'; b.textContent = 'Agregar al carrito';
      b.addEventListener('click', function (e) { e.stopPropagation(); plus.click(); });
      box.insertBefore(b, box.firstChild);
      function sync() { box.classList.toggle('con-cantidad', (parseInt(disp.textContent, 10) || 0) > 0); }
      new MutationObserver(sync).observe(disp, { childList: true, characterData: true, subtree: true });
      sync();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
