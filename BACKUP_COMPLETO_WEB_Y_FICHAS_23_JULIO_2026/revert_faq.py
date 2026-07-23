import re
import os

def revert_faq():
    print("Starting FAQ revert process...")

    # 1. Read index.html
    html_path = 'index.html'
    if not os.path.exists(html_path):
        print(f"Error: {html_path} not found.")
        return

    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 2. Read old_faq_section.html
    faq_path = 'old_faq_section.html'
    if not os.path.exists(faq_path):
        print(f"Error: {faq_path} not found.")
        return

    with open(faq_path, 'r', encoding='utf-8') as f:
        old_faq = f.read()

    # Make sure we maintain proper 8-space indentation for the faq section tag
    indented_old_faq = ""
    for idx, line in enumerate(old_faq.splitlines()):
        if idx == 0:
            indented_old_faq += "        " + line + "\n"
        else:
            indented_old_faq += line + "\n"

    # Replace the current FAQ section
    html_new, count = re.subn(
        r'[ \t]*<section class="faq-section" id="dudas">.*?</section>',
        indented_old_faq.strip('\n'),
        html,
        flags=re.DOTALL
    )

    if count > 0:
        print(f"Successfully replaced FAQ HTML section (matched {count} times).")
    else:
        print("Warning: Could not find FAQ HTML section to replace via regex.")

    # 3. Remove the JS Tabs logic script block
    # We will match the script block containing "Tabs Logic for FAQ"
    js_pattern = r'[ \t]*<script>\s*// Tabs Logic for FAQ.*?document\.addEventListener\(\'DOMContentLoaded\', \(\) => \{.*?\}\);\s*</script>\s*'
    html_new, js_count = re.subn(js_pattern, '', html_new, flags=re.DOTALL)

    if js_count > 0:
        print(f"Successfully removed FAQ JavaScript tabs block (matched {js_count} times).")
    else:
        print("Warning: Could not find FAQ JavaScript tabs block to remove.")

    # Save index.html
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_new)
    print("Saved index.html.")

    # 4. Revert style.css
    css_path = 'style.css'
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()

        # Pattern to remove the FAQ Tabs CSS styles
        css_pattern = r'/\* FAQ Tabs CSS \*/.*\.faq-item\s*\{\s*transition:\s*opacity\s*0\.3s\s*ease;\s*\}'
        css_new, css_count = re.subn(css_pattern, '', css, flags=re.DOTALL)

        if css_count > 0:
            print(f"Successfully removed FAQ Tabs CSS (matched {css_count} times).")
        else:
            # Try a simpler regex if the exact match fails (e.g. if the comment matches but closing is slightly different)
            css_pattern_alt = r'/\* FAQ Tabs CSS \*/.*'
            # Let's search for "/* FAQ Tabs CSS */"
            idx = css.find("/* FAQ Tabs CSS */")
            if idx != -1:
                css_new = css[:idx].rstrip() + "\n"
                css_count = 1
                print("Successfully removed FAQ Tabs CSS using index locator.")
            else:
                print("Warning: Could not find FAQ Tabs CSS block to remove.")
                css_new = css

        if css_count > 0:
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css_new)
            print("Saved style.css.")
    else:
        print("Warning: style.css not found.")

    print("FAQ revert process completed.")

if __name__ == '__main__':
    revert_faq()
