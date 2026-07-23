# Test de lectura de articles.json y estado de Live Server

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

Write-Host "Bytes en archivo local: $($bytes.Length)"
Write-Host "Primeros 100 caracteres:"
Write-Host $text.Substring(0, [Math]::Min(100, $text.Length))

try {
    $webResponse = Invoke-WebRequest -Uri "http://127.0.0.1:5500/julie-tips/data/articles.json" -UseBasicParsing
    Write-Host "`nRespuesta HTTP de Live Server:"
    Write-Host "StatusCode: $($webResponse.StatusCode)"
    Write-Host "Content Length: $($webResponse.Content.Length)"
} catch {
    Write-Host "`nLive Server no respondi en 5500 o requiere recarga."
}
