$htmlFiles = Get-ChildItem -Path . -Recurse -Filter "*.html" -File | Where-Object {
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\\.git" -and $_.FullName -notmatch "\\.gemini"
}

$cssFiles = Get-ChildItem -Path . -Recurse -Filter "*.css" -File | Where-Object {
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\\.git" -and $_.FullName -notmatch "\\.gemini"
}

Write-Host "=== 1. VERIFICANDO IMAGENES ROTAS Y RUTAS ==="
$brokenCount = 0
$checkedCount = 0

foreach ($html in $htmlFiles) {
    $content = Get-Content -Path $html.FullName -Raw
    $dir = $html.DirectoryName

    $matches = [regex]::Matches($content, 'src=["'']([^"'']+\.(png|jpg|jpeg|svg|webp))["'']', 'IgnoreCase')
    foreach ($m in $matches) {
        $checkedCount++
        $imgSrc = $m.Groups[1].Value
        $imgSrcDecoded = [System.Web.HttpUtility]::UrlDecode($imgSrc)

        if ($imgSrcDecoded.StartsWith("http://") -or $imgSrcDecoded.StartsWith("https://")) { continue }

        $fullImgPath = Join-Path $dir $imgSrcDecoded
        if (-not (Test-Path -Path $fullImgPath)) {
            Write-Host "BROKEN LINK: HTML '$($html.Name)' references '$imgSrc' -> NOT FOUND at '$fullImgPath'"
            $brokenCount++
        }
    }
}

Write-Host "Verificadas $checkedCount referencias de imagenes en HTML. Enlaces rotos: $brokenCount"

Write-Host "`n=== 2. BUSCANDO REFERENCIAS A IMAGENES ANTIGUAS NO OPTIMIZADAS ==="
$oldPngs = @("CAPILAR LINEA.png", "PROFESIONAL LINEA.png", "antes despues 1.png", "antes despues 2.png", "antes despues 3.png")
foreach ($oldImg in $oldPngs) {
    $found = $false
    foreach ($html in $htmlFiles) {
        $content = Get-Content -Path $html.FullName -Raw
        if ($content.Contains($oldImg) -or $content.Contains([System.Web.HttpUtility]::UrlDecode($oldImg))) {
            Write-Host "ADVERTENCIA: '$oldImg' todavia esta referenciada en '$($html.Name)'"
            $found = $true
        }
    }
    if (-not $found) {
        Write-Host "OK: Sin referencias pendientes a '$oldImg'"
    }
}

Write-Host "`n=== 3. IDENTIFICANDO ARCHIVOS HUERFANOS QUE PUEDEN LIMPIARSE ==="
$allImages = Get-ChildItem -Path . -Recurse -File | Where-Object {
    $ext = $_.Extension.ToLower()
    ($ext -eq '.png' -or $ext -eq '.jpg' -or $ext -eq '.jpeg' -or $ext -eq '.svg' -or $ext -eq '.webp') -and
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\\.git" -and $_.FullName -notmatch "\\.gemini"
}

$orphans = @()
foreach ($img in $allImages) {
    $name = $img.Name
    $isUsed = $false

    foreach ($html in $htmlFiles) {
        $content = Get-Content -Path $html.FullName -Raw
        if ($content.Contains($name) -or $content.Contains([System.Web.HttpUtility]::UrlDecode($name))) {
            $isUsed = $true; break
        }
    }

    if (-not $isUsed) {
        foreach ($css in $cssFiles) {
            $content = Get-Content -Path $css.FullName -Raw
            if ($content.Contains($name) -or $content.Contains([System.Web.HttpUtility]::UrlEncode($name))) {
                $isUsed = $true; break
            }
        }
    }

    if (-not $isUsed) {
        $orphans += $img
    }
}

Write-Host "Encontrados $($orphans.Count) archivos huerfanos:"
foreach ($o in $orphans) {
    $rel = $o.FullName.Replace((Get-Location).Path + "\", "")
    $sizeKB = [math]::Round($o.Length/1KB, 1)
    Write-Host "HUERFANO: $rel ($sizeKB KB)"
}

Write-Host "`n=== FIN DE VALIDACION ==="
