$html = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$newFaq = [System.IO.File]::ReadAllText("new_faq.html", [System.Text.Encoding]::UTF8)

# Replace <section class="faq-section" id="dudas">...</section>
$pattern = '(?s)<section class="faq-section" id="dudas">.*?</section>'
$html = [regex]::Replace($html, $pattern, $newFaq)

# Insert JS
$jsLogic = @"
            // FAQ Tabs Logic
            const faqTabs = document.querySelectorAll('.faq-tab');
            const faqItems = document.querySelectorAll('.faq-item');

            faqTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    faqTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    const target = tab.getAttribute('data-target');

                    faqItems.forEach(item => {
                        if (target === 'todas' || item.getAttribute('data-category') === target) {
                            item.style.display = 'block';
                            setTimeout(() => { item.style.opacity = '1'; }, 10);
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => { item.style.display = 'none'; }, 300);
                        }
                    });
                });
            });
"@
$html = $html.Replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {`n" + $jsLogic)

[System.IO.File]::WriteAllText("index.html", $html, [System.Text.Encoding]::UTF8)

# Append CSS
$cssLogic = @"
/* FAQ Tabs CSS */
.faq-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
}
.faq-tab {
    background: transparent;
    border: 2px solid var(--gold);
    color: var(--gold-dark);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
}
.faq-tab:hover {
    background: rgba(212, 175, 55, 0.1);
}
.faq-tab.active {
    background: var(--gold);
    color: #fff;
    box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
}
.faq-item {
    transition: opacity 0.3s ease;
}
"@
$css = [System.IO.File]::ReadAllText("style.css", [System.Text.Encoding]::UTF8)
if (-not $css.Contains("/* FAQ Tabs CSS */")) {
    [System.IO.File]::AppendAllText("style.css", "`n" + $cssLogic, [System.Text.Encoding]::UTF8)
}
