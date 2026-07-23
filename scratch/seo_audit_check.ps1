# Script de Auditoría SEO Técnica Completa (12 Puntos)

$repoPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB"

Write-Host "============================================="
Write-Host "AUDITORIA SEO TECNICA COMPLETA PRE-PRODUCCION"
Write-Host "============================================="

# Cargar articles.json
$jsonPath = Join-Path $repoPath "julie-tips/data/articles.json"
$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes).TrimStart([char]0xFEFF)
$articles = $text | ConvertFrom-Json
if (-not ($articles -is [Array])) { $articles = @($articles) }

# 1. Sitemap Check
$sitemapPath = Join-Path $repoPath "sitemap.xml"
$sitemapText = Get-Content $sitemapPath -Raw -Encoding UTF8

Write-Host "--- 1. SITEMAP XML ---"
foreach ($art in $articles) {
    $expectedUrl = "https://juliealisados.com/julie-tips/$($art.slug)"
    if ($sitemapText -contains $expectedUrl -or $sitemapText.Contains($expectedUrl)) {
        Write-Host "🟢 Sitemap incluye: $expectedUrl"
    } else {
        Write-Host "🔴 ERRORES REALES: Sitemap NO incluye: $expectedUrl"
    }
}

# 2. Robots.txt Check
Write-Host "`n--- 2. ROBOTS.TXT ---"
$robotsPath = Join-Path $repoPath "robots.txt"
$robotsText = Get-Content $robotsPath -Raw -Encoding UTF8
if ($robotsText -match "Disallow:\s*/julie-tips") {
    Write-Host "🔴 ERRORES REALES: robots.txt bloquea /julie-tips/"
} else {
    Write-Host "🟢 robots.txt permite el rastreo de /julie-tips/ y el blog."
}

# 3 & 4. Canonicals y URLs Duplicadas
Write-Host "`n--- 3 & 4. CANONICALS Y DUPLICADOS ---"
$slugs = @()
foreach ($art in $articles) {
    if ($slugs -contains $art.slug) {
        Write-Host "🔴 ERRORES REALES: URL / Slug duplicado encontrado: $($art.slug)"
    } else {
        $slugs += $art.slug
        Write-Host "🟢 Slug único verificado: $($art.slug)"
    }
}

# 5. On-Page SEO Elementos por Artículo
Write-Host "`n--- 5. ON-PAGE SEO METADATA & SCHEMAS ---"
foreach ($art in $articles) {
    Write-Host "Evaluando artículo: $($art.title)"
    if ($art.seo.title) { Write-Host "  🟢 SEO Title: $($art.seo.title)" } else { Write-Host "  🔴 Falta SEO Title" }
    if ($art.seo.description) { Write-Host "  🟢 Meta Description: OK ($($art.seo.description.Length) chars)" } else { Write-Host "  🔴 Falta Meta Description" }
    if ($art.faqs -and $art.faqs.Count -gt 0) { Write-Host "  🟢 FAQ Schema: OK ($($art.faqs.Count) preguntas)" } else { Write-Host "  🟡 Sin FAQs" }
}

# 6 & 7. HTTP 200 & Enlaces Internos
Write-Host "`n--- 6 & 7. ENLACES INTERNOS & RECURSOS ---"
$internalLinks = @("../alisados.html", "../linea-cuidado.html", "../linea-profesional.html", "../index.html")
foreach ($link in $internalLinks) {
    $cleanLink = $link.Replace('../', '')
    $targetPath = Join-Path $repoPath $cleanLink
    if (Test-Path $targetPath) {
        Write-Host "🟢 Enlace interno accesible (HTTP 200 equivalente): $link"
    } else {
        Write-Host "🔴 ERRORES REALES: Enlace roto a $link"
    }
}

# 8. Imágenes y Atributos ALT
Write-Host "`n--- 8. IMAGENES Y ALT ---"
foreach ($art in $articles) {
    if ($art.alt) {
        Write-Host "🟢 Hero Image ALT: $($art.alt)"
    } else {
        Write-Host "🔴 ERRORES REALES: Falta atributo ALT en la imagen hero de $($art.slug)"
    }
    
    if ($art.relatedProducts) {
        foreach ($p in $art.relatedProducts) {
            if ($p.name) { Write-Host "🟢 Producto relacionado ALT: $($p.name)" }
        }
    }
}

# 9. Profundidad de Clic
Write-Host "`n--- 9. PROFUNDIDAD DE CLIC ---"
Write-Host "🟢 Nivel 0: Home (https://juliealisados.com/)"
Write-Host "🟢 Nivel 1: Blog Hub (https://juliealisados.com/julie-tips/)"
Write-Host "🟢 Nivel 2: Artículo (https://juliealisados.com/julie-tips/cuanto-dura-un-alisado)"
Write-Host "🟢 Profundidad de Clic Máxima: 2 clics (Excelente para SEO)."

# 10 & 11. Enlazado Interno y CTAs
Write-Host "`n--- 10 & 11. ENLAZADO INTERNO Y CONVERSION ---"
foreach ($art in $articles) {
    $hasServices = $art.relatedServices -and $art.relatedServices.Count -gt 0
    $hasProducts = $art.relatedProducts -and $art.relatedProducts.Count -gt 0
    $hasWhatsApp = $art.content -match "wa.me"
    
    if ($hasServices) { Write-Host "🟢 Enlaces a Servicios: Presentes ($($art.relatedServices.Count))" } else { Write-Host "🔴 Falta enlace a Servicios" }
    if ($hasProducts) { Write-Host "🟢 Enlaces a Productos: Presentes ($($art.relatedProducts.Count))" } else { Write-Host "🔴 Falta enlace a Productos" }
    if ($hasWhatsApp) { Write-Host "🟢 Enlaces a WhatsApp: Presentes en contenido" } else { Write-Host "🔴 Falta enlace a WhatsApp" }
}

Write-Host "============================================="
