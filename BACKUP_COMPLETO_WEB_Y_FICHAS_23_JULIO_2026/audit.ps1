$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -File
$cssFiles = Get-ChildItem -Path . -Filter "*.css" -File
$allFiles = $htmlFiles + $cssFiles

Write-Host "--- addEventListener ---"
$allFiles | Select-String -Pattern "addEventListener" | ForEach-Object {
    "$($_.Filename):$($_.LineNumber): $($_.Line.Trim())"
}

Write-Host "--- DOM APIs ---"
$allFiles | Select-String -Pattern "preventDefault|stopPropagation|stopImmediatePropagation|scrollIntoView|scrollTo|location\.hash|history\.pushState|history\.replaceState" | ForEach-Object {
    "$($_.Filename):$($_.LineNumber): $($_.Line.Trim())"
}

Write-Host "--- CSS Properties ---"
$allFiles | Select-String -Pattern "position:\s*(fixed|sticky)|transform\s*:|overflow\s*:|pointer-events\s*:|z-index\s*:\s*(100[1-9]|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|\d{5,})" | ForEach-Object {
    "$($_.Filename):$($_.LineNumber): $($_.Line.Trim())"
}

Write-Host "--- Observers ---"
$allFiles | Select-String -Pattern "IntersectionObserver|MutationObserver|ResizeObserver" | ForEach-Object {
    "$($_.Filename):$($_.LineNumber): $($_.Line.Trim())"
}

Write-Host "--- Active Class ---"
$allFiles | Select-String -Pattern "classList\.(add|remove|toggle)\('active'\)" | ForEach-Object {
    "$($_.Filename):$($_.LineNumber): $($_.Line.Trim())"
}

Write-Host "--- IDs ---"
$allFiles | Select-String -Pattern 'id="([^"]+)"' -AllMatches | ForEach-Object {
    $_.Matches | ForEach-Object {
        "$($_.Groups[1].Value) ($($_.Filename))"
    }
}
