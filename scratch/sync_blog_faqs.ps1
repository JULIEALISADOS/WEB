# Script para sincronizar las FAQs de los 12 artículos de Julie Tips con las 8 FAQs oficiales de index.html

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$rawJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8).TrimStart([char]0xFEFF)
$articles = $rawJson | ConvertFrom-Json

# FAQ Oficiales del sitio principal
$faqFormol = @{
    question = "¿Sus productos contienen formol u otros químicos tóxicos?"
    answer = "No rotundo. Nuestras fórmulas son 100% libres de formol y cuentan con Registro INVIMA vigente. Garantizan un procedimiento seguro, sin vapores tóxicos, sin irritación en ojos o garganta y con máxima nutrición para tu fibra capilar."
}

$faqColor = @{
    question = "¿Puedo realizarme el alisado si tengo tinte, decoloración o mechas?"
    answer = "Sí. Si es tinte normal sin decoloración, realiza primero el Alisado Saludable y a los 20 días la tintura sin amoníaco. Si es decoloración (balayage/mechas), realiza primero la decoloración y a los 30 días (un mes) el alisado, previa prueba de diagnóstico."
}

$faqEmbarazo = @{
    question = "¿Es seguro para mujeres embarazadas o en periodo de lactancia?"
    answer = "¡Claro que sí! Gracias a que nuestras fórmulas son bio-orgánicas y libres de sustancias tóxicas, es seguro realizarlo a partir del segundo trimestre de gestación (4 meses) en nuestras sedes."
}

$faqDuracion = @{
    question = "¿Cuánto tiempo dura el resultado y qué cuidados debo tener?"
    answer = "Tiene una duración promedio de 4 a 6 meses (extensible a 8 meses con buen cuidado). Nuestro alisado es termo-activado, por lo que recomendamos secar con aire tibio después de cada lavado para activar el brillo espejo."
}

$faqCanas = @{
    question = "¿Qué pasa si tengo canas durante el procedimiento?"
    answer = "Al ser un proceso 100% libre de formol, el sellado térmico con plancha puede generar una leve oxidación cromática temporal en la cana, proporcional al nivel de alineación térmica alcanzado."
}

$faqDescuentos = @{
    question = "¿Tienen promociones especiales o facilidades de pago?"
    answer = "Sí. Cada mes lanzamos promociones en servicios y productos. Además, contamos con facilidades de pago a cuotas con Addi en nuestras sedes de Tunja y Moniquirá."
}

# Actualizar FAQs en los artículos existentes
foreach ($art in $articles) {
    if ($art.id -eq "cuanto-dura-un-alisado") {
        $art.faqs = @($faqDuracion, $faqColor, $faqFormol, $faqEmbarazo, $faqCanas, $faqDescuentos)
    } elseif ($art.id -eq "como-cuidar-el-alisado-en-casa") {
        $art.faqs = @($faqDuracion, $faqFormol)
    } elseif ($art.id -eq "taninoplastia-vs-keratina-diferencias") {
        $art.faqs = @($faqFormol, $faqEmbarazo)
    } elseif ($art.id -eq "tinte-antes-o-despues-del-alisado") {
        $art.faqs = @($faqColor, $faqCanas)
    } elseif ($art.id -eq "shampoo-ideal-despues-del-alisado") {
        $art.faqs = @($faqDuracion, $faqFormol)
    } elseif ($art.id -eq "riesgos-del-formol-en-el-cabello") {
        $art.faqs = @($faqFormol, $faqEmbarazo)
    } elseif ($art.id -eq "alisado-en-cabello-decolorado-o-con-mechas") {
        $art.faqs = @($faqColor, $faqFormol)
    } else {
        $art.faqs = @($faqDuracion, $faqFormol)
    }
}

# Guardar en UTF-8 puro sin BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$jsonString = $articles | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $jsonString, $utf8NoBom)

Write-Host "✅ FAQs de todos los artículos sincronizadas exitosamente con las 8 FAQs oficiales de index.html."
