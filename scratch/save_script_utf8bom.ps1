$scriptPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\scratch\test_utf8_ps1.ps1"
$content = [System.IO.File]::ReadAllText($scriptPath)
[System.IO.File]::WriteAllText($scriptPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "test_utf8_ps1.ps1 guardado con UTF-8 BOM."
