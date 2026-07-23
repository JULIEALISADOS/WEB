$ErrorActionPreference = 'Stop'

# Phone number used for all WhatsApp CTA links
$Phone = '573043588180'

# Mapping of HTML file names (lowercase) to the specific WhatsApp message that should be sent
$MessageMap = @{
    'index.html'                = 'Hola 😊 estoy interesada en obtener más información sobre los servicios de Julie Alisados'
    'alisados.html'             = 'Hola 😊 me gustaría saber más sobre el Alisado Saludable'
    'taninoplastia.html'        = 'Hola 😊 quiero información sobre la Taninoplastia'
    'fototerapia.html'          = 'Hola 😊 estoy interesada en la Fototerapia'
    'recuperacion-capilar.html' = 'Hola 😊 quisiera saber sobre la Recuperación Capilar'
    'reposicion-aminoacidos.html' = 'Hola 😊 quiero detalles de la Reposición de Aminoácidos'
    'emulsion-zero.html'        = 'Hola 😊 me interesa la Emulsión Zero'
    'diagnostico-capilar.html'  = 'Hola 😊 quiero un diagnóstico capilar personalizado'
    'linea-cuidado.html'        = 'Hola 😊 me gustaría conocer la Línea de Cuidado Capilar'
    'shampoo.html'              = 'Hola 😊 quiero información sobre los Shampoos de la Línea de Cuidado'
    'mascarillas.html'          = 'Hola 😊 estoy interesada en las Mascarillas'
    'termoprotector.html'       = 'Hola 😊 quiero saber más del Termoprotector'
    'kits.html'                 = 'Hola 😊 me gustaría conocer los Kits disponibles'
    'linea-profesional.html'    = 'Hola 😊 quiero información sobre la Línea Profesional'
    'distribuidores.html'       = 'Hola 😊 me gustaría ser distribuidora de Julie Alisados'
    'julie-tips.html'           = 'Hola 😊 estoy leyendo un artículo de Julie Tips y quisiera una valoración personalizada para mi cabello'
    'contacto.html'             = 'Hola 😊 quiero contactar y agendar una cita'
    'promociones.html'          = 'Hola 😊 estoy interesada en las promociones actuales'
    'default'                   = 'Hola 😊 estoy interesada en los servicios de Julie Alisados y quisiera más información'
}

function Get-MessageForFile([string]$Path) {
    $lower = $Path.ToLower()
    foreach($key in $MessageMap.Keys) {
        if($key -ne 'default' -and $lower -like "*$key") {
            return $MessageMap[$key]
        }
    }
    return $MessageMap['default']
}

# Retrieve every .html file in the repository, ignoring any backup directories
$HtmlFiles = Get-ChildItem -Path "C:\Users\JETO0\OneDrive\Documentos\GitHub\WEB" -Recurse -Filter '*.html' |
    Where-Object { $_.FullName -notmatch 'BACKUP_' }

$ModifiedFiles = @()
foreach($File in $HtmlFiles) {
    $Content = Get-Content -Path $File.FullName -Raw -Encoding utf8
    $Original = $Content

    # Build the WhatsApp URL that contains the context‑specific message
    $rawMessage = Get-MessageForFile $File.FullName
    $encodedMsg = [System.Net.WebUtility]::UrlEncode($rawMessage)
    $NewHref = "https://wa.me/$Phone?text=$encodedMsg"
    $NewInnerText = "💬 ¡Quiero más info!"

    # Replace any existing WhatsApp URL (api.whatsapp.com or wa.me) with the new one
    $UrlPattern = 'https?://(?:api\.whatsapp\.com\/send\?phone=\d+&text=|wa\.me\/\d+\?text=)\S*'
    $Content = $Content -replace $UrlPattern, $NewHref

    # Replace the anchor text of links that now point to the new URL
    $AnchorPattern = "(<a[^>]*href=`"$NewHref`"[^>]*>)(.*?)(</a>)"
    $Content = $Content -replace $AnchorPattern, "`$1$NewInnerText`$3"

    if($Content -ne $Original) {
        Set-Content -Path $File.FullName -Value $Content -Encoding utf8
        $ModifiedFiles += $File.FullName
    }
}

Write-Output "Modified files count: $($ModifiedFiles.Count)"
foreach($f in $ModifiedFiles) { Write-Output $f }
