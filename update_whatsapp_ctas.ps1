$ErrorActionPreference = 'Stop'
$Phone = '573043588180'

function Update-File {
    param([string]$FilePath, [string]$Mensaje)
    if (-not (Test-Path $FilePath)) {
        Write-Output "NO ENCONTRADO: $FilePath"
        return
    }
    $Bytes    = [System.IO.File]::ReadAllBytes($FilePath)
    $Content  = [System.Text.Encoding]::UTF8.GetString($Bytes)
    $Original = $Content
    $encoded  = [Uri]::EscapeDataString($Mensaje)
    $NewUrl   = "https://wa.me/$Phone?text=$encoded"
    # Reemplaza cualquier URL de WhatsApp existente (correcta o mal formada)
    $Content = $Content -replace 'https?://(?:api\.whatsapp\.com/send[^"''>\s]*|wa\.me/[^"''>\s]*)', $NewUrl
    if ($Content -ne $Original) {
        [System.IO.File]::WriteAllBytes($FilePath, [System.Text.Encoding]::UTF8.GetBytes($Content))
        Write-Output "OK: $FilePath"
    } else {
        Write-Output "Sin cambios: $FilePath"
    }
}

$Base = 'C:\Users\JETO0\OneDrive\Documentos\GitHub\WEB'

Update-File "$Base\index.html" `
"Hola, estoy visitando la pagina de Julie Alisados y me gustaria recibir una asesoria personalizada para saber que tratamiento es el ideal para mi cabello. Cuando me pueden atender?"

Update-File "$Base\alisados.html" `
"Hola, vi los servicios de Alisado Saludable y me interesa mucho. Me gustaria saber cual es el mas adecuado para mi tipo de cabello y conocer la disponibilidad."

Update-File "$Base\linea-cuidado.html" `
"Hola, estoy viendo la Linea de Cuidado Capilar y quiero saber cual de los productos es el mas adecuado para mi cabello. Me pueden orientar?"

Update-File "$Base\linea-profesional.html" `
"Hola, soy profesional del cabello y me interesa conocer la Linea Profesional de Julie Alisados para implementarla en mi salon. Como puedo obtener mas informacion?"

Update-File "$Base\politica-envios.html" `
"Hola, tengo una pregunta sobre los envios de los productos Julie Alisados. Me pueden ayudar?"

Update-File "$Base\politica-garantia.html" `
"Hola, tengo una pregunta sobre la garantia de los productos Julie Alisados. Me pueden ayudar?"

Update-File "$Base\politica-servicio.html" `
"Hola, tengo una consulta sobre el servicio al cliente de Julie Alisados. Me pueden orientar?"

Update-File "$Base\promociones-condiciones.html" `
"Hola, estoy revisando las condiciones de las promociones de Julie Alisados y tengo una duda. Me pueden ayudar?"

Update-File "$Base\terapias-hidratantes.html" `
"Hola, mi cabello esta muy reseco y me interesa una Terapia Hidratante. Me gustaria saber cual es la mas indicada para mi y como agendar una cita."

Update-File "$Base\terapias-nutritivas.html" `
"Hola, vi las Terapias Nutritivas de Julie Alisados y me interesa saber cual es la ideal para cabello sin vida y debilitado. Me pueden orientar?"

Update-File "$Base\terapias-restauradoras.html" `
"Hola, mi cabello esta muy danado por quimica y busco una Terapia Restauradora. Quisiera una valoracion y saber el tratamiento ideal para mi caso."

Update-File "$Base\terapias-disciplinantes.html" `
"Hola, tengo mucho frizz y el cabello muy rebelde. Vi las Terapias Disciplinantes y me gustaria saber cual me recomiendan y como agendar."

Update-File "$Base\julie-tips\index.html" `
"Hola, estoy leyendo el blog de Julie Tips y me surgio una duda sobre el cuidado de mi cabello. Podrian darme una asesoria personalizada?"

Update-File "$Base\julie-tips\articulo.html" `
"Hola, lei uno de los articulos de Julie Tips y me interesa aplicar esos consejos en mi cabello. Me gustaria recibir una valoracion capilar personalizada."

Write-Output ""
Write-Output "Proceso terminado."
