const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js'));

let report = # Auditoría de Navegación y DOM\n\n;

// 1. Archivos JavaScript
report += ## 1. Archivos JavaScript que intervienen en la navegación\n;
let jsFound = false;
files.forEach(f => {
    if (f.endsWith('.js')) {
        report += - \n;
        jsFound = true;
    }
});
if (!jsFound) report += - *Toda la lógica de navegación se encuentra incrustada en los archivos HTML.*\n;
report += \n;

// 2. addEventListener
report += ## 2. Todos los addEventListener()\n;
report += | Archivo | Línea | Evento | Código |\n|---|---|---|---|\n;
files.forEach(f => {
    const lines = fs.readFileSync(path.join(dir, f), 'utf-8').split('\n');
    lines.forEach((line, i) => {
        if (line.includes('addEventListener')) {
            const match = line.match(/\.addEventListener\(['"\]([^'"\]+)['"\]/);
            const event = match ? match[1] : 'Desconocido';
            report += |  |  | \${event}\ | \${line.trim().replace(/\|/g, '&#124;')}\ |\n;
        }
    });
});
report += \n;

// 3. Llamadas específicas
const domCalls = ['preventDefault', 'stopPropagation', 'stopImmediatePropagation', 'scrollIntoView', 'scrollTo', 'location.hash', 'history.pushState', 'history.replaceState'];
report += ## 3. Llamadas a métodos de navegación y eventos\n;
report += | Archivo | Línea | Método/Propiedad | Código |\n|---|---|---|---|\n;
files.forEach(f => {
    const lines = fs.readFileSync(path.join(dir, f), 'utf-8').split('\n');
    lines.forEach((line, i) => {
        domCalls.forEach(call => {
            if (line.includes(call)) {
                report += |  |  | \${call}\ | \${line.trim().replace(/\|/g, '&#124;')}\ |\n;
            }
        });
    });
});
report += \n;

// 4. Elementos CSS
report += ## 4. Elementos CSS clave (fixed, sticky, transform, overflow, pointer-events, z-index > 1000)\n;
report += | Archivo | Línea | Propiedad | Código |\n|---|---|---|---|\n;
files.forEach(f => {
    const lines = fs.readFileSync(path.join(dir, f), 'utf-8').split('\n');
    lines.forEach((line, i) => {
        if (/(position:\s*fixed|position:\s*sticky|transform:|overflow:|pointer-events:|z-index:\s*(100[1-9]|10[1-9]\d|1[1-9]\d{2}|[2-9]\d{3}|\d{5,}))/.test(line)) {
            report += |  |  | CSS | \${line.trim().replace(/\|/g, '&#124;')}\ |\n;
        }
    });
});
report += \n;

// 5. IDs y Duplicados
report += ## 5. Todos los IDs del proyecto y duplicados\n;
const ids = {};
files.forEach(f => {
    if (f.endsWith('.html')) {
        const text = fs.readFileSync(path.join(dir, f), 'utf-8');
        const regex = /id="([^"]+)"/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const id = match[1];
            if (!ids[id]) ids[id] = [];
            ids[id].push(f);
        }
    }
});
let dupes = false;
report += ### IDs Duplicados (en el mismo archivo)\n;
Object.keys(ids).forEach(id => {
    const fileCounts = {};
    ids[id].forEach(f => { fileCounts[f] = (fileCounts[f] || 0) + 1; });
    Object.keys(fileCounts).forEach(f => {
        if (fileCounts[f] > 1) {
            report += - **Duplicado:** \${id}\ aparece  veces en \${f}\\n;
            dupes = true;
        }
    });
});
if (!dupes) report += - *No se encontraron IDs duplicados en el mismo archivo.*\n;

report += ### Inventario de IDs por Archivo (Global)\n;
Object.keys(ids).sort().forEach(id => {
    report += - \${id}\: \n;
});
report += \n;

// 6. Observers
report += ## 6. Intersección y Mutación (Observers)\n;
let obsFound = false;
files.forEach(f => {
    const lines = fs.readFileSync(path.join(dir, f), 'utf-8').split('\n');
    lines.forEach((line, i) => {
        if (line.includes('IntersectionObserver') || line.includes('MutationObserver') || line.includes('ResizeObserver')) {
            report += - \${f}\ (Línea ): \${line.trim()}\\n;
            obsFound = true;
        }
    });
});
if (!obsFound) report += - *No se encontraron Observers.*\n;
report += \n;

// 7. Modificaciones a la clase .active
report += ## 7. Lugares donde se modifica la clase .active\n;
report += | Archivo | Línea | Código |\n|---|---|---|\n;
files.forEach(f => {
    const lines = fs.readFileSync(path.join(dir, f), 'utf-8').split('\n');
    lines.forEach((line, i) => {
        if (/classList\.(add|remove|toggle)\(['"]active['"]\)/.test(line)) {
            report += |  |  | \${line.trim().replace(/\|/g, '&#124;')}\ |\n;
        }
    });
});
report += \n;

// 8. Funciones
report += ## 8. Funciones relacionadas con menú, overlay, navegación y scroll\n;
const funcKeywords = ['menu', 'overlay', 'nav', 'scroll'];
files.forEach(f => {
    const lines = fs.readFileSync(path.join(dir, f), 'utf-8').split('\n');
    lines.forEach((line, i) => {
        if (/function\s+(\w+)/.test(line)) {
            const funcName = line.match(/function\s+(\w+)/)[1].toLowerCase();
            if (funcKeywords.some(kw => funcName.includes(kw))) {
                report += - \${f}\ (Línea ): \${line.trim()}\\n;
            }
        }
        if (/(const|let|var)\s+(\w+)\s*=\s*(\(.*\)|\w+)\s*=>/.test(line)) {
            const funcName = line.match(/(const|let|var)\s+(\w+)\s*=\s*(\(.*\)|\w+)\s*=>/)[2].toLowerCase();
            if (funcKeywords.some(kw => funcName.includes(kw))) {
                report += - \${f}\ (Línea ): \${line.trim()}\\n;
            }
        }
    });
});
report += \n;

fs.writeFileSync('C:/Users/JETO0/.gemini/antigravity/brain/f621aecb-815c-438b-8db8-79d6c5d20e48/auditoria_navegacion.md', report);
console.log('Done');
