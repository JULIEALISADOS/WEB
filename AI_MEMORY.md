# 🧠 AI_MEMORY - Respaldo de Conocimiento del Sistema
**Fecha de última copia de seguridad:** 19 de Mayo de 2026 (Actualización de FAQ y Notificaciones)
**Propietario:** Julie Alisados By Julie Valencia
**Acceso:** ESTRICTAMENTE PRIVADO Y CONFIDENCIAL.

---

## 1. ESTADO DE LOS PROYECTOS (DIAGNÓSTICO DIGITAL)

### 🌐 Página Web Principal (`juliealisados.com`)
- **Estado:** Producción / Activa y Optimizada.
- **Detalles:** Código HTML/CSS optimizado. Contiene los píxeles de Meta, TikTok y GA4 funcionando perfectamente.
- **FAQ Optimizada:** Se removieron las categorías "Todas" y "Para Estilistas" (y su pregunta técnica respectiva) para un enfoque puro al cliente. Se implementó una lógica de inicialización en JS para que al cargar la página se muestre únicamente "Alisados y Tiempos" en lugar de un "larguero" desordenado.
- **Legales:** Todas las políticas (Privacidad, Garantías, Cookies) están enlazadas en el pie de página y cumplen con la normatividad colombiana (SIC).
- **Carpeta Local:** Raíz del repositorio (Con respaldo en `backups-web-v1.0`).

### 📋 App Ficha Técnica (`sistema-fichas-2024`)
- **Estado:** BETA Avanzada / Producción Inicial.
- **Arquitectura:** PWA (Progressive Web App) que funciona sin internet. Escrita en Vanilla JS.
- **Seguridad y Legal:** 
  - Cumple estrictamente con la Ley 1581 de 2012. El consentimiento informado está incrustado en el código, requiriendo firma digital del cliente y del estilista.
  - Base de datos conectada a Supabase (PostgreSQL) protegida con reglas RLS (Row Level Security). Nadie desde el exterior puede modificar o borrar datos sin autorización.
- **Sedes configuradas:** Tunja y Moniquirá.

### 💰 Calculadora de Comisiones (`JulieComisiones`)
- **Estado:** En Desarrollo.
- **Detalles:** Panel de administración privado. Cuenta con integración a Google Calendar mediante `apis.google.com`. Diseñado para rastrear ingresos diarios/mensuales y la porción correspondiente a cada estilista.

### 🤖 Chatbot LIA (ManyChat / WhatsApp)
- **Estado:** Producción / Configuración de Notificaciones Optimizada.
- **Últimos Ajustes:** El límite de botones interactivos de WhatsApp (máximo 3) fue respetado. Se resolvió el uso de la función "Lista" (hasta 10 opciones).
- **Control de Notificaciones:** Se configuró ManyChat (Settings > Live Chat) para que las conversaciones solo se abran de manera explícita por acciones del bot o manualmente. Esto detuvo el spam de notificaciones automáticas y asegura que solo se alerte al celular de administración en el momento exacto en que la clienta complete la cotización o pida ayuda humana.

---

## 2. DIRECTRICES DE SEGURIDAD Y PRIVACIDAD

1. **Privacidad del Código:** Todo el código fuente de las aplicaciones y la página web es propiedad exclusiva de Julie Alisados. El acceso a este repositorio (`OneDrive/Documentos/GitHub/WEB`) es completamente privado.
2. **Protección de Datos (Supabase):** Las llaves API expuestas en el frontend son de tipo `anon` (públicas), pero el acceso a la lectura y escritura real está bloqueado mediante políticas RLS en la base de datos de Supabase. Nadie puede ver el historial capilar de las clientas excepto la administración de Julie Alisados.
3. **Instrucción de Restauración:** Si la IA (Antigravity/Claude/Gemini) pierde contexto en futuras sesiones, debe leer INMEDIATAMENTE este archivo y `GEMINI.md` para recuperar toda la información técnica, arquitectónica y legal del negocio antes de proponer cualquier cambio.

---

## 3. IDENTIDAD DE MARCA Y MARKETING (Para Claude Cowork & Gemini)

- **Voz de marca:** Elegante, cercana y profesional. Nos enfocamos en empoderar a la mujer ofreciendo un "alisado saludable" libre de formol, priorizando la salud capilar y la transformación personal ("más que un liso, una transformación").
- **Colores y fuentes:**
  - **Paleta de Colores:** Dorado (`#d4af37` / `#c5a059`), Blanco Perla (`#fcfcfc`), Negro/Gris Oscuro Elegante.
  - **Tipografías:** *Playfair Display* (elegante y sofisticada con serif) para títulos y encabezados; *Lato* (limpia y legible sans-serif) para cuerpo de texto y descripciones.
- **Cliente ideal:** Mujeres que buscan un cabello liso, brillante y sano, libre de frizz y químicos agresivos (orgánico, libre de formol). Incluye un segmento especial de mujeres gestantes (a partir del 4to mes) y lactantes. Clientes ubicadas principalmente en Tunja y Moniquirá (Boyacá).
- **Precios actuales:** No se publican fijos en la web, ya que dependen del diagnóstico capilar personalizado (largo, volumen y estado de la hebra). Se derivan las cotizaciones a WhatsApp. Promovemos facilidades de pago (Financiación a cuotas con **Addi** y tarjetas de crédito).
- **Contenido con mayor respuesta:** Videos y fotos de resultados reales tipo **"Antes y Después"** (ej. Alisado Saludable, Emulsión Zero, R.C.P.), testimonios reales de Google/Facebook destacando el brillo y la sedosidad, y las promociones exclusivas de temporada (promos mensuales).
- **Objetivos principales:** 
  1. Captar clientas interesadas y agendar citas en las sedes de Tunja y Moniquirá a través de WhatsApp.
  2. Impulsar la venta de la línea de productos de cuidado en casa (Línea JA) y la línea profesional para estilistas.

---
*Copia de seguridad y alineación de equipo completada con éxito. Memoria y estado resguardados en Git y backups locales.*
