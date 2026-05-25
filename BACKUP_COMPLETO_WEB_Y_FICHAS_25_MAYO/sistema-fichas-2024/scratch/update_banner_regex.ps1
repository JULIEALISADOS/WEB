
$filePath = "style.css"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Patrón para encontrar el bloque .privacy-banner
$pattern = '(?s)\.privacy-banner\s*\{.*?\}'

$newStyle = '.privacy-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-top: 1px solid rgba(212, 175, 55, 0.3);
    z-index: 9999;
    padding: 20px 0;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
}'

if ($content -match $pattern) {
    $content = [regex]::Replace($content, $pattern, $newStyle)
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Success: Updated privacy-banner styles with regex."
} else {
    Write-Host "Error: Could not find .privacy-banner block."
}
