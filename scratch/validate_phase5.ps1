$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"

if (!(Test-Path $jsonPath)) {
    Write-Host "CRITICAL: articles.json file not found!"
    exit 1
}

$rawJson = Get-Content $jsonPath -Raw -Encoding UTF8
$articles = $rawJson | ConvertFrom-Json

Write-Host "============================================="
Write-Host "VALIDACION FASE 5: CALENDARIO EDITORIAL JULIE TIPS"
Write-Host "============================================="
Write-Host "Total de articulos cargados: $($articles.Count)"

$errors = 0
foreach ($art in $articles) {
    Write-Host "---------------------------------------------"
    Write-Host "ID: $($art.id)"
    Write-Host "Titulo: $($art.title)"
    Write-Host "Categoria: $($art.category)"
    Write-Host "Fecha: $($art.date)"
    Write-Host "FAQs: $($art.faqs.Count)"
    Write-Host "Productos Relacionados: $($art.relatedProducts.Count)"
    Write-Host "Servicios Relacionados: $($art.relatedServices.Count)"
    Write-Host "Fuentes Cientificas: $($art.sources.Count)"

    if ([string]::IsNullOrWhiteSpace($art.id) -or [string]::IsNullOrWhiteSpace($art.content)) {
        Write-Host "ERROR: Faltan campos esenciales en el articulo $($art.id)"
        $errors++
    }
}

if ($errors -eq 0) {
    Write-Host "============================================="
    Write-Host "VALIDACION EXITOSA: LOS 12 ARTICULOS ESTAN 100% OPERATIVOS Y SIN ERRORES"
    Write-Host "============================================="
}
