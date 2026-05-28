# 🧠 BACKUP Y ARQUITECTURA DE DATOS (JULIE ALISADOS)
**Fecha de creación:** 20 de Mayo de 2026
**Propósito:** Este archivo contiene la configuración oficial de la infraestructura de datos y marketing para la Gerencia General. Ha sido creado para que cualquier IA futura (Gemini, Claude, Antigravity) pueda leerlo inmediatamente y saber qué scripts y webhooks están planeados o en uso.

---

## 📊 FASE 1: PUENTE DE GOOGLE ADS A GOOGLE SHEETS (Listo para implementar)
**Objetivo:** Extraer métricas diarias de las campañas de Tunja y Moniquirá (Costo, Clics, Leads) sin exponer datos personales (Cero PII).
**Herramienta:** Google Apps Script (Se ejecuta dentro de la consola de Google Ads).

### Código Oficial (`DailyMetricsBridge.gs`)
```javascript
function main() {
  const sheetId = 'TU_SPREADSHEET_ID_AQUI'; // Reemplazar con ID real
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadsheet.getSheetByName('Daily_Metrics') || spreadsheet.insertSheet('Daily_Metrics');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Campaña', 'Impresiones', 'Clics', 'Costo (COP)', 'Conversiones (Leads)', 'Costo x Lead']);
  }

  const query = `
    SELECT campaign.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions 
    FROM campaign 
    WHERE segments.date = DURING_YESTERDAY AND campaign.status = 'ENABLED'
  `;

  const report = AdsApp.report(query);
  const rows = report.rows();
  
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterday = Utilities.formatDate(date, AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd');

  while (rows.hasNext()) {
    const row = rows.next();
    const cost = parseFloat(row['metrics.cost_micros']) / 1000000; 
    const conversions = parseFloat(row['metrics.conversions']);
    const cpl = conversions > 0 ? (cost / conversions).toFixed(2) : 0;

    sheet.appendRow([yesterday, row['campaign.name'], row['metrics.impressions'], row['metrics.clicks'], cost.toFixed(2), conversions, cpl]);
  }
}
```

---

## 🔗 FASE 2: WEBHOOK DE MANYCHAT A SUPABASE (Leads Meta Ads)
**Objetivo:** Atribuir correctamente qué anuncios de Facebook/Instagram están generando leads en WhatsApp, almacenando la intención sin guardar el número de teléfono.
**Herramienta:** Supabase Edge Functions (TypeScript).

### 1. Estructura del JSON Payload (Lo que envía ManyChat)
```json
{
  "interaction_id": "mc_123456789_987654321",
  "subscriber_id": "8877665544332211",
  "channel": "instagram",
  "intent": "Cotización Alisado Tunja",
  "campaign_source": "IG_Story_EmulsionZero_Mayo",
  "timestamp": "2026-05-20T17:45:00Z"
}
```

### 2. Código de la Edge Function en Supabase (TypeScript)
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const expectedSecret = Deno.env.get('MANYCHAT_WEBHOOK_SECRET');
  if (req.headers.get('X-ManyChat-Secret') !== expectedSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized access" }), { status: 401 });
  }

  const payload = await req.json();
  const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

  const { error } = await supabaseClient.from('leads_entrantes').upsert({
    interaction_id: payload.interaction_id,
    subscriber_id: payload.subscriber_id,
    channel: payload.channel,
    intent: payload.intent,
    campaign_source: payload.campaign_source,
    created_at: payload.timestamp
  }, { onConflict: 'interaction_id' });

  if (error) return new Response(JSON.stringify({ error: "DB Error" }), { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
})
```

---
**ESTADO DEL PROYECTO:** Aprobado por la Gerencia General. Pendiente de implementación manual por parte del administrador cuando se requiera iniciar la recolección de datos. No se ha modificado LIA ni las plataformas en vivo.
