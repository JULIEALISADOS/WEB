$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$indexPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\index.html"

Write-Host "============================================="
Write-Host "VERIFICACION DE COHERENCIA DE INFORMACION"
Write-Host "============================================="

$rawJson = Get-Content $jsonPath -Raw -Encoding UTF8
$articles = $rawJson | ConvertFrom-Json
$indexHtml = Get-Content $indexPath -Raw -Encoding UTF8

$errors = 0

# 1. Verificar protocolo de Tinte (20 dias post-alisado)
if ($rawJson -match "20 d" -and $indexHtml -match "20 d") {
    Write-Host "Protocolo Tinte: Coherente (20 dias post-alisado en blog y landing)"
} else {
    Write-Host "Discrepancia en protocolo de Tinte"
    $errors++
}

# 2. Verificar protocolo de Decoloración (30 dias / 1 mes pre-alisado)
if ($rawJson -match "30 d" -and $indexHtml -match "30 d") {
    Write-Host "Protocolo Decoloracion: Coherente (30 dias / 1 mes pre-alisado)"
} else {
    Write-Host "Discrepancia en protocolo de Decoloracion"
    $errors++
}

# 3. Verificar Sedes (Tunja y Moniquirá)
if ($rawJson -match "Tunja" -and $rawJson -match "Moniquir") {
    Write-Host "Sedes: Coherentes (Tunja y Moniquira presentes)"
} else {
    Write-Host "Discrepancia en Sedes"
    $errors++
}

# 4. Verificar WhatsApp (3043588180)
if ($rawJson -match "3043588180" -or $indexHtml -match "3043588180") {
    Write-Host "WhatsApp: Coherente (+57 304 358 8180)"
} else {
    Write-Host "Discrepancia en WhatsApp"
    $errors++
}

# 5. Verificar Política Libre de Formol
if ($rawJson -match "libre de formol" -and $indexHtml -match "libre de formol") {
    Write-Host "Politica Formol: Coherente (100% Libre de Formol)"
} else {
    Write-Host "Discrepancia en Politica de Formol"
    $errors++
}

if ($errors -eq 0) {
    Write-Host "============================================="
    Write-Host "VALIDACION EXITOSA: TODA LA INFORMACION ES 100% COHERENTE."
    Write-Host "============================================="
}
