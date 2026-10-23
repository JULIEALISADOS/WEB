/**
 * Tarifas de Envía Colvanes desde Moniquirá (Boyacá) - consultadas en el simulador oficial envia.co/quotation el 23-oct-2026.
 * Peso del producto: 1 g por cada ml (orden del Director). Se cobra por kilo completo (se redondea hacia arriba).
 * La tarifa depende de la zona del departamento (se consultó la capital de cada uno) y se le suma 1 % del valor declarado
 * (comprobado con cotizaciones de 20.000, 100.000 y 300.000 pesos).
 * El flete es aproximado: lo liquida Envía en su báscula y se paga contraentrega al mensajero. El remitente es siempre Moniquirá.
 */
window.JulieEnvio = (function () {
    // Tarifa sin valor declarado, kilo 1 a 8 (COP). Después del kilo 8 se suma KILO_EXTRA por cada kilo.
    var TARIFA = {
        z1:  [11600, 15500, 19900, 21900, 25200, 28900, 31900, 34900],
        z2:  [17900, 21800, 25900, 29300, 32900, 35900, 38900, 41900],
        z3:  [38100, 41800, 45500, 49200, 52900, 56600, 60300, 64000],
        amz: [37900, 42200, 46600, 50900, 55300, 59700, 64000, 68400],
        z4:  [53300, 57000, 60700, 64400, 68100, 71800, 75500, 79200],
        z5:  [54900, 59300, 63600, 68000, 72300, 76700, 81000, 85400]
    };
    var KILO_EXTRA = { z1: 3000, z2: 3000, z3: 3700, amz: 4350, z4: 3700, z5: 4350 };

    // Destinos: [clave, nombre que ve la clienta, zona]
    var DESTINOS = [
        ['amazonas', 'Amazonas (Leticia)', 'amz'],
        ['antioquia', 'Antioquia (Medellín)', 'z2'],
        ['arauca', 'Arauca', 'z3'],
        ['atlantico', 'Atlántico (Barranquilla)', 'z2'],
        ['bogota', 'Bogotá D.C.', 'z1'],
        ['bolivar', 'Bolívar (Cartagena)', 'z2'],
        ['boyaca', 'Boyacá (Moniquirá, Tunja, Duitama, Sogamoso)', 'z1'],
        ['caldas', 'Caldas (Manizales)', 'z2'],
        ['caqueta', 'Caquetá (Florencia)', 'z2'],
        ['casanare', 'Casanare (Yopal)', 'z1'],
        ['cauca', 'Cauca (Popayán)', 'z2'],
        ['cesar', 'Cesar (Valledupar)', 'z2'],
        ['choco', 'Chocó (Quibdó)', 'z3'],
        ['cordoba', 'Córdoba (Montería)', 'z2'],
        ['cundinamarca', 'Cundinamarca (Soacha, Girardot y municipios)', 'z1'],
        ['guainia', 'Guainía (Inírida)', 'z1'],
        ['guaviare', 'Guaviare (San José del Guaviare)', 'z3'],
        ['huila', 'Huila (Neiva)', 'z2'],
        ['la_guajira', 'La Guajira (Riohacha)', 'z2'],
        ['magdalena', 'Magdalena (Santa Marta)', 'z2'],
        ['meta', 'Meta (Villavicencio)', 'z1'],
        ['narino', 'Nariño (Pasto)', 'z2'],
        ['norte_santander', 'Norte de Santander (Cúcuta)', 'z1'],
        ['putumayo', 'Putumayo (Mocoa)', 'z3'],
        ['quindio', 'Quindío (Armenia)', 'z2'],
        ['risaralda', 'Risaralda (Pereira)', 'z2'],
        ['san_andres', 'San Andrés y Providencia', 'z4'],
        ['santander', 'Santander (Bucaramanga)', 'z1'],
        ['sucre', 'Sucre (Sincelejo)', 'z2'],
        ['tolima', 'Tolima (Ibagué)', 'z2'],
        ['valle', 'Valle del Cauca (Cali)', 'z2'],
        ['vaupes', 'Vaupés (Mitú)', 'z5'],
        ['vichada', 'Vichada (Puerto Carreño)', 'z5']
    ];
    var ZONA_DE = {};
    DESTINOS.forEach(function (d) { ZONA_DE[d[0]] = d[2]; });

    var URL_SIMULADOR = 'https://envia.co/quotation?origin=' + encodeURIComponent('Moniquirá (Boyacá)');

    function fleteAprox(destino, gramos, valorDeclarado) {
        var zona = ZONA_DE[destino] || 'z2';
        var tabla = TARIFA[zona];
        var kilos = Math.max(1, Math.ceil((gramos || 0) / 1000));
        var base = kilos <= tabla.length ? tabla[kilos - 1] : tabla[tabla.length - 1] + (kilos - tabla.length) * KILO_EXTRA[zona];
        var total = base + 0.01 * (valorDeclarado || 0);
        return Math.round(total / 100) * 100;
    }

    // Llena un <select> con todos los destinos
    function llenarSelect(select, placeholder, valorInicial) {
        if (!select) return;
        var html = placeholder ? '<option value="">' + placeholder + '</option>' : '';
        DESTINOS.forEach(function (d) { html += '<option value="' + d[0] + '">' + d[1] + '</option>'; });
        select.innerHTML = html;
        if (valorInicial) select.value = valorInicial;
    }

    // Texto con el enlace al simulador de Envía (el remitente siempre es Moniquirá)
    var ENLACE_SIMULADOR = '<a href="' + URL_SIMULADOR + '" target="_blank" rel="noopener noreferrer" style="color:#7A5B0B;text-decoration:underline;">simulador de Env&iacute;a</a>';

    return { fleteAprox: fleteAprox, llenarSelect: llenarSelect, destinos: DESTINOS, urlSimulador: URL_SIMULADOR, enlaceSimulador: ENLACE_SIMULADOR };
})();
