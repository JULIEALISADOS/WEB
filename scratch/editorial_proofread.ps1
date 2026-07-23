$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$rawJson = Get-Content $jsonPath -Raw -Encoding UTF8
$articles = $rawJson | ConvertFrom-Json

Write-Host "============================================="
Write-Host "AUDITORIA DE CORRECCION EDITORIAL PROFESIONAL"
Write-Host "============================================="

$errors = 0

foreach ($art in $articles) {
    # 1. Verificar fuentes cientificas
    foreach ($src in $art.sources) {
        if ($src -notmatch "INVIMA|PubMed|American Academy of Dermatology|AAD|Journal of Dermatological Science|International Journal of Cosmetic Science") {
            Write-Host "Cita fuera de estandar en $($art.id): $src"
            $errors++
        }
    }
}

Write-Host "Articulos procesados: $($articles.Count)"
if ($errors -eq 0) {
    Write-Host "VALIDACION EDITORIAL COMPLETADA CON EXITO (0 ERRORES)."
} else {
    Write-Host "Se encontraron $errors inconsistencias."
}
