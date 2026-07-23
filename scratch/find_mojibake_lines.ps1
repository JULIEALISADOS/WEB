$jsonPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\julie-tips\data\articles.json"

$lines = Get-Content $jsonPath -Encoding UTF8
$c3 = [char]0x00C3
$c2 = [char]0x00C2
$replacement = [char]0xFFFD

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line.Contains($c3) -or $line.Contains($c2) -or $line.Contains($replacement)) {
        Write-Host "Mojibake on line $($i + 1): $line"
    }
}
