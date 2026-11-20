/**
 * Julie Alisados - Sistema Universal de Medición y Atribución Marketing v1.0
 * Conecta: TikTok Ads, Meta Ads, Google Ads, GA4 y ManyChat (WhatsApp)
 * Garantiza persistencia de UTMs en sesión y enrutamiento trazable end-to-end.
 */

(function () {
  'use strict';

  // 1. CAPTURA Y PERSISTENCIA UNIVERSAL DE PARÁMETROS UTM & CLICK IDs
  const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'gclid',
    'fbclid',
    'ttclid',
    'sede',
    'tipo',
    'cliente',
    'c'
  ];

  function getUrlParams() {
    const params = {};
    try {
      const searchParams = new URLSearchParams(window.location.search);
      UTM_KEYS.forEach(function (key) {
        const val = searchParams.get(key);
        if (val) {
          params[key] = val;
        }
      });
    } catch (e) {
      console.warn('[JulieAnalytics] Error leyendo URLSearchParams', e);
    }
    return params;
  }

  // Consentimiento (Ley 1581): solo se guardan clics publicitarios si la visitante
  // aceptó "todas" o "publicidad". Valores de julie_privacy_consent: granted|denied|analytics|ads
  var UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

  function adsConsentGranted() {
    try {
      var v = localStorage.getItem('julie_privacy_consent');
      return v === 'granted' || v === 'ads';
    } catch (e) { return false; }
  }

  function clearStoredUtms() {
    try { sessionStorage.removeItem('ja_utm_data'); } catch (e) {}
    try { localStorage.removeItem('ja_utm_data'); } catch (e) {}
  }

  function readStored(storage) {
    try {
      var raw = storage.getItem('ja_utm_data');
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data._last_updated || (Date.now() - data._last_updated) > UTM_TTL_MS) {
        storage.removeItem('ja_utm_data');
        return null;
      }
      return data;
    } catch (e) { return null; }
  }

  function saveUtmsToSession() {
    if (!adsConsentGranted()) { clearStoredUtms(); return; }
    const currentParams = getUrlParams();
    const stored = readStored(sessionStorage) || readStored(localStorage) || {};

    // Si la URL actual trae parámetros, sobreescribir o enriquecer
    if (Object.keys(currentParams).length > 0) {
      const merged = Object.assign({}, stored, currentParams, {
        _last_updated: Date.now(),
        _entry_url: window.location.origin + window.location.pathname // sin parámetros
      });
      try {
        sessionStorage.setItem('ja_utm_data', JSON.stringify(merged));
        // Respaldo en localStorage por 30 días (con vencimiento al leer) para atribución multi-sesión
        localStorage.setItem('ja_utm_data', JSON.stringify(merged));
      } catch (e) {
        // Fallback silencioso si cookies/almacenamiento están restringidos
      }
    }
  }

  function getStoredUtms() {
    if (adsConsentGranted()) {
      var s = readStored(sessionStorage) || readStored(localStorage);
      if (s) return s;
    }
    return getUrlParams(); // sin consentimiento: solo lo de la página actual, nada guardado
  }

  // Si la visitante cambia su elección, guardar o borrar al instante
  window.addEventListener('julie-consent-changed', saveUtmsToSession);
  // Guardar inmediatamente al cargar el script
  saveUtmsToSession();

  // 2. FUNCIÓN MAESTRA DE TRACKING MULTIPLATAFORMA (Retrocompatible con gtag_report_conversion)
  window.JulieAnalytics = {
    getStoredData: getStoredUtms,

    trackConversion: function (locationLabel, value, currency) {
      const val = typeof value === 'number' ? value : 10000;
      const curr = currency || 'COP';
      const label = locationLabel || 'WhatsApp General';

      // A. Google Ads & GA4
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17986280702/NpjPCLC27J0cEP65w4BD',
          'value': val,
          'currency': curr
        });
        window.gtag('event', 'generate_lead', {
          'event_category': 'conversion',
          'event_label': label,
          'value': val,
          'currency': curr
        });
      }

      // B. Meta Pixel
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', {
          content_name: label,
          content_category: 'Lead WhatsApp',
          value: val,
          currency: curr
        });
      }

      // C. TikTok Pixel
      if (typeof window.ttq === 'function') {
        window.ttq.track('Contact', {
          contents: [{ content_id: 'wa_conversion', content_name: label }],
          value: val,
          currency: curr
        });
        window.ttq.track('SubmitForm');
      }
    },

    buildWaUrlWithUtms: function (originalUrl) {
      const stored = getStoredUtms();
      let baseUrl = 'wa.html';
      const queryParts = [];

      // Si originalUrl ya trae texto o parámetros, preservarlos
      let existingText = '';
      if (originalUrl && originalUrl.includes('wa.me')) {
        try {
          const parsed = new URL(originalUrl);
          existingText = parsed.searchParams.get('text') || '';
        } catch (e) {}
      }

      // Pasar los UTMs almacenados hacia wa.html
      UTM_KEYS.forEach(function (k) {
        if (stored[k]) {
          queryParts.push(encodeURIComponent(k) + '=' + encodeURIComponent(stored[k]));
        }
      });

      if (existingText && !stored['text']) {
        queryParts.push('text=' + encodeURIComponent(existingText));
      }

      if (queryParts.length > 0) {
        return baseUrl + '?' + queryParts.join('&');
      }
      return baseUrl;
    }
  };

  // 3. DEFINICIÓN GLOBAL UNIFICADA DE gtag_report_conversion (Evita sobreescrituras)
  window.gtag_report_conversion = function (url, value, currency) {
    window.JulieAnalytics.trackConversion('Click WhatsApp', value, currency);

    if (url && typeof url === 'string') {
      // Si el enlace apunta directamente a wa.me, transformarlo a wa.html para atribuir
      const targetUrl = window.JulieAnalytics.buildWaUrlWithUtms(url);
      setTimeout(function () {
        window.location.href = targetUrl;
      }, 250);
      return false;
    }
    return false;
  };

  // 4. MEJORA AUTOMÁTICA DE ENLACES DE WHATSAPP AL CARGAR EL DOM
  document.addEventListener('DOMContentLoaded', function () {
    try {
      const stored = getStoredUtms();
      // Si tenemos datos de campaña, ajustar los enlaces directos a wa.me en la página
      const links = document.querySelectorAll('a[href*="wa.me/573043588180"]');
      links.forEach(function (link) {
        const originalHref = link.getAttribute('href');
        // Asignar el enrutador central wa.html pasando la data de campaña
        const newHref = window.JulieAnalytics.buildWaUrlWithUtms(originalHref);
        link.setAttribute('href', newHref);

        // Si el enlace no tiene onclick asignado, asignarle el tracking unificado
        if (!link.getAttribute('onclick')) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            window.gtag_report_conversion(newHref);
          });
        }
      });
    } catch (e) {
      console.warn('[JulieAnalytics] Error procesando enlaces DOM', e);
    }
  });

})();
