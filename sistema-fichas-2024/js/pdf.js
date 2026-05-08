import { getSignaturePads } from './signature.js';

export async function generatePDF() {
    const pdfBtn = document.getElementById('pdfBtn');
    if (pdfBtn) {
        pdfBtn.disabled = true;
        pdfBtn.innerHTML = '⌛';
    }

    try {
        const f = document.getElementById('fichaForm');
        const getVal = (name) => {
            const el = f.querySelector(`[name="${name}"]`);
            if (!el) return '---';
            if (el.type === 'checkbox') return el.checked ? 'Si' : 'No';
            return el.value && el.value.trim() !== '' ? el.value : '---';
        };

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 0;

        const colors = {
            gold: [212, 175, 55],
            dark: [30, 30, 30],
            gray: [100, 100, 100],
            lightGray: [245, 245, 245],
            white: [255, 255, 255]
        };

        const checkSpace = (h) => {
            if (y + h > 275) {
                doc.addPage();
                y = 15;
                doc.setFillColor(...colors.gold);
                doc.rect(0, 0, pageWidth, 3, 'F');
                return true;
            }
            return false;
        };

        const drawSectionHeader = (title) => {
            checkSpace(15);
            y += 6;
            doc.setFillColor(...colors.gold);
            doc.rect(15, y - 4, 2, 6, 'F');
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...colors.dark);
            doc.text(title.toUpperCase(), 20, y + 1);
            doc.setDrawColor(230, 230, 230);
            doc.line(15, y + 4, pageWidth - 15, y + 4);
            y += 12;
        };

        const drawField = (label, value, x, w) => {
            doc.setFontSize(7);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...colors.gold);
            doc.text(label.toUpperCase(), x, y);

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.dark);
            const splitVal = doc.splitTextToSize(value, w);
            doc.text(splitVal, x, y + 4.5);
            return (splitVal.length * 4) + 6;
        };

        const loadImg = (url) => new Promise((resolve) => {
            if (!url || url === '---' || url === 'sin-foto') { resolve(null); return; }
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
        });

        // --- HEADER ---
        doc.setFillColor(...colors.gold);
        doc.rect(0, 0, pageWidth, 3, 'F');
        y = 12;

        const logoImg = await loadImg('logo.png');
        if (logoImg) doc.addImage(logoImg, 'PNG', 15, y - 3, 40, 15);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.dark);
        doc.text('FICHA TÉCNICA CAPILAR', pageWidth - 15, y + 3, { align: 'right' });

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.gray);
        doc.text('DIAGNÓSTICO PROFESIONAL PERSONALIZADO', pageWidth - 15, y + 8, { align: 'right' });

        doc.setFontSize(7);
        doc.text(`Ficha #${getVal('consecutivo')} | ${getVal('fecha_diligenciamiento')}`, pageWidth - 15, y + 12, { align: 'right' });

        y += 20;

        // --- CLIENTE BOX ---
        doc.setFillColor(...colors.lightGray);
        doc.roundedRect(15, y, pageWidth - 30, 24, 2, 2, 'F');
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gold);
        doc.text('CLIENTE', 20, y + 6);
        doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.dark);
        doc.text(getVal('nombre_completo'), 20, y + 13);
        doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(...colors.gray);
        doc.text(`${getVal('tipo_documento')}: ${getVal('numero_documento')}  |  TEL: ${getVal('telefono')}  |  EDAD: ${getVal('edad')} AÑOS  |  SEDE: ${getVal('sede')}`, 20, y + 18);
        doc.text(`EMAIL: ${getVal('email')}`, 20, y + 22);

        y += 28;

        // --- SECCIÓN 1: DIAGNÓSTICO ---
        drawSectionHeader('1. Diagnóstico Técnico de Fibra');
        const col1 = 20, col2 = pageWidth / 2 + 5;

        let h1 = drawField('Patrón de Rizo', getVal('tipo_cabello'), col1, 80);
        let h2 = drawField('Longitud', getVal('longitud'), col2, 80);
        y += Math.max(h1, h2);

        h1 = drawField('Crecimiento', getVal('estado_crecimiento'), col1, 40);
        h1 = Math.max(h1, drawField('Medios', getVal('estado_medios'), col1 + 45, 40));
        h2 = drawField('Puntas', getVal('estado_puntas'), col2, 80);
        y += Math.max(h1, h2);

        const obsDiag = getVal('observaciones_diagnostico');
        if (obsDiag !== '---') {
            y += drawField('Observaciones Diagnóstico', obsDiag, col1, pageWidth - 40);
        }

        // --- SECCIÓN 2: CARACTERÍSTICAS ---
        drawSectionHeader('2. Características del Cabello');

        h1 = drawField('Textura', getVal('textura'), col1, 40);
        h1 = Math.max(h1, drawField('Elasticidad', getVal('elasticidad'), col1 + 45, 40));
        h2 = drawField('Resistencia', getVal('resistencia'), col2, 40);
        h2 = Math.max(h2, drawField('Porosidad', getVal('porosidad'), col2 + 45, 40));
        y += Math.max(h1, h2);

        h1 = drawField('Densidad', getVal('densidad'), col1, 80);
        y += h1;

        y += drawField('Procesos Químicos', getVal('procesos_quimicos'), col1, pageWidth - 40);
        y += drawField('Terapias Capilares', getVal('terapias_capilares'), col1, pageWidth - 40);

        // --- SECCIÓN 3: CUERO CABELLUDO ---
        drawSectionHeader('3. Cuero Cabelludo');

        h1 = drawField('Piel Cabelluda', getVal('piel_cabelluda'), col1, 40);
        h1 = Math.max(h1, drawField('Frec. Lavado', getVal('frecuencia_lavado'), col1 + 45, 40));
        h2 = drawField('Dermatitis', getVal('dermatitis'), col2, 40);
        h2 = Math.max(h2, drawField('Caída', getVal('caida'), col2 + 45, 40));
        y += Math.max(h1, h2);

        h1 = drawField('Descamación', getVal('descamacion'), col1, 80);
        y += h1;

        const obsCuero = getVal('observaciones_cuero');
        if (obsCuero !== '---') {
            y += drawField('Observaciones Cuero', obsCuero, col1, pageWidth - 40);
        }

        // --- SECCIÓN 4: PROCEDIMIENTO ---
        drawSectionHeader('4. Procedimiento y Garantía');

        h1 = drawField('Embarazo', getVal('embarazo'), col1, 40);
        h1 = Math.max(h1, drawField('Alergias', getVal('alergias'), col1 + 45, 40));
        h2 = drawField('Procedimiento', getVal('procedimiento'), col2, 80);
        y += Math.max(h1, h2);

        h1 = drawField('% Liso Garantizado', getVal('porcentaje_liso'), col1, 80);
        h2 = drawField('Estilista', getVal('estilista_responsable'), col2, 80);
        y += Math.max(h1, h2);

        y += drawField('Técnica/Productos', getVal('tecnica_utilizada'), col1, pageWidth - 40);

        // --- SECCIÓN 5: EVIDENCIA FOTOGRÁFICA ---
        drawSectionHeader('5. Evidencia Fotográfica');
        const imgW = 80, imgH = 70;
        checkSpace(imgH + 10);
        const fotoA = await loadImg(f.querySelector('#previewAntes img')?.src);
        const fotoD = await loadImg(f.querySelector('#previewDespues img')?.src);

        // Labels
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gold);
        doc.text('ANTES', 15 + imgW / 2, y, { align: 'center' });
        doc.text('DESPUÉS', pageWidth - 15 - imgW / 2, y, { align: 'center' });
        y += 3;

        if (fotoA) {
            doc.setDrawColor(...colors.gold); doc.setLineWidth(0.5);
            doc.rect(14.5, y - 0.5, imgW + 1, imgH + 1);
            doc.addImage(fotoA, 'JPEG', 15, y, imgW, imgH);
        }
        if (fotoD) {
            doc.setDrawColor(...colors.gold); doc.setLineWidth(0.5);
            doc.rect(pageWidth - 15 - imgW - 0.5, y - 0.5, imgW + 1, imgH + 1);
            doc.addImage(fotoD, 'JPEG', pageWidth - 15 - imgW, y, imgW, imgH);
        }
        y += imgH + 10;

        // --- SECCIÓN 6: FIRMAS ---
        drawSectionHeader('6. Formalización y Autorización');

        // Obtener firmas — lógica robusta con múltiples fallbacks
        let sigC = '', sigT = '';

        // Prioridad 1: datos guardados en Supabase (modo lectura)
        if (window.isLocked && window.lastViewedFicha) {
            sigC = window.lastViewedFicha.firma_cliente || '';
            sigT = window.lastViewedFicha.firma_tecnico || '';
        }

        // Prioridad 2: pads activos en pantalla
        if (!sigC || !sigT) {
            try {
                const { padClient, padTech } = getSignaturePads();
                if (!sigC && padClient && !padClient.isEmpty()) sigC = padClient.toDataURL();
                if (!sigT && padTech && !padTech.isEmpty()) sigT = padTech.toDataURL();
            } catch (e) { /* pads no disponibles */ }
        }

        // Prioridad 3: último guardado en memoria
        if (!sigC && window.lastGeneratedSignatures?.client) sigC = window.lastGeneratedSignatures.client;
        if (!sigT && window.lastGeneratedSignatures?.tech) sigT = window.lastGeneratedSignatures.tech;

        checkSpace(35);
        const drawSig = (src, label, x, yPos) => {
            // Línea base
            doc.setDrawColor(...colors.gray);
            doc.setLineWidth(0.3);
            doc.line(x, yPos, x + 55, yPos);
            // Label
            doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gray);
            doc.text(label, x + 27.5, yPos + 4, { align: 'center' });
            // Imagen firma
            if (src && src.startsWith('data:image')) {
                try { doc.addImage(src, 'PNG', x + 5, yPos - 20, 45, 20); } catch (e) {
                    console.warn('Error añadiendo firma al PDF:', e);
                }
            }
        };

        drawSig(sigC, 'FIRMA CLIENTE', 15, y + 25);
        drawSig(sigT, `TÉCNICO: ${getVal('estilista_responsable')}`, pageWidth - 70, y + 25);

        y += 38;

        // Autorización
        doc.setFontSize(6); doc.setTextColor(...colors.gray);
        const auth = "Autorizo el tratamiento de mis datos personales y el registro fotográfico conforme a la Ley 1581/2012. Certifico que la información suministrada es verídica.";
        doc.text(doc.splitTextToSize(auth, pageWidth - 30), 15, y);

        // Footer
        y += 10;
        doc.setFillColor(...colors.gold);
        doc.rect(0, doc.internal.pageSize.getHeight() - 3, pageWidth, 3, 'F');

        doc.save(`Ficha_${getVal('nombre_completo').replace(/\s+/g, '_')}_${getVal('consecutivo')}.pdf`);
    } catch (err) {
        console.error('Error PDF:', err);
        alert('❌ Error al generar PDF: ' + err.message);
    } finally {
        if (pdfBtn) {
            pdfBtn.disabled = false;
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            window.lucide?.createIcons();
        }
    }
}
