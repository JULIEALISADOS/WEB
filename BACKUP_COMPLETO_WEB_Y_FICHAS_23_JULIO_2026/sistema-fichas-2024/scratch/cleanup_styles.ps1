
$filePath = "style.css"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Eliminar bloques añadidos hoy
$pattern1 = '(?s)/\s*\* Sección de Tienda Online TikTok Ready \*/.*?(?=\n/\*|$)'
$pattern2 = '(?s)/\s*\* Optimización de Fotos de Tienda \*/.*?(?=\n/\*|$)'

$content = [regex]::Replace($content, $pattern1, "")
$content = [regex]::Replace($content, $pattern2, "")

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Success: Cleaned up shop styles from style.css."
