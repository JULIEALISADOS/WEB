
$filePath = "style.css"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Nuevo bloque de estilos para optimizar las fotos de la tienda
$shopStyles = '
/* Optimización de Fotos de Tienda */
.product-image {
    height: 320px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 20px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.product-image img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    filter: drop-shadow(0 5px 15px rgba(0,0,0,0.08));
}

.product-card:hover .product-image img {
    transform: scale(1.1) translateY(-5px);
}

.product-price {
    position: absolute;
    bottom: 15px;
    right: 15px;
    background: var(--gold-dark);
    color: #fff;
    padding: 6px 18px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 5;
}

@media (max-width: 768px) {
    .product-image {
        height: 260px;
    }
}
'

# Reemplazar los estilos antiguos de product-image
$pattern = '(?s)\.product-image \{.*?\}'
if ($content -match $pattern) {
    $content = [regex]::Replace($content, $pattern, $shopStyles)
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Success: Optimized product images style."
} else {
    # Si no encuentra el bloque específico, lo añade al final
    $content += "`n" + $shopStyles
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Success: Added optimized product styles to end of file."
}
