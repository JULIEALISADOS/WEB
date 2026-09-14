/**
 * Cotizador de Envíos Envía Colvanes & Checkout (Bre-B y Mercado Pago)
 * Julie Alisados By Julie Valencia
 * 
 * Reglas de cálculo:
 * - Origen oficial de despacho: Bodega Central Moniquirá, Boyacá
 * - Líquidos y cremas (ml): 1.1 g/ml
 * - Sólidos (g): peso directo en gramos
 * - Flete: aproximado, a pagar contraentrega a Envía Colvanes
 * - Productos: a pagar en la web vía Bre-B o Mercado Pago
 */

let cart = {};

// 1. Cambiar cantidad de producto en la tarjeta
function changeQty(button, change) {
    const card = button.closest('.product-card-large');
    if (!card) return;

    const productName = card.getAttribute('data-name');
    const productPrice = parseInt(card.getAttribute('data-price') || "0", 10);
    const productWeight = parseInt(card.getAttribute('data-weight') || "500", 10);
    const productImg = card.getAttribute('data-img') || "";
    const productPayLink = card.getAttribute('data-pay-link') || "";
    const displayElement = card.querySelector('.qty-display');
    
    let currentQty = cart[productName] ? cart[productName].qty : 0;
    let newQty = currentQty + change;
    
    if (newQty < 0) newQty = 0;
    if (newQty > 20) newQty = 20;
    
    if (newQty === 0) {
        delete cart[productName];
        card.classList.remove('selected');
    } else {
        cart[productName] = {
            qty: newQty,
            price: productPrice,
            weight: productWeight, // en gramos (1.1 g/ml o g)
            img: productImg,
            payLink: productPayLink
        };
        card.classList.add('selected');
    }
    
    if (displayElement) {
        displayElement.textContent = newQty;
    }
    
    updateFloatingBar();
}

// 2. Actualizar barra flotante inferior
function updateFloatingBar() {
    const floatingBar = document.getElementById('cartFloatingBar');
    const totalDisplay = document.getElementById('cartBarTotal');
    const qtyDisplay = document.getElementById('cartBarQty');
    const weightBadge = document.getElementById('cartBarWeightBadge');
    
    let totalItems = 0;
    let totalPrice = 0;
    let totalWeightGrams = 0;
    
    for (const item in cart) {
        const p = cart[item];
        totalItems += p.qty;
        totalPrice += p.qty * p.price;
        totalWeightGrams += p.qty * (p.weight || 500);
    }
    
    if (totalItems > 0) {
        const formattedPrice = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(totalPrice);

        const weightInKg = (totalWeightGrams / 1000).toFixed(2);
        
        if (qtyDisplay) {
            qtyDisplay.textContent = `${totalItems} ${totalItems === 1 ? 'producto seleccionado' : 'productos seleccionados'}`;
        }
        if (totalDisplay) {
            totalDisplay.textContent = formattedPrice;
        }
        if (weightBadge) {
            weightBadge.textContent = `(~${weightInKg} kg)`;
        }
        
        if (floatingBar) {
            floatingBar.classList.add('active');
        }
    } else {
        if (floatingBar) {
            floatingBar.classList.remove('active');
        }
    }
}

// 3. Matriz de Tarifas Estimadas Envía Colvanes (Origen: Bodega Moniquirá, Boyacá)
// Tarifas de referencia aproximadas (el flete se liquida en báscula y se paga contraentrega)
const ENVIA_TARIFAS = {
    moniquira_local: { base: 7500, kgExtra: 2000, label: "Moniquirá (Urbano / Local)" },
    boyaca_regional: { base: 9500, kgExtra: 2500, label: "Boyacá (Tunja, Duitama, Sogamoso, etc.)" },
    santander_regional: { base: 11000, kgExtra: 3000, label: "Santander (Barbosa, Bucaramanga y área)" },
    bogota_cundinamarca: { base: 12500, kgExtra: 3500, label: "Bogotá D.C. / Cundinamarca" },
    antioquia: { base: 15500, kgExtra: 4500, label: "Antioquia (Medellín y municipios)" },
    valle: { base: 15500, kgExtra: 4500, label: "Valle del Cauca (Cali y municipios)" },
    atlantico: { base: 16500, kgExtra: 4800, label: "Atlántico (Barranquilla)" },
    bolivar: { base: 16500, kgExtra: 4800, label: "Bolívar (Cartagena)" },
    eje_cafetero: { base: 15500, kgExtra: 4500, label: "Eje Cafetero (Caldas / Risaralda / Quindío)" },
    tolima_huila: { base: 14500, kgExtra: 4000, label: "Tolima / Huila (Ibagué, Neiva)" },
    meta: { base: 15500, kgExtra: 4500, label: "Meta (Villavicencio)" },
    nacional: { base: 16500, kgExtra: 4800, label: "Nacional General" },
    especial: { base: 24000, kgExtra: 6500, label: "Destino Especial / Trayecto Reexpedido" }
};

