$files = Get-ChildItem -Path . -Recurse -File | Where-Object { 
    $ext = $_.Extension.ToLower()
    ($ext -eq '.png' -or $ext -eq '.jpg' -or $ext -eq '.jpeg' -or $ext -eq '.svg' -or $ext -eq '.webp') -and
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\.git" -and $_.FullName -notmatch "\.gemini"
}

$htmlFiles = Get-ChildItem -Path . -Recurse -Filter "*.html" -File | Where-Object {
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\.git" -and $_.FullName -notmatch "\.gemini"
}
$cssFiles = Get-ChildItem -Path . -Recurse -Filter "*.css" -File | Where-Object {
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\.git" -and $_.FullName -notmatch "\.gemini"
}

$inventory = foreach ($f in $files) {
    $relativePath = $f.FullName.Replace((Get-Location).Path + "\", "")
    $fileName = $f.Name

    # Check HTML usage
    $usedIn = @()
    foreach ($h in $htmlFiles) {
        $content = Get-Content -Path $h.FullName -Raw
        if ($content -like "*$fileName*" -or $content -like "*$([System.Web.HttpUtility]::UrlEncode($fileName))*") {
            $usedIn += $h.Name
        }
    }
    foreach ($c in $cssFiles) {
        $content = Get-Content -Path $c.FullName -Raw
        if ($content -like "*$fileName*" -or $content -like "*$([System.Web.HttpUtility]::UrlEncode($fileName))*") {
            $usedIn += $c.Name
        }
    }

    [PSCustomObject]@{
        Name = $fileName
        Path = $relativePath
        SizeBytes = $f.Length
        SizeKB = [math]::Round($f.Length / 1KB, 2)
        SizeMB = [math]::Round($f.Length / 1MB, 2)
        Format = $f.Extension.TrimStart('.').ToUpper()
        UsedCount = $usedIn.Count
        UsedIn = ($usedIn -join ", ")
    }
}

$inventory | Sort-Object SizeBytes -Descending | Export-Csv -Path "scratch/image_inventory.csv" -NoTypeInformation -Encoding UTF8
$inventory | Sort-Object SizeBytes -Descending | Select-Object Name, SizeKB, Format, UsedCount, UsedIn | Format-Table -AutoSize
