$ErrorActionPreference = 'Stop'
$Base = 'C:\Users\JETO0\OneDrive\Documentos\GitHub\WEB'

# Este script corrige las comillas faltantes en todos los archivos HTML
# El patron busca URLs de wa.me que no tienen comilla de cierre antes de un espacio+atributo

$Files = @(
    "$Base\index.html",
    "$Base\alisados.html",
    "$Base\linea-cuidado.html",
    "$Base\linea-profesional.html",
    "$Base\politica-envios.html",
    "$Base\politica-garantia.html",
    "$Base\politica-servicio.html",
    "$Base\promociones-condiciones.html",
    "$Base\terapias-hidratantes.html",
    "$Base\terapias-nutritivas.html",
    "$Base\terapias-restauradoras.html",
    "$Base\terapias-disciplinantes.html",
    "$Base\julie-tips\index.html",
    "$Base\julie-tips\articulo.html"
)

$TotalFixed = 0

foreach ($FilePath in $Files) {
    if (-not (Test-Path $FilePath)) {
        Write-Output "NO ENCONTRADO: $FilePath"
        continue
    }
    $Bytes   = [System.IO.File]::ReadAllBytes($FilePath)
    $Content = [System.Text.Encoding]::UTF8.GetString($Bytes)
    $Original = $Content

    # Patron 1: URL de wa.me seguida de espacio y class= (falta la comilla de cierre del href)
    # wa.me/573...texto ESPACIO class="  -->  wa.me/573...texto" class="
    $Content = [System.Text.RegularExpressions.Regex]::Replace(
        $Content,
        '(href="https://wa\.me/573043588180\?text=[^"]*?)([\s]+)(class=)',
        '$1"$2$3'
    )

    # Patron 2: URL de wa.me seguida de espacio y target= (falta comilla de cierre)
    $Content = [System.Text.RegularExpressions.Regex]::Replace(
        $Content,
        '(href="https://wa\.me/573043588180\?text=[^"]*?)([\s]+)(target=)',
        '$1"$2$3'
    )

    # Patron 3: URL de wa.me seguida de espacio y onclick= (falta comilla de cierre)
    $Content = [System.Text.RegularExpressions.Regex]::Replace(
        $Content,
        '(href="https://wa\.me/573043588180\?text=[^"]*?)([\s]+)(onclick=)',
        '$1"$2$3'
    )

    # Patron 4: template literal JS roto (`https://wa.me/...texto"  deberia ser  ...texto`)
    $Content = [System.Text.RegularExpressions.Regex]::Replace(
        $Content,
        '(`https://wa\.me/573043588180\?text=[^`"]*)"',
        '$1`'
    )

    if ($Content -ne $Original) {
        [System.IO.File]::WriteAllBytes($FilePath, [System.Text.Encoding]::UTF8.GetBytes($Content))
        $TotalFixed++
        Write-Output "CORREGIDO: $FilePath"
    } else {
        Write-Output "Sin cambios: $FilePath"
    }
}

Write-Output ""
Write-Output "Archivos corregidos: $TotalFixed"