let currentEstimatedShipping = 12500;
let currentWeightKg = "1.00";

function calculateEnviaShipping() {
    const deptSelect = document.getElementById('shippingDeptSelect');
    const deptKey = deptSelect ? deptSelect.value : 'bogota_cundinamarca';
    const rateInfo = ENVIA_TARIFAS[deptKey] || ENVIA_TARIFAS.bogota_cundinamarca;

    let totalWeightGrams = 0;
    for (const item in cart) {
        totalWeightGrams += cart[item].qty * (cart[item].weight || 500);
    }
    if (totalWeightGrams === 0) totalWeightGrams = 1000;

    const weightInKg = Math.max(0.1, totalWeightGrams / 1000);
    currentWeightKg = weightInKg.toFixed(2);
    const billableKg = Math.max(1, Math.ceil(weightInKg));

    // Cálculo: Base primer kilo + (Kilos extra * tarifa adicional)
    const shippingCost = rateInfo.base + ((billableKg - 1) * rateInfo.kgExtra);
    currentEstimatedShipping = shippingCost;

    const formattedShipping = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(shippingCost);

    const displayEl = document.getElementById('enviaRateDisplay');
    const refEl = document.getElementById('enviaWeightRef');
    if (displayEl) displayEl.textContent = `~${formattedShipping} aprox.`;
    if (refEl) refEl.textContent = currentWeightKg;
}

