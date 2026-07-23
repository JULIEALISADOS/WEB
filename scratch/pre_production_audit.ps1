# Script de Auditoría Pre-Producción Completo

$repoPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB"

Write-Host "============================================="
Write-Host "AUDITORIA COMPLETA DE PRE-PRODUCCION"
Write-Host "============================================="

$criticalErrors = 0
$warnings = 0

# 1. Comprobar sitemap.xml y robots.txt
$robotsPath = Join-Path $repoPath "robots.txt"
$sitemapPath = Join-Path $repoPath "sitemap.xml"

if (Test-Path $robotsPath) {
    Write-Host "robots.txt: OK"
} else {
    Write-Host "robots.txt: ADVERTENCIA - No encontrado en raiz"
    $warnings++
}

if (Test-Path $sitemapPath) {
    Write-Host "sitemap.xml: OK"
} else {
    Write-Host "sitemap.xml: ADVERTENCIA - No encontrado en raiz"
    $warnings++
}

# 2. Comprobar HTML Meta Charset, Canonical, OG en todas las páginas principales
$htmlFiles = @(
    "index.html",
    "alisados.html",
    "linea-cuidado.html",
    "linea-profesional.html",
    "politica-servicio.html",
    "politica-garantia.html",
    "julie-tips/index.html",
    "julie-tips/articulo.html"
)

foreach ($relPath in $htmlFiles) {
    $fullPath = Join-Path $repoPath $relPath
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        
        # Meta charset
        if ($content -match '<meta\s+charset="UTF-8"') {
            Write-Host "Meta Charset UTF-8 en ${relPath}: OK"
        } else {
            Write-Host "ERROR CRITICO: Falta meta charset UTF-8 en ${relPath}"
            $criticalErrors++
        }
        
        # Canonical
        if ($content -match '<link\s+rel="canonical"') {
            Write-Host "Canonical Tag en ${relPath}: OK"
        } else {
            Write-Host "Canonical Tag no encontrado en ${relPath}"
            $warnings++
        }
        
        # Open Graph
        if ($content -match 'property="og:title"') {
            Write-Host "Open Graph en ${relPath}: OK"
        } else {
            Write-Host "Open Graph no encontrado en ${relPath}"
            $warnings++
        }
    } else {
        Write-Host "ERROR CRITICO: Archivo no encontrado ${relPath}"
        $criticalErrors++
    }
}

# 3. Comprobar Validez de JSON en julie-tips/data/articles.json
$jsonPath = Join-Path $repoPath "julie-tips/data/articles.json"
try {
    $bytes = [System.IO.File]::ReadAllBytes($jsonPath)
    $text = [System.Text.Encoding]::UTF8.GetString($bytes).TrimStart([char]0xFEFF)
    $jsonObj = $text | ConvertFrom-Json
    Write-Host "articles.json: Estructura JSON Valida."
    
    # Check Mojibake
    $c3 = [char]0x00C3
    $c2 = [char]0x00C2
    $rep = [char]0xFFFD
    if ($text.Contains($c3) -or $text.Contains($c2) -or $text.Contains($rep)) {
        Write-Host "ERROR CRITICO: Caracteres Mojibake detectados en articles.json"
        $criticalErrors++
    } else {
        Write-Host "UTF-8 en articles.json: 100% Limpio de Mojibake."
    }
} catch {
    Write-Host "ERROR CRITICO: Syntax Error en articles.json - $($_.Exception.Message)"
    $criticalErrors++
}

# 4. Comprobar Enlaces Internos
$linksToCheck = @(
    "alisados.html",
    "linea-cuidado.html",
    "linea-profesional.html",
    "politica-servicio.html",
    "politica-garantia.html",
    "julie-tips/index.html",
    "julie-tips/articulo.html"
)

foreach ($link in $linksToCheck) {
    $fullPath = Join-Path $repoPath $link
    if (Test-Path $fullPath) {
        Write-Host "Enlace Interno Valido: ${link}"
    } else {
        Write-Host "ERROR CRITICO: Enlace roto a archivo inexistente: ${link}"
        $criticalErrors++
    }
}

Write-Host "============================================="
Write-Host "RESUMEN FINAL DE AUDITORIA PRE-PRODUCCION:"
Write-Host "Errores Criticos: ${criticalErrors}"
Write-Host "Advertencias: ${warnings}"
Write-Host "============================================="
