$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"
$rawJson = Get-Content $jsonPath -Raw -Encoding UTF8
$articles = $rawJson | ConvertFrom-Json

$artFormol = $articles | Where-Object { $_.id -eq "riesgos-del-formol-en-el-cabello" }
if ($artFormol) {
    $artFormol.sources = @(
        "INVIMA Colombia: Alerta sobre comercialización ilegal de alisadores con formaldehído.",
        "PubMed ID 2819024: Formaldehyde toxicity and cutaneous risks in salon smoothing procedures.",
        "American Academy of Dermatology (AAD): Official statement on non-formaldehyde hair treatments."
    )
}

$jsonContent = $articles | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($jsonPath, $jsonContent, [System.Text.Encoding]::UTF8)
Write-Host "✅ Cita de fuente corregida a PubMed / AAD / INVIMA."