// 4. Abrir y Cerrar Modal de Checkout
function openCheckoutModal() {
    const overlay = document.getElementById('checkoutModalOverlay');
    const listEl = document.getElementById('checkoutItemsList');
    const subtotalEl = document.getElementById('checkoutSubtotalDisplay');
    const weightEl = document.getElementById('checkoutWeightDisplay');
    const payAmountEl = document.getElementById('checkoutPayAmount');
    const brebAmountEl = document.getElementById('brebAmountDisplay');
    const mpAmountEl = document.getElementById('mpAmountDisplay');

    if (!overlay || !listEl) return;

    let totalItems = 0;
    let totalPrice = 0;
    let totalWeightGrams = 0;
    listEl.innerHTML = '';

    for (const item in cart) {
        const p = cart[item];
        totalItems += p.qty;
        const sub = p.qty * p.price;
        totalPrice += sub;
        const itemTotalWeight = p.qty * (p.weight || 500);
        totalWeightGrams += itemTotalWeight;

        const formattedSub = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(sub);
        const weightInKg = (itemTotalWeight / 1000).toFixed(2);

        const li = document.createElement('li');
        li.className = 'order-item-row';
        li.innerHTML = `
            <div class="order-item-title">
                ${p.qty}x ${item}
                <div class="order-item-meta">Peso: ~${weightInKg} kg</div>
            </div>
            <span class="order-item-price">${formattedSub}</span>
        `;
        listEl.appendChild(li);
    }

    if (totalItems === 0) {
        alert("Por favor selecciona al menos un producto para cotizar tu envío.");
        return;
    }

    const formattedTotal = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalPrice);
    const totalKg = (totalWeightGrams / 1000).toFixed(2);

    if (subtotalEl) subtotalEl.textContent = formattedTotal;
    if (weightEl) weightEl.textContent = `${totalKg} kg`;
    if (payAmountEl) payAmountEl.textContent = formattedTotal;
    if (brebAmountEl) brebAmountEl.textContent = formattedTotal;
    if (mpAmountEl) mpAmountEl.textContent = formattedTotal;

    calculateEnviaShipping();

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal(event) {
    const overlay = document.getElementById('checkoutModalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// 5. Pestañas de Pago: Bre-B vs Mercado Pago
function switchPayTab(tabKey) {
    const tabButtons = document.querySelectorAll('.pay-tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    const brebContent = document.getElementById('tabContentBreb');
    const mpContent = document.getElementById('tabContentMercadoPago');
    
    if (brebContent) brebContent.classList.remove('active');
    if (mpContent) mpContent.classList.remove('active');

    if (tabKey === 'breb') {
        if (tabButtons[0]) tabButtons[0].classList.add('active');
        if (brebContent) brebContent.classList.add('active');
    } else {
        if (tabButtons[1]) tabButtons[1].classList.add('active');
        if (mpContent) mpContent.classList.add('active');
    }
}

// 6. Copiar Llave Bre-B
function copyBrebKey() {
    const keyEl = document.getElementById('brebKeyText');
    const keyText = keyEl ? keyEl.textContent.trim() : '3150777443';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(keyText).then(() => {
            showCopyFeedback();
        }).catch(() => {
            prompt("Copia la Llave Bre-B:", keyText);
        });
    } else {
        prompt("Copia la Llave Bre-B:", keyText);
    }
}

function showCopyFeedback() {
    const btn = document.getElementById('btnCopyBreb');
    if (!btn) return;
    const oldText = btn.textContent;
    btn.textContent = "✅ ¡Copiada!";
    btn.style.background = "#2e7d32";
    btn.style.color = "#fff";
    setTimeout(() => {
        btn.textContent = oldText;
        btn.style.background = "";
        btn.style.color = "";
    }, 2500);
}

// 7. Confirmación de Pago Bre-B por WhatsApp
function confirmBrebOrder() {
    const cityInput = document.getElementById('shippingCityInput');
    const cityName = (cityInput && cityInput.value.trim()) ? cityInput.value.trim() : 'Ciudad por confirmar';
    const deptSelect = document.getElementById('shippingDeptSelect');
    const deptLabel = deptSelect ? deptSelect.options[deptSelect.selectedIndex].text : 'Colombia';

    let totalPrice = 0;
    let totalItems = 0;
    let message = "Hola Julie 💖! Acabo de hacer mi pago por *Bre-B* para mi pedido de Cuidado Capilar:\n\n";
    message += "🛍️ *PRODUCTOS PAGADOS:*\n";

    for (const item in cart) {
        const p = cart[item];
        const sub = p.qty * p.price;
        totalPrice += sub;
        totalItems += p.qty;
        const formattedSub = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(sub);
        message += `• ${p.qty}x ${item} (${formattedSub})\n`;
    }

    const formattedTotal = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalPrice);
    const formattedShipping = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(currentEstimatedShipping);

    message += `\n💰 *TOTAL TRANSFERIDO POR BRE-B:* ${formattedTotal} COP ✅\n`;
    message += `----------------------------------------\n`;
    message += `📍 *DATOS PARA DESPACHO CON ENVÍA:*\n`;
    message += `• Origen: Bodega Moniquirá (Boyacá)\n`;
    message += `• Destino: ${cityName} (${deptLabel})\n`;
    message += `• Peso neto estimado: ~${currentWeightKg} kg (Densidad 1.1 g/ml)\n`;
    message += `• Flete estimado Envía (Contraentrega aprox.): ~${formattedShipping} COP\n`;
    message += `  _(Se cancela directamente al mensajero de Envía al recibir)_\n\n`;
    message += `Adjunto mi comprobante de transferencia Bre-B y datos de entrega completos para generar la guía 😊`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/573043588180?text=${encoded}`;
    
    if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion(waUrl, totalPrice, 'COP');
    }
    window.open(waUrl, '_blank');
}

// 8. Procesar Pago con Mercado Pago
function proceedMercadoPagoCheckout() {
    const cartKeys = Object.keys(cart);
    const cityInput = document.getElementById('shippingCityInput');
    const cityName = (cityInput && cityInput.value.trim()) ? cityInput.value.trim() : 'Ciudad por confirmar';
    const deptSelect = document.getElementById('shippingDeptSelect');
    const deptLabel = deptSelect ? deptSelect.options[deptSelect.selectedIndex].text : 'Colombia';

    let totalPrice = 0;
    for (const item in cart) {
        totalPrice += cart[item].qty * cart[item].price;
    }

    // Si es un producto único y 1 unidad, podemos usar su link de Mercado Pago directo
    if (cartKeys.length === 1 && cart[cartKeys[0]].qty === 1 && cart[cartKeys[0]].payLink) {
        window.open(cart[cartKeys[0]].payLink, '_blank');
        return;
    }

    // Para múltiples productos o unidades: coordinar link unificado de Mercado Pago vía WhatsApp
    let message = "Hola Julie 💖! Deseo pagar con *Mercado Pago / Tarjetas de Crédito* mi pedido de Cuidado Capilar:\n\n";
    message += "🛍️ *PRODUCTOS:*\n";

    for (const item in cart) {
        const p = cart[item];
        const sub = p.qty * p.price;
        const formattedSub = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(sub);
        message += `• ${p.qty}x ${item} (${formattedSub})\n`;
    }

    const formattedTotal = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalPrice);
    const formattedShipping = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(currentEstimatedShipping);

    message += `\n💰 *TOTAL PRODUCTOS:* ${formattedTotal} COP\n`;
    message += `📍 *DATOS PARA DESPACHO CON ENVÍA:*\n`;
    message += `• Origen: Bodega Moniquirá (Boyacá)\n`;
    message += `• Destino: ${cityName} (${deptLabel})\n`;
    message += `📦 *Peso estimado:* ~${currentWeightKg} kg\n`;
    message += `🚚 *Flete estimado contraentrega Envía:* ~${formattedShipping} COP aprox.\n\n`;
    message += `Por favor envíenme el link de Mercado Pago por este valor para procesar mi pago seguro ✨`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/573043588180?text=${encoded}`;

    if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion(waUrl, totalPrice, 'COP');
    }
    window.open(waUrl, '_blank');
}
