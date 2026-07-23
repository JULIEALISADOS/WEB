$content = [System.IO.File]::ReadAllText("C:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\temp_old_index_798ad13.html", [System.Text.Encoding]::UTF8)

# Find the start of the dudas section
$startToken = '<section class="faq-section" id="dudas">'
$startIdx = $content.IndexOf($startToken)
if ($startIdx -eq -1) {
    $startToken = 'id="dudas"'
    $startIdx = $content.IndexOf($startToken)
}

if ($startIdx -eq -1) {
    Write-Host "Could not find dudas section"
    exit 1
}

# Extract substring from startIdx
$subContent = $content.Substring($startIdx)

# Find matching </section>
# We can search for the first </section> tag
# Since it's a single section, the first </section> should close it.
$endIdx = $subContent.IndexOf("</section>")
if ($endIdx -ne -1) {
    $faqContent = $subContent.Substring(0, $endIdx + 10)
    [System.IO.File]::WriteAllText("C:\Users\JETO0\OneDrive\Documentos\GitHub\WEB\old_faq_798ad13.html", $faqContent, [System.Text.Encoding]::UTF8)
    Write-Host "Successfully wrote old_faq_798ad13.html!"
} else {
    Write-Host "Could not find closing </section> tag"
}
