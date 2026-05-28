$procInfo = New-Object System.Diagnostics.ProcessStartInfo
$procInfo.FileName = "git"
$procInfo.Arguments = "show 798ad13:index.html"
$procInfo.RedirectStandardOutput = $true
$procInfo.UseShellExecute = $false
$procInfo.StandardOutputEncoding = [System.Text.Encoding]::UTF8

$process = New-Object System.Diagnostics.Process
$process.StartInfo = $procInfo
[void]$process.Start()

$output = $process.StandardOutput.ReadToEnd()
[void]$process.WaitForExit()

[System.IO.File]::WriteAllText("C:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\temp_old_index_798ad13.html", $output, [System.Text.Encoding]::UTF8)
Write-Host "Successfully wrote temp_old_index_798ad13.html in UTF-8!"
