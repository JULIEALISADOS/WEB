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

## 3. LIBRO DE MARCA OFICIAL (BRAND BOOK - BY JULIE VALENCIA)

### 🌟 01. Resumen y Slogan Oficial
- **Slogan Principal:** *"Más que un liso, una transformación."*
- **Misión de Marca:** Marca y salón de belleza colombiano especializado en alisados de alto rendimiento y tratamientos restauradores, fundado por Julie Valencia. Enfoque pionero en **'Alisado Saludable'** utilizando fórmulas exclusivas 100% libres de formol y tecnología avanzada para transformar el cabello priorizando la salud y seguridad de la fibra capilar.

### 🎨 02. Paleta de Colores Oficial (Exact Color Palette)
- **Antique Gold:** `#D4AF37` (RGB: 212, 175, 55 | CMYK: 0%, 17%, 74%, 17%) $\rightarrow$ Distinción, elegancia y brillo.
- **Obsidian Black:** `#111111` (RGB: 17, 17, 17 | CMYK: 0%, 0%, 0%, 93%) $\rightarrow$ Contraste premium y fuerza visual.
- **Snow White:** `#FFF0F5` (RGB: 255, 240, 245 | CMYK: 0%, 6%, 4%, 0%) $\rightarrow$ Fondo suave e iluminado.
- **Soft Pink:** `#FFD1DC` (RGB: 255, 209, 220 | CMYK: 0%, 18%, 14%, 0%) $\rightarrow$ Acento femenino y calidez estética.

### ✍️ 03. Tipografías Oficiales (Typography)
- **Primary Typeface (Títulos y Jerarquía):** `Playfair Display` (Elegante, serifada, sofisticada).
- **Secondary Typeface (Cuerpos de Texto y Lectura):** `Lato` (Limpia, moderna, legible).

### 💎 04. Valores Fundamentales (Brand Values)
1. **Health-First (Formaldehyde-free):** La salud del cabello y de la persona siempre es la prioridad #1. Cero formol.
2. **Professional Transparency:** Transparencia profesional, diagnósticos reales y honestidad técnica total.
3. **Scientific Innovation:** Innovación científica, química cosmética avanzada y tricología comprobada (Cero pseudociencia).
4. **Personalized Excellence:** Excelencia y diagnóstico personalizado para cada tipo de fibra capilar.

### 🎙️ 05. Tono de Voz y Estética (Tone & Aesthetic)
- **Tono de Voz:**
  - **Profesional:** Con conocimiento técnico y autoridad en salud capilar.
  - **Transparente:** Honesto, claro y sin falsas promesas.
  - **Cálido & Empático (Caring):** Cercano, amoroso y enfocado en resolver las inseguridades de la clienta.
  - **Entusiasta:** Apasionado por el brillo, la libertad y la transformación del cabello.
- **Estética Visual:** *Golden sophistication, modern feminine minimalist, polished professionalism, soft-focus luxury, clean beauty identity.*

