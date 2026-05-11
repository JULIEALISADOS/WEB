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
        doc.roundedRect(15, y, pageWidth - 30, 28, 2, 2, 'F');
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gold);
        doc.text('CLIENTE', 20, y + 6);
        doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.dark);
        doc.text(getVal('nombre_completo'), 20, y + 13);
        doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(...colors.gray);
        doc.text(`${getVal('tipo_documento')}: ${getVal('numero_documento')}  |  TEL: ${getVal('telefono')}  |  EDAD: ${getVal('edad')} AÑOS`, 20, y + 18);
        doc.text(`EMAIL: ${getVal('email')}  |  SEDE: ${getVal('sede')}`, 20, y + 22);
        doc.text(`ORIGEN: ${getVal('como_nos_conociste')}  |  ESTILISTA: ${getVal('estilista_responsable')}`, 20, y + 26);

        y += 32;

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

        // --- ADVERTENCIA LEGAL (SI APLICA) ---
        const emb = getVal('embarazo');
        const ale = getVal('alergias');
        if (emb === 'No aporta' || ale === 'No aporta') {
            checkSpace(20);
            y += 5;
            doc.setFillColor(255, 248, 240); // Fondo naranja muy suave
            doc.setDrawColor(...colors.gold);
            doc.roundedRect(15, y, pageWidth - 30, 18, 2, 2, 'FD');
            
            doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.dark);
            doc.text('NOTA DE SEGURIDAD Y PRIVACIDAD:', 20, y + 6);
            
            doc.setFontSize(6.5); doc.setFont('helvetica', 'italic'); doc.setTextColor(...colors.gray);
            const legalText = "En Julie Alisados, el bienestar es nuestra prioridad. El suministro de datos sobre salud es opcional; sin embargo, para garantizar un resultado óptimo y seguro, la falta de esta información podría limitar la aplicación de garantías o la realización del servicio por seguridad. La cliente acepta continuar bajo estas condiciones.";
            doc.text(doc.splitTextToSize(legalText, pageWidth - 40), 20, y + 10);
            y += 22;
        }

        // --- SECCIÓN 5: EVIDENCIA FOTOGRÁFICA ---
        drawSectionHeader('5. Evidencia Fotográfica');
        const imgW = 80, imgH = 70;
        checkSpace(imgH + 10);
        const fotoA = await loadImg(f.querySelector('#previewAntes img')?.src);
        const fotoD = await loadImg(f.querySelector('#previewDespues img')?.src);

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

        // --- SECCIÓN 6: CONSENTIMIENTO INFORMADO ---
        drawSectionHeader('6. Consentimiento Informado y Legal');
        
        // Historial Adicional
        h1 = drawField('Químicos Previos', getVal('consent_quimicos'), col1, 80);
        h2 = drawField('Tratamiento Médico', getVal('consent_meds'), col2, 80);
        y += Math.max(h1, h2);
        
        checkSpace(60);
        doc.setFillColor(252, 252, 252);
        doc.setDrawColor(220, 220, 220);
        doc.roundedRect(15, y, pageWidth - 30, 45, 2, 2, 'FD');
        
        doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(...colors.dark);
        const consentText = "DECLARACIÓN Y ACEPTACIÓN INTEGRAL: El alisado capilar consiste en la aplicación de productos químicos diseñados para modificar la estructura del cabello. El resultado depende de factores individuales como el tipo de cabello e historial previo. Acepto que fui debidamente informada sobre los resultados esperados y el plan de trabajo propuesto. El cliente reconoce y acepta que los resultados pueden variar y que Julie Alisados no será responsable por resultados insatisfactorios si no se siguen las recomendaciones. Declaro que he recibido toda la información sobre riesgos y cuidados, y renuncio expresamente a cualquier reclamación futura. Acepto la POLÍTICA DE GARANTÍA DE 20 DÍAS: La garantía cubre ondas prematuras dentro de los 20 días calendarios posteriores al procedimiento. Si la garantía no procede, el cliente pagará $20.000 por costos de valoración. Autorizo el tratamiento de mis datos personales según la Ley 1581 de 2012. He leído y comprendido toda la información y acepto voluntariamente el procedimiento.";
        doc.text(doc.splitTextToSize(consentText, pageWidth - 40), 20, y + 6);
        
        // Autorización de fotos
        const autPub = f.querySelector('[name="autoriza_publicidad"]')?.checked ? "SÍ AUTORIZA" : "NO AUTORIZA";
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gold);
        doc.text(`AUTORIZACIÓN USO PUBLICITARIO DE IMAGEN: ${autPub}`, 20, y + 40);
        
        y += 55;

        // --- SECCIÓN 7: FIRMAS ---
        // Obtener firmas
        let sigC = '', sigT = '', sigM = '';
        const { padClient, padTech, padTutor } = getSignaturePads();

        if (window.isLocked && window.lastViewedFicha) {
            sigC = window.lastViewedFicha.firma_cliente || '';
            sigT = window.lastViewedFicha.firma_tecnico || '';
            sigM = window.lastViewedFicha.firma_tutor_legal || '';
        } else {
            if (padClient && !padClient.isEmpty()) sigC = padClient.toDataURL();
            if (padTech && !padTech.isEmpty()) sigT = padTech.toDataURL();
            if (padTutor && !padTutor.isEmpty()) sigM = padTutor.toDataURL();
        }

        const drawSig = (src, label, printedName, x, yPos) => {
            doc.setDrawColor(...colors.gray); doc.setLineWidth(0.3);
            doc.line(x, yPos, x + 50, yPos);
            doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.setTextColor(...colors.gray);
            doc.text(label, x + 25, yPos + 3, { align: 'center' });
            if (printedName && printedName !== '---') {
                doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(...colors.dark);
                doc.text(printedName.toUpperCase(), x + 25, yPos + 6, { align: 'center' });
            }
            if (src && src.startsWith('data:image')) {
                try { doc.addImage(src, 'PNG', x + 5, yPos - 18, 40, 18); } catch (e) {}
            }
        };

        checkSpace(60);
        
        // Firma Cliente
        drawSig(sigC, 'FIRMA CLIENTE (MENOR/ADULTO)', getVal('nombre_completo'), 15, y + 20);
        y += 30;

        // Firma Tutor (Si aplica)
        if (isMinor) {
            checkSpace(30);
            drawSig(sigM, 'FIRMA TUTOR LEGAL / RESPONSABLE', getVal('nombre_tutor') || 'Responsable Menor', 15, y + 20);
            y += 30;
        }

        // Firma Técnico
        checkSpace(30);
        drawSig(sigT, 'FIRMA TÉCNICO PROFESIONAL', getVal('estilista_responsable'), 15, y + 20);

        // Footer
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
