$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"

$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

# Remover BOM \uFEFF si existe al inicio
$cleanText = $text.TrimStart([char]0xFEFF)

# Guardar con UTF8 sin BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($jsonPath, $cleanText, $utf8NoBom)

Write-Host "BOM removido. Archivo JSON inicia limpiamente con '['"
