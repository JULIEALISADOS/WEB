import re

def update_files():
    # 1. Update HTML
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    with open('new_faq.html', 'r', encoding='utf-8') as f:
        new_faq = f.read()

    # Replace FAQ section
    html_new = re.sub(r'<section class="faq-section" id="dudas">.*?</section>', new_faq, html, flags=re.DOTALL)

    # Insert JS logic before the closing script tag of the DOMContentLoaded event
    js_logic = """
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
    """
    # Find the end of DOMContentLoaded event listener which is marked by "const faqItems = document.querySelectorAll('.faq-item');" in the old code.
    # Wait, in the old code, there is already an accordion JS. I just need to add the Tabs JS anywhere inside DOMContentLoaded.
    # Let's insert it right after "document.addEventListener('DOMContentLoaded', () => {"
    html_new = html_new.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n" + js_logic)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_new)

    # 2. Update CSS
    css_logic = """
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
"""
    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()
        
    if "/* FAQ Tabs CSS */" not in css:
        with open('style.css', 'a', encoding='utf-8') as f:
            f.write(css_logic)

if __name__ == '__main__':
    update_files()
    print("Files updated successfully")
