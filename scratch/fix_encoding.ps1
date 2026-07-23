# Script de Diagnóstico y Reparación de Mojibake (UTF-8 / Latin-1 Double Encoding)

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"

# Leer el texto tal como está guardado actualmente
$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

Write-Host "Comprobando presencia de mojibake (Ã¡, Ã©, Ã³, Â¿, etc.)..."
if ($text -match "Ã|Â") {
    Write-Host "⚠️ Mojibake detectado. Procediendo a reparar doble codificación..." -ForegroundColor Yellow
    
    # Decodificar los caracteres interpretados erróneamente como ISO-8859-1 / Windows-1252 de vuelta a UTF-8
    $latin1 = [System.Text.Encoding]::GetEncoding("iso-8859-1")
    $latin1Bytes = $latin1.GetBytes($text)
    $fixedText = [System.Text.Encoding]::UTF8.GetString($latin1Bytes)
    
    # Guardar en UTF-8 puro (sin BOM)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($jsonPath, $fixedText, $utf8NoBom)
    
    Write-Host "✅ Archivo reparado y guardado en UTF-8 sin BOM." -ForegroundColor Green
} else {
    Write-Host "✅ No se detectó mojibake en el archivo." -ForegroundColor Green
}
