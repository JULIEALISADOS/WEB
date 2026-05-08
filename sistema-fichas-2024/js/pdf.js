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
        let y = 15;

        // Helpers
        const checkSpace = (h) => {
            if (y + h > 280) {
                doc.addPage();
                y = 20;
                return true;
            }
            return false;
        };

        const drawSectionHeader = (title) => {
            checkSpace(15);
            doc.setFontSize(10);
            doc.setTextColor(212, 175, 55);
            doc.text(title, 15, y);
            doc.setDrawColor(212, 175, 55);
            doc.line(15, y + 2, pageWidth - 15, y + 2);
            y += 10;
        };

        const drawBox = (label, value, x, yPos, w, h = 12) => {
            doc.setDrawColor(230);
            doc.roundedRect(x, yPos, w, h, 2, 2, 'D');
            doc.setFontSize(7);
            doc.setTextColor(120);
            doc.text(label, x + 3, yPos + 4);
            doc.setFontSize(8);
            doc.setTextColor(0);
            const splitVal = doc.splitTextToSize(value, w - 6);
            doc.text(splitVal, x + 3, yPos + 9);
        };

        // Logo
        const loadImg = (url) => new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
        });
        const logoImg = await loadImg('logo.png');

        // Header
        doc.setFillColor(212, 175, 55); 
        doc.rect(0, 0, pageWidth, 5, 'F');
        y += 10;
        if (logoImg) doc.addImage(logoImg, 'PNG', 15, y - 5, 40, 15);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('HISTORIA CLÍNICA CAPILAR', pageWidth - 15, y, { align: 'right' });
        y += 6;
        doc.text('FICHA N°: ' + getVal('consecutivo'), pageWidth - 15, y, { align: 'right' });
        y += 10;

        // 1. Datos Generales
        doc.setFillColor(252, 250, 245);
        doc.roundedRect(15, y, pageWidth - 30, 32, 3, 3, 'F');
        doc.setFontSize(8); doc.setTextColor(212, 175, 55);
        doc.text('DATOS DE LA CLIENTE', 20, y + 7);
        doc.setFontSize(11); doc.setTextColor(0);
        doc.text(getVal('nombre_completo'), 20, y + 14);
        doc.setFontSize(9); doc.setTextColor(80);
        doc.text(`Sede: ${getVal('sede')} | Doc: ${getVal('numero_documento')}`, 20, y + 21);
        doc.text(`Tel: ${getVal('telefono')} | Edad: ${getVal('edad')}`, 20, y + 27);
        if(getVal('tutor_legal') !== '---') doc.text(`Tutor: ${getVal('tutor_legal')}`, pageWidth - 20, y + 27, { align: 'right' });
        y += 40;

        // 2. Diagnóstico Técnico
        drawSectionHeader('1. DIAGNÓSTICO TÉCNICO');
        const colW = (pageWidth - 40) / 3;
        drawBox('Patrón de Rizo', getVal('tipo_cabello'), 15, y, colW);
        drawBox('Longitud', getVal('longitud'), 15 + colW + 5, y, colW);
        drawBox('Textura', getVal('textura'), 15 + (colW + 5) * 2, y, colW);
        y += 15;
        drawBox('Crecimiento', getVal('estado_crecimiento'), 15, y, colW);
        drawBox('Medios', getVal('estado_medios'), 15 + colW + 5, y, colW);
        drawBox('Puntas', getVal('estado_puntas'), 15 + (colW + 5) * 2, y, colW);
        y += 15;
        drawBox('Densidad', getVal('densidad'), 15, y, colW);
        drawBox('Porosidad', getVal('porosidad'), 15 + colW + 5, y, colW);
        drawBox('Resistencia', getVal('resistencia'), 15 + (colW + 5) * 2, y, colW);
        y += 15;
        drawBox('Elasticidad', getVal('elasticidad'), 15, y, pageWidth - 30);
        y += 15;
        drawBox('Obs. Diagnóstico', getVal('observaciones_diagnostico'), 15, y, pageWidth - 30, 15);
        y += 22;

        // 3. Historial y Características
        drawSectionHeader('2. HISTORIAL Y CARACTERÍSTICAS');
        drawBox('Procesos Químicos (6 meses)', getVal('procesos_quimicos'), 15, y, (pageWidth - 35) / 2, 18);
        drawBox('Terapias Capilares', getVal('terapias_capilares'), pageWidth / 2 + 2.5, y, (pageWidth - 35) / 2, 18);
        y += 23;
        drawBox('Obs. Características', getVal('observaciones_caracteristicas'), 15, y, pageWidth - 30, 15);
        y += 22;

        // 4. Cuero Cabelludo
        drawSectionHeader('3. CUERO CABELLUDO');
        drawBox('Piel Cabelluda', getVal('piel_cabelluda'), 15, y, colW);
        drawBox('Frecuencia Lavado', getVal('frecuencia_lavado'), 15 + colW + 5, y, colW);
        drawBox('Dermatitis', getVal('dermatitis'), 15 + (colW + 5) * 2, y, colW);
        y += 15;
        drawBox('Caída', getVal('caida'), 15, y, colW);
        drawBox('Descamación', getVal('descamacion'), 15 + colW + 5, y, colW);
        drawBox('Obs. Cuero', getVal('observaciones_cuero'), 15 + (colW + 5) * 2, y, colW);
        y += 22;

        // 5. Procedimiento y Salud
        drawSectionHeader('4. PROCEDIMIENTO Y SALUD');
        checkSpace(50);
        doc.setFillColor(249);
        doc.roundedRect(15, y, pageWidth - 30, 45, 2, 2, 'F');
        doc.setFontSize(8); doc.setTextColor(50);
        doc.text(`Servicio: ${getVal('procedimiento')}`, 20, y + 6);
        doc.text(`Técnica: ${getVal('tecnica_utilizada')}`, 20, y + 12);
        doc.text(`Porcentaje Liso: ${getVal('porcentaje_liso')}`, 20, y + 18);
        
        let embStr = getVal('embarazo');
        if(embStr === 'Si' && getVal('embarazo_13_semanas') !== '---') embStr += ` (${getVal('embarazo_13_semanas')})`;
        doc.text(`Embarazo: ${embStr}`, 20, y + 24);
        
        let alStr = getVal('alergias');
        if(alStr === 'Si' && getVal('alergias_descripcion') !== '---') alStr += ` - ${getVal('alergias_descripcion')}`;
        doc.text(`Alergias: ${alStr}`, 20, y + 30);
        
        doc.setFontSize(9); doc.setTextColor(0);
        doc.text(`Técnico Responsable: ${getVal('estilista_responsable')}`, 20, y + 40);
        y += 55;

        // 6. Evidencia
        drawSectionHeader('5. EVIDENCIA FOTOGRÁFICA');
        checkSpace(90);
        const imgA = document.getElementById('previewAntes').querySelector('img');
        const imgD = document.getElementById('previewDespues').querySelector('img');
        const addPhoto = async (imgEl, x, yPos, label) => {
            doc.setFontSize(8); doc.setTextColor(100);
            doc.text(label, x + 42.5, yPos - 3, { align: 'center' });
            if(!imgEl) {
                doc.setDrawColor(240); doc.rect(x, yPos, 85, 80, 'D');
                doc.text('Sin Registro', x + 42.5, yPos + 40, { align: 'center' });
            } else {
                try {
                    doc.setDrawColor(212, 175, 55); doc.rect(x - 0.5, yPos - 0.5, 86, 81, 'D');
                    doc.addImage(imgEl.src, 'JPEG', x, yPos, 85, 80);
                } catch(e) { console.warn(e); }
            }
        };
        await addPhoto(imgA, 15, y, 'REGISTRO ANTES');
        await addPhoto(imgD, pageWidth - 100, y, 'REGISTRO DESPUÉS');
        y += 95;

        // 7. Firmas
        drawSectionHeader('6. FIRMAS Y CONSENTIMIENTO');
        checkSpace(40);
        let sigC = '', sigT = '', sigTutor = '';
        if(window.isLocked && window.lastViewedFicha) {
            sigC = window.lastViewedFicha.firma_cliente;
            sigT = window.lastViewedFicha.firma_tecnico;
            sigTutor = window.lastViewedFicha.firma_tutor_legal;
        } else {
            const { padClient, padTech, padTutor } = getSignaturePads();
            if(padClient && !padClient.isEmpty()) sigC = padClient.toDataURL();
            if(padTech && !padTech.isEmpty()) sigT = padTech.toDataURL();
            if(padTutor && !padTutor.isEmpty()) sigTutor = padTutor.toDataURL();
        }

        const drawSig = (src, label, x, yPos) => {
            doc.setDrawColor(0); doc.line(x, yPos, x + 50, yPos);
            doc.setFontSize(7); doc.setTextColor(0);
            doc.text(label, x + 25, yPos + 4, { align: 'center' });
            if(src) try { doc.addImage(src, 'PNG', x + 5, yPos - 15, 40, 15); } catch(e) {}
        };

        drawSig(sigC, 'FIRMA CLIENTE', 15, y + 20);
        if(sigTutor) drawSig(sigTutor, 'FIRMA TUTOR', pageWidth/2 - 25, y + 20);
        drawSig(sigT, 'FIRMA TÉCNICO', pageWidth - 65, y + 20);
        y += 35;

        doc.setFontSize(6); doc.setTextColor(150);
        const authText = "Autorizo el tratamiento de mis datos personales y el registro fotográfico. Certifico que la información suministrada es verídica y corresponde a mi estado de salud actual.";
        doc.text(doc.splitTextToSize(authText, pageWidth - 40), 15, y);

        doc.save(`Ficha_${getVal('nombre_completo').replace(/\s+/g, '_')}_${getVal('numero_documento')}.pdf`);

    } catch (err) {
        console.error('Error PDF:', err);
        alert('❌ Error al generar PDF. Intenta de nuevo.');
    } finally {
        if(pdfBtn) {
            pdfBtn.disabled = false;
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(window.lucide) window.lucide.createIcons();
        }
    }
}
