/**
 * Julie Alisados - Motor de Finanzas, Rentabilidad & POS Inteligente
 * Cálculo de márgenes reales, insumos, comisiones del 30% / tarifas fijas por procedimiento,
 * prorrateo de gastos fijos por períodos/fechas y liquidación de estilistas para Tunja & Moniquirá.
 */

export const JulieFinanceEngine = (() => {
    // 1. Catálogo Oficial de Procedimientos Capilares (Tarifario Oficial Agosto 2026)
    const PROCEDURES = {
        // --- 1. ALISADOS Y RETOQUES ---
        'alisado_estandar': {
            id: 'alisado_estandar',
            name: 'Alisado Estándar / Saludable',
            category: 'Alisados y Retoques',
            price: 250000,
            suppliesCost: 30000,
            commissionAmount: 60000, // Completo oficial ($60.000)
            commissionHalf: 30000,   // Medio oficial ($30.000)
            netMargin: 160000
        },
        'alisado_afro': {
            id: 'alisado_afro',
            name: 'Alisado Afro (Tipo 4)',
            category: 'Alisados y Retoques',
            price: 280000,
            suppliesCost: 35000,
            commissionAmount: 70000, // Completo oficial ($70.000)
            commissionHalf: 35000,   // Medio oficial ($35.000)
            netMargin: 175000
        },
        'retoque_raiz': {
            id: 'retoque_raiz',
            name: 'Retoque de Raíz',
            category: 'Alisados y Retoques',
            price: 190000,
            suppliesCost: 25000,
            commissionAmount: 45000, // Completo oficial ($45.000)
            commissionHalf: 22500,   // Medio oficial ($22.500)
            netMargin: 120000
        },

        // --- 2. TERAPIAS PREMIUM ---
        'emulsion_zero': {
            id: 'emulsion_zero',
            name: 'Emulsión / Emulsión Zero',
            category: 'Terapias Premium',
            price: 170000,
            suppliesCost: 25000,
            commissionAmount: 35000, // Completo oficial ($35.000)
            commissionHalf: 17500,   // Medio oficial ($17.500)
            netMargin: 110000
        },
        'reposicion_aminoacidos': {
            id: 'reposicion_aminoacidos',
            name: 'Reposición de Aminoácidos',
            category: 'Terapias Premium',
            price: 150000,
            suppliesCost: 20000,
            commissionAmount: 35000, // Completo oficial ($35.000)
            commissionHalf: 17500,   // Medio oficial ($17.500)
            netMargin: 95000
        },
        'rcp': {
            id: 'rcp',
            name: 'R.C.P. Restauración',
            category: 'Terapias Premium',
            price: 180000,
            suppliesCost: 25000,
            commissionAmount: 35000, // Completo oficial ($35.000)
            commissionHalf: 17500,   // Medio oficial ($17.500)
            netMargin: 120000
        },
        'recode': {
            id: 'recode',
            name: 'Recode Reconstructivo',
            category: 'Terapias Premium',
            price: 160000,
            suppliesCost: 20000,
            commissionAmount: 35000, // Completo oficial ($35.000)
            commissionHalf: 17500,   // Medio oficial ($17.500)
            netMargin: 105000
        },

        // --- 3. CORTES Y OTROS ---
        'corte_estandar': {
            id: 'corte_estandar',
            name: 'Corte de Cabello Estándar',
            category: 'Cortes y Otros',
            price: 25000,
            suppliesCost: 2000,
            commissionAmount: 7500, // Oficial ($7.500)
            commissionHalf: 3750,
            netMargin: 15500
        },
        'corte_triming': {
            id: 'corte_triming',
            name: 'Corte Triming / Horquilla',
            category: 'Cortes y Otros',
            price: 30000,
            suppliesCost: 2000,
            commissionAmount: 10000, // Oficial ($10.000)
            commissionHalf: 5000,
            netMargin: 18000
        },
        'lavado_cabello': {
            id: 'lavado_cabello',
            name: 'Lavado de Cabello (Individual)',
            category: 'Cortes y Otros',
            price: 20000,
            suppliesCost: 3000,
            commissionAmount: 10000, // Oficial ($10.000)
            commissionHalf: 5000,
            netMargin: 7000
        },

        // --- 4. TERAPIAS ESTÁNDAR ---
        'terapia_triming': {
            id: 'terapia_triming',
            name: 'Terapia Triming (Solo tto.)',
            category: 'Terapias Estándar',
            price: 60000,
            suppliesCost: 15000,
            commissionAmount: 25000, // Completo oficial ($25.000)
            commissionHalf: 12500,   // Medio oficial ($12.500)
            netMargin: 20000
        },
        'proteina_gold': {
            id: 'proteina_gold',
            name: 'Proteína / Proteína Gold',
            category: 'Terapias Estándar',
            price: 70000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 30000
        },
        'hidracomplex': {
            id: 'hidracomplex',
            name: 'Hidracomplex / Hidrocomplex',
            category: 'Terapias Estándar',
            price: 70000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 30000
        },
        'chocofix': {
            id: 'chocofix',
            name: 'Chocofix',
            category: 'Terapias Estándar',
            price: 65000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 25000
        },
        'detox': {
            id: 'detox',
            name: 'Detox Capilar',
            category: 'Terapias Estándar',
            price: 65000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 25000
        },
        'relleno_molecular': {
            id: 'relleno_molecular',
            name: 'Relleno / Relleno Molecular',
            category: 'Terapias Estándar',
            price: 75000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 35000
        },
        'biocomplex': {
            id: 'biocomplex',
            name: 'Biocomplex',
            category: 'Terapias Estándar',
            price: 75000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 35000
        },
        'plan_amigas': {
            id: 'plan_amigas',
            name: 'Plan Amigas',
            category: 'Terapias Estándar',
            price: 70000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 30000
        },
        'hidratacion': {
            id: 'hidratacion',
            name: 'Hidratación Profunda',
            category: 'Terapias Estándar',
            price: 60000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 20000
        },
        'ritual_anticaida': {
            id: 'ritual_anticaida',
            name: 'Ritual Anticaída',
            category: 'Terapias Estándar',
            price: 80000,
            suppliesCost: 18000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 37000
        },
        'balaca': {
            id: 'balaca',
            name: 'Balaca',
            category: 'Terapias Estándar',
            price: 90000,
            suppliesCost: 15000,
            commissionAmount: 25000,
            commissionHalf: 12500,
            netMargin: 50000
        }
    };

    // 2. Catálogo Oficial de Productos JA By Julie Valencia (Precios Reales Web & Tienda)
    const PRODUCTS = {
        'combo_extractos_1000': {
            id: 'combo_extractos_1000',
            name: 'Combo Extractos Naturales (1000 ml c/u)',
            category: 'Combos y Kits',
            price: 74000,
            cost: 35000,
            margin: 39000,
            commissionRate: 0.10
        },
        'combo_argan_500': {
            id: 'combo_argan_500',
            name: 'Combo Aceite de Argán (500 ml c/u)',
            category: 'Combos y Kits',
            price: 70000,
            cost: 32000,
            margin: 38000,
            commissionRate: 0.10
        },
        'kit_extractos_completo': {
            id: 'kit_extractos_completo',
            name: 'Kit Completo Extractos Naturales (6 productos)',
            category: 'Combos y Kits',
            price: 208000,
            cost: 95000,
            margin: 113000,
            commissionRate: 0.10
        },
        'kit_argan_completo': {
            id: 'kit_argan_completo',
            name: 'Kit Completo Argán (6 productos)',
            category: 'Combos y Kits',
            price: 204000,
            cost: 90000,
            margin: 114000,
            commissionRate: 0.10
        },
        'shampoo_extractos_1000': {
            id: 'shampoo_extractos_1000',
            name: 'Shampoo Extractos Naturales (1000 ml)',
            category: 'Cuidado Individual',
            price: 38000,
            cost: 18000,
            margin: 20000,
            commissionRate: 0.10
        },
        'acondicionador_extractos_1000': {
            id: 'acondicionador_extractos_1000',
            name: 'Acondicionador Extractos Naturales (1000 ml)',
            category: 'Cuidado Individual',
            price: 39000,
            cost: 19000,
            margin: 20000,
            commissionRate: 0.10
        },
        'shampoo_argan_500': {
            id: 'shampoo_argan_500',
            name: 'Shampoo Aceite de Argán (500 ml)',
            category: 'Cuidado Individual',
            price: 36000,
            cost: 17000,
            margin: 19000,
            commissionRate: 0.10
        },
        'acondicionador_argan_500': {
            id: 'acondicionador_argan_500',
            name: 'Acondicionador Aceite de Argán (500 ml)',
            category: 'Cuidado Individual',
            price: 37000,
            cost: 17000,
            margin: 20000,
            commissionRate: 0.10
        },
        'mascarilla_oro_liquido_250': {
            id: 'mascarilla_oro_liquido_250',
            name: 'Mascarilla Capilar Oro Líquido (250 ml)',
            category: 'Tratamientos',
            price: 35000,
            cost: 16000,
            margin: 19000,
            commissionRate: 0.10
        },
        'tratamiento_multiactivo_300': {
            id: 'tratamiento_multiactivo_300',
            name: 'Tratamiento Multiactivo 12-en-1 (300 ml)',
            category: 'Tratamientos',
            price: 36000,
            cost: 17000,
            margin: 19000,
            commissionRate: 0.10
        },
        'termoprotector_perfume_250': {
            id: 'termoprotector_perfume_250',
            name: 'Termoprotector y Perfume Capilar (250 ml)',
            category: 'Finalizadores',
            price: 35000,
            cost: 16000,
            margin: 19000,
            commissionRate: 0.10
        },
        'aceite_reparador_60': {
            id: 'aceite_reparador_60',
            name: 'Aceite Reparador de Argán y Macadamia (60 ml)',
            category: 'Finalizadores',
            price: 28000,
            cost: 12000,
            margin: 16000,
            commissionRate: 0.10
        },
        'ampolla_sos_20': {
            id: 'ampolla_sos_20',
            name: 'Ampolla de Reparación S.O.S. (20 ml)',
            category: 'Finalizadores',
            price: 16000,
            cost: 7000,
            margin: 9000,
            commissionRate: 0.10
        }
    };

    // Claves de Almacenamiento Local
    const KEYS = {
        fixedExpenses: 'julie_finance_fixed_expenses_v2',
        customExpenses: 'julie_finance_custom_expenses_v2',
        transactions: 'julie_finance_pos_tx_v2',
        liquidations: 'julie_finance_liquidations_v2'
    };

    // 3. Gastos Fijos por Defecto (Mensuales)
    const DEFAULT_FIXED_EXPENSES = {
        arriendoTunja: 1500000,
        arriendoMoniquira: 1100000,
        serviciosTunja: 350000,
        serviciosMoniquira: 250000,
        publicidadAds: 500000,
        otrosGastosFijos: 200000
    };

    const getFixedExpenses = () => {
        try {
            const stored = localStorage.getItem(KEYS.fixedExpenses);
            if (stored) return { ...DEFAULT_FIXED_EXPENSES, ...JSON.parse(stored) };
        } catch (e) {}
        return { ...DEFAULT_FIXED_EXPENSES };
    };

    const saveFixedExpenses = (expenses) => {
        localStorage.setItem(KEYS.fixedExpenses, JSON.stringify(expenses));
    };

    // 4. Registro de Egresos Variables / Manuales del Salón
    const getCustomExpenses = () => {
        try {
            return JSON.parse(localStorage.getItem(KEYS.customExpenses)) || [];
        } catch (e) {
            return [];
        }
    };

    const addCustomExpense = (expense) => {
        const list = getCustomExpenses();
        const newExp = {
            id: 'EXP-' + Date.now(),
            date: expense.date || new Date().toISOString().split('T')[0],
            category: expense.category || 'Varios',
            description: expense.description || 'Gasto operativo',
            amount: Number(expense.amount || 0),
            sede: expense.sede || 'Tunja',
            responsible: expense.responsible || 'Julie Valencia',
            timestamp: new Date().toISOString()
        };
        list.unshift(newExp);
        localStorage.setItem(KEYS.customExpenses, JSON.stringify(list));
        return newExp;
    };

    const deleteCustomExpense = (id) => {
        const list = getCustomExpenses().filter(e => e.id !== id);
        localStorage.setItem(KEYS.customExpenses, JSON.stringify(list));
        return list;
    };

    // 5. Transacciones POS de Cobro
    const getPOSTransactions = () => {
        try {
            return JSON.parse(localStorage.getItem(KEYS.transactions)) || [];
        } catch (e) {
            return [];
        }
    };

    const recordPOSTransaction = (tx) => {
        const list = getPOSTransactions();
        const newTx = {
            id: tx.id || 'TX-' + Date.now(),
            invoiceNumber: tx.invoiceNumber || 'POS-' + Math.floor(1000 + Math.random() * 9000),
            date: tx.date || new Date().toISOString().split('T')[0],
            clientName: tx.clientName || 'Cliente de Mostrador',
            clientDoc: tx.clientDoc || '---',
            clientPhone: tx.clientPhone || '---',
            sede: tx.sede || 'Tunja',
            stylist: tx.stylist || 'Julie Valencia',
            items: tx.items || [],
            totalAmount: Number(tx.totalAmount || 0),
            suppliesCost: Number(tx.suppliesCost || 0),
            stylistCommission: Number(tx.stylistCommission || 0),
            netProfit: Number(tx.netProfit || 0),
            paymentMethod: tx.paymentMethod || 'Efectivo',
            alegraStatus: tx.alegraStatus || 'Sincronizado',
            liquidated: false,
            timestamp: new Date().toISOString()
        };
        list.unshift(newTx);
        localStorage.setItem(KEYS.transactions, JSON.stringify(list));
        return newTx;
    };

    // 6. Liquidación de Estilistas
    const getLiquidations = () => {
        try {
            return JSON.parse(localStorage.getItem(KEYS.liquidations)) || [];
        } catch (e) {
            return [];
        }
    };

    const liquidateStylist = (stylistName, sede = 'Todas', periodInfo = null) => {
        const txs = getPOSTransactions();
        let totalCommissions = 0;
        let countServices = 0;

        txs.forEach(t => {
            if (t.stylist === stylistName && !t.liquidated) {
                if (sede === 'Todas' || (t.sede || '').toLowerCase().includes(sede.toLowerCase())) {
                    t.liquidated = true;
                    totalCommissions += (t.stylistCommission || 0);
                    countServices++;
                }
            }
        });

        localStorage.setItem(KEYS.transactions, JSON.stringify(txs));

        const liquidations = getLiquidations();
        const record = {
            id: 'LIQ-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            stylist: stylistName,
            sede: sede,
            servicesCount: countServices,
            amountPaid: totalCommissions,
            period: periodInfo || 'Liquidación corriente',
            timestamp: new Date().toISOString()
        };
        liquidations.unshift(record);
        localStorage.setItem(KEYS.liquidations, JSON.stringify(liquidations));
        return record;
    };

    // Helper para formatear fechas a YYYY-MM-DD
    const normalizeDateStr = (val) => {
        if (!val) return null;
        if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val)) {
            return val.substring(0, 10);
        }
        try {
            const d = new Date(val);
            if (!isNaN(d.getTime())) {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${y}-${m}-${day}`;
            }
        } catch (e) {}
        return null;
    };

    // Helper de mapeo de nombres de procedimientos a claves
    const findProcedureKey = (procName) => {
        if (!procName) return 'alisado_estandar';
        const str = procName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (str.includes('afro') || str.includes('tipo 4')) return 'alisado_afro';
        if (str.includes('raiz') || str.includes('retoque')) return 'retoque_raiz';
        if (str.includes('emulsion') || str.includes('zero')) return 'emulsion_zero';
        if (str.includes('amino') || str.includes('reposicion')) return 'reposicion_aminoacidos';
        if (str.includes('rcp') || str.includes('restauracion')) return 'rcp';
        if (str.includes('recode') || str.includes('re-code')) return 'recode';
        if (str.includes('triming') && str.includes('terapia')) return 'terapia_triming';
        if (str.includes('triming') || str.includes('horquilla')) return 'corte_triming';
        if (str.includes('lavado')) return 'lavado_cabello';
        if (str.includes('corte')) return 'corte_estandar';
        if (str.includes('proteina')) return 'proteina_gold';
        if (str.includes('hidra') || str.includes('hidro')) return 'hidracomplex';
        if (str.includes('choco')) return 'chocofix';
        if (str.includes('detox')) return 'detox';
        if (str.includes('relleno')) return 'relleno_molecular';
        if (str.includes('biocomplex') || str.includes('bio')) return 'biocomplex';
        if (str.includes('amiga')) return 'plan_amigas';
        if (str.includes('anticaida')) return 'ritual_anticaida';
        if (str.includes('balaca')) return 'balaca';
        if (str.includes('hidratacion')) return 'hidratacion';
        if (str.includes('alisado') || str.includes('organico') || str.includes('saludable') || str.includes('light')) return 'alisado_estandar';
        return 'alisado_estandar';
    };

    // 7. Cálculo Global de Finanzas & Métricas con Filtro por Fechas, Períodos y Sedes
    const calculateFinancials = (dbClients = [], startDate = null, endDate = null, selectedSede = 'Todas') => {
        const fixed = getFixedExpenses();
        const customExpenses = getCustomExpenses();
        const posTransactions = getPOSTransactions();

        const start = normalizeDateStr(startDate);
        const end = normalizeDateStr(endDate);

        // Helper de filtro de fecha
        const inDateRange = (dateVal) => {
            const dStr = normalizeDateStr(dateVal);
            if (!dStr) return true; // Si no tiene fecha, incluir por defecto
            if (start && dStr < start) return false;
            if (end && dStr > end) return false;
            return true;
        };

        // Helper de filtro de sede
        const inSedeRange = (sedeVal) => {
            if (!selectedSede || selectedSede === 'Todas') return true;
            const sLower = (sedeVal || '').toLowerCase();
            const targetLower = selectedSede.toLowerCase();
            if (targetLower.includes('moniquira')) return sLower.includes('moniquira');
            if (targetLower.includes('tunja')) return !sLower.includes('moniquira');
            return true;
        };

        // 1. Prorrateo de Gastos Fijos según el rango de días
        let prorationFactor = 1.0;
        let daysInPeriod = 30;

        if (start && end) {
            try {
                const d1 = new Date(start + 'T00:00:00');
                const d2 = new Date(end + 'T00:00:00');
                const diffMs = d2 - d1;
                if (!isNaN(diffMs)) {
                    daysInPeriod = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
                    // Si el período es de 28 a 31 días, se considera 1 mes completo (100%)
                    if (daysInPeriod >= 28 && daysInPeriod <= 31) {
                        prorationFactor = 1.0;
                    } else {
                        prorationFactor = daysInPeriod / 30; // ej: 15 días = 0.5 (50%), 1 día = 0.0333
                    }
                }
            } catch (e) {
                prorationFactor = 1.0;
            }
        }

        const totalFixedTunja = ((Number(fixed.arriendoTunja || 0) + Number(fixed.serviciosTunja || 0))) * prorationFactor;
        const totalFixedMoniquira = ((Number(fixed.arriendoMoniquira || 0) + Number(fixed.serviciosMoniquira || 0))) * prorationFactor;
        const totalFixedAdsOther = ((Number(fixed.publicidadAds || 0) + Number(fixed.otrosGastosFijos || 0))) * prorationFactor;
        
        let totalFixedExpenses = totalFixedTunja + totalFixedMoniquira + totalFixedAdsOther;
        if (selectedSede === 'Tunja') {
            totalFixedExpenses = totalFixedTunja + (totalFixedAdsOther / 2);
        } else if (selectedSede === 'Moniquira' || selectedSede === 'Moniquirá') {
            totalFixedExpenses = totalFixedMoniquira + (totalFixedAdsOther / 2);
        }

        // 2. Gastos Variables / Egresos Registrados (Filtrados por fecha y sede)
        let customExpTunja = 0, customExpMoniquira = 0;
        customExpenses.forEach(exp => {
            const expDate = exp.date || exp.timestamp;
            if (!inDateRange(expDate)) return;
            if (!inSedeRange(exp.sede)) return;

            if ((exp.sede || '').toLowerCase().includes('moniquira')) {
                customExpMoniquira += Number(exp.amount || 0);
            } else {
                customExpTunja += Number(exp.amount || 0);
            }
        });
        const totalCustomExpenses = customExpTunja + customExpMoniquira;
        const totalOperatingExpenses = totalFixedExpenses + totalCustomExpenses;

        // 3. Ingresos, Insumos y Comisiones (Combinando base de datos y transacciones POS)
        let grossRevenue = 0;
        let totalSupplies = 0;
        let totalCommissions = 0;

        let tunjaGross = 0, tunjaSupplies = 0, tunjaCommissions = 0;
        let moniquiraGross = 0, moniquiraSupplies = 0, moniquiraCommissions = 0;

        const stylistSummary = {};

        // A. Procesar folios de la base de datos Supabase
        dbClients.forEach(c => {
            const clientDate = c.created_at || c.fecha_diligenciamiento || c.fecha || c.timestamp;
            if (!inDateRange(clientDate)) return;
            if (!inSedeRange(c.sede)) return;

            const pKey = findProcedureKey(c.procedimiento);
            const proc = PROCEDURES[pKey] || PROCEDURES.alisado_estandar;
            const price = Number(c.precio_cobrado || proc.price);
            const supply = proc.suppliesCost;
            const commission = proc.commissionAmount || (price * 0.30);
            const isMoniquira = (c.sede || '').toLowerCase().includes('moniquira');
            const stylistName = c.estilista_responsable || 'Julie Valencia';
            const dateFormatted = normalizeDateStr(clientDate) || new Date().toISOString().split('T')[0];

            grossRevenue += price;
            totalSupplies += supply;
            totalCommissions += commission;

            if (isMoniquira) {
                moniquiraGross += price;
                moniquiraSupplies += supply;
                moniquiraCommissions += commission;
            } else {
                tunjaGross += price;
                tunjaSupplies += supply;
                tunjaCommissions += commission;
            }

            if (!stylistSummary[stylistName]) {
                stylistSummary[stylistName] = {
                    name: stylistName,
                    services: 0,
                    totalSales: 0,
                    commissionEarned: 0,
                    pendingCommission: 0,
                    servicesList: []
                };
            }
            stylistSummary[stylistName].services++;
            stylistSummary[stylistName].totalSales += price;
            stylistSummary[stylistName].commissionEarned += commission;
            stylistSummary[stylistName].pendingCommission += commission;

            stylistSummary[stylistName].servicesList.push({
                id: c.consecutivo || c.id || ('FOL-' + Math.floor(Math.random() * 10000)),
                date: dateFormatted,
                clientName: c.nombre_completo || 'Cliente Julie Alisados',
                clientDoc: c.numero_documento || '---',
                clientPhone: c.telefono || '',
                procedureName: proc.name,
                price: price,
                suppliesCost: supply,
                commission: commission,
                sede: isMoniquira ? 'Moniquirá' : 'Tunja',
                isPOS: false
            });
        });

        // B. Procesar ventas desde POS local
        posTransactions.forEach(tx => {
            const txDate = tx.date || tx.timestamp;
            if (!inDateRange(txDate)) return;
            if (!inSedeRange(tx.sede)) return;

            const txAmount = Number(tx.totalAmount || 0);
            const txSupplies = Number(tx.suppliesCost || 0);
            const txComm = Number(tx.stylistCommission || 0);
            const isMoniquira = (tx.sede || '').toLowerCase().includes('moniquira');
            const stylistName = tx.stylist || 'Julie Valencia';
            const dateFormatted = normalizeDateStr(txDate) || new Date().toISOString().split('T')[0];

            grossRevenue += txAmount;
            totalSupplies += txSupplies;
            totalCommissions += txComm;

            if (isMoniquira) {
                moniquiraGross += txAmount;
                moniquiraSupplies += txSupplies;
                moniquiraCommissions += txComm;
            } else {
                tunjaGross += txAmount;
                tunjaSupplies += txSupplies;
                tunjaCommissions += txComm;
            }

            if (!stylistSummary[stylistName]) {
                stylistSummary[stylistName] = {
                    name: stylistName,
                    services: 0,
                    totalSales: 0,
                    commissionEarned: 0,
                    pendingCommission: 0,
                    servicesList: []
                };
            }
            stylistSummary[stylistName].services += (tx.items?.length || 1);
            stylistSummary[stylistName].totalSales += txAmount;
            stylistSummary[stylistName].commissionEarned += txComm;
            if (!tx.liquidated) {
                stylistSummary[stylistName].pendingCommission += txComm;
            }

            stylistSummary[stylistName].servicesList.push({
                id: tx.invoiceNumber || tx.id,
                date: dateFormatted,
                clientName: tx.clientName || 'Cliente POS',
                clientDoc: tx.clientDoc || '---',
                clientPhone: tx.clientPhone || '',
                procedureName: tx.items?.map(i => i.name).join(', ') || 'Venta POS Mostrador',
                price: txAmount,
                suppliesCost: txSupplies,
                commission: txComm,
                sede: isMoniquira ? 'Moniquirá' : 'Tunja',
                isPOS: true
            });
        });

        // 4. Ganancia Neta y Margen
        const netProfit = grossRevenue - totalSupplies - totalCommissions - totalOperatingExpenses;
        const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

        // 5. Comparativo Tunja vs Moniquirá
        const tunjaNet = tunjaGross - tunjaSupplies - tunjaCommissions - totalFixedTunja - customExpTunja;
        const moniquiraNet = moniquiraGross - moniquiraSupplies - moniquiraCommissions - totalFixedMoniquira - customExpMoniquira;

        // 6. Punto de Equilibrio
        const avgMarginRate = grossRevenue > 0 ? (grossRevenue - totalSupplies - totalCommissions) / grossRevenue : 0.60;
        const daysDivisor = Math.max(daysInPeriod, 1);
        const dailyGross = grossRevenue / daysDivisor;
        const dailyContribution = dailyGross * avgMarginRate;
        const breakEvenDay = dailyContribution > 0 ? Math.min(30, Math.ceil(totalOperatingExpenses / dailyContribution)) : 18;

        return {
            grossRevenue,
            totalSupplies,
            totalCommissions,
            totalFixedExpenses,
            totalCustomExpenses,
            totalOperatingExpenses,
            netProfit,
            profitMargin: profitMargin.toFixed(1),
            breakEvenDay,
            daysInPeriod,
            prorationFactor,
            startDate: start,
            endDate: end,
            selectedSede,
            sedes: {
                tunja: {
                    gross: tunjaGross,
                    supplies: tunjaSupplies,
                    commissions: tunjaCommissions,
                    fixed: totalFixedTunja,
                    customExp: customExpTunja,
                    net: tunjaNet,
                    margin: tunjaGross > 0 ? ((tunjaNet / tunjaGross) * 100).toFixed(1) : '0.0'
                },
                moniquira: {
                    gross: moniquiraGross,
                    supplies: moniquiraSupplies,
                    commissions: moniquiraCommissions,
                    fixed: totalFixedMoniquira,
                    customExp: customExpMoniquira,
                    net: moniquiraNet,
                    margin: moniquiraGross > 0 ? ((moniquiraNet / moniquiraGross) * 100).toFixed(1) : '0.0'
                }
            },
            stylists: Object.values(stylistSummary),
            fixedExpensesDetails: fixed
        };
    };

    // 8. Generador Oficial de Comprobante / Voucher para WhatsApp
    const generateStylistVoucher = (stylistName, periodText = 'Período Seleccionado', startDate = null, endDate = null, dbClients = []) => {
        const fin = calculateFinancials(dbClients, startDate, endDate, 'Todas');
        const st = fin.stylists.find(s => s.name.toLowerCase().trim() === stylistName.toLowerCase().trim()) || {
            name: stylistName,
            services: 0,
            totalSales: 0,
            commissionEarned: 0,
            pendingCommission: 0,
            servicesList: []
        };

        const rangeStr = (startDate && endDate) ? `${startDate} al ${endDate}` : (startDate || endDate || 'Histórico Completo');
        
        let servicesFormatted = '';
        if (st.servicesList && st.servicesList.length > 0) {
            st.servicesList.forEach((s, idx) => {
                servicesFormatted += `${idx + 1}. 📅 ${s.date} | ${s.sede}\n`;
                servicesFormatted += `   👤 *Clienta:* ${s.clientName} (CC: ${s.clientDoc})\n`;
                servicesFormatted += `   ✂️ *Servicio:* ${s.procedureName}\n`;
                servicesFormatted += `   💵 *Cobrado:* $${Math.round(s.price).toLocaleString('es-CO')} | 💰 *Comisión:* $${Math.round(s.commission).toLocaleString('es-CO')}\n\n`;
            });
        } else {
            servicesFormatted = '   _(No se registraron servicios en este rango de fechas)_\n\n';
        }

        const msg = 
`✨ *JULIE ALISADOS • COMPROBANTE OFICIAL DE LIQUIDACIÓN* ✨
🏢 *Julie Alisados - Salón Especializado en Alisados & Terapias*
💬 _"Más que un liso, una transformación"_

━━━━━━━━━━━━━━━━━━━━━━━━━━
👑 *Estilista:* ${st.name}
📅 *Período:* ${periodText} (${rangeStr})
📍 *Sedes:* Tunja Pasaje Boulevard & Moniquirá Cra 6
━━━━━━━━━━━━━━━━━━━━━━━━━━

💇‍♀️ *DETALLE DE PROCEDIMIENTOS REALIZADOS (${st.services}):*

${servicesFormatted}━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 *RESUMEN DE LIQUIDACIÓN:*
🔹 *Total Procedimientos:* ${st.services}
🔹 *Venta Total Generada:* $${Math.round(st.totalSales).toLocaleString('es-CO')} COP
⭐ *TOTAL COMISIÓN ACUMULADA:* *$${Math.round(st.commissionEarned).toLocaleString('es-CO')} COP*
🔸 *Saldo Pendiente por Pagar:* *$${Math.round(st.pendingCommission).toLocaleString('es-CO')} COP*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *Julie Alisados • Sistema de Control y Finanzas*
📲 WhatsApp Oficial: +57 304 358 8180`;

        return {
            text: msg,
            whatsappUrl: `https://wa.me/?text=${encodeURIComponent(msg)}`,
            stylist: st,
            periodText: periodText,
            startDate: startDate,
            endDate: endDate
        };
    };

    return {
        PROCEDURES,
        PRODUCTS,
        getFixedExpenses,
        saveFixedExpenses,
        getCustomExpenses,
        addCustomExpense,
        deleteCustomExpense,
        getPOSTransactions,
        recordPOSTransaction,
        getLiquidations,
        liquidateStylist,
        calculateFinancials,
        generateStylistVoucher,
        findProcedureKey,
        normalizeDateStr
    };
})();
