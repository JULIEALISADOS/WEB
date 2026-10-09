/* wa-enlaces.js
 * Pasa TODOS los botones de WhatsApp del sitio por wa.html (nunca wa.me directo) para que:
 *  - el origen viaje como codigo en el saludo (lo calcula wa.html),
 *  - se disparen los pixeles/eventos (Meta, TikTok, Google, GA4) una sola vez, en wa.html,
 *  - se respete el consentimiento (Ley 1581).
 * Conserva el mensaje original de cada boton (parametro text) y deduce la sede por la pagina o el texto.
 * Si este archivo no carga, los botones siguen abriendo WhatsApp directo (no se pierde la cita).
 */
(function () {
  'use strict';
  var TEL = '573043588180';
  var CLAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

  function leer(k) { try { return sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function guardar(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  // Primer toque de la visita: si llega con utm, se recuerda mientras navega por el sitio.
  var qs = new URLSearchParams(window.location.search);
  if (qs.get('utm_source')) { CLAVES.forEach(function (k) { guardar('ja_' + k, (qs.get(k) || '').toLowerCase()); }); }

  var pagina = (window.location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';

  function sedeDe(texto) {
    var p = pagina.toLowerCase(), t = (texto || '').toLowerCase();
    if (p.indexOf('moniquira') > -1) return 'Moniquira';
    if (p.indexOf('tunja') > -1) return 'Tunja';
    if (t.indexOf('moniquir') > -1) return 'Moniquira';
    if (t.indexOf('tunja') > -1) return 'Tunja';
    return '';
  }

  function aWa(a) {
    if (!a || !a.getAttribute) return;
    var href = a.getAttribute('href') || '';
    if (a.getAttribute('data-wa-ok') === '1') return;
    var u;
    try { u = new URL(href, window.location.href); } catch (e) { return; }
    var esWa = (u.hostname === 'wa.me' && u.pathname.replace(/\//g, '') === TEL) ||
               (u.hostname === 'api.whatsapp.com' && u.searchParams.get('phone') === TEL);
    if (!esWa) return;

    var texto = u.searchParams.get('text') || '';
    var origen = leer('ja_utm_source') || 'web';
    var medio = leer('ja_utm_medium') || 'boton';
    var campana = leer('ja_utm_campaign') || ('web-' + pagina);
    var sede = sedeDe(texto);
    var tipo = pagina === 'linea-profesional' ? 'mayorista' : 'cita';

    var d = new URL('wa.html', window.location.origin + '/');
    d.searchParams.set('utm_source', origen);
    d.searchParams.set('utm_medium', medio);
    d.searchParams.set('utm_campaign', campana);
    var contenido = leer('ja_utm_content');
    if (contenido) d.searchParams.set('utm_content', contenido);
    if (sede) d.searchParams.set('sede', sede);
    d.searchParams.set('tipo', tipo);
    if (texto) d.searchParams.set('text', texto);

    a.setAttribute('href', d.pathname + d.search);
    a.setAttribute('data-wa-ok', '1');
    // wa.html es el UNICO que reporta la conversion de Google (evita contarla doble).
    a.removeAttribute('onclick');
  }

  function barrer(raiz) {
    var l = (raiz || document).querySelectorAll('a[href*="wa.me/' + TEL + '"], a[href*="api.whatsapp.com"]');
    for (var i = 0; i < l.length; i++) aWa(l[i]);
  }

  // Enlaces ya presentes
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { barrer(); });
  else barrer();

  // Enlaces creados por JavaScript despues (p. ej. el test de rutina capilar o el carrito): se corrigen justo antes del clic/toque.
  ['mousedown', 'touchstart', 'click', 'auxclick', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (a) aWa(a);
    }, true);
  });
})();
