export function setSede(s) {
    document.getElementById('sedeInput').value = s;
    document.querySelectorAll('.btn-option').forEach(b => b.classList.toggle('active', b.innerText === s.toUpperCase()));
}

export function setHairType(c, f) {
    document.getElementById('hairTypeInput').value = f;
    document.getElementById('hairTypeSelectedLabel').innerText = f;
    document.querySelectorAll('.btn-hair').forEach(b => b.classList.toggle('active', b.innerText === c));
}

export function setChip(p, v) {
    document.getElementById(p + 'Input').value = v;
    const container = document.getElementById(p + 'Input').closest('.form-group') || document.getElementById(p + 'Input').closest('.form-grid > div');
    if (container) {
        container.querySelectorAll('.chip, .chip-sm').forEach(c => {
            const text = c.querySelector('strong') ? c.querySelector('strong').innerText : c.innerText;
            if (text) c.classList.toggle('active', text.trim().toLowerCase() === v.trim().toLowerCase());
        });
    }
    // Limpiar error visual si había
    const group = document.getElementById(p + 'Input').closest('.form-group');
    if (group) group.classList.remove('error');
}

export function previewImage(input, previewId) {
    const prev = document.getElementById(previewId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            prev.innerHTML = '<img src="' + e.target.result + '" style="width:100%; border-radius:12px; margin-top:10px;">';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

export function validateStep(idx, steps) {
    const fields = steps[idx - 1].querySelectorAll('[required]');
    let valid = true;

    if (idx === 1) {
        const age = parseInt(document.getElementById('edadInput').value) || 0;
        const type = document.getElementById('docType').value;
        if (type === 'TI' && age >= 18) { alert('⚠️ Tarjeta de Identidad es solo para menores de 18 años.'); return false; }
        if (type === 'CC' && (age < 18 || age > 99)) { alert('⚠️ Cédula es solo para mayores de 18 años (18-99).'); return false; }
    }

    fields.forEach(f => {
        let isValueOk = f.value && f.value.trim().length > 0;
        if (f.tagName === 'TEXTAREA' && f.value.trim().length < 5) isValueOk = false;

        if (!isValueOk || (f.type === 'checkbox' && !f.checked)) {
            const group = f.closest('.form-group') || f.closest('.authorization-check') || f.closest('.form-grid > div');
            if (group) group.classList.add('error');
            valid = false;
        } else {
            const group = f.closest('.form-group') || f.closest('.authorization-check') || f.closest('.form-grid > div');
            if (group) group.classList.remove('error');
        }
    });

    if (!valid) {
        if (idx === 5) {
            const authCheck = steps[idx - 1].querySelector('#authCheckbox');
            if (authCheck && !authCheck.checked) {
                alert('⚠️ Debes aceptar la AUTORIZACIÓN LEGAL para continuar.');
                authCheck.closest('.prominent-check')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return false;
            }
        }
        // Buscar primer campo con error y hacer scroll
        const firstError = steps[idx - 1].querySelector('.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        alert('⚠️ Campo obligatorio faltante o muy corto en el Paso ' + idx + '. Los campos con textos requieren mínimo 5 caracteres.');
    }
    return valid;
}

export function monitorMinorSettings() {
    const ageValue = parseInt(document.getElementById('edadInput').value) || 0;
    const typeValue = document.getElementById('docType').value;
    const isMinor = ageValue > 0 && (ageValue < 18 || typeValue === 'TI');

    document.getElementById('tutorGroup').classList.toggle('hidden', !isMinor);
    document.getElementById('tutorInput').required = isMinor;
    document.getElementById('tutorSignatureBox').classList.toggle('hidden', !isMinor);
}

export function lockForm(lock, form) {
    // Bloquear todos los inputs, selects y textareas
    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.disabled = lock;
        if (lock) el.classList.add('locked');
        else el.classList.remove('locked');
    });

    // Bloquear botones interactivos: chips, opciones de sede, tipo de cabello y botones de limpiar firma
    document.querySelectorAll('.btn-option, .btn-hair, .chip, .chip-sm, .btn-clear-sig').forEach(b => {
        b.style.pointerEvents = lock ? 'none' : 'auto';
        b.style.opacity = lock ? '0.7' : '1';
        if (b.tagName === 'BUTTON') b.disabled = lock;
    });

    // Asegurar que el botón de PDF sea la excepción y esté visible al ver fichas antiguas
    const pdfBtn = document.getElementById('pdfBtn');
    if (pdfBtn) {
        pdfBtn.disabled = false;
        pdfBtn.style.pointerEvents = 'auto';
        pdfBtn.style.opacity = '1';
        pdfBtn.classList.toggle('hidden', !lock);
        if (lock && typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }

    // Ocultar el botón de finalizar/guardar si estamos en modo lectura
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.classList.toggle('hidden', lock);
}

export function initRealtimeValidation(steps) {
    steps.forEach((step, idx) => {
        step.querySelectorAll('[required]').forEach(field => {
            const event = field.type === 'checkbox' ? 'change' : 'input';
            field.addEventListener(event, () => {
                const group = field.closest('.form-group') || field.closest('.authorization-check') || field.closest('.form-grid > div');
                let isOk = field.value && field.value.trim().length > 0;
                if (field.tagName === 'TEXTAREA' && field.value.trim().length < 5) isOk = false;
                if (field.type === 'checkbox') isOk = field.checked;
                if (group) {
                    group.classList.toggle('error', !isOk);
                    group.classList.toggle('valid', isOk);
                }
            });
        });
    });
}
export function previewMultiple(input, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (input.files) {
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-thumb';
                container.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

export function previewVideo(input, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (input.files && input.files[0]) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(input.files[0]);
        video.controls = true;
        video.style.width = '100%';
        video.style.marginTop = '10px';
        video.style.borderRadius = '8px';
        container.appendChild(video);
    }
}

window.previewImage = previewImage;
window.previewMultiple = previewMultiple;
window.previewVideo = previewVideo;
