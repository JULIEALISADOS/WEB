Add-Type -AssemblyName System.Drawing

$images = Get-ChildItem -Path . -Recurse -File | Where-Object {
    $ext = $_.Extension.ToLower()
    ($ext -eq '.png' -or $ext -eq '.jpg' -or $ext -eq '.jpeg' -or $ext -eq '.svg' -or $ext -eq '.webp') -and
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\\.git" -and $_.FullName -notmatch "\\.gemini"
}

$output = @()
foreach ($img in ($images | Sort-Object Length -Descending)) {
    $dims = "N/A"
    try {
        if ($img.Extension -ne ".svg") {
            $bmp = [System.Drawing.Image]::FromFile($img.FullName)
            $dims = "$($bmp.Width)x$($bmp.Height)"
            $bmp.Dispose()
        }
    } catch {}
    
    $output += [PSCustomObject]@{
        Name = $img.Name
        Path = $img.FullName.Replace((Get-Location).Path + "\", "")
        SizeKB = [math]::Round($img.Length / 1KB, 1)
        Dimensions = $dims
        Format = $img.Extension.TrimStart('.').ToUpper()
    }
}

$output | Out-String | Write-Host
