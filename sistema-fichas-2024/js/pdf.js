export async function generatePDF(currentStep) {
    const element = document.getElementById('fichaForm');
    const pdfBtn = document.getElementById('pdfBtn');
    const fichaID = document.getElementById('fichaID');
    
    if(pdfBtn) {
        pdfBtn.disabled = true;
        pdfBtn.innerHTML = '⌛';
    }
    
    try {
        // Clonamos para no romper la UI actual durante el proceso
        const clone = element.cloneNode(true);
        clone.style.width = '800px'; // Ancho fijo para consistencia
        clone.style.background = 'white';
        clone.style.color = 'black';
        
        // Aseguramos que todos los pasos sean visibles en el clon
        const cloneSteps = clone.querySelectorAll('.step');
        cloneSteps.forEach(s => {
            s.style.display = 'block';
            s.style.opacity = '1';
            s.style.transform = 'none';
            s.style.animation = 'none';
            s.classList.add('active');
        });

        // Ocultamos botones y elementos no deseados en el PDF
        clone.querySelectorAll('button, .btn-clear-sig, .file-upload input').forEach(el => el.style.display = 'none');
        
        // Manejo de firmas en el clon (los canvas no se clonan con contenido automáticamente)
        const originalPads = document.querySelectorAll('.signature-pad');
        const clonePads = clone.querySelectorAll('.signature-pad');
        originalPads.forEach((orig, i) => {
            if (clonePads[i]) {
                const img = document.createElement('img');
                img.src = orig.toDataURL();
                img.style.width = '100%';
                img.style.border = '1px solid #eee';
                clonePads[i].parentNode.replaceChild(img, clonePads[i]);
            }
        });

        const opt = {
            margin: [10, 5],
            filename: 'Ficha_' + (fichaID ? fichaID.value : 'SinID') + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                letterRendering: true,
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        await window.html2pdf().set(opt).from(clone).save();
        
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
