/* Aviso de Black Friday (solo el viernes 27-nov-2026, hora de Colombia).
   - Aparece una vez por visita (sessionStorage), después de que la visitante responda el aviso de cookies.
   - Se cierra con X, Esc, clic fuera o "Ahora no". Sin cronómetros inventados: solo la vigencia real.
   - Vista previa en cualquier momento: agregar ?bf a la dirección. */
(function () {
  'use strict';
  var INI = Date.UTC(2026, 10, 27, 5, 0, 0);   // 27-nov 00:00 Bogotá (UTC-5)
  var FIN = Date.UTC(2026, 10, 28, 5, 0, 0);   // 28-nov 00:00 Bogotá
  var preview = /[?&]bf(=|&|$)/.test(location.search);
  var now = Date.now();
  if (!preview && now >= FIN) return;
  if (/black-friday\.html/.test(location.pathname)) return;
  var antes = now < INI;   // antes de las 00:00 del viernes: se avisa que empieza a esa hora

  var DEST = '/black-friday.html?utm_source=web&utm_medium=aviso&utm_campaign=black-friday' + (preview ? '&preview' : '');

  // Franja fija arriba de la página (no se cierra): siempre hay un camino a la promo aunque cierren el aviso.
  function franja() {
    if (document.getElementById('bf-franja')) return;
    var s = document.createElement('style');
    s.textContent = '.bf-franja{display:block;background:#111;color:#fff;text-align:center;text-decoration:none;font:700 13px/1.35 Lato,Arial,sans-serif;letter-spacing:.06em;padding:11px 16px}' +
      '.bf-franja b{color:#FF3D9A}.bf-franja u{text-underline-offset:3px}.bf-franja:hover u{color:#FF3D9A}';
    document.head.appendChild(s);
    var a = document.createElement('a');
    a.id = 'bf-franja'; a.className = 'bf-franja';
    a.href = DEST.replace('medium=aviso', 'medium=franja');
    a.innerHTML = 'BLACK FRIDAY · <b>' + (antes ? 'EMPIEZA A LAS 00:00' : 'SOLO HOY') + '</b> · hasta 21,5 % en combos · <u>Ver la promoción →</u>';
    var m = document.querySelector('main') || document.body;
    m.insertBefore(a, m.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', franja); else franja();

  try { if (!preview && sessionStorage.getItem('bf_popup_visto')) return; } catch (e) {}
  var previo = null;

  function css() {
    var s = document.createElement('style');
    s.id = 'bf-popup-css';
    s.textContent =
      '.bfp-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.62);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .25s}' +
      '.bfp-ov.on{opacity:1}' +
      '.bfp{cursor:pointer;position:relative;max-width:440px;width:100%;background:#111;color:#fff;padding:34px 28px 24px;text-align:center;border-radius:0;box-shadow:0 18px 60px rgba(0,0,0,.5);font-family:Lato,Arial,sans-serif}' +
      '.bfp .k{display:block;color:#FF3D9A;letter-spacing:.16em;font-weight:700;font-size:.78rem;margin-bottom:10px}' +
      '.bfp h2{font-family:"Playfair Display",Georgia,serif;font-weight:700;font-size:1.9rem;line-height:1.15;margin:0 0 10px;color:#fff}' +
      '.bfp .n{display:block;font-size:3rem;font-weight:700;color:#FF3D9A;line-height:1;margin:6px 0}' +
      '.bfp p{margin:0 0 8px;color:#e8e8e8;font-size:.98rem;line-height:1.45}' +
      '.bfp .pie{font-size:.78rem;color:#bdbdbd;margin:10px 0 0}' +
      '.bfp .go{display:block;background:#fff;color:#111;font-weight:700;text-decoration:none;padding:14px 18px;margin:16px 0 8px;border-radius:0}' +
      '.bfp .go:hover,.bfp .go:focus{background:#FF3D9A;color:#111}' +
      '.bfp .no{background:none;border:0;color:#e8e8e8;text-decoration:underline;font-size:.9rem;cursor:pointer;padding:8px}' +
      '.bfp .x{position:absolute;top:6px;right:8px;width:44px;height:44px;background:none;border:0;color:#fff;font-size:1.7rem;line-height:1;cursor:pointer}' +
      '@media(max-width:520px){.bfp-ov{align-items:flex-end;padding:0}.bfp{max-width:none;padding:30px 20px 22px}.bfp h2{font-size:1.6rem}}';
    document.head.appendChild(s);
  }

  function cerrar(ov) {
    try { sessionStorage.setItem('bf_popup_visto', '1'); } catch (e) {}
    ov.classList.remove('on');
    document.removeEventListener('keydown', ov._k);
    setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 250);
    if (previo && previo.focus) { try { previo.focus(); } catch (e) {} }
  }

  function mostrar() {
    if (document.getElementById('bf-popup')) return;
    css();
    previo = document.activeElement;
    var ov = document.createElement('div');
    ov.className = 'bfp-ov'; ov.id = 'bf-popup';
    ov.innerHTML =
      '<div class="bfp" role="dialog" aria-modal="true" aria-labelledby="bfp-t">' +
      '<button type="button" class="x" aria-label="Cerrar">&times;</button>' +
      '<span class="k">' + (antes ? 'BLACK FRIDAY · EMPIEZA A LAS 00:00' : 'BLACK FRIDAY · SOLO HOY') + '</span>' +
      '<h2 id="bfp-t">Entre más llevas, más ahorras</h2>' +
      '<span class="n">hasta 21,5 %</span>' +
      '<p>Combos de cuidado capilar JA By Julie Valencia con precio especial. ' +
        (antes ? 'La promoción empieza el viernes 27 de noviembre a las 00:00 y dura 24 horas, o hasta agotar existencias.'
               : 'Hoy, hasta las 11:59 p.&nbsp;m. o hasta agotar existencias.') + '</p>' +
      '<a class="go" href="' + DEST + '">Ver la promoción</a>' +
      '<button type="button" class="no">Ahora no</button>' +
      '<p class="pie">Pago por transferencia o en efectivo. No aplica con Addi ni con tarjeta.</p>' +
      '</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('on'); });
    var go = ov.querySelector('.go');
    ov.querySelector('.x').addEventListener('click', function () { cerrar(ov); });
    ov.querySelector('.no').addEventListener('click', function () { cerrar(ov); });
    go.addEventListener('click', function () { try { sessionStorage.setItem('bf_popup_visto', '1'); } catch (e) {} });
    ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(ov); });
    // todo el aviso lleva a la promoción (menos la X y "Ahora no")
    ov.querySelector('.bfp').addEventListener('click', function (e) { if (!e.target.closest('a,button')) go.click(); });
    ov._k = function (e) {
      if (e.key === 'Escape') { cerrar(ov); return; }
      if (e.key === 'Tab') {            // el foco se queda dentro del aviso
        var f = ov.querySelectorAll('a,button'); if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', ov._k);
    go.focus();
  }

  // Esperar a que la visitante responda el aviso de cookies (máx. 25 s) y luego 0,8 s.
  var t0 = Date.now();
  function espera() {
    var b = document.getElementById('julie-consent-banner');
    if (!b || Date.now() - t0 > 25000) { setTimeout(mostrar, 800); return; }
    setTimeout(espera, 400);
  }
  setTimeout(espera, 1500);   // da tiempo a que el aviso de cookies se dibuje primero
})();
