let padClient, padTech, padTutor;

export function resizeCanvas(canvas) {
    if(!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

export function initSignatures() {
    const cC = document.getElementById('signature-pad-cliente');
    const cT = document.getElementById('signature-pad-tecnico');
    const cMinor = document.getElementById('signature-pad-tutor');
    
    if (cC) {
        if (!padClient) {
            resizeCanvas(cC);
            padClient = new window.SignaturePad(cC);
        } else if (cC.offsetWidth > 0 && cC.getAttribute('width') === null) {
            resizeCanvas(cC);
        }
    }
    
    if (cT) {
        if (!padTech) {
            resizeCanvas(cT);
            padTech = new window.SignaturePad(cT);
        } else if (cT.offsetWidth > 0 && cT.getAttribute('width') === null) {
            resizeCanvas(cT);
        }
    }
    
    const tutorBox = document.getElementById('tutorSignatureBox');
    const visibleMinor = tutorBox && !tutorBox.classList.contains('hidden');
    if (cMinor && visibleMinor) {
        if (!padTutor) {
            resizeCanvas(cMinor);
            padTutor = new window.SignaturePad(cMinor);
        } else if (cMinor.offsetWidth > 0 && cMinor.getAttribute('width') === null) {
            resizeCanvas(cMinor);
        }
    }
}

export function clearSignature(type, isLocked) {
    if(isLocked) return;
    if(type==='cliente' && padClient) padClient.clear();
    if(type==='tecnico' && padTech) padTech.clear();
    if(type==='tutor' && padTutor) padTutor.clear();
}

export function getSignaturePads() {
    return { padClient, padTech, padTutor };
}

export function toggleSignatures(lock) {
    if(padClient) lock ? padClient.off() : padClient.on();
    if(padTech) lock ? padTech.off() : padTech.on();
    if(padTutor) lock ? padTutor.off() : padTutor.on();
}

export function loadSignaturesFromData(data) {
    // Nos aseguramos de que los pads existan antes de cargar
    initSignatures();
    
    if(data.firma_cliente && padClient) padClient.fromDataURL(data.firma_cliente);
    if(data.firma_tecnico && padTech) padTech.fromDataURL(data.firma_tecnico);
    if(data.firma_tutor_legal && padTutor) padTutor.fromDataURL(data.firma_tutor_legal);
    
    // Si estamos viendo, bloqueamos la edición inmediatamente
    toggleSignatures(true);
}
