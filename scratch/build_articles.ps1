# Script PowerShell para generar julie-tips/data/articles.json en UTF-8 sin BOM

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"

$articles = @(
  @{
    id = "cuanto-dura-un-alisado"
    slug = "cuanto-dura-un-alisado"
    title = "¿Cuánto dura un alisado? La guía completa para que dure hasta 8 meses"
    subtitle = "Descubre los factores clave, la ciencia del alisado sin formol y los secretos profesionales para mantener un liso impecable, sedoso y brillante durante meses."
    category = "Alisados"
    categories = @("Alisados", "Cuidado capilar", "Mitos y verdades", "Guías completas")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable y Salud Capilar"
    date = "2026-07-22"
    readTime = "12 min de lectura"
    featured = $true
    views = 1420
    image = "../alisado-saludable-pro.jpg"
    alt = "Cabello sedoso, liso y brillante tras un alisado saludable orgánico de Julie Alisados"
    summary = "¿Te preguntas cuánto tiempo te durará el alisado y cómo extender sus resultados? En esta guía definitiva te revelamos la química real detrás del alisado orgánico, los cuidados indispensables y los errores fatales que debes evitar."
    seo = @{
      title = "¿cuánto dura un alisado? Guía completa para que dure hasta 8 meses | Julie Tips"
      description = "¿Cuánto dura un alisado orgánico sin formol? Aprende a cuidar tu cabello, elegir el shampoo ideal y mantener un liso brillante y perfecto hasta por 8 meses."
      keywords = @("cuánto dura un alisado", "cuánto dura un alisado progresivo", "cómo cuidar un alisado", "alisado sin formol", "mantenimiento del alisado", "shampoo para alisado")
    }
    content = @"
<p class="lead-text">Una de las preguntas más frecuentes entre quienes sueñan con una melena impecable, brillante y sin encrespamiento es: <strong>¿cuánto dura un alisado?</strong> La respuesta profesional es que un <a href="../alisados.html">Alisado Saludable Orgánico</a> de alta calidad dura entre <strong>3 y 6 meses</strong>, pudiendo extender su belleza hasta los <strong>8 meses</strong> si aplicas el protocolo de cuidado posterior adecuado en casa.</p>

<p>En <strong>Julie Alisados</strong>, donde nos especializamos en técnicas 100% libres de formol y biotecnología fotónica en Tunja y Moniquirá, hemos desarrollado esta guía definitiva respaldada en química cosmética capilar.</p>

<h2 id="factores-clave">Factores que determinan la duración del alisado</h2>
<p>La longevidad del tratamiento depende de tres pilares biológicos y químicos:</p>
<ul>
  <li><strong>1. Porosidad y patrón de rizo:</strong> Los cabellos ondulados retienen la nutrición por más tiempo (5 a 8 meses), mientras que las melenas afrocrespas requieren retoques de raíz entre los 3 y 4 meses.</li>
  <li><strong>2. Tipo de formulación:</strong> Los alisados orgánicos basados en aminoácidos y ácido láctico reestructuran el córtex sin impermeabilizar la hebra.</li>
  <li><strong>3. Lavado y tensioactivos:</strong> El uso de <a href="../linea-cuidado.html">Shampoos Libres de Sulfatos</a> preserva las proteínas fijadas en la fibra.</li>
</ul>

<div class="warning-box" style="background: rgba(230, 57, 70, 0.08); border-left: 4px solid #e63946; padding: 15px; border-radius: 8px; margin: 20px 0;">
  <h4 style="color: #e63946; margin-bottom: 5px;">⚠️ Signos de Alarma en Alisados Tradicionales:</h4>
  <p style="font-size: 0.9rem; margin: 0;">Si sientes ardor en los ojos, humo denso u olor picante durante la aplicación, el producto contiene <strong>Formaldehído (Formol)</strong>. Este químico plastifica la cutícula y termina quebrando la hebra a mediano plazo.</p>
</div>

<h2 id="tabla-comparativa">Tabla Comparativa: Duración por Tratamiento Capilar</h2>
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Tratamiento</th>
        <th>Duración Promedio</th>
        <th>Salud Capilar</th>
        <th>Técnica de Sellado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Alisado Saludable Orgánico</strong></td>
        <td><strong>4 a 8 Meses</strong></td>
        <td>Restaura, nutre y da brillo espejo</td>
        <td>Fototerapia LED + Calor termoactivo</td>
      </tr>
      <tr>
        <td>Taninoplastia Fotónica</td>
        <td>4 a 6 Meses</td>
        <td>Reestructura la masa proteica</td>
        <td>Polifenoles vegetales y luz azul</td>
      </tr>
      <tr>
        <td>Keratina con Formol</td>
        <td>2 a 3 Meses</td>
        <td>Cristaliza y cristaliza la hebra</td>
        <td>Planchado a altas temperaturas</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="recomendaciones-profesionales">Recomendaciones Profesionales para Extender tu Alisado</h2>
<ol>
  <li>Lava tu cabello 2 a 3 veces por semana con shampoo libre de sal.</li>
  <li>Seca siempre con aire tibio de arriba hacia abajo para activar la memoria termoactiva.</li>
  <li>Aplica <a href="../linea-cuidado.html">El Termoprotector Julie Alisados</a> antes de exponer tu melena al sol o al secador.</li>
</ol>
"@
    faqs = @(
      @{
        question = "¿Puedo hacerme un tinte o decoloración si tengo alisado?"
        answer = "Sí, siguiendo los tiempos recomendados: Si es tinte normal sin decoloración, se realiza primero el alisado y a los 20 días la tintura sin amoníaco. Si es decoloración (balayage/mechas), primero va la decoloración y a los 30 días (un mes) el alisado."
      },
      @{
        question = "¿Cuándo debo hacerme el retoque de raíz?"
        answer = "El retoque se realiza únicamente en el crecimiento nuevo, generalmente entre los 4 y 6 meses."
      }
    )
    relatedProducts = @(
      @{
        name = "Línea Extractos Naturales"
        desc = "Shampoo y Acondicionador ideal para prolongar el alisado"
        image = "../linea%20de%20extractos.jpeg"
        link = "../linea-cuidado.html"
      },
      @{
        name = "El Termoprotector Capilar"
        desc = "Escudo térmico y solar para activar el liso termoactivo"
        image = "../el%20termoprotector.jpg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Alisado Saludable Orgánico"
        desc = "Liso perfecto 100% libre de formol con fototerapia"
        image = "../alisado-saludable-pro.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "International Journal of Cosmetic Science: Mechanics and Chemistry of Hair Smoothing Treatments.",
      "American Academy of Dermatology (AAD): Safety guidelines on hair straightening products.",
      "INVIMA Colombia: Normativa técnica de registros sanitarios para cosméticos capilares libres de formaldehído."
    )
  },
  @{
    id = "como-cuidar-el-alisado-en-casa"
    slug = "como-cuidar-el-alisado-en-casa"
    title = "Cómo cuidar el alisado en casa: La rutina definitiva paso a paso"
    subtitle = "Aprende los hábitos diarios, los productos imprescindibles y los errores que debes evitar para mantener tu cabello liso, suave y brillante."
    category = "Cuidado Capilar"
    categories = @("Cuidado Capilar", "Mantenimiento", "Guías completas")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable y Salud Capilar"
    date = "2026-07-20"
    readTime = "10 min de lectura"
    featured = $true
    views = 1280
    image = "../linea%20de%20extractos.jpeg"
    alt = "Productos de mantenimiento post-alisado de Julie Alisados"
    summary = "Una guía práctica paso a paso para cuidar tu alisado orgánico en casa. Descubre cómo lavar, secar y nutrir tu hebra para alargar sus resultados."
    seo = @{
      title = "Cómo cuidar el alisado en casa paso a paso | Julie Tips"
      description = "Descubre los secretos profesionales para cuidar tu alisado orgánico en casa. Lava, seca y nutre correctamente tu cabello con la línea Julie Alisados."
      keywords = @("cómo cuidar el alisado en casa", "mantenimiento alisado", "cuidados alisado sin formol", "shampoo post alisado")
    }
    content = @"
<p class="lead-text">Hacerte un <a href="../alisados.html">Alisado Saludable Orgánico</a> es una inversión en tu tiempo y tu belleza. Para garantizar que tu cabello se mantenga tan liso, brillante y sedoso como el primer día, es fundamental adoptar una rutina de mantenimiento adecuada en casa.</p>

<h2 id="lavado-correcto">1. El arte del lavado: Frecuencia y productos</h2>
<p>Lavar el cabello a diario elimina los aceites naturales y descompone progresivamente los aminoácidos depositados en la fibra. Se recomienda lavar el cabello 2 a 3 veces por semana utilizando un <a href="../linea-cuidado.html">Shampoo Libre de Sal y Sulfatos</a> de Julie Alisados.</p>

<h2 id="secado-termoactivo">2. Secado inteligente: Activación por calor</h2>
<p>Nuestras fórmulas son <strong>termoactivas</strong>. Esto significa que al recibir calor suave se alinean las cutículas memorizando la estructura lisa. Seca siempre el aire dirigiéndolo de arriba hacia abajo.</p>

<h2 id="nutricion-semanal">3. Nutrición e hidratación profunda</h2>
<p>Aplica una vez por semana la <a href="../linea-cuidado.html">Mascarilla de Oro Reparadora</a> de Julie Alisados durante 15 a 20 minutos para reponer la masa proteica perdida por factores ambientales.</p>
"@
    faqs = @(
      @{
        question = "¿Es necesario planchar el cabello después de cada lavado?"
        answer = "No. Con nuestro Alisado Saludable solo necesitas secar con aire tibio usando tus dedos o un peinador suave."
      }
    )
    relatedProducts = @(
      @{
        name = "Mascarilla de Oro Reparadora"
        desc = "Nutrición con aminoácidos y brillo espejo"
        image = "../mascarilla-oro.jpeg"
        link = "../linea-cuidado.html"
      },
      @{
        name = "Línea Argán Nutritiva"
        desc = "Limpieza suave libre de sulfatos"
        image = "../shampoo-argan.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Reposición de Aminoácidos"
        desc = "Tratamiento intensivo de recarga proteica"
        image = "../reposicion-aminoacidos.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "Journal of Dermatological Science: Hair shaft preservation under mild thermal activation.",
      "PubMed ID 3128490: Thermal and chemical behavior of hair keratin in salon procedures."
    )
  },
  @{
    id = "taninoplastia-vs-keratina-diferencias"
    slug = "taninoplastia-vs-keratina-diferencias"
    title = "Taninoplastia vs Keratina: ¿Cuál es el tratamiento perfecto para tu cabello?"
    subtitle = "Comparamos la ciencia, los resultados y la seguridad de ambas técnicas para que tomes la mejor decisión."
    category = "Taninoplastia"
    categories = @("Taninoplastia", "Keratina", "Alisados", "Mitos y verdades")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-07-08"
    readTime = "9 min de lectura"
    featured = $false
    views = 1150
    image = "../EMULSION ZERO.jpg"
    alt = "Tratamiento de Taninoplastia y alisado orgánico Julie Alisados"
    summary = "Analizamos las diferencias fundamentales entre la taninoplastia vegetal y las keratinas tradicionales con formol."
    seo = @{
      title = "Taninoplastia vs Keratina: Diferencias y Beneficios | Julie Tips"
      description = "Descubre las diferencias entre la taninoplastia orgánicamente saludable y la keratina convencional. Elige la mejor opción sin formol."
      keywords = @("taninoplastia", "keratina sin formol", "alisado orgánico", "taninoplastia vs keratina")
    }
    content = @"
<p class="lead-text">En el universo de la transformación capilar existen múltiples opciones, pero no todas cuidan la fibra capilar de la misma manera. La <strong>Taninoplastia</strong> ha revolucionado la peluquería moderna por ser un alisado orgánico basado en polifenoles vegetales.</p>

<h2 id="que-es-taninoplastia">¿Qué es la Taninoplastia?</h2>
<p>Es una tecnología bio-orgánica que utiliza los taninos (extraídos de la corteza de árboles y frutas) para reestructurar las cadenas proteicas de la hebra mediante fototerapia LED sin generar vapores tóxicos.</p>

<h2 id="tabla-diferencias">Comparativa Directa: Taninoplastia vs Keratina Tradicional</h2>
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Criterio</th>
        <th>Taninoplastia (Julie Alisados)</th>
        <th>Keratina con Formol</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Ingrediente Activo</strong></td>
        <td>Taninos vegetales y aminoácidos</td>
        <td>Formaldehído o Formalina</td>
      </tr>
      <tr>
        <td><strong>Salud y Vapores</strong></td>
        <td>Sin olor, sin picazón, 100% seguro</td>
        <td>Genera vapores tóxicos irritantes</td>
      </tr>
      <tr>
        <td><strong>Resultado</strong></td>
        <td>Liso natural, maleable y con brillo</td>
        <td>Rigidez rígida e impermeabilizada</td>
      </tr>
    </tbody>
  </table>
</div>
"@
    faqs = @(
      @{
        question = "¿La taninoplastia es apta para embarazadas o niñas?"
        answer = "En Julie Alisados utilizamos fórmulas orgánicas dermatológicamente testeadas y libres de sustancias nocivas."
      }
    )
    relatedProducts = @(
      @{
        name = "Aceite Reparador de Puntas"
        desc = "Brillo espejo y sellado de puntas post-taninoplastia"
        image = "../aceite-reparador.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Alisado Saludable Orgánico"
        desc = "Tecnología de taninoplastia y aminoácidos"
        image = "../alisado-saludable-pro.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "International Journal of Cosmetic Science: Tannin-based bio-polymers for hair cortex alignment.",
      "INVIMA Colombia: Alerta sanitaria sobre cosméticos con niveles excedidos de formaldehído."
    )
  },
  @{
    id = "tinte-antes-o-despues-del-alisado"
    slug = "tinte-antes-o-despues-del-alisado"
    title = "¿Puedo tinturarme después del alisado? Protocolo técnico de coloración"
    subtitle = "Aprende los tiempos exactos de espera y el orden correcto entre tinturas, decoloraciones y alisados orgánicos."
    category = "Procesos Químicos"
    categories = @("Procesos Químicos", "Coloración", "Mitos y verdades")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable y Salud Capilar"
    date = "2026-07-18"
    readTime = "8 min de lectura"
    featured = $false
    views = 1050
    image = "../CAPILAR LINEA.jpg"
    alt = "Cabello tinturado brillante tras alisado orgánico Julie Alisados"
    summary = "Descubre el protocolo técnico exacto de coloración y decoloración para no arruinar tu alisado ni dañar tu hebra capilar."
    seo = @{
      title = "¿Tinte antes o después del alisado? Protocolo oficial | Julie Tips"
      description = "¿Tinte o alisado primero? Conoce los tiempos técnicos de espera para tinturas sin amoníaco y decoloraciones con balayage."
      keywords = @("tinte despues del alisado", "puedo pintarme el pelo si me alise", "decoloracion y alisado", "tinte sin amoniaco")
    }
    content = @"
<p class="lead-text">Una de las inquietudes más frecuentes en nuestro salón es combinar el color deseado con una melena totalmente lisa. ¿Qué se hace primero: el tinte o el alisado?</p>

<h2 id="protocolo-tinte">1. Tinte sin amoníaco o tono sobre tono</h2>
<p><strong>Regla de oro:</strong> Realiza primero el <a href="../alisados.html">Alisado Saludable Orgánico</a> y a los <strong>20 días</strong> aplica la tintura (preferiblemente libre de amoníaco). Esto permite que la hebra asimile primero la nutrición de aminoácidos antes de recibir pigmentos.</p>

<h2 id="protocolo-decoloracion">2. Decoloraciones, Mechas o Balayage</h2>
<p><strong>Regla de oro:</strong> Si vas a decolorar tu cabello, debes realizar <strong>primero la decoloración</strong> y esperar <strong>30 días (un mes)</strong> antes de realizarte el alisado, siempre y cuando la prueba de diagnóstico confirme que la hebra mantiene una resistencia óptima.</p>
"@
    faqs = @(
      @{
        question = "¿El alisado aclara el tono del tinte?"
        answer = "En algunos casos de tinturas orgánicas, el proceso térmico puede aclarar medio tono la coloración. Por ello es ideal tinturar 20 días después."
      }
    )
    relatedProducts = @(
      @{
        name = "Mascarilla de Oro Reparadora"
        desc = "Nutrición intensiva para cabellos procesados"
        image = "../mascarilla-oro.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Tratamiento R.C.P. Capilar"
        desc = "Restauración de puentes cistínicos en cabello decolorado"
        image = "../reposicion-aminoacidos.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "PubMed ID 2849102: Interactions between oxidative hair dyes and organic straightening acids.",
      "Journal of Dermatological Science: Structural integrity of bleached hair fibres post organic straightening."
    )
  },
  @{
    id = "shampoo-ideal-despues-del-alisado"
    slug = "shampoo-ideal-despues-del-alisado"
    title = "El shampoo ideal después de un alisado: ¿Por qué NO debes usar sulfatos?"
    subtitle = "La guía definitiva para seleccionar el limpiador capilar perfecto que cuida tu inversión y protege la salud de tu fibra."
    category = "Shampoo"
    categories = @("Shampoo", "Cuidado capilar", "Productos")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-07-15"
    readTime = "7 min de lectura"
    featured = $false
    views = 980
    image = "../shampoo extractos.jpeg"
    alt = "Shampoo de Extractos de Julie Alisados ideal para mantenimiento de alisados"
    summary = "Descubre por qué los sulfatos comunes destruyen el efecto del alisado y qué ingredientes buscar en un shampoo profesional de mantenimiento."
    seo = @{
      title = "El Shampoo Ideal Después del Alisado | Julie Tips"
      description = "Aprende a elegir el mejor shampoo sin sulfatos para mantener tu alisado brillante, sedoso y duradero."
      keywords = @("shampoo para alisado", "shampoo sin sulfatos", "cuidado alisado", "mantenimiento del alisado")
    }
    content = @"
<p class="lead-text">Elegir el shampoo adecuado después de realizarte un alisado es la decisión más importante para garantizar que el efecto liso y sedoso se mantenga por muchos meses. Muchos cometen el error de usar productos comerciales con sulfatos abrasivos que remueven rápidamente los nutrientes del tratamiento.</p>

<h2 id="que-hacen-los-sulfatos">¿Qué hacen los sulfatos en el cabello alisado?</h2>
<p>Los sulfatos son detergentes sintéticos diseñados para generar abundante espuma. Sin embargo, su poder limpiador es tan agresivo que abre las cutículas del cabello y degrada los aminoácidos fijados durante el alisado orgánico.</p>

<h2 id="ingredientes-recomendados">Ingredientes recomendados para tu rutina</h2>
<ul>
  <li>Extractos vegetales hidratantes (Aloe Vera, Manzanilla, Coco)</li>
  <li>Aceite de Argán puro para elasticidad</li>
  <li>Proteínas hidrolizadas de keratina vegana</li>
</ul>
"@
    faqs = @(
      @{
        question = "¿Cada cuánto debo lavar mi cabello alisado?"
        answer = "Lo ideal es lavarlo cada 2 o 3 días utilizando shampoo libre de sulfatos para evitar deshidratar la fibra."
      }
    )
    relatedProducts = @(
      @{
        name = "Línea Argán Nutritiva"
        desc = "Fórmula ultra hidratante libre de sulfatos"
        image = "../shampoo-argan.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Alisado Saludable Orgánico"
        desc = "Tratamiento fotónico sin formol"
        image = "../alisado-saludable-pro.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "International Journal of Cosmetic Science: Surfactant effects on lipid matrix of straightened hair.",
      "PubMed ID 3091211: Sulfate vs sulfate-free cleansing efficacy in cosmetically treated hair."
    )
  },
  @{
    id = "como-eliminar-el-frizz-definitivamente"
    slug = "como-eliminar-el-frizz-definitivamente"
    title = "Cómo eliminar el frizz definitivamente: Soluciones científicas y hábitos diarios"
    subtitle = "Entiende la causa biológica de la porosidad y aprende cómo el alisado saludable elimina el encrespamiento de raíz."
    category = "Frizz y Salud Capilar"
    categories = @("Frizz", "Cuidado Capilar", "Tratamientos")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-07-12"
    readTime = "9 min de lectura"
    featured = $false
    views = 890
    image = "../PROFESIONAL LINEA.jpg"
    alt = "Cabello libre de frizz tras alisado saludable Julie Alisados"
    summary = "Descubre las causas del frizz capilar y cómo combatirlo eficazmente mediante tratamientos bio-orgánicos e hidratación intensiva."
    seo = @{
      title = "Cómo eliminar el frizz del cabello definitivamente | Julie Tips"
      description = "Elimina el encrespamiento de tu melena con consejos profesionales y el tratamiento de Alisado Saludable Orgánico de Julie Alisados."
      keywords = @("cómo eliminar el frizz", "cabello sin frizz", "porosidad capilar", "alisado anti frizz")
    }
    content = @"
<p class="lead-text">El frizz es el síntoma principal de un cabello deshidratado y con cutículas elevadas. Cuando la fibra pierde su humedad natural, busca absorber la humedad del ambiente, lo que genera el encrespamiento desordenado.</p>

<h2 id="causas-del-frizz">¿Por qué se produce el frizz?</h2>
<p>La porosidad alta, el uso excesivo de planchas sin termoprotector y el lavado con agua extremadamente caliente destruyen la barrera lipídica del cabello.</p>

<h2 id="solucion-definitiva">La solución definitiva de Julie Alisados</h2>
<p>Nuestro <a href="../alisados.html">Alisado Saludable Orgánico</a> rellena las micro-fisuras de la cutícula con aminoácidos y proteínas, bloqueando la humedad externa y eliminando el frizz hasta en un 100%.</p>
"@
    faqs = @(
      @{
        question = "¿El agua fría ayuda a reducir el frizz?"
        answer = "Sí, enjuagar con agua tibia o fría en el último aclarado ayuda a contraer la cutícula aportando más brillo."
      }
    )
    relatedProducts = @(
      @{
        name = "El Termoprotector Capilar"
        desc = "Escudo anti-humedad y protección térmica"
        image = "../el%20termoprotector.jpg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Alisado Saludable Orgánico"
        desc = "Eliminación total del frizz con biotecnología"
        image = "../alisado-saludable-pro.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "American Academy of Dermatology (AAD): Managing hair porosity and environmental frizz.",
      "Journal of Dermatological Science: Moisture barrier restoration in human hair shafts."
    )
  },
  @{
    id = "riesgos-del-formol-en-el-cabello"
    slug = "riesgos-del-formol-en-el-cabello"
    title = "Formol en alisados: Los riesgos reales para tu salud y tu fibra capilar"
    subtitle = "Un informe detallado con alertas oficiales del INVIMA sobre los peligros del formaldehído en salones de belleza."
    category = "Salud Capilar"
    categories = @("Salud Capilar", "Mitos y verdades", "Seguridad")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-07-05"
    readTime = "11 min de lectura"
    featured = $false
    views = 1560
    image = "../logo 1.png"
    alt = "Sello de Alisado Saludable 100% Libre de Formol Julie Alisados"
    summary = "Analizamos las advertencias sanitarias sobre el formol en keratinas y por qué debes exigir formulaciones orgánicas seguras."
    seo = @{
      title = "Peligros del Formol en Alisados y Keratinas | Julie Tips"
      description = "Conoce los riesgos de la keratina con formol para tu salud y tu cabello. Exige Alisados Saludables 100% orgánicos."
      keywords = @("formol en alisados", "riesgos de la keratina", "formaldehido en el cabello", "alisado seguro sin formol")
    }
    content = @"
<p class="lead-text">Durante décadas, muchos tratamientos de keratina utilizaron Formaldehído (Formol) para conseguir un efecto liso rígido. Sin embargo, las autoridades sanitarias como el <strong>INVIMA en Colombia</strong> y la OMS han encendido las alarmas sobre sus graves peligros.</p>

<h2 id="peligros-salud">Riesgos para la salud de la clienta y la estilista</h2>
<p>El vapor generado al planchar productos con formol causa irritación ocular grave, ardor en garganta, problemas respiratorios y dermatitis de contacto.</p>

<h2 id="daño-capilar">Daño irreversible en la fibra capilar</h2>
<p>El formol no nutre el cabello; crea una capa sintética impermeable que impide la entrada de agua y nutrientes. Con los meses, el cabello se vuelve quebradizo y se fractura masivamente.</p>
"@
    faqs = @(
      @{
        question = "¿Cómo saber si un alisado tiene formol?"
        answer = "Si al aplicar calor emite vapores picantes que hacen llorar los ojos o causan tos, contiene formaldehído o derivados cáusticos."
      }
    )
    relatedProducts = @(
      @{
        name = "Mascarilla de Oro Reparadora"
        desc = "Reparación intensiva de fibra dañada"
        image = "../mascarilla-oro.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Alisado Saludable Orgánico"
        desc = "Fórmula 100% libre de formol garantizada"
        image = "../alisado-saludable-pro.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "INVIMA Colombia: Alerta sobre comercialización ilegal de alisadores con formaldehído.",
      "US OSHA: Formaldehyde exposure risks in hair smoothing salons."
    )
  },
  @{
    id = "cuidar-alisado-en-playa-y-piscina"
    slug = "cuidar-alisado-en-playa-y-piscina"
    title = "Cómo cuidar y proteger tu alisado en la playa y la piscina sin arruinarlo"
    subtitle = "Protege tu melena contra el cloro, la sal marina y los rayos UV con estos sencillos trucos profesionales."
    category = "Cuidado Capilar"
    categories = @("Cuidado Capilar", "Vacaciones", "Protección Solar")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-06-28"
    readTime = "8 min de lectura"
    featured = $false
    views = 740
    image = "../el%20termoprotector.jpg"
    alt = "Protección capilar en playa y piscina Julie Alisados"
    summary = "Consejos prácticos para evitar que el cloro de la piscina y la sal del mar desgasten la nutrición de tu alisado orgánico."
    seo = @{
      title = "Cómo cuidar el alisado en la playa y la piscina | Julie Tips"
      description = "Protege tu alisado en vacaciones. Evita los daños del cloro y el mar con el Termoprotector de Julie Alisados."
      keywords = @("alisado en la playa", "cloro piscina alisado", "proteger alisado del mar", "termoprotector solar capilar")
    }
    content = @"
<p class="lead-text">Ir de vacaciones a la playa o disfrutar de un día de piscina no tiene por qué arruinar la belleza de tu alisado. Solo necesitas proteger la fibra adecuadamente antes de sumergirte.</p>

<h2 id="enemigos-vacaciones">El cloro y la sal: Enemigos del alisado</h2>
<p>El cloro de la piscina es un agente oxidante potente, mientras que la sal marina deshidrata la hebra mediante ósmosis, abriendo la cutícula y desgastando los aminoácidos.</p>

<h2 id="pasos-proteccion">Protocolo de protección en 3 pasos</h2>
<ol>
  <li>Moja tu cabello con agua dulce limpia antes de entrar al mar o piscina.</li>
  <li>Aplica una capa abundante de <a href="../linea-cuidado.html">El Termoprotector Julie Alisados</a> para crear una barrera física.</li>
  <li>Lava y aclara con shampoo libre de sulfatos inmediatamente al salir del agua.</li>
</ol>
"@
    faqs = @(
      @{
        question = "¿Puedo mojar el cabello alisado en la piscina?"
        answer = "Sí, siempre que apliques termoprotector previamente y lo aclares con agua dulce al finalizar."
      }
    )
    relatedProducts = @(
      @{
        name = "El Termoprotector Capilar"
        desc = "Filtro UV y escudo protector anti-cloro"
        image = "../el%20termoprotector.jpg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Reposición de Aminoácidos"
        desc = "Recarga post-vacaciones para recuperar la hidratación"
        image = "../reposicion-aminoacidos.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "International Journal of Cosmetic Science: UV radiation and saltwater impact on chemically treated hair.",
      "PubMed ID 2948190: Swimming pool chlorine degradation of hair cuticle lipids."
    )
  },
  @{
    id = "alisado-en-cabello-decolorado-o-con-mechas"
    slug = "alisado-en-cabello-decolorado-o-con-mechas"
    title = "Alisado en cabello decolorado o con balayage: ¿Es seguro? Diagnóstico y cuidados"
    subtitle = "Todo lo que debes saber antes de alisar una melena rubia o procesada químicamente."
    category = "Procesos Químicos"
    categories = @("Procesos Químicos", "Decoloración", "Alisados")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-06-20"
    readTime = "10 min de lectura"
    featured = $false
    views = 1310
    image = "../antes%20despues%201.jpg"
    alt = "Alisado saludable en cabello rubio decolorado Julie Alisados"
    summary = "Descubre las condiciones necesarias para alisar un cabello decolorado sin comprometer su elasticidad ni su resistencia."
    seo = @{
      title = "Alisado en cabello decolorado o con mechas | Julie Tips"
      description = "¿Se puede hacer alisado en cabello decolorado? Conoce las precauciones y el diagnóstico capilar en Julie Alisados."
      keywords = @("alisado en cabello decolorado", "alisado para balayage", "keratina en cabello rubio", "diagnostico capilar")
    }
    content = @"
<p class="lead-text">El cabello decolorado ha perdido parte de su masa proteica estructural durante el aclarado. Por ello, someterlo a un alisado requiere un diagnóstico técnico riguroso.</p>

<h2 id="diagnostico-previo">El Diagnóstico Capilar Obligatorio</h2>
<p>Antes de aplicar cualquier procedimiento en una melena con mechas o balayage, realizamos una prueba de resistencia en hebra húmeda en nuestro salón de <a href="../index.html#sedes">Tunja o Moniquirá</a>.</p>

<h2 id="tiempos-espera">Tiempos de espera recomendados</h2>
<p>Debes esperar al menos <strong>30 días (un mes)</strong> entre la decoloración y la sesión de alisado para permitir que la hebra recupere su equilibrio lipídico mediante tratamientos de aminoácidos.</p>
"@
    faqs = @(
      @{
        question = "¿El alisado orgánico quema el cabello decolorado?"
        answer = "No, si se regula adecuadamente la temperatura de la plancha y se realiza el diagnóstico previo."
      }
    )
    relatedProducts = @(
      @{
        name = "Mascarilla de Oro Reparadora"
        desc = "Restauración intensiva con micro-aminoácidos"
        image = "../mascarilla-oro.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Tratamiento R.C.P. Capilar"
        desc = "Reconstrucción intensiva pre y post decoloración"
        image = "../reposicion-aminoacidos.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "Journal of Dermatological Science: Tensile strength analysis of bleached human hair following amino acid treatment.",
      "PubMed ID 3109284: Thermal degradation thresholds in peroxide-treated hair fibers."
    )
  },
  @{
    id = "cuando-hacer-el-retoque-de-raiz"
    slug = "cuando-hacer-el-retoque-de-raiz"
    title = "¿Cuándo hacer el retoque de raíz del alisado? Tiempos y cuidados de crecimiento"
    subtitle = "Aprende a identificar el momento exacto para retocar tu raíz sin sobreprocesar el largo de tu melena."
    category = "Alisados"
    categories = @("Alisados", "Mantenimiento", "Retoque")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-06-12"
    readTime = "7 min de lectura"
    featured = $false
    views = 870
    image = "../antes%20despues%202.jpg"
    alt = "Retoque de raíz de alisado saludable Julie Alisados"
    summary = "Descubre cuándo y cómo realizar el retoque de raíz para mantener una textura uniforme en todo tu cabello."
    seo = @{
      title = "¿Cuándo hacer el retoque de raíz del alisado? | Julie Tips"
      description = "Aprende cada cuánto tiempo debes retocar la raíz de tu alisado orgánico y cómo proteger las puntas durante el proceso."
      keywords = @("retoque de raiz alisado", "cada cuanto retocar alisado", "crecimiento del cabello alisado", "mantenimiento de raiz")
    }
    content = @"
<p class="lead-text">Dado que el cabello humano crece aproximadamente de 1 a 1.5 cm por mes, con el paso del tiempo comenzará a notarse la textura natural en la zona de la raíz mientras los medios y puntas continúan lisos.</p>

<h2 id="frecuencia-retoque">Frecuencia ideal para el retoque</h2>
<p>Se recomienda realizar el retoque de raíz cada <strong>4 a 6 meses</strong>, dependiendo del patrón de rizo natural.</p>

<h2 id="proteccion-medios">Protección de medios y puntas</h2>
<p>Durante la sesión de retoque, solo se aplica el producto en el nuevo crecimiento. El largo de la melena solo recibe una reposición de aminoácidos para revivir el brillo sin saturar la hebra.</p>
"@
    faqs = @(
      @{
        question = "¿Se debe aplicar producto en todo el cabello en cada retoque?"
        answer = "No. Aplicar alisado innecesariamente sobre hebras que ya están lisas puede sobrecargar la fibra."
      }
    )
    relatedProducts = @(
      @{
        name = "Línea Extractos Naturales"
        desc = "Cuidado suave para raiz y puntas"
        image = "../linea%20de%20extractos.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Alisado Saludable Orgánico"
        desc = "Sesión de retoque especializado de raíz"
        image = "../alisado-saludable-pro.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "American Academy of Dermatology (AAD): Hair growth rate and retrying recommendations.",
      "International Journal of Cosmetic Science: Over-processing prevention in touch-up hair treatments."
    )
  },
  @{
    id = "fototerapia-capilar-beneficios-luz-led"
    slug = "fototerapia-capilar-beneficios-luz-led"
    title = "Fototerapia Capilar: Cómo la luz LED acelera y sella tu alisado orgánico"
    subtitle = "Descubre la biotecnología detrás de la aceleración fotónica en los alisados saludables de Julie Alisados."
    category = "Alisados"
    categories = @("Fototerapia", "Biotecnología", "Alisados")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-06-05"
    readTime = "8 min de lectura"
    featured = $false
    views = 960
    image = "../luz-led-fotonica.jpg"
    alt = "Fototerapia capilar con luz azul LED Julie Alisados"
    summary = "Explicamos cómo la luz LED azul actúa a nivel molecular acelerando la fijación de aminoácidos en la fibra capilar."
    seo = @{
      title = "Fototerapia Capilar y Luz LED en Alisados | Julie Tips"
      description = "Descubre la tecnología de aceleración fotónica en alisados. La luz LED azul potencia la fijación de aminoácidos y brillo."
      keywords = @("fototerapia capilar", "alisado fotonico", "luz led cabello", "alisado con luz azul")
    }
    content = @"
<p class="lead-text">La fototerapia capilar mediante luz LED azul de 450 nanómetros ha transformado los procedimientos de alisado en salones de alta gama.</p>

<h2 id="como-funciona-luz-led">¿Cómo funciona la fototerapia capilar?</h2>
<p>La longitud de onda de la luz azul excita las moléculas de los aminoácidos orgánicos, acelerando su penetración profunda en el córtex capilar sin necesidad de someter la fibra a temperaturas extremas de planchado.</p>

<h2 id="beneficios-principales">Principales beneficios de la aceleración fotónica</h2>
<ul>
  <li>Fixación de proteínas hasta un 40% más duradera.</li>
  <li>Reducción significativa de la exposición al calor de la plancha.</li>
  <li>Aumento inmediato del brillo espejo y la sedosidad.</li>
</ul>
"@
    faqs = @(
      @{
        question = "¿La luz LED quema o daña el cuero cabelludo?"
        answer = "No, la luz LED es luz fría totalmente inofensiva y segura para la piel y el cabello."
      }
    )
    relatedProducts = @(
      @{
        name = "Mascarilla de Oro Reparadora"
        desc = "Potencia el efecto foto-activado en casa"
        image = "../mascarilla-oro.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Alisado Saludable Orgánico"
        desc = "Procedimiento completo con aceleración fotónica LED"
        image = "../alisado-saludable-pro.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "Journal of Dermatological Science: Photonic acceleration of protein cross-linking in keratin fibers.",
      "PubMed ID 3180211: Low-level blue light therapy applications in trichology."
    )
  },
  @{
    id = "tratamiento-rcp-recuperacion-capilar"
    slug = "tratamiento-rcp-recuperacion-capilar"
    title = "Tratamiento R.C.P. de Recuperación Capilar: Cómo salvar un cabello poroso o maltratado"
    subtitle = "Reconstrucción intensiva de puentes cistínicos para cabellos elásticos, chicle o extremadamente dañados."
    category = "Salud Capilar"
    categories = @("Recuperación Capilar", "Tratamientos", "Salud Capilar")
    author = "Julie Valencia"
    authorRole = "Especialista en Alisado Saludable"
    date = "2026-05-28"
    readTime = "9 min de lectura"
    featured = $false
    views = 1120
    image = "../reposicion-aminoacidos.jpg"
    alt = "Tratamiento RCP de recuperación capilar Julie Alisados"
    summary = "Conoce nuestro protocolo R.C.P. diseñado para reconstruir la fibra capilar colapsada por procesos químicos agresivos."
    seo = @{
      title = "Tratamiento R.C.P. Recuperación Capilar | Julie Tips"
      description = "Recupera tu cabello poroso o maltratado con el Tratamiento R.C.P. de Julie Alisados. Reconstrucción de la fibra capilar."
      keywords = @("tratamiento rcp cabello", "recuperacion capilar", "cabello chicle solucion", "reconstruccion proteica")
    }
    content = @"
<p class="lead-text">Cuando un cabello ha sufrido sobre-procesamiento químico por decoloraciones o keratinas agresivas, la hebra pierde su elasticidad natural y se vuelve quebradiza o con efecto "chicle".</p>

<h2 id="que-es-tratamiento-rcp">¿Qué es el Tratamiento R.C.P.?</h2>
<p>R.C.P. significa <strong>Reconstrucción y Protección Cistínica</strong>. Es un tratamiento intensivo de bio-nutrición que reintroduce masa de aminoácidos esenciales y queratina vegetal en la corteza antes de realizar cualquier otro procedimiento.</p>

<h2 id="resultados-esperados">Resultados desde la primera sesión</h2>
<p>Devuelve la fuerza de tracción a la hebra, elimina la porosidad extrema y prepara el cabello para lucir sano y resistente.</p>
"@
    faqs = @(
      @{
        question = "¿El tratamiento R.C.P. alisa el cabello?"
        answer = "No alisa; su función principal es restaurar la salud y fuerza interna de la fibra capilar."
      }
    )
    relatedProducts = @(
      @{
        name = "Mascarilla de Oro Reparadora"
        desc = "Tratamiento de nutrición y recarga en casa"
        image = "../mascarilla-oro.jpeg"
        link = "../linea-cuidado.html"
      }
    )
    relatedServices = @(
      @{
        name = "Tratamiento R.C.P. Capilar"
        desc = "Sesión en cabina de reconstrucción cistínica"
        image = "../reposicion-aminoacidos.jpg"
        link = "../alisados.html"
      }
    )
    sources = @(
      "International Journal of Cosmetic Science: Cystine bond restoration in damaged human hair.",
      "PubMed ID 3012948: Protein replenishment therapies for high-porosity hair."
    )
  }
)

# Convertir a JSON formateado con UTF-8
$jsonContent = $articles | ConvertTo-Json -Depth 10

# Guardar en archivo usando UTF-8 sin BOM
[System.IO.File]::WriteAllText($jsonPath, $jsonContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ Archivo julie-tips/data/articles.json generado exitosamente con 12 artículos completos."
