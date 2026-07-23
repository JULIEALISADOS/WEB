# Script de Auditoría Completa de Sistemas para Despliegue en GitHub

$repoPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB"

Write-Host "============================================="
Write-Host "AUDITORIA DE PRODUCCION COMPLETA PRE-DESPLIEGUE"
Write-Host "============================================="

$critical = 0
$important = 0
$warnings = 0

# 1. Auditoría de Archivos HTML y Rutas
$htmlFiles = Get-ChildItem -Path $repoPath -Filter "*.html" -Recurse | Where-Object { $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "temp_" }

foreach ($file in $htmlFiles) {
    $rel = $file.FullName.Replace($repoPath, '')
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Meta Charset
    if ($content -notmatch '<meta\s+charset="UTF-8"') {
        Write-Host "🔴 CRITICO: Falta meta charset UTF-8 en $rel"
        $critical++
    }
    
    # Check rel="noopener noreferrer" en target="_blank"
    $matches = [regex]::Matches($content, 'href="([^"]+)"[^>]*target="_blank"')
    foreach ($m in $matches) {
        $tag = $m.Value
        if ($tag -notmatch 'rel="[^"]*noopener') {
            Write-Host "🟡 ADVERTENCIA: Link target=_blank sin rel=noopener en $rel"
            $warnings++
            break
        }
    }
}

# 2. Auditoría de JSON articles.json
$jsonPath = Join-Path $repoPath "julie-tips/data/articles.json"
try {
    $bytes = [System.IO.File]::ReadAllBytes($jsonPath)
    $text = [System.Text.Encoding]::UTF8.GetString($bytes).TrimStart([char]0xFEFF)
    $jsonObj = $text | ConvertFrom-Json
    
    if (-not ($text.Trim().StartsWith("["))) {
        Write-Host "🔴 CRITICO: articles.json no inicia con Array ["
        $critical++
    } else {
        Write-Host "🟢 JSON Struct: Array válido de $($jsonObj.Count) artículos."
    }
    
    # Check Mojibake
    $c3 = [char]0x00C3
    $c2 = [char]0x00C2
    $rep = [char]0xFFFD
    if ($text.Contains($c3) -or $text.Contains($c2) -or $text.Contains($rep)) {
        Write-Host "🔴 CRITICO: Mojibake detectado en articles.json"
        $critical++
    } else {
        Write-Host "🟢 UTF-8 Mojibake: 0 caracteres corruptos."
    }
} catch {
    Write-Host "🔴 CRITICO: Error al parsear JSON: $($_.Exception.Message)"
    $critical++
}

# 3. Auditoría de sitemap y robots
if (Test-Path (Join-Path $repoPath "robots.txt")) {
    Write-Host "🟢 robots.txt: Presente"
} else {
    Write-Host "🟡 ADVERTENCIA: robots.txt no presente"
    $warnings++
}

if (Test-Path (Join-Path $repoPath "sitemap.xml")) {
    Write-Host "🟢 sitemap.xml: Presente"
} else {
    Write-Host "🟡 ADVERTENCIA: sitemap.xml no presente"
    $warnings++
}

Write-Host "============================================="
Write-Host "RESUMEN DE AUDITORIA FINAL:"
Write-Host "Errores Críticos: $critical"
Write-Host "Errores Importantes: $important"
Write-Host "Advertencias: $warnings"
Write-Host "============================================="
