$ErrorActionPreference = "SilentlyContinue"
$dir = "."
$htmlFiles = Get-ChildItem -Path $dir -Filter "*.html" -File
$cssFiles = Get-ChildItem -Path $dir -Filter "*.css" -File
$jsFiles = Get-ChildItem -Path $dir -Filter "*.js" -File
$allFiles = $htmlFiles + $cssFiles + $jsFiles

$outPath = "C:\Users\JETO0\.gemini\antigravity\brain\f621aecb-815c-438b-8db8-79d6c5d20e48\auditoria_navegacion.md"
"# Auditoría de Navegación y DOM

" | Out-File -FilePath $outPath -Encoding utf8 -Force

"# 1. Archivos JavaScript que intervienen en la navegación
" | Out-File -FilePath $outPath -Encoding utf8 -Append
$jsFound = $false
foreach ($f in $jsFiles) {
    "- $($f.Name)
" | Out-File -FilePath $outPath -Encoding utf8 -Append
    $jsFound = $true
}
if (-not $jsFound) {
    "- *Toda la lógica de navegación se encuentra incrustada en los archivos HTML.*
" | Out-File -FilePath $outPath -Encoding utf8 -Append
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append

"## 2. Todos los addEventListener()
" | Out-File -FilePath $outPath -Encoding utf8 -Append
"| Archivo | Línea | Evento | Código |
|---|---|---|---|
" | Out-File -FilePath $outPath -Encoding utf8 -Append
foreach ($f in $allFiles) {
    $content = Get-Content $f.FullName
    for ($i = 0; $i -lt $content.Count; $i++) {
        $line = $content[$i]
        if ($line -match "addEventListener") {
            $event = "Desconocido"
            if ($line -match "\.addEventListener\(['\"`]([^'\"`]+)['\"`]") {
                $event = $matches[1]
            }
            $cleanLine = $line.Trim() -replace '\|', '&#124;'
            "| $($f.Name) | $($i+1) | \"$event\" | \"$cleanLine\" |
" | Out-File -FilePath $outPath -Encoding utf8 -Append
        }
    }
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append

"## 3. Llamadas a métodos de navegación y eventos
" | Out-File -FilePath $outPath -Encoding utf8 -Append
"| Archivo | Línea | Método/Propiedad | Código |
|---|---|---|---|
" | Out-File -FilePath $outPath -Encoding utf8 -Append
$domCalls = @('preventDefault', 'stopPropagation', 'stopImmediatePropagation', 'scrollIntoView', 'scrollTo', 'location\.hash', 'history\.pushState', 'history\.replaceState')
foreach ($f in $allFiles) {
    $content = Get-Content $f.FullName
    for ($i = 0; $i -lt $content.Count; $i++) {
        $line = $content[$i]
        foreach ($call in $domCalls) {
            if ($line -match $call) {
                $cleanLine = $line.Trim() -replace '\|', '&#124;'
                $displayCall = $call -replace '\\', ''
                "| $($f.Name) | $($i+1) | \"$displayCall\" | \"$cleanLine\" |
" | Out-File -FilePath $outPath -Encoding utf8 -Append
            }
        }
    }
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append

"## 4. Elementos CSS clave (fixed, sticky, transform, overflow, pointer-events, z-index > 1000)
" | Out-File -FilePath $outPath -Encoding utf8 -Append
"| Archivo | Línea | Propiedad | Código |
|---|---|---|---|
" | Out-File -FilePath $outPath -Encoding utf8 -Append
$cssPattern = "(position:\s*fixed|position:\s*sticky|transform:|overflow:|pointer-events:|z-index:\s*(100[1-9]|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|\d{5,}))"
foreach ($f in $allFiles) {
    $content = Get-Content $f.FullName
    for ($i = 0; $i -lt $content.Count; $i++) {
        $line = $content[$i]
        if ($line -match $cssPattern) {
            $cleanLine = $line.Trim() -replace '\|', '&#124;'
            "| $($f.Name) | $($i+1) | CSS | \"$cleanLine\" |
" | Out-File -FilePath $outPath -Encoding utf8 -Append
        }
    }
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append

"## 5. Todos los IDs del proyecto y duplicados
" | Out-File -FilePath $outPath -Encoding utf8 -Append
$ids = @{}
foreach ($f in $htmlFiles) {
    $content = Get-Content $f.FullName -Raw
    $matches = [regex]::Matches($content, 'id="([^"]+)"')
    foreach ($m in $matches) {
        $id = $m.Groups[1].Value
        if (-not $ids.ContainsKey($id)) {
            $ids[$id] = @()
        }
        $ids[$id] += $f.Name
    }
}
$dupes = $false
"### IDs Duplicados (en el mismo archivo)
" | Out-File -FilePath $outPath -Encoding utf8 -Append
foreach ($id in $ids.Keys) {
    $fileCounts = @{}
    foreach ($file in $ids[$id]) {
        if (-not $fileCounts.ContainsKey($file)) { $fileCounts[$file] = 0 }
        $fileCounts[$file]++
    }
    foreach ($file in $fileCounts.Keys) {
        if ($fileCounts[$file] -gt 1) {
            "- **Duplicado:** \"$id\" aparece $($fileCounts[$file]) veces en \"$file\"
" | Out-File -FilePath $outPath -Encoding utf8 -Append
            $dupes = $true
        }
    }
}
if (-not $dupes) {
    "- *No se encontraron IDs duplicados en el mismo archivo.*
" | Out-File -FilePath $outPath -Encoding utf8 -Append
}
"### Inventario de IDs por Archivo (Global)
" | Out-File -FilePath $outPath -Encoding utf8 -Append
$sortedIds = $ids.Keys | Sort-Object
foreach ($id in $sortedIds) {
    $uniqueFiles = $ids[$id] | Select-Object -Unique
    $filesStr = $uniqueFiles -join ', '
    "- \"$id\": $filesStr
" | Out-File -FilePath $outPath -Encoding utf8 -Append
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append

"## 6. Intersección y Mutación (Observers)
" | Out-File -FilePath $outPath -Encoding utf8 -Append
$obsFound = $false
foreach ($f in $allFiles) {
    $content = Get-Content $f.FullName
    for ($i = 0; $i -lt $content.Count; $i++) {
        $line = $content[$i]
        if ($line -match "IntersectionObserver|MutationObserver|ResizeObserver") {
            "- \"$($f.Name)\" (Línea $($i+1)): \"$($line.Trim())\"
" | Out-File -FilePath $outPath -Encoding utf8 -Append
            $obsFound = $true
        }
    }
}
if (-not $obsFound) {
    "- *No se encontraron Observers.*
" | Out-File -FilePath $outPath -Encoding utf8 -Append
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append

"## 7. Lugares donde se modifica la clase .active
" | Out-File -FilePath $outPath -Encoding utf8 -Append
"| Archivo | Línea | Código |
|---|---|---|
" | Out-File -FilePath $outPath -Encoding utf8 -Append
foreach ($f in $allFiles) {
    $content = Get-Content $f.FullName
    for ($i = 0; $i -lt $content.Count; $i++) {
        $line = $content[$i]
        if ($line -match "classList\.(add|remove|toggle)\(['\"]active['\"]\)") {
            $cleanLine = $line.Trim() -replace '\|', '&#124;'
            "| $($f.Name) | $($i+1) | \"$cleanLine\" |
" | Out-File -FilePath $outPath -Encoding utf8 -Append
        }
    }
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append

"## 8. Funciones relacionadas con menú, overlay, navegación y scroll
" | Out-File -FilePath $outPath -Encoding utf8 -Append
$funcKeywords = @('menu', 'overlay', 'nav', 'scroll')
foreach ($f in $allFiles) {
    $content = Get-Content $f.FullName
    for ($i = 0; $i -lt $content.Count; $i++) {
        $line = $content[$i]
        if ($line -match "function\s+(\w+)") {
            $funcName = $matches[1].ToLower()
            foreach ($kw in $funcKeywords) {
                if ($funcName -match $kw) {
                    "- \"$($f.Name)\" (Línea $($i+1)): \"$($line.Trim())\"
" | Out-File -FilePath $outPath -Encoding utf8 -Append
                    break
                }
            }
        } elseif ($line -match "(const|let|var)\s+(\w+)\s*=\s*(\(.*\)|\w+)\s*=>") {
            $funcName = $matches[2].ToLower()
            foreach ($kw in $funcKeywords) {
                if ($funcName -match $kw) {
                    "- \"$($f.Name)\" (Línea $($i+1)): \"$($line.Trim())\"
" | Out-File -FilePath $outPath -Encoding utf8 -Append
                    break
                }
            }
        }
    }
}
"
" | Out-File -FilePath $outPath -Encoding utf8 -Append
Write-Host "Done"
