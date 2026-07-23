# Script de Corrección de Política de Lavado Diario en articles.json

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$rawJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8).TrimStart([char]0xFEFF)
$articles = $rawJson | ConvertFrom-Json

# Frases incorrectas a reemplazar
$wrongPhrase1 = "Lavar la melena diariamente con champ"
$wrongPhrase2 = "Lavar la melena diariamente"
$wrongPhrase3 = "2 a 3 veces por semana"

foreach ($art in $articles) {
    # 1. Corregir en contenido del artículo 1 y 2
    if ($art.content) {
        $art.content = $art.content -replace "Lavar la melena diariamente con champ[úu]s comerciales anticaspa o clarificantes arrastra los amino[áa]cidos depositados, reduciendo la vida del tratamiento a menos de la mitad.", "De acuerdo con nuestra Política de Servicio y Garantía Oficial, <strong>es fundamental mantener una buena higiene capilar lavando tu cabello con frecuencia: mínimo cada 2 días (siendo ideal el lavado diario)</strong>, utilizando siempre un limpiador suave sin sal ni sulfatos y secando con aire tibio para reactivar la memoria termoactiva."
        
        $art.content = $art.content -replace "Se recomienda lavar el cabello 2 a 3 veces por semana utilizando un", "De acuerdo con nuestra Política de Servicio, se recomienda mantener una buena higiene capilar lavando el cabello como mínimo cada 2 días (siendo ideal un lavado diario) utilizando un"
        
        $art.content = $art.content -replace "Lavar el cabello a diario elimina los aceites naturales y descompone progresivamente los amino[áa]cidos depositados en la fibra.", "Mantener una buena higiene capilar es indispensable para la salud de tu hebra. En Julie Alisados recomendamos lavar el cabello con frecuencia (mínimo cada 2 días, siendo ideal el lavado diario), acompañado siempre del secado termoactivo."
    }

    # 2. Corregir en FAQs
    if ($art.faqs) {
        foreach ($faq in $art.faqs) {
            if ($faq.question -match "lavar" -or $faq.answer -match "semana") {
                $faq.question = "¿Cada cuánto tiempo debo lavar mi cabello alisado?"
                $faq.answer = "De acuerdo con nuestra Política Oficial de Servicio y Garantía, se recomienda mantener una buena higiene capilar lavando el cabello como mínimo cada 2 días, siendo ideal realizar un lavado diario utilizando un champú libre de sal y sulfatos y activando posteriormente con el secador."
            }
        }
    }
}

# Guardar en UTF-8 puro sin BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$jsonString = $articles | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $jsonString, $utf8NoBom)

Write-Host "✅ Política de lavado corregida en todos los artículos de articles.json (Mínimo cada 2 días / Ideal lavado diario)."
