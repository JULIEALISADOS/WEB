Add-Type -AssemblyName System.Drawing

function Compress-Image {
    param (
        [string]$sourcePath,
        [string]$targetPath,
        [int]$maxWidth = 1200,
        [int]$quality = 82
    )

    if (-not (Test-Path $sourcePath)) { return }

    try {
        $img = [System.Drawing.Image]::FromFile($sourcePath)
        $origWidth = $img.Width
        $origHeight = $img.Height

        # Calculate target dimensions while keeping aspect ratio
        if ($origWidth -gt $maxWidth) {
            $newWidth = $maxWidth
            $newHeight = [math]::Round(($origHeight * $maxWidth) / $origWidth)
        } else {
            $newWidth = $origWidth
            $newHeight = $origHeight
        }

        # Create bitmap canvas
        $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $g.DrawImage($img, 0, 0, $newWidth, $newHeight)

        # Setup encoder quality
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int]$quality)

        # Save to temp file first
        $tempPath = $targetPath + ".tmp"
        $bmp.Save($tempPath, $jpegCodec, $encoderParams)

        # Cleanup graphics memory
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()

        # Check if optimized size is smaller
        $oldSize = (Get-Item $sourcePath).Length
        $newSize = (Get-Item $tempPath).Length

        if ($newSize -lt $oldSize -or $sourcePath.EndsWith(".png", [System.StringComparison]::OrdinalIgnoreCase)) {
            Move-Item -Path $tempPath -Destination $targetPath -Force
            $savedKB = [math]::Round(($oldSize - $newSize) / 1KB, 1)
            Write-Host "Optimized: $sourcePath -> Target: $targetPath | Original: $([math]::Round($oldSize/1KB,1))KB -> New: $([math]::Round($newSize/1KB,1))KB | Saved: ${savedKB}KB"
        } else {
            Remove-Item -Path $tempPath -Force
            Write-Host "Kept original: $sourcePath (already optimal)"
        }
    } catch {
        Write-Host "Error optimizing $sourcePath : $_"
    }
}

Write-Host "=== INICIANDO OPTIMIZACIÓN DE IMÁGENES LOCALES ==="

# 1. Banners Gigantes de PNG a JPG Optimizado (6.3 MB -> ~150 KB)
Compress-Image -sourcePath "CAPILAR LINEA.png" -targetPath "CAPILAR LINEA.jpg" -maxWidth 1200 -quality 82
Compress-Image -sourcePath "PROFESIONAL LINEA.png" -targetPath "PROFESIONAL LINEA.jpg" -maxWidth 1200 -quality 82

# 2. Resultados Antes/Después (680 KB -> ~55 KB)
Compress-Image -sourcePath "antes despues 1.png" -targetPath "antes despues 1.jpg" -maxWidth 800 -quality 82
Compress-Image -sourcePath "antes despues 2.png" -targetPath "antes despues 2.jpg" -maxWidth 800 -quality 82
Compress-Image -sourcePath "antes despues 3.png" -targetPath "antes despues 3.jpg" -maxWidth 800 -quality 82

# 3. Productos y Banners de Productos
Compress-Image -sourcePath "EMULSION ZERO.jpg" -targetPath "EMULSION ZERO.jpg" -maxWidth 1000 -quality 82
Compress-Image -sourcePath "CAPILAR LINEA.jpg" -targetPath "CAPILAR LINEA.jpg" -maxWidth 1000 -quality 82
Compress-Image -sourcePath "PROFESIONAL LINEA.jpg" -targetPath "PROFESIONAL LINEA.jpg" -maxWidth 1000 -quality 82
Compress-Image -sourcePath "pago a cuotas banner promociones.jpg" -targetPath "pago a cuotas banner promociones.jpg" -maxWidth 1000 -quality 80

# 4. Thumbnails de Promociones
Compress-Image -sourcePath "logo disco ball.jpeg" -targetPath "logo disco ball.jpeg" -maxWidth 600 -quality 80
Compress-Image -sourcePath "alisdo mayo imagen.jpeg" -targetPath "alisdo mayo imagen.jpeg" -maxWidth 600 -quality 80
Compress-Image -sourcePath "chocofix mayo imagen.jpeg" -targetPath "chocofix mayo imagen.jpeg" -maxWidth 600 -quality 80
Compress-Image -sourcePath "reposicion mayo imagen.jpeg" -targetPath "reposicion mayo imagen.jpeg" -maxWidth 600 -quality 80
Compress-Image -sourcePath "emulsion mayo imagen.jpeg" -targetPath "emulsion mayo imagen.jpeg" -maxWidth 600 -quality 80

for ($i = 1; $i -le 8; $i++) {
    $pngPath = "abril $i.png"
    $jpgPath = "abril $i.jpg"
    Compress-Image -sourcePath $pngPath -targetPath $jpgPath -maxWidth 500 -quality 80
}

# 5. Productos individuales
$prodList = @(
    "linea de extractos.jpeg", "rcp junio.jpeg", "hidracomplex junio.jpeg", "alisado saludable junio.jpeg",
    "shampoo-argan.jpeg", "mascarilla-oro.jpeg", "acondiconador argan.jpeg", "tratamiento-multiactivo.jpeg",
    "aceite-reparador.jpeg", "shampoo extractos.jpeg", "acondiconador extractos.jpeg", "LINEA ARGAN.jpg",
    "LINEA EXTRACTOS.jpg", "linea de cuidado.jpg", "linea profesional.jpg", "alisado-saludable-pro.jpg"
)

foreach ($prod in $prodList) {
    Compress-Image -sourcePath $prod -targetPath $prod -maxWidth 800 -quality 82
}

Write-Host "=== OPTIMIZACIÓN COMPLETADA CON ÉXITO ==="
