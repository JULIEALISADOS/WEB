export function generatePDF(currentStep) {
    const element = document.getElementById('fichaForm');
    const pdfBtn = document.getElementById('pdfBtn');
    const fichaID = document.getElementById('fichaID');
    
    if(pdfBtn) pdfBtn.innerHTML = '⌛';
    
    const opt = {
        margin: 10,
        filename: 'Ficha_' + (fichaID ? fichaID.value : 'SinID') + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Mostramos todos los pasos para el PDF
    const allSteps = document.querySelectorAll('.step');
    allSteps.forEach(s => s.classList.add('active'));
    
    window.html2pdf().set(opt).from(element).save().then(() => {
        allSteps.forEach((s, i) => s.classList.toggle('active', i === currentStep - 1));
        if(pdfBtn) {
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(typeof window.lucide !== 'undefined') window.lucide.createIcons();
        }
    }).catch(err => {
        console.error(err);
        alert('Error generando PDF: ' + (err.message || err));
        allSteps.forEach((s, i) => s.classList.toggle('active', i === currentStep - 1));
        if(pdfBtn) {
            pdfBtn.innerHTML = '<i data-lucide="download"></i>';
            if(typeof window.lucide !== 'undefined') window.lucide.createIcons();
        }
    });
}
