$scriptPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\scratch\restore_and_build_all_master.ps1"
$content = [System.IO.File]::ReadAllText($scriptPath, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($scriptPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "restore_and_build_all_master.ps1 guardado con UTF-8 BOM."
