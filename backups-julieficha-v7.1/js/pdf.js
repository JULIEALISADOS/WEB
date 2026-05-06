export async function generatePDF(currentStep) {
    const pdfBtn = document.getElementById('pdfBtn');
    const template = document.getElementById('pdf-template');
    
    if(pdfBtn) {
        pdfBtn.disabled = true;
        pdfBtn.innerHTML = '⌛';
    }
    
    try {
        // 1. Recopilar datos actuales del formulario
        const f = document.getElementById('fichaForm');
        const formData = new FormData(f);
        const data = Object.fromEntries(formData.entries());
        
        // 2. Llenar el template
        document.getElementById('pdf-ficha-id').innerText = data.consecutivo || '---';
        document.getElementById('pdf-nombre').innerText = data.nombre_completo || '---';
        document.getElementById('pdf-doc').innerText = data.numero_documento || '---';
        document.getElementById('pdf-edad').innerText = data.edad || '---';
        document.getElementById('pdf-tel').innerText = data.telefono || '---';
        document.getElementById('pdf-sede').innerText = data.sede || '---';
        document.getElementById('pdf-fecha').innerText = data.fecha_diligenciamiento || '---';
        document.getElementById('pdf-tecnico-resp').innerText = data.estilista_responsable || '---';
        
        document.getElementById('pdf-patron').innerText = data.tipo_cabello || '---';
        document.getElementById('pdf-longitud').innerText = data.longitud || '---';
        document.getElementById('pdf-textura').innerText = data.textura || '---';
        document.getElementById('pdf-crecimiento').innerText = data.estado_crecimiento || '---';
        document.getElementById('pdf-medios').innerText = data.estado_medios || '---';
        document.getElementById('pdf-puntas').innerText = data.estado_puntas || '---';
        
        document.getElementById('pdf-procedimiento').innerText = data.procedimiento || '---';
        document.getElementById('pdf-tecnica').innerText = data.tecnica_utilizada || '---';
        document.getElementById('pdf-porcentaje').innerText = data.porcentaje_liso || '---';

        // 3. Manejo de Imágenes de Evidencia (Alta Calidad)
        const previewAntes = document.getElementById('previewAntes').querySelector('img');
        const previewDespues = document.getElementById('previewDespues').querySelector('img');
        const containerAntes = document.getElementById('pdf-foto-antes');
        const containerDespues = document.getElementById('pdf-foto-despues');
        
        containerAntes.innerHTML = previewAntes ? `<img src="${previewAntes.src}" style="width:100%; height:100%; object-fit:cover;">` : '<p style="margin-top:150px; opacity:0.3;">Sin Registro</p>';
        containerDespues.innerHTML = previewDespues ? `<img src="${previewDespues.src}" style="width:100%; height:100%; object-fit:cover;">` : '<p style="margin-top:150px; opacity:0.3;">Sin Registro</p>';

        // 4. Manejo de Firmas
        const canvasC = document.getElementById('signature-pad-cliente');
        const canvasT = document.getElementById('signature-pad-tecnico');
        const destC = document.getElementById('pdf-firma-cliente');
        const destT = document.getElementById('pdf-firma-tecnico');
        
        if(canvasC) destC.innerHTML = `<img src="${canvasC.toDataURL()}" style="max-height:80px;">`;
        if(canvasT) destT.innerHTML = `<img src="${canvasT.toDataURL()}" style="max-height:80px;">`;

        // 5. Configuración de Exportación (Mejorada para evitar cortes)
        const opt = {
            margin: [10, 10, 10, 10], // Márgenes más amplios
            filename: 'HistoriaCapilar_' + (data.numero_documento || 'DOC') + '.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { 
                scale: 2, // Scale 2 es más estable para evitar cortes que 3
                useCORS: true,
                letterRendering: true,
                logging: false,
                windowWidth: 800
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // CRITICO: evita cortes en medio de fotos
        };
        
        // 6. Generar PDF desde el template (temporalmente visible para html2pdf)
        template.style.display = 'block';
        await window.html2pdf().set(opt).from(template).save();
        template.style.display = 'none';
        
    } catch (err) {
        console.error('Error PDF Premium:', err);
        alert('❌ Error al generar Historia Clínica. Intenta de nuevo.');
        template.style.display = 'none';
    } finally {
        if(pdfBtn) {
            pdfBtn.disabled = false;
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(window.lucide) window.lucide.createIcons();
        }
    }
}
