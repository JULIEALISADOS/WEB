# Script de Auditoría Real de Código

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$jsPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\js\julie-tips.js"
$htmlPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\articulo.html"

# 15. Validar JSON
try {
    $rawJson = Get-Content $jsonPath -Raw -Encoding UTF8
    $articles = $rawJson | ConvertFrom-Json
    Write-Host "15. JSON Validity: VALID ($($articles.Count) items found)"
} catch {
    Write-Host "15. JSON Validity: INVALID - $($_.Exception.Message)"
}

# Auditoría ítem por ítem
$wordCounts = @{}
$slugs = @()
$titles = @()
$missingSeoTitle = 0
$missingMetaDesc = 0
$missingSlug = 0
$missingFaq = 0
$missingSources = 0
$invalidSources = 0

foreach ($art in $articles) {
    # Slug & Title tracking for duplicates
    $slugs += $art.slug
    $titles += $art.title
    
    # Word count estimation (HTML stripped)
    $cleanText = $art.content -replace '<[^>]+>', ' '
    $words = ($cleanText -split '\s+').Count
    $wordCounts[$art.id] = $words
    
    # Checks
    if ([string]::IsNullOrWhiteSpace($art.seo.title)) { $missingSeoTitle++ }
    if ([string]::IsNullOrWhiteSpace($art.seo.description)) { $missingMetaDesc++ }
    if ([string]::IsNullOrWhiteSpace($art.slug)) { $missingSlug++ }
    if (!($art.faqs) -or $art.faqs.Count -eq 0) { $missingFaq++ }
    if (!($art.sources) -or $art.sources.Count -eq 0) { $missingSources++ }
    
    # Check citation sources
    foreach ($src in $art.sources) {
        if ($src -notmatch "INVIMA|PubMed|American Academy of Dermatology|AAD|Journal of Dermatological Science|International Journal of Cosmetic Science") {
            $invalidSources++
            Write-Host "Unrecognized source in $($art.id): $src"
        }
    }
}

Write-Host "`n--- RESUMEN CONTEO DE PALABRAS ---"
$wordCounts.GetEnumerator() | ForEach-Object {
    Write-Host "$($_.Key): $($_.Value) palabras"
}

# Duplicate check
$duplicateSlugs = $slugs | Group-Object | Where-Object { $_.Count -gt 1 }
Write-Host "`nDuplicados Slugs: $($duplicateSlugs.Count)"

# JS Schema checks
$jsContent = Get-Content $jsPath -Raw -Encoding UTF8
$hasFaqSchema = $jsContent -match 'FAQPage'
$hasBlogPostingSchema = $jsContent -match 'BlogPosting'
$hasBreadcrumbSchema = $jsContent -match 'BreadcrumbList'

Write-Host "`n--- RESULTADOS ESQUEMAS EN JS ---"
Write-Host "FAQ Schema: $hasFaqSchema"
Write-Host "BlogPosting Schema: $hasBlogPostingSchema"
Write-Host "Breadcrumb Schema: $hasBreadcrumbSchema"
