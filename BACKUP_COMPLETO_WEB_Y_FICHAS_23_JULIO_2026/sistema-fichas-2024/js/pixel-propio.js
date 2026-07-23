import { getDb } from './db.js';

/**
 * JuliePixel v1.0 - Sistema de Rastreo Propio para Ventas Segmentadas
 */
export async function initJuliePixel() {
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || (document.referrer.includes('tiktok.com') ? 'TikTok_Bio' : 'Directo');
    const utm_medium = urlParams.get('utm_medium') || (document.referrer.includes('tiktok.com') ? 'Organic' : 'Ninguno');
    const utm_campaign = urlParams.get('utm_campaign') || 'Organico';
    
    // Identificador único para TikTok si viene de un anuncio (ttclid)
    const ttclid = urlParams.get('ttclid');
    if (ttclid) {
        console.log('🎯 TikTok Click ID Detectado:', ttclid);
        sessionStorage.setItem('julie_ttclid', ttclid);
    }
    
    // Capturar ubicación aproximada por IP (GeoIP)
    let ubicacion = 'Desconocida';
    try {
        const geoResp = await fetch('https://ipapi.co/json/');
        const geoData = await geoResp.json();
        if (geoData.city) {
            ubicacion = `${geoData.city}, ${geoData.region}, ${geoData.country_name}`;
        }
    } catch (e) {
        console.warn('GeoIP falló, usando ubicación desconocida');
    }

    // Guardar en sessionStorage para asociar con la ficha técnica al final
    const marketingData = { utm_source, utm_medium, utm_campaign, ubicacion, timestamp: new Date().toISOString() };
    sessionStorage.setItem('julie_marketing_data', JSON.stringify(marketingData));

    console.log('🚀 JuliePixel Activo: Capturando origen...', utm_source);

    // Intentar guardar visita anonima en Supabase para estadisticas de conversion
    try {
        const sb = getDb();
        if (sb) {
            await sb.from('visitas_web').insert([{
                origen: utm_source,
                medio: utm_medium,
                campana: utm_campaign,
                ubicacion: ubicacion,
                pagina: window.location.pathname,
                agente_usuario: navigator.userAgent
            }]);
        }
    } catch (e) {
        // Silencioso para no interrumpir al usuario
        console.warn('JuliePixel Analytics suppressed');
    }
}

export function getMarketingContext() {
    const data = sessionStorage.getItem('julie_marketing_data');
    return data ? JSON.parse(data) : { utm_source: 'Directo', utm_medium: 'Ninguno', utm_campaign: 'Organico' };
}
