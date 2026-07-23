# Script para asegurar que articles.json siempre sea un Array JSON [...]

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$rawJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8).TrimStart([char]0xFEFF).Trim()

if (-not $rawJson.StartsWith("[")) {
    $rawJson = "[$rawJson]"
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($jsonPath, $rawJson, $utf8NoBom)

Write-Host "✅ articles.json formateado como Array JSON válido [...]."
