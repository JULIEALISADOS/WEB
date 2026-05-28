$html = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)

# Center subtitle
$html = $html.Replace('<p class="section-subtitle">Todo lo que necesitas saber sobre nuestros servicios y productos</p>', '<p class="section-subtitle" style="text-align: center; margin-bottom: 35px; margin-top: -15px; font-style: italic; color: #555;">Todo lo que necesitas saber sobre nuestros servicios y productos</p>')

# Add JS before </body>
$js = @"
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Accordion Logic
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const button = item.querySelector('.faq-question');
                button.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(i => i.classList.remove('active')); // Cierra los demás
                    if (!isActive) {
                        item.classList.add('active'); // Abre el actual
                    }
                });
            });

            // Tabs Logic
            const faqTabs = document.querySelectorAll('.faq-tab');
            faqTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    faqTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    const target = tab.getAttribute('data-target');

                    faqItems.forEach(item => {
                        // Close active accordion when changing tabs
                        item.classList.remove('active');
                        
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
        });
    </script>
</body>
"@

# To avoid duplicates if ran twice, remove the old script block if it exists
$html = $html -replace "(?s)<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {\s*// Accordion Logic.*?</script>\s*</body>", "</body>"

$html = $html -replace "(?i)</body>", $js

[System.IO.File]::WriteAllText("index.html", $html, [System.Text.Encoding]::UTF8)
