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
    
    // Pattern Singleton: solo inicializa si no existe
    if (cC && !padClient) { resizeCanvas(cC); padClient = new window.SignaturePad(cC); }
    if (cT && !padTech) { resizeCanvas(cT); padTech = new window.SignaturePad(cT); }
    
    const tutorBox = document.getElementById('tutorSignatureBox');
    const visibleMinor = tutorBox && !tutorBox.classList.contains('hidden');
    if (cMinor && visibleMinor && !padTutor) { resizeCanvas(cMinor); padTutor = new window.SignaturePad(cMinor); }
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

export function loadSignaturesFromData(data) {
    if(data.firma_cliente && padClient) padClient.fromDataURL(data.firma_cliente);
    if(data.firma_tecnico && padTech) padTech.fromDataURL(data.firma_tecnico);
    if(data.firma_tutor_legal && padTutor) padTutor.fromDataURL(data.firma_tutor_legal);
}
