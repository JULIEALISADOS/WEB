$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"

$targetWords = @("Exposicion", "Proteccion", "Radiacion", "Cuticula", "Segun", "Tecnico", "Quimicos")

Write-Host "============================================="
Write-Host "AUDITORIA REAL DE ENCODING Y CARACTERES"
Write-Host "============================================="

$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

$c3 = [char]0x00C3
$c2 = [char]0x00C2
$replacementChar = [char]0xFFFD

$hasMojibake = $text.Contains($c3) -or $text.Contains($c2) -or $text.Contains($replacementChar)

if ($hasMojibake) {
    Write-Host "ERROR: Aun existen caracteres incorruptos (C3/C2) en el archivo!"
} else {
    Write-Host "EXITO: NINGUN CARACTER APARECE CORRUPTO COMO C3/C2 EN articles.json!"
}

# Verificación de palabras con tildes
$spanishWords = @("Exposición", "Protección", "Radiación", "Cutícula", "Según", "Técnico", "Químicos")

foreach ($w in $spanishWords) {
    if ($text.Contains($w)) {
        Write-Host "Palabra verificada: $w"
    }
}