### 🚫 06. Reglas Críticas de Vocabulario y Marca
- ❌ **PROHIBIDO:** Usar las palabras *"hebra"* y *"melena"* (sustituir siempre por *cabello, fibra capilar, puntas*).
- ❌ **PROHIBIDO:** Usar expresiones vulgares como *"rendimiento familiar gigante"* (sustituir por *Presentación profesional de alto rendimiento*, *Fórmula concentrada de 1000 ml*).
- ❌ **PROHIBIDA LA PSEUDOCIENCIA:** Nada de "fases de la luna" ni recetas de cocina. Crecimiento = 1 a 1.2 cm/mes; el secreto es la retención anti-quiebre.
- **Línea de Post-Cuidado JA By Julie Valencia:** *Extractos Naturales (1000 ml)*, *Aceite de Argán con Biotina y Ácido Hialurónico (500 ml)*, *Termoprotector JA con Perfume Capilar*, *Aceite Reparador de Argán y Macadamia JA (60 ml)*, *Ampolla S.O.S.*.
- **Sedes Comerciales:** Tunja (Avenida Olímpica #190, Pasaje Boulevard, Local 140) y Moniquirá (Carrera 6 # 18 - 68). WhatsApp: +57 304 358 8180.

---

## 4. RESPALDO PERMANENTE: GARANTÍA DE TERAPIAS CAPILARES (Para restaurar cuando se solicite)
> **Nota de memoria:** Este texto fue redactado y aprobado con respaldo legal (obligación de medio, 7 días de garantía, evaluación audiovisual y presencial). Está temporalmente oculto en `politica-garantia.html` por instrucción del usuario y listo para ser activado nuevamente cuando se indique.

```html
<!-- Sección: GARANTÍA — TERAPIAS CAPILARES (Disciplinantes, Hidratantes y Nutritivas) -->
<h2>Garantía — Terapias Capilares (Disciplinantes, Hidratantes y Nutritivas)</h2>

<div class="commitment-box">
    <p>En <strong>Julie Alisados</strong> queremos que cada cliente se sienta acompañado y tranquilo con el servicio que recibe. Por eso, nuestras <strong>terapias capilares disciplinantes, hidratantes y nutritivas</strong> cuentan con un término de garantía de <strong>siete (7) días calendario</strong>, contados a partir de la fecha de realización del servicio.</p>
</div>

<p>Esta garantía respalda la calidad e idoneidad de la prestación del servicio, la correcta aplicación técnica de la terapia y la calidad de los productos utilizados, de acuerdo con las condiciones ofrecidas al cliente.</p>

<p>En los servicios que constituyen una <strong>obligación de medio</strong>, la garantía se relaciona con las condiciones de calidad en las que se presta el servicio y no con la obligación de obtener un resultado estético específico.</p>

<p>Por esta razón, no es posible garantizar que todas las personas obtengan exactamente el mismo resultado. La respuesta del cabello puede variar de una persona a otra y también puede variar en una misma persona en diferentes momentos.</p>

<div class="care-box">
    <h3>Factores de variación capilar</h3>
    <p>El cabello cambia con el tiempo. Su condición puede verse influenciada por factores como el crecimiento de cabello nuevo, cortes, tinturas, decoloraciones, procesos químicos anteriores, exposición al calor, productos utilizados, hábitos de cuidado y el estado de la fibra capilar al momento de cada servicio.</p>
    <p>Por lo tanto, que una misma persona haya obtenido determinado resultado en una terapia anterior no significa que necesariamente obtendrá exactamente el mismo resultado en una nueva sesión, incluso cuando se realice la misma terapia. En cada ocasión se trabaja sobre un cabello que puede encontrarse en condiciones diferentes.</p>
</div>

<p>Los <strong>siete (7) días</strong> establecidos permiten que el cliente pueda lavar, secar, peinar y utilizar su cabello de manera habitual, siguiendo las recomendaciones entregadas por Julie Alisados, y observar su comportamiento después del servicio.</p>

<h3>¿Qué cubre la garantía?</h3>
<p>La garantía cubre situaciones que, después de la correspondiente evaluación, puedan estar relacionadas con:</p>
<ul>
    <li>Una aplicación técnica incorrecta de la terapia.</li>
    <li>Incumplimiento de las condiciones del servicio ofrecidas al cliente.</li>
    <li>Problemas de calidad o idoneidad de los productos utilizados que sean atribuibles a Julie Alisados.</li>
    <li>Cualquier otra situación que permita establecer que el servicio no fue prestado bajo las condiciones de calidad ofrecidas.</li>
</ul>
<p class="legal-note"><em>La garantía no garantiza un resultado estético específico, una duración determinada ni que el cabello responda exactamente igual a una sesión anterior.</em></p>

<h3>¿Qué no cubre la garantía?</h3>
<p>La garantía no comprende situaciones que se originen o se modifiquen posteriormente por:</p>
<div class="exclusion-box">
    <ul>
        <li>Tinturas, decoloraciones u otros procesos químicos realizados después del servicio.</li>
        <li>Procedimientos realizados por terceros.</li>
        <li>Uso inadecuado de herramientas de calor o productos no recomendados.</li>
        <li>Incumplimiento de las recomendaciones de cuidado entregadas al finalizar el servicio.</li>
        <li>Condiciones particulares o cambios naturales de la fibra capilar que no sean atribuibles a una deficiencia en la prestación del servicio.</li>
        <li>Expectativas personales respecto de un resultado estético diferente al que razonablemente puede proporcionar la terapia de acuerdo con las condiciones particulares del cabello.</li>
    </ul>
</div>

<h3>Proceso de Reclamación para Terapias Capilares</h3>
<p>Para solicitar la evaluación de la garantía, el cliente deberá:</p>
<ol>
    <li>Comunicar la situación a Julie Alisados dentro de los <strong>siete (7) días calendario</strong> siguientes a la realización del servicio.</li>
    <li>Cuando sea necesario para realizar una valoración inicial, enviar un video del cabello recién lavado y secado con secador, sin utilizar plancha, siguiendo las recomendaciones de lavado y cuidado entregadas al finalizar el servicio.</li>
    <li>Procurar que el video permita observar claramente el estado general del cabello y la situación que motiva la reclamación.</li>
    <li>Informar qué productos se han utilizado en el cabello después de la realización de la terapia y si se ha realizado algún procedimiento adicional.</li>
</ol>
<p>Esta información permite realizar una evaluación más objetiva y determinar si la situación reportada puede estar relacionada con la prestación del servicio.</p>

<h3>Evaluación Inicial</h3>
<p>Julie Alisados revisará la información y el material enviado por el cliente. Cuando el material permita determinar suficientemente la situación, se informará al cliente el resultado de la evaluación.</p>
<p>El material fotográfico o audiovisual enviado por el cliente permite realizar una valoración inicial, pero no siempre permite determinar con precisión el estado de la fibra capilar ni establecer la causa de la situación reportada. Por esta razón, no es posible realizar en todos los casos una valoración completa únicamente mediante fotografías o videos.</p>

<h3>Valoración y Verificación Presencial en Sede</h3>
<p>Cuando sea necesario, Julie Alisados podrá citar al cliente en la sede para realizar una valoración presencial del cabello.</p>
<p>La valoración presencial permite observar directamente las características, el estado y el comportamiento de la fibra capilar y, cuando sea necesario, realizar un lavado y secado siguiendo las recomendaciones de cuidado indicadas para la terapia realizada.</p>
<p>Esta evaluación tiene como finalidad determinar de manera objetiva si la situación reportada puede estar relacionada con la correcta prestación técnica del servicio y, en caso de ser necesario, establecer la solución que corresponda.</p>

<h3>Resultados de la Evaluación</h3>
<div class="result-grid">
    <div class="result-card valid">
        <h3>Cuando la garantía sea procedente</h3>
        <p>Si después de la evaluación se determina que existe una deficiencia atribuible a la prestación del servicio, Julie Alisados realizará la corrección que corresponda de acuerdo con la naturaleza del caso, <strong>sin costo para el cliente</strong>, conforme a la normativa aplicable.</p>
        <p>Cuando técnicamente sea necesario realizar una nueva aplicación o intervención sobre el cabello, esta no se efectuará inmediatamente. Se respetará el tiempo de espera que resulte adecuado para preservar la integridad de la fibra capilar y evitar someterla innecesariamente a nuevos procedimientos.</p>
        <p>La fecha de la eventual corrección será acordada con el cliente teniendo en cuenta la condición del cabello y las recomendaciones técnicas correspondientes.</p>
    </div>
    <div class="result-card invalid">
        <h3>Cuando la garantía no sea procedente</h3>
        <p>Si después de la evaluación se determina que la situación reportada no corresponde a una deficiencia en la prestación del servicio, Julie Alisados explicará al cliente de manera clara las razones de la decisión y las recomendaciones pertinentes para el cuidado del cabello.</p>
        <p>La evaluación de una solicitud de garantía no genera por sí misma un cobro al cliente. Si posteriormente el cliente solicita un servicio adicional de lavado, secado u otro procedimiento que no haga parte de la evaluación de garantía, dicho servicio podrá tener el costo previamente informado.</p>
    </div>
</div>

<h3>Responsabilidad y Cuidado del Cliente</h3>
<p>Para obtener el mejor resultado posible y conservar adecuadamente el cabello, recomendamos seguir las instrucciones entregadas por Julie Alisados después de cada terapia. Estas pueden incluir, según la terapia realizada y las características particulares del cabello:</p>
<ul>
    <li>Utilizar los productos recomendados para el cuidado posterior.</li>
    <li>Mantener una adecuada higiene capilar y realizar los lavados con la frecuencia indicada por el profesional.</li>
    <li>Evitar dormir con el cabello mojado.</li>
    <li>Utilizar adecuadamente las herramientas de calor y aplicar protector térmico cuando corresponda.</li>
    <li>Evitar realizar tinturas, decoloraciones u otros procesos químicos sin valorar previamente la condición de la fibra capilar.</li>
    <li>Informar a Julie Alisados sobre cualquier procedimiento químico realizado posteriormente cuando se solicite una evaluación.</li>
</ul>
<p class="legal-note">Las recomendaciones pueden variar de acuerdo con la terapia realizada y con las condiciones particulares de cada cabello.</p>

<div class="commitment-box">
    <p>En Julie Alisados queremos que cualquier inquietud sea escuchada y evaluada con respeto. Nuestra intención es brindar una solución adecuada cuando exista una situación atribuible al servicio, manteniendo siempre una comunicación clara y respetando los derechos reconocidos al consumidor por la legislación colombiana vigente.</p>
</div>
```

---
*Copia de seguridad y alineación de equipo completada con éxito. Memoria y estado resguardados en Git y backups locales.*
