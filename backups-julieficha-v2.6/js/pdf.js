import { getSignaturePads } from './signature.js';

export async function generatePDF() {
    const pdfBtn = document.getElementById('pdfBtn');
    if(pdfBtn) {
        pdfBtn.disabled = true;
        pdfBtn.innerHTML = '⌛';
    }
    
    try {
        const f = document.getElementById('fichaForm');
        const getVal = (name) => {
            const el = f.querySelector(`[name="${name}"]`);
            if(!el) return '---';
            if(el.type === 'checkbox') return el.checked ? 'Si' : 'No';
            return el.value && el.value.trim() !== '' ? el.value : '---';
        };

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = 0;

        const colors = {
            gold: [212, 175, 55],
            dark: [30, 30, 30],
            gray: [100, 100, 100],
            lightGray: [245, 245, 245],
            accent: [212, 175, 55]
        };

        const checkSpace = (h) => {
            if (y + h > 275) {
                doc.addPage();
                y = 20;
                doc.setFillColor(...colors.gold);
                doc.rect(0, 0, pageWidth, 4, 'F');
                return true;
            }
            return false;
        };

        const drawSectionHeader = (title) => {
            checkSpace(15);
            y += 5;
            doc.setFillColor(...colors.gold);
            doc.rect(15, y - 4, 2, 6, 'F');
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...colors.dark);
            doc.text(title.toUpperCase(), 20, y + 1);
            doc.setDrawColor(...colors.lightGray);
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
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
        });

        // --- START DRAWING ---
        doc.setFillColor(...colors.gold);
        doc.rect(0, 0, pageWidth, 4, 'F');
        y = 15;

        const logoImg = await loadImg('logo.png');
        if (logoImg) doc.addImage(logoImg, 'PNG', 15, y - 5, 45, 18);
        
        doc.setFontSize(15);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.dark);
        doc.text('FICHA TÉCNICA CAPILAR', pageWidth - 15, y + 5, { align: 'right' });
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.gray);
        doc.text('DIAGNÓSTICO PROFESIONAL PERSONALIZADO', pageWidth - 15, y + 10, { align: 'right' });
        
        y += 22;

        doc.setFillColor(...colors.lightGray);
        doc.roundedRect(15, y, pageWidth - 30, 25, 2, 2, 'F');
        doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gold);
        doc.text('CLIENTE', 20, y + 7);
        doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.dark);
        doc.text(getVal('nombre_completo'), 20, y + 15);
        doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(...colors.gray);
        doc.text(`CÉDULA: ${getVal('numero_documento')}  |  TEL: ${getVal('telefono')}  |  SEDE: ${getVal('sede')}`, 20, y + 21);
        
        y += 32;

        drawSectionHeader('1. DIAGNÓSTICO TÉCNICO DE FIBRA');
        const col1 = 20, col2 = pageWidth / 2 + 5;
        let yStart = y;
        let h1 = drawField('PATRÓN DE RIZO', getVal('tipo_cabello'), col1, 80);
        let h2 = drawField('LONGITUD', getVal('longitud'), col2, 80);
        y += Math.max(h1, h2);

        h1 = drawField('CRECIMIENTO', getVal('estado_crecimiento'), col1, 40);
        h1 = Math.max(h1, drawField('MEDIOS', getVal('estado_medios'), col1 + 45, 40));
        h2 = drawField('PUNTAS', getVal('estado_puntas'), col2, 80);
        y += Math.max(h1, h2);

        h1 = drawField('TEXTURA', getVal('textura'), col1, 40);
        h1 = Math.max(h1, drawField('ELASTICIDAD', getVal('elasticidad'), col1 + 45, 40));
        h2 = drawField('POROSIDAD', getVal('porosidad'), col2, 40);
        h2 = Math.max(h2, drawField('RESISTENCIA', getVal('resistencia'), col2 + 45, 40));
        y += Math.max(h1, h2);

        y += drawField('OBSERVACIONES DIAGNÓSTICO', getVal('observaciones_diagnostico'), col1, pageWidth - 40);

        drawSectionHeader('2. CARACTERÍSTICAS Y CUERO CABELLUDO');
        y += drawField('PROCESOS QUÍMICOS', getVal('procesos_quimicos'), col1, pageWidth - 40);
        y += drawField('TERAPIAS CAPILARES', getVal('terapias_capilares'), col1, pageWidth - 40);

        h1 = drawField('PIEL CABELLUDA', getVal('piel_cabelluda'), col1, 40);
        h1 = Math.max(h1, drawField('FRECUENCIA LAVADO', getVal('frecuencia_lavado'), col1 + 45, 40));
        h2 = drawField('CAÍDA', getVal('caida'), col2, 40);
        h2 = Math.max(h2, drawField('DERMATITIS', getVal('dermatitis'), col2 + 45, 40));
        y += Math.max(h1, h2);

        drawSectionHeader('3. PROCEDIMIENTO Y GARANTÍA');
        h1 = drawField('PROCEDIMIENTO', getVal('procedimiento'), col1, 80);
        h2 = drawField('PORCENTAJE DE LISO GARANTIZADO', getVal('porcentaje_liso'), col2, 80);
        y += Math.max(h1, h2);
        y += drawField('TÉCNICA UTILIZADA Y PRODUCTOS', getVal('tecnica_utilizada'), col1, pageWidth - 40);

        drawSectionHeader('4. EVIDENCIA FOTOGRÁFICA');
        const imgW = 85, imgH = 85;
        const fotoA = await loadImg(f.querySelector('#previewAntes img')?.src);
        const fotoD = await loadImg(f.querySelector('#previewDespues img')?.src);
        if(fotoA) doc.addImage(fotoA, 'JPEG', 15, y, imgW, imgH);
        if(fotoD) doc.addImage(fotoD, 'JPEG', pageWidth - 15 - imgW, y, imgW, imgH);
        y += imgH + 15;

        drawSectionHeader('5. FORMALIZACIÓN Y AUTORIZACIÓN');
        let sigC = '', sigT = '', sigTutor = '';
        if(window.isLocked && window.lastViewedFicha) {
            sigC = window.lastViewedFicha.firma_cliente; sigT = window.lastViewedFicha.firma_tecnico;
        } else {
            const { padClient, padTech } = getSignaturePads();
            sigC = (padClient && !padClient.isEmpty()) ? padClient.toDataURL() : window.lastGeneratedSignatures.client;
            sigT = (padTech && !padTech.isEmpty()) ? padTech.toDataURL() : window.lastGeneratedSignatures.tech;
        }

        const drawSig = (src, label, x, yPos) => {
            doc.setDrawColor(...colors.gray); doc.line(x, yPos, x + 50, yPos);
            doc.setFontSize(7); doc.setFont('helvetica', 'bold');
            doc.text(label, x + 25, yPos + 4, { align: 'center' });
            if(src) try { doc.addImage(src, 'PNG', x + 5, yPos - 18, 40, 18); } catch(e) {}
        };
        drawSig(sigC, 'FIRMA CLIENTE', 15, y + 25);
        drawSig(sigT, `TÉCNICO: ${getVal('estilista_responsable')}`, pageWidth - 65, y + 25);
        
        y += 40;
        doc.setFontSize(6); doc.setTextColor(...colors.gray);
        const auth = "Autorizo el tratamiento de mis datos personales y el registro fotográfico. Certifico que la información suministrada es verídica.";
        doc.text(doc.splitTextToSize(auth, pageWidth - 30), 15, y);

        doc.save(`Ficha_${getVal('nombre_completo').replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
        console.error('Error PDF:', err);
        alert('❌ Error al generar PDF.');
    } finally {
        if(pdfBtn) { pdfBtn.disabled = false; pdfBtn.innerHTML = '<i data-lucide="download"></i>'; window.lucide?.createIcons(); }
    }
}
