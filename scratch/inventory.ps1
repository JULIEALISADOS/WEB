$excludeFolders = @('BACKUP_*', 'backups-*', '.git', '.gemini')
$files = Get-ChildItem -Path . -Recurse -File | Where-Object { 
    $ext = $_.Extension.ToLower()
    ($ext -eq '.png' -or $ext -eq '.jpg' -or $ext -eq '.jpeg' -or $ext -eq '.svg' -or $ext -eq '.webp') -and
    $_.FullName -notmatch "BACKUP_" -and $_.FullName -notmatch "backups-" -and $_.FullName -notmatch "\.git" -and $_.FullName -notmatch "\.gemini"
}

$results = foreach ($f in $files) {
    $relativePath = $f.FullName.Replace((Get-Location).Path + "\", "")
    [PSCustomObject]@{
        Name = $f.Name
        Path = $relativePath
        SizeBytes = $f.Length
        SizeKB = [math]::Round($f.Length / 1KB, 2)
        SizeMB = [math]::Round($f.Length / 1MB, 2)
        Extension = $f.Extension.ToLower()
    }
}

$results | Sort-Object SizeBytes -Descending | Format-Table -AutoSize
