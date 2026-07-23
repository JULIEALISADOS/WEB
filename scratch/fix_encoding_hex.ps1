$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"

# Leer bytes raw del archivo
$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

$c3 = [char]0x00C3
$c2 = [char]0x00C2

Write-Host "Buscando caracteres mojibake C3/C2..."

if ($text.Contains($c3) -or $text.Contains($c2)) {
    Write-Host "Mojibake detectado en articles.json. Reparando doble codificacion ISO-8859-1 -> UTF-8..."
    
    $iso = [System.Text.Encoding]::GetEncoding("iso-8859-1")
    $reboundBytes = $iso.GetBytes($text)
    $correctText = [System.Text.Encoding]::UTF8.GetString($reboundBytes)
    
    # Guardar en UTF-8 puro (sin BOM)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($jsonPath, $correctText, $utf8NoBom)
    Write-Host "REPARACION EXITOSA: Guardado en UTF-8 limpio sin BOM."
} else {
    Write-Host "No se encontraron caracteres C3/C2."
}
