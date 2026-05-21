
$filePath = "style.css"
$content = Get-Content -Raw -Encoding UTF8 $filePath

$old = '.privacy-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-top: 2px solid var(--gold);
    z-index: 9999;
    padding: 20px 0;
    box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
}'

$new = '.privacy-banner {
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

if ($content -like "*$old*") {
    $content = $content.Replace($old, $new)
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Success: Updated privacy-banner styles."
} else {
    Write-Host "Error: Could not find exactly the old style block."
}
