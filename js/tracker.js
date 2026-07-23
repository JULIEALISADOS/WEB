/**
 * Julie Alisados - Central Analytics & CRO Tracking System v1.0
 * Gestiona eventos unificados para GA4, Google Ads, Meta Pixel, TikTok Pixel y Microsoft Clarity
 */

window.JulieTracker = {
    // 1. WhatsApp Click Event (Lead / Cita)
    trackWhatsApp: function(locationName, serviceOrProductName) {
        const val = 10000;
        const curr = 'COP';

        // GA4 / Google Ads
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', { 'send_to': 'AW-17986280702/NpjPCLC27J0cEP65w4BD' });
            gtag('event', 'generate_lead', {
                'event_category': 'conversion',
                'event_label': `WhatsApp - ${locationName || 'General'}`,
                'value': val,
                'currency': curr,
                'item_name': serviceOrProductName || 'Consulta General'
            });
        }

        // Meta Pixel
        if (typeof fbq === 'function') {
            fbq('track', 'Contact', {
                content_name: `WhatsApp - ${locationName || 'General'}`,
                content_category: 'Lead',
                value: val,
                currency: curr
            });
        }

        // TikTok Pixel
        if (typeof ttq === 'function') {
            ttq.track('Contact', {
                contents: [{ content_id: 'whatsapp_click', content_name: locationName || 'General' }],
                value: val,
                currency: curr
            });
            ttq.track('SubmitForm');
        }
    },

    // 2. Interés / Ver Producto (ViewContent / E-commerce)
    trackProductView: function(productName, price) {
        if (typeof gtag === 'function') {
            gtag('event', 'select_item', {
                'item_name': productName,
                'price': price || 0
            });
        }
        if (typeof fbq === 'function') {
            fbq('track', 'ViewContent', { content_name: productName, value: price || 0, currency: 'COP' });
        }
    },

    // 3. Inicio de Valoración / Captura de Lead (Lead Magnet)
    trackLeadFormSubmit: function(formType, leadData) {
        if (typeof gtag === 'function') {
            gtag('event', 'lead_capture', {
                'event_category': 'lead',
                'event_label': formType,
                'user_consent': true
            });
        }
        if (typeof fbq === 'function') {
            fbq('track', 'Lead', { content_name: formType });
        }
    },

    // 4. Búsqueda Interna en Julie Tips / Productos
    trackSearch: function(searchTerm, category) {
        if (typeof gtag === 'function') {
            gtag('event', 'search', {
                'search_term': searchTerm,
                'content_category': category || 'General'
            });
        }
    }
};

// Global helper retrocompatible
function gtag_report_conversion(url, value, currency) {
    window.JulieTracker.trackWhatsApp('Floating Button', 'Agendamiento');
    if (typeof url !== 'undefined' && url) {
        setTimeout(() => { window.location = url; }, 200);
    }
    return false;
}
