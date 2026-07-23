# Script de Auditoría Exclusiva de Páginas Activas de Producción

$repoPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB"

Write-Host "============================================="
Write-Host "AUDITORIA DE PRODUCCION PRE-COMMIT (12 PAGINAS ACTIVAS)"
Write-Host "============================================="

$activePages = @(
    "index.html",
    "alisados.html",
    "linea-cuidado.html",
    "linea-profesional.html",
    "politica-servicio.html",
    "politica-garantia.html",
    "politica-cookies.html",
    "politica-datos.html",
    "politica-envios.html",
    "promociones-condiciones.html",
    "julie-tips/index.html",
    "julie-tips/articulo.html"
)

$critical = 0
$important = 0
$warnings = 0

foreach ($page in $activePages) {
    $fullPath = Join-Path $repoPath $page
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        
        # Meta charset
        if ($content -notmatch '<meta\s+charset="UTF-8"') {
            Write-Host "ERROR CRITICO: Falta meta charset UTF-8 en ${page}"
            $critical++
        } else {
            Write-Host "UTF-8 Charset en ${page}: OK"
        }
    } else {
        Write-Host "ERROR CRITICO: Pagina activa no encontrada ${page}"
        $critical++
    }
}

# Auditoría JSON
$jsonPath = Join-Path $repoPath "julie-tips/data/articles.json"
try {
    $bytes = [System.IO.File]::ReadAllBytes($jsonPath)
    $text = [System.Text.Encoding]::UTF8.GetString($bytes).TrimStart([char]0xFEFF)
    $jsonObj = $text | ConvertFrom-Json
    
    if (-not ($text.Trim().StartsWith("["))) {
        Write-Host "ERROR CRITICO: articles.json no inicia con Array ["
        $critical++
    } else {
        Write-Host "JSON Array Struct: Valido ($($jsonObj.Count) articulos)."
    }
    
    $c3 = [char]0x00C3
    $c2 = [char]0x00C2
    $rep = [char]0xFFFD
    if ($text.Contains($c3) -or $text.Contains($c2) -or $text.Contains($rep)) {
        Write-Host "ERROR CRITICO: Mojibake detectado en articles.json"
        $critical++
    } else {
        Write-Host "Mojibake Audit: 0 caracteres corruptos."
    }
} catch {
    Write-Host "ERROR CRITICO: Error en articles.json - $($_.Exception.Message)"
    $critical++
}

Write-Host "============================================="
Write-Host "RESUMEN FINAL PRODUCCION:"
Write-Host "Errores Criticos: ${critical}"
Write-Host "Errores Importantes: ${important}"
Write-Host "Advertencias: ${warnings}"
Write-Host "============================================="
