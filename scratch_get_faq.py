import sys

try:
    with open('temp_old_index.html', 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading file: {e}")
    sys.exit(1)

# Let's find the start of the doubts section
start_token = '<section class="faq-section" id="dudas">'
idx = content.find(start_token)
if idx == -1:
    # try lowercase or simpler token
    start_token = 'id="dudas"'
    idx = content.find(start_token)
    if idx == -1:
        print("Could not find dudas section")
        sys.exit(1)

# Now let's extract from that point onwards, matching section tags if possible
# Or just find the closing section tag
print(f"Found dudas at index {idx}")
sub_content = content[idx:]

# Find the matching </section>
# Let's count <section and </section> tags
section_count = 0
end_idx = 0
for i in range(len(sub_content)):
    if sub_content[i:i+8] == '<section':
        section_count += 1
    elif sub_content[i:i+10] == '</section>':
        section_count -= 1
        if section_count == 0:
            end_idx = i + 10
            break

if end_idx == 0:
    # fallback to just finding first </section>
    end_idx = sub_content.find('</section>') + 10

faq_content = sub_content[:end_idx]
print("\n--- FAQ CONTENT START ---")
print(faq_content)
print("--- FAQ CONTENT END ---\n")
