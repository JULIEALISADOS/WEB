Add-Type -AssemblyName System.Drawing

function Optimize-File {
    param (
        [string]$src,
        [string]$dst,
        [int]$maxW = 1200,
        [int]$q = 82
    )

    if (-not (Test-Path -Path $src)) { 
        Write-Host "File not found: $src"
        return 
    }

    try {
        $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
        $w = $img.Width
        $h = $img.Height

        if ($w -gt $maxW) {
            $nw = $maxW
            $nh = [math]::Round(($h * $maxW) / $w)
        } else {
            $nw = $w
            $nh = $h
        }

        $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $g.DrawImage($img, 0, 0, $nw, $nh)

        $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
        $jpegCodec = $null
        foreach ($c in $codecs) {
            if ($c.MimeType -eq 'image/jpeg') { $jpegCodec = $c; break }
        }

        $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int]$q)

        $tmp = $dst + ".tmp.jpg"
        $bmp.Save($tmp, $jpegCodec, $ep)

        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()

        $oldSize = (Get-Item $src).Length
        $newSize = (Get-Item $tmp).Length

        if ($newSize -lt $oldSize -or $src -ne $dst) {
            Move-Item -Path $tmp -Destination $dst -Force
            $saved = [math]::Round(($oldSize - $newSize) / 1KB, 1)
            Write-Host "SUCCESS: $src -> $dst | Saved: $saved KB ($([math]::Round($oldSize/1KB,1))KB -> $([math]::Round($newSize/1KB,1))KB)"
        } else {
            Remove-Item -Path $tmp -Force
            Write-Host "SKIPPED (already optimal): $src"
        }
    } catch {
        Write-Host "ERROR processing $src : $_"
    }
}

Write-Host "--- COMPRESSING HEAVY IMAGES ---"
Optimize-File "CAPILAR LINEA.png" "CAPILAR LINEA.jpg" 1200 82
Optimize-File "PROFESIONAL LINEA.png" "PROFESIONAL LINEA.jpg" 1200 82
Optimize-File "antes despues 1.png" "antes despues 1.jpg" 800 82
Optimize-File "antes despues 2.png" "antes despues 2.jpg" 800 82
Optimize-File "antes despues 3.png" "antes despues 3.jpg" 800 82
Optimize-File "EMULSION ZERO.jpg" "EMULSION ZERO.jpg" 1000 82
Optimize-File "CAPILAR LINEA.jpg" "CAPILAR LINEA.jpg" 1000 82
Optimize-File "PROFESIONAL LINEA.jpg" "PROFESIONAL LINEA.jpg" 1000 82
Optimize-File "pago a cuotas banner promociones.jpg" "pago a cuotas banner promociones.jpg" 1000 80
Optimize-File "logo disco ball.jpeg" "logo disco ball.jpeg" 600 80
Optimize-File "alisdo mayo imagen.jpeg" "alisdo mayo imagen.jpeg" 600 80
Optimize-File "chocofix mayo imagen.jpeg" "chocofix mayo imagen.jpeg" 600 80
Optimize-File "reposicion mayo imagen.jpeg" "reposicion mayo imagen.jpeg" 600 80
Optimize-File "emulsion mayo imagen.jpeg" "emulsion mayo imagen.jpeg" 600 80

Optimize-File "shampoo-argan.jpeg" "shampoo-argan.jpeg" 800 82
Optimize-File "mascarilla-oro.jpeg" "mascarilla-oro.jpeg" 800 82
Optimize-File "acondiconador argan.jpeg" "acondiconador argan.jpeg" 800 82
Optimize-File "tratamiento-multiactivo.jpeg" "tratamiento-multiactivo.jpeg" 800 82
Optimize-File "aceite-reparador.jpeg" "aceite-reparador.jpeg" 800 82
Optimize-File "shampoo extractos.jpeg" "shampoo extractos.jpeg" 800 82
Optimize-File "acondiconador extractos.jpeg" "acondiconador extractos.jpeg" 800 82
Optimize-File "LINEA ARGAN.jpg" "LINEA ARGAN.jpg" 800 82
Optimize-File "LINEA EXTRACTOS.jpg" "LINEA EXTRACTOS.jpg" 800 82
Optimize-File "linea de cuidado.jpg" "linea de cuidado.jpg" 800 82
Optimize-File "linea profesional.jpg" "linea profesional.jpg" 800 82
Optimize-File "alisado-saludable-pro.jpg" "alisado-saludable-pro.jpg" 800 82
Write-Host "--- FINISHED COMPRESSING ---"
