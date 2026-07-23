let padClient, padTech, padTutor;

export function resizeCanvas(canvas) {
    if (!canvas || canvas.offsetWidth === 0) return false;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    return true;
}

export function initSignatures() {
    const cC = document.getElementById('signature-pad-cliente');
    const cT = document.getElementById('signature-pad-tecnico');
    const cMinor = document.getElementById('signature-pad-tutor');

    if (cC && cC.offsetWidth > 0) {
        if (!padClient) {
            resizeCanvas(cC);
            padClient = new window.SignaturePad(cC, { minWidth: 1, maxWidth: 2.5 });
        } else {
            // Re-resize si cambió el tamaño del contenedor
            const savedData = padClient.toData();
            resizeCanvas(cC);
            if (savedData && savedData.length > 0) padClient.fromData(savedData);
        }
    }

    if (cT && cT.offsetWidth > 0) {
        if (!padTech) {
            resizeCanvas(cT);
            padTech = new window.SignaturePad(cT, { minWidth: 1, maxWidth: 2.5 });
        } else {
            const savedData = padTech.toData();
            resizeCanvas(cT);
            if (savedData && savedData.length > 0) padTech.fromData(savedData);
        }
    }

    const tutorBox = document.getElementById('tutorSignatureBox');
    const visibleMinor = tutorBox && !tutorBox.classList.contains('hidden');
    if (cMinor && visibleMinor && cMinor.offsetWidth > 0) {
        if (!padTutor) {
            resizeCanvas(cMinor);
            padTutor = new window.SignaturePad(cMinor, { minWidth: 1, maxWidth: 2.5 });
        } else {
            const savedData = padTutor.toData();
            resizeCanvas(cMinor);
            if (savedData && savedData.length > 0) padTutor.fromData(savedData);
        }
    }
}

export function clearSignature(type, isLocked) {
    if (isLocked) return;
    if (type === 'cliente' && padClient) padClient.clear();
    if (type === 'tecnico' && padTech) padTech.clear();
    if (type === 'tutor' && padTutor) padTutor.clear();
}

export function getSignaturePads() {
    return { padClient, padTech, padTutor };
}

export function toggleSignatures(lock) {
    if (padClient) lock ? padClient.off() : padClient.on();
    if (padTech) lock ? padTech.off() : padTech.on();
    if (padTutor) lock ? padTutor.off() : padTutor.on();
}

export function loadSignaturesFromData(data, retryCount = 0) {
    // Aseguramos que los pads existan y tengan dimensiones
    initSignatures();

    const cC = document.getElementById('signature-pad-cliente');
    const cT = document.getElementById('signature-pad-tecnico');

    // Si los canvas aún no tienen dimensiones, reintentar (máx 5 veces)
    if (retryCount < 5 && (!cC || cC.offsetWidth === 0 || !padClient)) {
        setTimeout(() => loadSignaturesFromData(data, retryCount + 1), 300);
        return;
    }

    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    if (data.firma_cliente && padClient) {
        padClient.fromDataURL(data.firma_cliente, {
            ratio: ratio,
            width: cC.offsetWidth,
            height: cC.offsetHeight
        });
    }
    if (data.firma_tecnico && padTech) {
        padTech.fromDataURL(data.firma_tecnico, {
            ratio: ratio,
            width: cT.offsetWidth,
            height: cT.offsetHeight
        });
    }

    const cMinor = document.getElementById('signature-pad-tutor');
    if (data.firma_tutor_legal && padTutor && cMinor) {
        padTutor.fromDataURL(data.firma_tutor_legal, {
            ratio: ratio,
            width: cMinor.offsetWidth,
            height: cMinor.offsetHeight
        });
    }

    // Si estamos viendo, bloqueamos la edición
    toggleSignatures(true);
}

export function destroyPads() {
    if (padClient) { padClient.off(); padClient = null; }
    if (padTech) { padTech.off(); padTech = null; }
    if (padTutor) { padTutor.off(); padTutor = null; }
}
