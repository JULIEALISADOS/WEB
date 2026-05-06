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
            return el ? el.value : '---';
        };

        // 1. Inicializar jsPDF (A4)
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = 15;

        // --- ENCABEZADO ---
        doc.setFillColor(212, 175, 55); // Dorado Julie
        doc.rect(0, 0, pageWidth, 5, 'F');
        y += 10;

        // Logo (Usando el logo.png del proyecto si es posible, o texto por ahora)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(212, 175, 55);
        doc.text('JULIE ALISADOS', 15, y);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('HISTORIA CLÍNICA CAPILAR', pageWidth - 15, y, { align: 'right' });
        y += 6;
        doc.text('FICHA N°: ' + getVal('consecutivo'), pageWidth - 15, y, { align: 'right' });
        y += 10;

        // --- BLOQUE CLIENTE ---
        doc.setFillColor(252, 250, 245);
        doc.roundedRect(15, y, pageWidth - 30, 25, 3, 3, 'F');
        
        doc.setFontSize(9);
        doc.setTextColor(212, 175, 55);
        doc.text('DATOS DE LA CLIENTE', 20, y + 7);
        doc.text('INFORMACIÓN DE SEDE', pageWidth - 20, y + 7, { align: 'right' });

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(getVal('nombre_completo'), 20, y + 14);
        
        doc.setFontSize(10);
        doc.text('Sede: ' + getVal('sede'), pageWidth - 20, y + 14, { align: 'right' });
        
        doc.setFontSize(9);
        doc.setTextColor(80);
        doc.text(`Documento: ${getVal('numero_documento')} | Edad: ${getVal('edad')}`, 20, y + 20);
        doc.text(`Fecha: ${getVal('fecha_diligenciamiento')}`, pageWidth - 20, y + 20, { align: 'right' });
        y += 35;

        // --- DIAGNÓSTICO ---
        doc.setFontSize(11);
        doc.setTextColor(212, 175, 55);
        doc.text('DIAGNÓSTICO TÉCNICO', 15, y);
        doc.setDrawColor(212, 175, 55);
        doc.line(15, y + 2, 60, y + 2);
        y += 10;

        const drawBox = (label, value, x, y, w) => {
            doc.setDrawColor(230);
            doc.roundedRect(x, y, w, 12, 2, 2, 'D');
            doc.setFontSize(8);
            doc.setTextColor(100);
            doc.text(label, x + 3, y + 4);
            doc.setFontSize(9);
            doc.setTextColor(0);
            doc.text(value, x + 3, y + 9);
        };

        const colW = (pageWidth - 40) / 3;
        drawBox('Patrón de Rizo', getVal('tipo_cabello'), 15, y, colW);
        drawBox('Longitud', getVal('longitud'), 15 + colW + 5, y, colW);
        drawBox('Textura', getVal('textura'), 15 + (colW + 5) * 2, y, colW);
        y += 15;
        drawBox('Crecimiento', getVal('estado_crecimiento'), 15, y, colW);
        drawBox('Medios', getVal('estado_medios'), 15 + colW + 5, y, colW);
        drawBox('Puntas', getVal('estado_puntas'), 15 + (colW + 5) * 2, y, colW);
        y += 20;

        // --- PROCEDIMIENTO ---
        doc.setFontSize(11);
        doc.setTextColor(212, 175, 55);
        doc.text('PROCEDIMIENTO REALIZADO', 15, y);
        doc.line(15, y + 2, 70, y + 2);
        y += 8;

        doc.setFillColor(249);
        doc.roundedRect(15, y, pageWidth - 30, 20, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setTextColor(50);
        doc.text('Servicio: ' + getVal('procedimiento'), 20, y + 6);
        doc.text('Técnica: ' + getVal('tecnica_utilizada'), 20, y + 11);
        doc.text('Porcentaje Liso: ' + getVal('porcentaje_liso'), 20, y + 16);
        y += 30;

        // --- EVIDENCIA (Nueva Página si no cabe) ---
        if (y > 180) { doc.addPage(); y = 20; }
        
        doc.setFontSize(11);
        doc.setTextColor(212, 175, 55);
        doc.text('EVIDENCIA FOTOGRÁFICA', 15, y);
        doc.line(15, y + 2, 65, y + 2);
        y += 10;

        const imgA = document.getElementById('previewAntes').querySelector('img');
        const imgD = document.getElementById('previewDespues').querySelector('img');

        const addPhoto = async (imgEl, x, y) => {
            if(!imgEl) {
                doc.setDrawColor(240);
                doc.rect(x, y, 85, 90, 'D');
                doc.setFontSize(8);
                doc.text('Sin Registro', x + 35, y + 45);
                return;
            }
            try {
                // Dibujar un borde dorado para la foto
                doc.setDrawColor(212, 175, 55);
                doc.rect(x - 1, y - 1, 87, 92, 'D');
                doc.addImage(imgEl.src, 'JPEG', x, y, 85, 90);
            } catch(e) {
                console.warn('Error al añadir imagen:', e);
            }
        };

        await addPhoto(imgA, 15, y);
        await addPhoto(imgD, pageWidth - 100, y);
        y += 100;

        // --- FIRMAS ---
        if (y > 250) { doc.addPage(); y = 30; }
        
        y += 10;
        let sigC = '', sigT = '';
        if(window.isLocked && window.lastViewedFicha) {
            sigC = window.lastViewedFicha.firma_cliente;
            sigT = window.lastViewedFicha.firma_tecnico;
        } else {
            const canvasC = document.getElementById('signature-pad-cliente');
            const canvasT = document.getElementById('signature-pad-tecnico');
            if(canvasC) sigC = canvasC.toDataURL();
            if(canvasT) sigT = canvasT.toDataURL();
        }

        const drawSig = (src, label, x, y) => {
            doc.line(x, y, x + 70, y);
            doc.setFontSize(8);
            doc.text(label, x + 35, y + 5, { align: 'center' });
            if(src) {
                try {
                    doc.addImage(src, 'PNG', x + 10, y - 15, 50, 15);
                } catch(e) {}
            }
        };

        drawSig(sigC, 'FIRMA CLIENTE', 15, y + 20);
        drawSig(sigT, 'FIRMA TÉCNICO', pageWidth - 85, y + 20);

        // Footer Legal
        doc.setFontSize(7);
        doc.setTextColor(150);
        doc.text('Este documento certifica el diagnóstico y procedimiento realizado por Julie Alisados.', pageWidth / 2, pageHeight - 10, { align: 'center' });

        doc.save('HistoriaCapilar_' + (getVal('numero_documento') || 'DOC') + '.pdf');

    } catch (err) {
        console.error('Error PDF Pure jsPDF:', err);
        alert('❌ Error al generar PDF. Asegúrate de haber llenado todo.');
    } finally {
        if(pdfBtn) {
            pdfBtn.disabled = false;
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(window.lucide) window.lucide.createIcons();
        }
    }
}
