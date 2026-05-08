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

        // --- DESIGN TOKENS ---
        const colors = {
            gold: [212, 175, 55],
            dark: [30, 30, 30],
            gray: [100, 100, 100],
            lightGray: [245, 245, 245],
            accent: [212, 175, 55]
        };

        // --- HELPERS ---
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
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
        });

        // --- START DRAWING ---
        doc.setFillColor(...colors.gold);
        doc.rect(0, 0, pageWidth, 4, 'F');
        y = 15;

        const logoImg = await loadImg('logo.png');
        if (logoImg) doc.addImage(logoImg, 'PNG', 15, y, 35, 12);
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.dark);
        doc.text('HISTORIA CLÍNICA CAPILAR', pageWidth - 15, y + 5, { align: 'right' });
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.gray);
        doc.text('DIAGNÓSTICO PROFESIONAL PERSONALIZADO', pageWidth - 15, y + 10, { align: 'right' });
        
        y += 22;

        // --- CUSTOMER CARD ---
        doc.setFillColor(...colors.lightGray);
        doc.roundedRect(15, y, pageWidth - 30, 25, 2, 2, 'F');
        doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gold);
        doc.text('CLIENTE', 20, y + 7);
        doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.dark);
        doc.text(getVal('nombre_completo'), 20, y + 15);
        doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(...colors.gray);
        doc.text(`CÉDULA: ${getVal('numero_documento')}  |  TEL: ${getVal('telefono')}  |  SEDE: ${getVal('sede')}`, 20, y + 21);
        doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gold);
        doc.text('FICHA N° ' + getVal('consecutivo'), pageWidth - 25, y + 15, { align: 'right' });
        y += 35;

        // --- 1. DIAGNÓSTICO ---
        drawSectionHeader('1. Diagnóstico Técnico de Fibra');
        const col1 = 15, col2 = pageWidth / 3 + 10, col3 = (pageWidth / 3) * 2 + 5;
        drawField('Patrón de Rizo', getVal('tipo_cabello'), col1, 50);
        drawField('Longitud', getVal('longitud'), col2, 50);
        drawField('Textura', getVal('textura'), col3, 50);
        y += 12;
        drawField('Elasticidad', getVal('elasticidad'), col1, 50);
        drawField('Porosidad', getVal('porosidad'), col2, 50);
        drawField('Resistencia', getVal('resistencia'), col3, 50);
        y += 12;
        drawField('Densidad', getVal('densidad'), col1, 50);
        drawField('Crecimiento', getVal('estado_crecimiento'), col2, 50);
        drawField('Medios / Puntas', `${getVal('estado_medios')} / ${getVal('estado_puntas')}`, col3, 50);
        y += 15;
        y += drawField('Observaciones de Diagnóstico', getVal('observaciones_diagnostico'), 15, pageWidth - 30) + 5;

        // --- 2. HISTORIAL ---
        drawSectionHeader('2. Historial Químico y Cuero Cabelludo');
        const chemH = drawField('Procesos Químicos (6 meses)', getVal('procesos_quimicos'), 15, (pageWidth - 40) / 2);
        const therH = drawField('Terapias Capilares', getVal('terapias_capilares'), pageWidth / 2 + 5, (pageWidth - 40) / 2);
        y += Math.max(chemH, therH) + 5;
        drawField('Piel Cabelluda', getVal('piel_cabelluda'), col1, 50);
        drawField('Lavado', getVal('frecuencia_lavado'), col2, 50);
        drawField('Dermatitis', getVal('dermatitis'), col3, 50);
        y += 12;
        drawField('Caída', getVal('caida'), col1, 50);
        drawField('Descamación', getVal('descamacion'), col2, 50);
        drawField('Obs. Cuero', getVal('observaciones_cuero'), col3, 50);
        y += 15;
        y += drawField('Obs. Características', getVal('observaciones_caracteristicas'), 15, pageWidth - 30) + 5;

        // --- 3. PROCEDIMIENTO ---
        drawSectionHeader('3. Procedimiento Realizado');
        checkSpace(40);
        doc.setFillColor(252, 250, 240);
        doc.roundedRect(15, y - 4, pageWidth - 30, 30, 1, 1, 'F');
        drawField('Servicio Realizado', getVal('procedimiento'), 20, 80);
        drawField('Porcentaje Liso', getVal('porcentaje_liso'), pageWidth / 2 + 10, 80);
        y += 12;
        drawField('Técnica / Productos', getVal('tecnica_utilizada'), 20, pageWidth - 40);
        y += 22;

        // --- 4. EVIDENCIA ---
        drawSectionHeader('4. Evidencia Fotográfica');
        checkSpace(95);
        const imgA = document.getElementById('previewAntes').querySelector('img');
        const imgD = document.getElementById('previewDespues').querySelector('img');
        const drawPhoto = async (imgEl, label, x, yPos) => {
            doc.setDrawColor(...colors.lightGray);
            doc.roundedRect(x, yPos, 85, 85, 1, 1, 'D');
            doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gray);
            doc.text(label, x + 42.5, yPos + 90, { align: 'center' });
            if(imgEl) {
                try { doc.addImage(imgEl.src, 'JPEG', x + 2.5, yPos + 2.5, 80, 80); } catch(e) {}
            } else {
                doc.setFontSize(8); doc.text('SIN REGISTRO', x + 42.5, yPos + 45, { align: 'center' });
            }
        };
        await drawPhoto(imgA, 'ESTADO ANTES', 15, y);
        await drawPhoto(imgD, 'ESTADO DESPUÉS', pageWidth - 100, y);
        y += 105;

        // --- 5. FIRMAS ---
        drawSectionHeader('5. Conformidad y Autorización');
        checkSpace(50);
        let sigC = '', sigT = '', sigTutor = '';
        if(window.isLocked && window.lastViewedFicha) {
            sigC = window.lastViewedFicha.firma_cliente; sigT = window.lastViewedFicha.firma_tecnico; sigTutor = window.lastViewedFicha.firma_tutor_legal;
        } else {
            const { padClient, padTech, padTutor } = getSignaturePads();
            if(padClient && !padClient.isEmpty()) sigC = padClient.toDataURL();
            if(padTech && !padTech.isEmpty()) sigT = padTech.toDataURL();
            if(padTutor && !padTutor.isEmpty()) sigTutor = padTutor.toDataURL();
        }

        const drawSig = (src, label, x, yPos) => {
            doc.setDrawColor(...colors.gray); doc.line(x, yPos, x + 50, yPos);
            doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.dark);
            doc.text(label, x + 25, yPos + 4, { align: 'center' });
            if(src) try { doc.addImage(src, 'PNG', x + 5, yPos - 18, 40, 18); } catch(e) {}
        };
        const sigY = y + 25;
        drawSig(sigC, 'FIRMA CLIENTE', 15, sigY);
        if(sigTutor) drawSig(sigTutor, 'FIRMA TUTOR LEGAL', pageWidth/2 - 25, sigY);
        drawSig(sigT, `TÉCNICO: ${getVal('estilista_responsable')}`, pageWidth - 65, sigY);
        
        y = sigY + 12;
        doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(...colors.gray);
        const auth = "Autorizo el tratamiento de mis datos personales y el registro fotográfico. Certifico que la información suministrada es verídica y corresponde a mi estado de salud actual.";
        doc.text(doc.splitTextToSize(auth, pageWidth - 30), 15, y);

        // --- LEGAL FOOTER ---
        y = pageHeight - 15;
        doc.setDrawColor(...colors.lightGray);
        doc.line(15, y, pageWidth - 15, y);
        y += 5;
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.gray);
        doc.text('© 2024 JULIE ALISADOS. TODOS LOS DERECHOS RESERVADOS.', 15, y);
        doc.setFont('helvetica', 'normal');
        doc.text('Documento de carácter clínico y confidencial. Prohibida su reproducción total o parcial sin autorización.', 15, y + 3);
        doc.text('Generado por JulieFicha PWA - Tecnología de Alisado Saludable', pageWidth - 15, y, { align: 'right' });

        doc.save(`Ficha_${getVal('nombre_completo').replace(/\s+/g, '_')}_${getVal('numero_documento')}.pdf`);

    } catch (err) {
        console.error('Error PDF:', err);
        alert('❌ Error al generar PDF.');
    } finally {
        if(pdfBtn) {
            pdfBtn.disabled = false;
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(window.lucide) window.lucide.createIcons();
        }
    }
}
