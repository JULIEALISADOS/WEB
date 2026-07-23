$scriptPath = "c:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\scratch\sync_blog_faqs.ps1"
$content = [System.IO.File]::ReadAllText($scriptPath, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($scriptPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "sync_blog_faqs.ps1 guardado con UTF-8 BOM."
