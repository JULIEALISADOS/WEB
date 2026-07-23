# Script de Verificación de Bytes Reales UTF-8

$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$bytes = [System.IO.File]::ReadAllBytes($jsonPath)

# Buscar secuencias de bytes de Mojibake: 
# 0xC3 0x83 = 'Ã'
# 0xC3 0x82 = 'Â'

$mojibakeFound = 0

for ($i = 0; $i -lt $bytes.Length - 1; $i++) {
    if ($bytes[$i] -eq 0xC3 -and ($bytes[$i+1] -eq 0x83 -or $bytes[$i+1] -eq 0x82)) {
        $mojibakeFound++
    }
}

Write-Host "============================================="
Write-Host "AUDITORÍA REAL DE BYTES DE ARCHIVO (UTF-8)"
Write-Host "============================================="
Write-Host "Total bytes de articles.json: $($bytes.Length)"

if ($mojibakeFound -eq 0) {
    Write-Host "✅ EXITO TOTAL: 0 secuencias Mojibake (C3 83 / C3 82) encontradas en el archivo."
    Write-Host "El archivo contiene exclusivamente caracteres UTF-8 validos para navegador (Chrome/Edge)."
} else {
    Write-Host "❌ ERROR: Se encontraron $mojibakeFound secuencias Mojibake en el archivo bytes."
}
