import os
import re

dir_path = '.'
files = [f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f)) and f.endswith(('.html', '.css', '.js'))]

report = "# Auditoría de Navegación y DOM\n\n"

# 1. Archivos JavaScript
report += "## 1. Archivos JavaScript que intervienen en la navegación\n"
js_found = False
for f in files:
    if f.endswith('.js'):
        report += f"- {f}\n"
        js_found = True
if not js_found:
    report += "- *Toda la lógica de navegación se encuentra incrustada en los archivos HTML.*\n"
report += "\n"

# 2. addEventListener
report += "## 2. Todos los addEventListener()\n"
report += "| Archivo | Línea | Evento | Código |\n|---|---|---|---|\n"
for f in files:
    with open(os.path.join(dir_path, f), 'r', encoding='utf-8', errors='ignore') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            if 'addEventListener' in line:
                match = re.search(r"\.addEventListener\(['\"]([^'\"]+)['\"]", line)
                event = match.group(1) if match else 'Desconocido'
                clean_line = line.strip().replace('|', '&#124;')
                report += f"| {f} | {i+1} | {event} | {clean_line} |\n"
report += "\n"

# 3. Llamadas específicas
dom_calls = ['preventDefault', 'stopPropagation', 'stopImmediatePropagation', 'scrollIntoView', 'scrollTo', 'location.hash', 'history.pushState', 'history.replaceState']
report += "## 3. Llamadas a métodos de navegación y eventos\n"
report += "| Archivo | Línea | Método/Propiedad | Código |\n|---|---|---|---|\n"
for f in files:
    with open(os.path.join(dir_path, f), 'r', encoding='utf-8', errors='ignore') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            for call in dom_calls:
                if call in line:
                    clean_line = line.strip().replace('|', '&#124;')
                    report += f"| {f} | {i+1} | {call} | {clean_line} |\n"
report += "\n"

# 4. Elementos CSS
report += "## 4. Elementos CSS clave (fixed, sticky, transform, overflow, pointer-events, z-index > 1000)\n"
report += "| Archivo | Línea | Propiedad | Código |\n|---|---|---|---|\n"
pattern_css = re.compile(r"(position:\s*fixed|position:\s*sticky|transform:|overflow:|pointer-events:|z-index:\s*(100[1-9]|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|\d{5,}))")
for f in files:
    with open(os.path.join(dir_path, f), 'r', encoding='utf-8', errors='ignore') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            if pattern_css.search(line):
                clean_line = line.strip().replace('|', '&#124;')
                report += f"| {f} | {i+1} | CSS | {clean_line} |\n"
report += "\n"

# 5. IDs y Duplicados
report += "## 5. Todos los IDs del proyecto y duplicados\n"
ids = {}
id_pattern = re.compile(r'id="([^"]+)"')
for f in files:
    if f.endswith('.html'):
        with open(os.path.join(dir_path, f), 'r', encoding='utf-8', errors='ignore') as file:
            text = file.read()
            for match in id_pattern.finditer(text):
                id_val = match.group(1)
                if id_val not in ids:
                    ids[id_val] = []
                ids[id_val].append(f)

dupes = False
report += "### IDs Duplicados (en el mismo archivo)\n"
for id_val, f_list in ids.items():
    counts = {}
    for f in f_list:
        counts[f] = counts.get(f, 0) + 1
    for f, count in counts.items():
        if count > 1:
            report += f"- **Duplicado:** {id_val} aparece {count} veces en {f}\n"
            dupes = True
if not dupes:
    report += "- *No se encontraron IDs duplicados en el mismo archivo.*\n"

report += "\n### Inventario de IDs por Archivo (Global)\n"
for id_val in sorted(ids.keys()):
    unique_files = sorted(list(set(ids[id_val])))
    report += f"- {id_val}: {', '.join(unique_files)}\n"
report += "\n"

# 6. Observers
report += "## 6. Intersección y Mutación (Observers)\n"
obs_found = False
for f in files:
    with open(os.path.join(dir_path, f), 'r', encoding='utf-8', errors='ignore') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            if 'IntersectionObserver' in line or 'MutationObserver' in line or 'ResizeObserver' in line:
                report += f"- {f} (Línea {i+1}): {line.strip()}\n"
                obs_found = True
if not obs_found:
    report += "- *No se encontraron Observers.*\n"
report += "\n"

# 7. Modificaciones a la clase .active
report += "## 7. Lugares donde se modifica la clase .active\n"
report += "| Archivo | Línea | Código |\n|---|---|---|\n"
active_pattern = re.compile(r"classList\.(add|remove|toggle)\(['\"]active['\"]\)")
for f in files:
    with open(os.path.join(dir_path, f), 'r', encoding='utf-8', errors='ignore') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            if active_pattern.search(line):
                clean_line = line.strip().replace('|', '&#124;')
                report += f"| {f} | {i+1} | {clean_line} |\n"
report += "\n"

# 8. Funciones
report += "## 8. Funciones relacionadas con menú, overlay, navegación y scroll\n"
func_keywords = ['menu', 'overlay', 'nav', 'scroll']
func_pattern1 = re.compile(r"function\s+(\w+)")
func_pattern2 = re.compile(r"(const|let|var)\s+(\w+)\s*=\s*(\(.*\)|\w+)\s*=>")
for f in files:
    with open(os.path.join(dir_path, f), 'r', encoding='utf-8', errors='ignore') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            match1 = func_pattern1.search(line)
            match2 = func_pattern2.search(line)
            func_name = None
            if match1:
                func_name = match1.group(1).lower()
            elif match2:
                func_name = match2.group(2).lower()
                
            if func_name:
                if any(kw in func_name for kw in func_keywords):
                    report += f"- {f} (Línea {i+1}): {line.strip()}\n"
report += "\n"

with open(r'C:\Users\JETO0\.gemini\antigravity\brain\f621aecb-815c-438b-8db8-79d6c5d20e48\auditoria_navegacion.md', 'w', encoding='utf-8') as out:
    out.write(report)
print('Done!')
