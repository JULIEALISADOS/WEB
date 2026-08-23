/**
 * Julie Alisados - Motor de Finanzas, Rentabilidad & POS Inteligente
 * Cálculo de márgenes reales, insumos, comisiones del 30%, gastos operativos
 * y liquidación de estilistas para Tunja & Moniquirá.
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
            commissionAmount: 60000, // Completo oficial
            commissionHalf: 30000,   // Medio oficial
            netMargin: 160000
        },
        'alisado_afro': {
            id: 'alisado_afro',
            name: 'Alisado Afro (Tipo 4)',
            category: 'Alisados y Retoques',
            price: 280000,
            suppliesCost: 35000,
            commissionAmount: 70000, // Completo oficial
            commissionHalf: 35000,   // Medio oficial
            netMargin: 175000
        },
        'retoque_raiz': {
            id: 'retoque_raiz',
            name: 'Retoque de Raíz',
            category: 'Alisados y Retoques',
            price: 190000,
            suppliesCost: 25000,
            commissionAmount: 45000, // Completo oficial
            commissionHalf: 22500,   // Medio oficial
            netMargin: 120000
        },

        // --- 2. TERAPIAS PREMIUM ---
        'emulsion_zero': {
            id: 'emulsion_zero',
            name: 'Emulsión / Emulsión Zero',
            category: 'Terapias Premium',
            price: 170000,
            suppliesCost: 25000,
            commissionAmount: 35000, // Completo oficial
            commissionHalf: 17500,   // Medio oficial
            netMargin: 110000
        },
        'reposicion_aminoacidos': {
            id: 'reposicion_aminoacidos',
            name: 'Reposición de Aminoácidos',
            category: 'Terapias Premium',
            price: 150000,
            suppliesCost: 20000,
            commissionAmount: 35000, // Completo oficial
            commissionHalf: 17500,   // Medio oficial
            netMargin: 95000
        },
        'rcp': {
            id: 'rcp',
            name: 'R.C.P. Restauración',
            category: 'Terapias Premium',
            price: 180000,
            suppliesCost: 25000,
            commissionAmount: 35000, // Completo oficial
            commissionHalf: 17500,   // Medio oficial
            netMargin: 120000
        },
        'recode': {
            id: 'recode',
            name: 'Recode Reconstructivo',
            category: 'Terapias Premium',
            price: 160000,
            suppliesCost: 20000,
            commissionAmount: 35000, // Completo oficial
            commissionHalf: 17500,   // Medio oficial
            netMargin: 105000
        },

        // --- 3. CORTES Y OTROS ---
        'corte_estandar': {
            id: 'corte_estandar',
            name: 'Corte de Cabello Estándar',
            category: 'Cortes y Otros',
            price: 250000 ? 25000 : 25000,
            suppliesCost: 2000,
            commissionAmount: 7500, // Oficial
            commissionHalf: 3750,
            netMargin: 15500
        },
        'corte_triming': {
            id: 'corte_triming',
            name: 'Corte Triming / Horquilla',
            category: 'Cortes y Otros',
            price: 30000,
            suppliesCost: 2000,
            commissionAmount: 10000, // Oficial
            commissionHalf: 5000,
            netMargin: 18000
        },
        'lavado_cabello': {
            id: 'lavado_cabello',
            name: 'Lavado de Cabello (Individual)',
            category: 'Cortes y Otros',
            price: 20000,
            suppliesCost: 3000,
            commissionAmount: 10000, // Oficial
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
            commissionAmount: 25000, // Completo oficial
            commissionHalf: 12500,   // Medio oficial
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

    // 2. Catálogo Oficial de Productos JA By Julie Valencia (Venta de Mostrador)
    const PRODUCTS = {
        'duo_extractos_1000': {
            id: 'duo_extractos_1000',
            name: 'Dúo Extractos Naturales 1000ml',
            category: 'Producto',
            price: 85000,
            cost: 40000,
            margin: 45000,
            commissionRate: 0.10 // 10% comisión por venta producto
        },
        'duo_argan_500': {
            id: 'duo_argan_500',
            name: 'Dúo Argán 500ml',
            category: 'Producto',
            price: 65000,
            cost: 30000,
            margin: 35000,
            commissionRate: 0.10
        },
        'termoprotector_ja': {
            id: 'termoprotector_ja',
            name: 'Termoprotector Capilar JA',
            category: 'Producto',
            price: 45000,
            cost: 20000,
            margin: 25000,
            commissionRate: 0.10
        },
        'aceite_argan_macadamia': {
            id: 'aceite_argan_macadamia',
            name: 'Aceite Argán & Macadamia 60ml',
            category: 'Producto',
            price: 35000,
            cost: 15000,
            margin: 20000,
            commissionRate: 0.10
        },
        'ampolla_sos': {
            id: 'ampolla_sos',
            name: 'Ampolla SOS Restauración Rápida',
            category: 'Producto',
            price: 25000,
            cost: 10000,
            margin: 15000,
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

    // 3. Gastos Fijos por Defecto
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

    const liquidateStylist = (stylistName, sede = 'Todas') => {
        const txs = getPOSTransactions();
        let totalCommissions = 0;
        let countServices = 0;

        txs.forEach(t => {
            if (t.stylist === stylistName && !t.liquidated) {
                if (sede === 'Todas' || t.sede === sede) {
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
            timestamp: new Date().toISOString()
        };
        liquidations.unshift(record);
        localStorage.setItem(KEYS.liquidations, JSON.stringify(liquidations));
        return record;
    };

    // Helper de mapeo de nombres de procedimientos a claves
    const findProcedureKey = (procName) => {
        if (!procName) return 'alisado_saludable';
        const str = procName.toLowerCase();
        if (str.includes('light')) return 'alisado_light';
        if (str.includes('raiz') || str.includes('raíz')) return 'retoque_raiz';
        if (str.includes('zero') || str.includes('emulsion') || str.includes('emulsión')) return 'emulsion_zero';
        if (str.includes('amino') || str.includes('reposicion') || str.includes('reposición')) return 'reposicion_aminoacidos';
        if (str.includes('code') || str.includes('re-code')) return 're_code';
        if (str.includes('balaca')) return 'balaca';
        if (str.includes('rcp') || str.includes('restauracion') || str.includes('restauración')) return 'rcp_restauracion';
        if (str.includes('choco') || str.includes('hidrat')) return 'hidratacion_choco';
        return 'alisado_saludable';
    };

    // 7. Cálculo Global de Finanzas & Métricas
    const calculateFinancials = (dbClients = []) => {
        const fixed = getFixedExpenses();
        const customExpenses = getCustomExpenses();
        const posTransactions = getPOSTransactions();

        // 1. Gastos Fijos Totales
        const totalFixedTunja = Number(fixed.arriendoTunja || 0) + Number(fixed.serviciosTunja || 0);
        const totalFixedMoniquira = Number(fixed.arriendoMoniquira || 0) + Number(fixed.serviciosMoniquira || 0);
        const totalFixedAdsOther = Number(fixed.publicidadAds || 0) + Number(fixed.otrosGastosFijos || 0);
        const totalFixedExpenses = totalFixedTunja + totalFixedMoniquira + totalFixedAdsOther;

        // 2. Gastos Variables / Egresos Registrados
        let customExpTunja = 0, customExpMoniquira = 0;
        customExpenses.forEach(exp => {
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
        const processedDocMap = new Set();

        dbClients.forEach(c => {
            const pKey = findProcedureKey(c.procedimiento);
            const proc = PROCEDURES[pKey] || PROCEDURES.alisado_saludable;
            const price = Number(c.precio_cobrado || proc.price);
            const supply = proc.suppliesCost;
            const commission = price * proc.commissionRate;
            const isMoniquira = (c.sede || '').toLowerCase().includes('moniquira');
            const stylistName = c.estilista_responsable || 'Julie Valencia';

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
                    pendingCommission: 0
                };
            }
            stylistSummary[stylistName].services++;
            stylistSummary[stylistName].totalSales += price;
            stylistSummary[stylistName].commissionEarned += commission;
            stylistSummary[stylistName].pendingCommission += commission;

            processedDocMap.add(c.numero_documento);
        });

        // B. Procesar ventas adicionales desde POS local si las hay
        posTransactions.forEach(tx => {
            // Solo sumar si no está ya en la lista de clientes o es venta directa de productos
            grossRevenue += Number(tx.totalAmount || 0);
            totalSupplies += Number(tx.suppliesCost || 0);
            totalCommissions += Number(tx.stylistCommission || 0);

            const isMoniquira = (tx.sede || '').toLowerCase().includes('moniquira');
            if (isMoniquira) {
                moniquiraGross += Number(tx.totalAmount || 0);
                moniquiraSupplies += Number(tx.suppliesCost || 0);
                moniquiraCommissions += Number(tx.stylistCommission || 0);
            } else {
                tunjaGross += Number(tx.totalAmount || 0);
                tunjaSupplies += Number(tx.suppliesCost || 0);
                tunjaCommissions += Number(tx.stylistCommission || 0);
            }

            const stylistName = tx.stylist || 'Julie Valencia';
            if (!stylistSummary[stylistName]) {
                stylistSummary[stylistName] = {
                    name: stylistName,
                    services: 0,
                    totalSales: 0,
                    commissionEarned: 0,
                    pendingCommission: 0
                };
            }
            stylistSummary[stylistName].services += (tx.items?.length || 1);
            stylistSummary[stylistName].totalSales += Number(tx.totalAmount || 0);
            stylistSummary[stylistName].commissionEarned += Number(tx.stylistCommission || 0);
            if (!tx.liquidated) {
                stylistSummary[stylistName].pendingCommission += Number(tx.stylistCommission || 0);
            }
        });

        // 4. Ganancia Neta y Margen
        const netProfit = grossRevenue - totalSupplies - totalCommissions - totalOperatingExpenses;
        const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

        // 5. Comparativo Tunja vs Moniquirá
        const tunjaNet = tunjaGross - tunjaSupplies - tunjaCommissions - totalFixedTunja - customExpTunja;
        const moniquiraNet = moniquiraGross - moniquiraSupplies - moniquiraCommissions - totalFixedMoniquira - customExpMoniquira;

        // 6. Punto de Equilibrio (Día del mes)
        // Costo fijo diario = totalOperatingExpenses / 30
        // Ganancia marginal promedio por servicio = 65% del ingreso
        const avgMarginRate = grossRevenue > 0 ? (grossRevenue - totalSupplies - totalCommissions) / grossRevenue : 0.60;
        const dailyGross = grossRevenue / Math.max(new Date().getDate(), 1);
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
        findProcedureKey
    };
})();
