/**
 * Julie Alisados - Marketing Engine v1.0
 * Generador inteligente de contenido para Redes Sociales (Reels, TikTok, Instagram, WhatsApp y Julie Tips)
 * DiseÃ±ado con reglas estrictas de identidad de marca.
 */

const JulieMarketingEngine = (() => {
    // Reglas de marca y datos oficiales
    const BRAND = {
        name: "Julie Alisados",
        tagline: "El Alisado Saludable #1 de Colombia â€¢ By Julie Valencia",
        whatsapp: "573043588180",
        sedes: [
            { ciudad: "Tunja", direccion: "Avenida OlÃ­mpica #190, Pasaje Boulevard, Local 140" },
            { ciudad: "MoniquirÃ¡", direccion: "Carrera 6 # 18 - 68" }
        ],
        hashtagsGenerales: [
            "#JulieAlisados", "#AlisadoSaludable", "#AlisadosSinFormol", "#AlisadosTunja", 
            "#AlisadosMoniquira", "#CabelloSano", "#LisoPerfecto", "#Boyaca", "#CuidadoCapilar"
        ]
    };

    // Filtro de vocabulario prohibido
    const sanitizeText = (text) => {
        if (!text) return "";
        return text
            .replace(/\bmelena\b/gi, "cabello")
            .replace(/\bmelenas\b/gi, "cabellos")
            .replace(/\bhebra capilar\b/gi, "fibra capilar")
            .replace(/\bhebra\b/gi, "fibra capilar")
            .replace(/\bhebras\b/gi, "fibras capilares")
            .replace(/\brendimiento gigante\b/gi, "alto rendimiento profesional")
            .replace(/\brendimiento familiar\b/gi, "presentaciÃ³n profesional de 1000 ml");
    };

    // Biblioteca de TemÃ¡ticas y Datos Clave
    const TOPICS = {
        alisado_saludable: {
            title: "Alisado Saludable (TecnologÃ­a Enjuagable)",
            target: "Mujeres que buscan un liso perfecto, brillante y sedoso 100% libre de formol.",
            painPoints: [
                "Cansada de plancharte todos los dÃ­as y quemar tu cabello",
                "Miedo a los quÃ­micos agresivos y al olor picante del formol",
                "Frizz incontrolable cuando llueve o hay humedad"
            ],
            solutions: [
                "Liso 100% con movimiento natural, brillo espejo y suavidad extrema",
                "FÃ³rmula enriquecida con mÃ¡s de 14 aminoÃ¡cidos y proteÃ­nas naturales",
                "TecnologÃ­a enjuagable: saldrÃ¡s del salÃ³n con el cabello lavado y secado solo a mano con aire tibio"
            ],
            hooks: [
                "Â¿TodavÃ­a crees que para tener un liso perfecto tienes que aguantar humo y picazÃ³n? ðŸ™…â€â™€ï¸",
                "Esto es lo que pasa cuando dejas la plancha y te haces un Alisado Saludable âœ¨",
                "El secreto para salir de la ducha, dejar que tu cabello se seque al aire y que quede liso tabla ðŸ˜±",
                "3 seÃ±ales de que tu cabello te estÃ¡ suplicando que dejes la plancha y el formol ðŸ›‘"
            ],
            cta: "EscrÃ­benos al WhatsApp y agenda tu valoraciÃ³n tÃ©cnica personalizada en Tunja o MoniquirÃ¡ ðŸ“²"
        },
        emulsion_zero: {
            title: "EmulsiÃ³n Zero (Apta para NiÃ±as y Madres)",
            target: "NiÃ±as desde 4 aÃ±os, mamÃ¡s lactantes, embarazadas y cabellos ultra procesados.",
            painPoints: [
                "El drama diario de peinar y desenredar a tu hija con tirones y llanto",
                "Cabello afro, rebelde o con volumen excesivo difÃ­cil de manejar en la maÃ±ana",
                "MamÃ¡s que no quieren exponer a sus hijas a quÃ­micos nocivos"
            ],
            solutions: [
                "FÃ³rmula botÃ¡nica extra suave con pH balanceado y activos biocompatibles",
                "Reduce el volumen en un 80-90% y disciplina el rizo sin alterar la estructura natural",
                "Facilita el peinado matutino en solo 2 minutos con cero dolor"
            ],
            hooks: [
                "MamÃ¡: Â¿las maÃ±anas antes de ir al colegio son un campo de batalla por culpa del cepillo? ðŸ‘§ðŸŽ€",
                "Â¿Existe un alisado verdaderamente seguro para niÃ±as? Te contamos la verdad sobre la EmulsiÃ³n Zero âœ¨",
                "Transformamos el cabello de esta princesa sin lÃ¡grimas, sin formol y con puro brillo ðŸ’–"
            ],
            cta: "Dale a tu pequeÃ±a maÃ±anas felices sin tirones. Agenda su cita en Julie Alisados al WhatsApp ðŸ“²"
        },
        reposicion_aminoacidos: {
            title: "ReposiciÃ³n de AminoÃ¡cidos (SOS Anti-Quiebre)",
            target: "Cabellos elÃ¡sticos, chiclosos, decolorados o con puntas abiertas.",
            painPoints: [
                "Cabello chicloso que se estira y se parte al peinarlo mojado",
                "PÃ©rdida de grosor y fuerza tras decoloraciones o tinturas",
                "Falta de brillo y textura pajosa"
            ],
            solutions: [
                "InyecciÃ³n intensiva de queratina biomimÃ©tica y aminoÃ¡cidos esenciales",
                "Rellena la corteza capilar restaurando la fuerza interna desde la primera sesiÃ³n",
                "Detiene el quiebre y devuelve la elasticidad sana al cabello"
            ],
            hooks: [
                "Â¡ALERTA! Si tu cabello hace esto cuando estÃ¡ mojado, estÃ¡ al borde de romperse ðŸ˜±ðŸš¨",
                "CÃ³mo revivimos un cabello decolorado y chicloso en solo una sesiÃ³n tÃ©cnica ðŸ”¬âœ¨",
                "No cortes tu cabello maltratado antes de probar esta terapia de aminoÃ¡cidos ðŸ’‡â€â™€ï¸âŒ"
            ],
            cta: "Realizamos una prueba de elasticidad gratuita en tu valoraciÃ³n. Â¡EscrÃ­benos hoy mismo!"
        },
        cuidado_casa: {
            title: "Rutina de Cuidado en Casa JA By Julie Valencia",
            target: "Clientas con alisado o cabello que busca nutriciÃ³n profesional diaria.",
            painPoints: [
                "Usar shampoos con sal del supermercado que barren el alisado en 1 mes",
                "Falta de brillo y resequedad por culpa del calor de la plancha y el sol",
                "Puntas abiertas y frizz en medios"
            ],
            solutions: [
                "LÃ­nea 100% libre de sal, sulfatos agresivos y parabenos",
                "DÃºo Extractos Naturales (1000 ml) con 12 botÃ¡nicos para equilibrar la raÃ­z grasa",
                "DÃºo ArgÃ¡n con Biotina y Ãcido HialurÃ³nico (500 ml) para nutriciÃ³n extrema",
                "Termoprotector JA que reduce el daÃ±o tÃ©rmico de planchas y secadores, protege del sol y perfuma todo el dÃ­a",
                "Aceite Reparador de ArgÃ¡n y Macadamia JA (60 ml) con tacto seco y cero peso"
            ],
            hooks: [
                "El error #1 que cometes al salir del salÃ³n y que estÃ¡ arruinando tu alisado ðŸ¤¦â€â™€ï¸",
                "Â¿Por quÃ© tu alisado no te dura 6 meses? Esta es la razÃ³n oculta en tu ducha ðŸš¿âŒ",
                "3 productos indispensables que toda mujer con cabello alisado debe tener en su tocador âœ¨"
            ],
            cta: "Adquiere tu kit de cuidado capilar con envÃ­o a todo el paÃ­s o en nuestras sedes de Tunja y MoniquirÃ¡ ðŸ›ï¸"
        },
        mitos_verdades: {
            title: "Mitos y Verdades sobre los Alisados",
            target: "Mujeres indecisas que tienen miedo a daÃ±arse el cabello.",
            painPoints: [
                "Creer que todos los alisados tienen formol o queman el cuero cabelludo",
                "Creer que un alisado sin formol no dura nada",
                "Pensar que no puedes lavarte el cabello durante 3 dÃ­as"
            ],
            solutions: [
                "En Julie Alisados el cabello se lava completamente en el salÃ³n: lo ves seco y liso al instante",
                "Dura de 4 a 6 meses con el cuidado adecuado en casa",
                "Nuestros ingredientes orgÃ¡nicos reestructuran y nutren la fibra capilar"
            ],
            hooks: [
                "Â¿Mito o verdad? Â¿Si te alisas el cabello no puedes lavÃ¡rtelo por 3 dÃ­as? ðŸ¤¯ðŸš¿",
                "Te mintieron: El formol NO alisa mejor, solo plastifica y quema tu cabello âš ï¸",
                "3 mitos gigantes sobre el alisado orgÃ¡nico que debes dejar de creer hoy mismo âŒ"
            ],
            cta: "VisÃ­tanos en Tunja o MoniquirÃ¡ para una valoraciÃ³n personalizada y comprueba la diferencia ðŸ’–"
        }
    };

    const generateReelScript = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.alisado_saludable;
        const randomHook = topic.hooks[Math.floor(Math.random() * topic.hooks.length)];
        const pain = topic.painPoints[Math.floor(Math.random() * topic.painPoints.length)];
        const solution = topic.solutions[Math.floor(Math.random() * topic.solutions.length)];

        return {
            titulo: `Guion Reel / TikTok: ${topic.title}`,
            duracionSugerida: "30 a 45 segundos",
            audioRecomendado: "Voz en off clara + mÃºsica de fondo acÃºstica o trending aesthetic suave",
            gancho: {
                tiempo: "0:00 - 0:03 (Primeros 3 segundos)",
                visual: "Primer plano impactante del cabello brillante en movimiento o expresiÃ³n de sorpresa mirando a la cÃ¡mara.",
                audio: randomHook,
                textoPantalla: randomHook.replace(/[^\w\sÂ¿?Â¡!]/gi, '').slice(0, 45) + "..."
            },
            problema: {
                tiempo: "0:03 - 0:12 (El problema)",
                visual: "Muestra tomas rÃ¡pidas de cabello con frizz o usando plancha con vapor.",
                audio: `Seguro te pasa que vives frustrada porque ${pain.toLowerCase()}, y sientes que ningÃºn tratamiento de salÃ³n te dura mÃ¡s de dos semanas.`,
                textoPantalla: "Â¿Te pasa esto todos los dÃ­as? ðŸ¤¦â€â™€ï¸"
            },
            solucion: {
                tiempo: "0:12 - 0:28 (La soluciÃ³n de Julie Alisados)",
                visual: "Tomas en el salÃ³n: aplicando producto, lavando en el lavacabezas con abundante agua, secando solo con secador y manos, y el resultado final brillante.",
                audio: `Por eso en Julie Alisados creamos un protocolo diferente: ${solution}. Con nuestra fÃ³rmula orgÃ¡nica libre de formol, tu fibra capilar queda protegida, suave y con un brillo espejo real.`,
                textoPantalla: "âœ¨ Liso Saludable 100% Enjuagable\nðŸŒ¿ Sin Formol ni Olores Fuertes"
            },
            cierre: {
                tiempo: "0:28 - 0:35 (Llamado a la acciÃ³n - CTA)",
                visual: "Julie o la estilista sonriendo seÃ±alando el botÃ³n de WhatsApp, mientras la clienta mueve su cabello feliz.",
                audio: `${topic.cta}. Estamos en Tunja y MoniquirÃ¡. Â¡Comenta 'QUIERO MI LISO' o dale clic al enlace de nuestro perfil!`,
                textoPantalla: "ðŸ“ Tunja & MoniquirÃ¡\nðŸ“² Clic en el enlace del perfil para agendar"
            },
            copyInstagram: sanitizeText(`âœ¨ ${randomHook}\n\nÂ¿Cansada de lidiar con el frizz y la plancha todos los dÃ­as? En Julie Alisados transformamos tu cabello con tecnologÃ­a 100% saludable, enjuagable y libre de formol.\n\nðŸŒ¿ Beneficios clave:\nâ€¢ ${topic.solutions.join("\nâ€¢ ")}\n\nðŸ“ VisÃ­tanos en nuestras sedes:\nâ€¢ Tunja: Av. OlÃ­mpica #190, Pasaje Boulevard Local 140\nâ€¢ MoniquirÃ¡: Cra 6 # 18-68\n\nðŸ“² Agenda tu valoraciÃ³n al WhatsApp: +57 304 358 8180 (Enlace directo en la biografÃ­a).\n\n${BRAND.hashtagsGenerales.join(" ")}`)
        };
    };

    const generateCarousel = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.alisado_saludable;

        let slides = [
            {
                slide: 1,
                tipo: "PORTADA (Gancho)",
                titulo: sanitizeText(topic.hooks[0]),
                visual: "Foto de resultado impecable antes/despuÃ©s con texto grande y tipografÃ­a elegante.",
                nota: "El objetivo es incitar a deslizar hacia la izquierda."
            },
            {
                slide: 2,
                tipo: "EL PROBLEMA OCULTO",
                titulo: "Lo que muchas no te cuentan...",
                contenido: sanitizeText(`â€¢ ${topic.painPoints[0]}\nâ€¢ Los quÃ­micos agresivos plastifican la fibra capilar en vez de nutrirla.\nâ€¢ Terminas esclava del secador y la plancha cada fin de semana.`),
                visual: "Foto en detalle de puntas resecas o cabello perdiendo brillo."
            },
            {
                slide: 3,
                tipo: "LA DIFERENCIA SALUDABLE",
                titulo: "Â¿Por quÃ© el Alisado Saludable es diferente?",
                contenido: sanitizeText(`ðŸŒ¿ 100% Libre de Formol y derivados tÃ³xicos.\nðŸ’§ Enjuagable en el salÃ³n: te vas con el cabello limpio y sin olores.\nâœ¨ Aporte de mÃ¡s de 14 aminoÃ¡cidos esenciales que reconstruyen la fuerza interna.`),
                visual: "Foto aplicando el producto con pincel en el salÃ³n de Julie Alisados."
            },
            {
                slide: 4,
                tipo: "LOS RESULTADOS REALES",
                titulo: "Lo que vas a disfrutar todos los dÃ­as:",
                contenido: sanitizeText(`1. Salir de la ducha y secar tu cabello solo con aire tibio en 5 minutos.\n2. Cero frizz incluso en dÃ­as de lluvia o humedad.\n3. Brillo espejo y movimiento natural con suavidad al tacto.`),
                visual: "Foto o video de la clienta moviendo su cabello con brillo intenso."
            },
            {
                slide: 5,
                tipo: "CUIDADO EN CASA",
                titulo: "El secreto para que dure 4 a 6 meses:",
                contenido: sanitizeText(`Usa siempre nuestra lÃ­nea especializada JA By Julie Valencia:\nâ€¢ Shampoo y Acondicionador sin sal ni parabenos.\nâ€¢ Termoprotector diario contra el sol y calor.\nâ€¢ Aceite Reparador de ArgÃ¡n y Macadamia en las puntas.`),
                visual: "Foto estÃ©tica de los productos de la lÃ­nea de Cuidado Capilar JA."
            },
            {
                slide: 6,
                tipo: "LLAMADO A LA ACCIÃ“N (CTA)",
                titulo: "Â¡Empieza tu transformaciÃ³n hoy!",
                contenido: sanitizeText(`ðŸ“ Sedes en Tunja y MoniquirÃ¡.\nðŸ’¬ EscrÃ­benos al WhatsApp: 304 358 8180\n\nðŸ‘‰ Guarda este post para no perderlo y compÃ¡rtelo con tu amiga que no suelta la plancha.`),
                visual: "Logo de Julie Alisados con botones de WhatsApp e iconos de guardar/compartir."
            }
        ];

        let copy = sanitizeText(`Desliza para descubrir cÃ³mo transformar tu cabello sin daÃ±arlo âž¡ï¸âœ¨\n\n${topic.title}: La verdadera alternativa para lucir un liso de salÃ³n todos los dÃ­as sin pasar horas frente al espejo.\n\nÂ¿Tienes dudas sobre si tu cabello es apto? EscrÃ­benos al link de nuestra bio y una de nuestras especialistas te asesorarÃ¡ con todo el cariÃ±o ðŸ’–\n\n${BRAND.hashtagsGenerales.join(" ")}`);

        return {
            titulo: `Carrusel de 6 Diapositivas: ${topic.title}`,
            slides: slides,
            copy: copy
        };
    };

    const generateWhatsAppMessages = () => {
        return [
            {
                tipo: "Estado de WhatsApp (Venta Directa)",
                texto: sanitizeText(`âœ¨ Â¿Cansada de la plancha todos los dÃ­as?\n\nEn Julie Alisados te dejamos el cabello liso, brillante y sedoso con nuestro Alisado Saludable 100% libre de formol.\n\nðŸŒ¸ SaldrÃ¡s de nuestra sede con el cabello completamente lavado y seco al aire.\n\nðŸ“ Sedes: Tunja y MoniquirÃ¡\nðŸ“² Responde a este estado para cotizar o agendar tu cita de esta semana ðŸ’–`)
            },
            {
                tipo: "DifusiÃ³n / Recordatorio de Retoque (Clientas 4-6 meses)",
                texto: sanitizeText(`Hola bella ðŸ’–! Esperamos que estÃ©s teniendo un dÃ­a hermoso.\n\nTe escribimos de Julie Alisados para recordarte que ya han pasado varios meses desde tu Ãºltimo tratamiento y es el momento ideal para realizar el retoque de tu raÃ­z antes de que pierdas la disciplina en tu cabello.\n\nTenemos cupos disponibles para esta semana en nuestras sedes de Tunja y MoniquirÃ¡. Â¿Te gustarÃ­a que te reservemos tu espacio? ðŸŒ¸âœ¨`)
            },
            {
                tipo: "PromociÃ³n de la LÃ­nea de Cuidado Capilar",
                texto: sanitizeText(`Â¿SabÃ­as que el 70% de la duraciÃ³n de tu alisado depende de lo que usas en la ducha? ðŸš¿âœ¨\n\nNuestros combos JA By Julie Valencia (Extractos Naturales y Aceite de ArgÃ¡n) son 100% libres de sal y sulfatos agresivos para mantener tu brillo intacto por meses.\n\nðŸ“¦ EnvÃ­os a todo el paÃ­s y entrega inmediata en sedes de Tunja y MoniquirÃ¡. Â¡Pide el tuyo respondiendo a este mensaje! ðŸ›ï¸`)
            },
            {
                tipo: "Oferta Especial / Cupos de Fin de Semana",
                texto: sanitizeText(`ðŸš¨ Â¡ÃšLTIMOS 3 CUPOS PARA ESTE FIN DE SEMANA! ðŸš¨\n\nSi quieres lucir un cabello impecable, brillante y sin frizz para tus eventos, Â¡este es tu momento!\n\nðŸ“ Tunja: Pasaje Boulevard Local 140\nðŸ“ MoniquirÃ¡: Cra 6 # 18-68\n\nEscrÃ­benos ahora mismo para apartar tu cita antes de que se agoten ðŸ“²âœ¨`)
            }
        ];
    };

    const generateTipsArticle = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.alisado_saludable;

        return {
            titulo: sanitizeText(`GuÃ­a Completa: CÃ³mo lograr un ${topic.title} y mantenerlo perfecto por meses`),
            extracto: sanitizeText(`Descubre los secretos profesionales para transformar tu cabello con fÃ³rmulas 100% libres de formol y cuidados en casa con la lÃ­nea JA By Julie Valencia.`),
            secciones: [
                {
                    subtitulo: sanitizeText("Â¿Por quÃ© elegir un Alisado Saludable sin quÃ­micos agresivos?"),
                    contenido: sanitizeText(`Durante aÃ±os, muchas personas creyeron errÃ³neamente que para tener un cabello liso era necesario exponerse a vapores molestos y formol. En Julie Alisados rompimos ese paradigma con formulaciones enriquecidas con mÃ¡s de 14 aminoÃ¡cidos y proteÃ­nas que nutren la fibra capilar desde el interior.`)
                },
                {
                    subtitulo: sanitizeText("La importancia del lavado en el salÃ³n"),
                    contenido: sanitizeText(`Una de nuestras seÃ±as de identidad es la tecnologÃ­a enjuagable: no te vas a tu casa con el producto en la cabeza ni tienes que esperar 3 dÃ­as para lavarte el cabello. En el salÃ³n lavamos tu cabello con agua abundante y lo secamos simplemente con aire de secador y las manos para que veas el resultado real inmediato.`)
                },
                {
                    subtitulo: sanitizeText("CÃ³mo cuidar tu tratamiento en casa"),
                    contenido: sanitizeText(`Para garantizar una duraciÃ³n de 4 a 6 meses, recomendamos usar exclusivamente shampoos sin sal como el DÃºo Extractos Naturales o el DÃºo Aceite de ArgÃ¡n de nuestra lÃ­nea JA, ademÃ¡s de proteger tu cabello con el Termoprotector JA antes de exponerlo a herramientas tÃ©rmicas o al sol.`)
                }
            ],
            cta: sanitizeText(`Â¿Quieres vivir la experiencia en persona? Te esperamos en nuestras sedes de Tunja (Pasaje Boulevard Local 140) y MoniquirÃ¡ (Cra 6 # 18-68). Â¡Agenda tu cita al WhatsApp +57 304 358 8180!`)
        };
    };

    return {
        BRAND,
        TOPICS,
        generateReelScript,
        generateCarousel,
        generateWhatsAppMessages,
        generateTipsArticle,
        sanitizeText
    };
})();

if (typeof window !== 'undefined') {
    window.JulieMarketingEngine = JulieMarketingEngine;
}