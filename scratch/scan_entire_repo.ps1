# Script de Escaneo Completo de Repositorio para Mojibake

$repoPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB"

$c3 = [char]0x00C3
$c2 = [char]0x00C2
$replacement = [char]0xFFFD

Write-Host "============================================="
Write-Host "ESCANEO COMPLETO DEL REPOSITORIO (FASE 1)"
Write-Host "============================================="

$files = Get-ChildItem -Path $repoPath -Recurse -Include *.html, *.js, *.json, *.css, *.md -Exclude BACKUP_COMPLETO_*

$foundCount = 0

foreach ($file in $files) {
    try {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $text = [System.Text.Encoding]::UTF8.GetString($bytes)

        if ($text.Contains($c3) -or $text.Contains($c2) -or $text.Contains($replacement)) {
            $lines = Get-Content $file.FullName -Encoding UTF8
            for ($i = 0; $i -lt $lines.Count; $i++) {
                $line = $lines[$i]
                if ($line.Contains($c3) -or $line.Contains($c2) -or $line.Contains($replacement)) {
                    $foundCount++
                    Write-Host "Archivo: $($file.FullName.Replace($repoPath, '')) | Linea: $($i + 1)"
                    Write-Host "Texto: $($line.Trim())`n"
                }
            }
        }
    } catch {
        # Ignorar archivos no legibles
    }
}

Write-Host "============================================="
Write-Host "TOTAL DE OCURRENCIAS ENCONTRADAS: $foundCount"
Write-Host "============================================="
