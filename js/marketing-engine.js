/**
 * Julie Alisados - Marketing Engine v1.0
 * Generador inteligente de contenido para Redes Sociales (Reels, TikTok, Instagram, WhatsApp y Julie Tips)
 * Diseñado con reglas estrictas de identidad de marca.
 */

const JulieMarketingEngine = (() => {
    // Reglas de marca y datos oficiales
    const BRAND = {
        name: "Julie Alisados",
        tagline: "El Alisado Saludable #1 de Colombia • By Julie Valencia",
        whatsapp: "573043588180",
        sedes: [
            { ciudad: "Tunja", direccion: "Avenida Olímpica #190, Pasaje Boulevard, Local 140" },
            { ciudad: "Moniquirá", direccion: "Carrera 6 # 18 - 68" }
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
            .replace(/\brendimiento familiar\b/gi, "presentación profesional de 1000 ml");
    };

    // Biblioteca de Temáticas y Datos Clave
    const TOPICS = {
        alisado_saludable: {
            title: "Alisado Saludable (Tecnología Enjuagable)",
            target: "Mujeres que buscan un liso perfecto, brillante y sedoso 100% libre de formol.",
            painPoints: [
                "Cansada de plancharte todos los días y quemar tu cabello",
                "Miedo a los químicos agresivos y al olor picante del formol",
                "Frizz incontrolable cuando llueve o hay humedad"
            ],
            solutions: [
                "Liso 100% con movimiento natural, brillo espejo y suavidad extrema",
                "Fórmula enriquecida con más de 14 aminoácidos y proteínas naturales",
                "Tecnología enjuagable: saldrás del salón con el cabello lavado y secado solo a mano con aire tibio"
            ],
            hooks: [
                "¿Todavía crees que para tener un liso perfecto tienes que aguantar humo y picazón? 🙅‍♀️",
                "Esto es lo que pasa cuando dejas la plancha y te haces un Alisado Saludable ✨",
                "El secreto para salir de la ducha, dejar que tu cabello se seque al aire y que quede liso tabla 😱",
                "3 señales de que tu cabello te está suplicando que dejes la plancha y el formol 🛑"
            ],
            cta: "Escríbenos al WhatsApp y agenda tu valoración técnica personalizada en Tunja o Moniquirá 📲"
        },
        emulsion_zero: {
            title: "Emulsión Zero (Apta para Niñas y Madres)",
            target: "Niñas desde 4 años, mamás lactantes, embarazadas y cabellos ultra procesados.",
            painPoints: [
                "El drama diario de peinar y desenredar a tu hija con tirones y llanto",
                "Cabello afro, rebelde o con volumen excesivo difícil de manejar en la mañana",
                "Mamás que no quieren exponer a sus hijas a químicos nocivos"
            ],
            solutions: [
                "Fórmula botánica extra suave con pH balanceado y activos biocompatibles",
                "Reduce el volumen en un 80-90% y disciplina el rizo sin alterar la estructura natural",
                "Facilita el peinado matutino en solo 2 minutos con cero dolor"
            ],
            hooks: [
                "Mamá: ¿las mañanas antes de ir al colegio son un campo de batalla por culpa del cepillo? 👧🎀",
                "¿Existe un alisado verdaderamente seguro para niñas? Te contamos la verdad sobre la Emulsión Zero ✨",
                "Transformamos el cabello de esta princesa sin lágrimas, sin formol y con puro brillo 💖"
            ],
            cta: "Dale a tu pequeña mañanas felices sin tirones. Agenda su cita en Julie Alisados al WhatsApp 📲"
        },
        reposicion_aminoacidos: {
            title: "Reposición de Aminoácidos (SOS Anti-Quiebre)",
            target: "Cabellos elásticos, chiclosos, decolorados o con puntas abiertas.",
            painPoints: [
                "Cabello chicloso que se estira y se parte al peinarlo mojado",
                "Pérdida de grosor y fuerza tras decoloraciones o tinturas",
                "Falta de brillo y textura pajosa"
            ],
            solutions: [
                "Inyección intensiva de queratina biomimética y aminoácidos esenciales",
                "Rellena la corteza capilar restaurando la fuerza interna desde la primera sesión",
                "Detiene el quiebre y devuelve la elasticidad sana al cabello"
            ],
            hooks: [
                "¡ALERTA! Si tu cabello hace esto cuando está mojado, está al borde de romperse 😱🚨",
                "Cómo revivimos un cabello decolorado y chicloso en solo una sesión técnica 🔬✨",
                "No cortes tu cabello maltratado antes de probar esta terapia de aminoácidos 💇‍♀️❌"
            ],
            cta: "Realizamos una prueba de elasticidad gratuita en tu valoración. ¡Escríbenos hoy mismo!"
        },
        cuidado_casa: {
            title: "Rutina de Cuidado en Casa JA By Julie Valencia",
            target: "Clientas con alisado o cabello que busca nutrición profesional diaria.",
            painPoints: [
                "Usar shampoos con sal del supermercado que barren el alisado en 1 mes",
                "Falta de brillo y resequedad por culpa del calor de la plancha y el sol",
                "Puntas abiertas y frizz en medios"
            ],
            solutions: [
                "Línea 100% libre de sal, sulfatos agresivos y parabenos",
                "Dúo Extractos Naturales (1000 ml) con 12 botánicos para equilibrar la raíz grasa",
                "Dúo Argán con Biotina y Ácido Hialurónico (500 ml) para nutrición extrema",
                "Termoprotector JA que reduce el daño térmico de planchas y secadores, protege del sol y perfuma todo el día",
                "Aceite Reparador de Argán y Macadamia JA (60 ml) con tacto seco y cero peso"
            ],
            hooks: [
                "El error #1 que cometes al salir del salón y que está arruinando tu alisado 🤦‍♀️",
                "¿Por qué tu alisado no te dura 6 meses? Esta es la razón oculta en tu ducha 🚿❌",
                "3 productos indispensables que toda mujer con cabello alisado debe tener en su tocador ✨"
            ],
            cta: "Adquiere tu kit de cuidado capilar con envío a todo el país o en nuestras sedes de Tunja y Moniquirá 🛍️"
        },
        mitos_verdades: {
            title: "Mitos y Verdades sobre los Alisados",
            target: "Mujeres indecisas que tienen miedo a dañarse el cabello.",
            painPoints: [
                "Creer que todos los alisados tienen formol o queman el cuero cabelludo",
                "Creer que un alisado sin formol no dura nada",
                "Pensar que no puedes lavarte el cabello durante 3 días"
            ],
            solutions: [
                "En Julie Alisados el cabello se lava completamente en el salón: lo ves seco y liso al instante",
                "Dura de 4 a 6 meses con el cuidado adecuado en casa",
                "Nuestros ingredientes orgánicos reestructuran y nutren la fibra capilar"
            ],
            hooks: [
                "¿Mito o verdad? ¿Si te alisas el cabello no puedes lavártelo por 3 días? 🤯🚿",
                "Te mintieron: El formol NO alisa mejor, solo plastifica y quema tu cabello ⚠️",
                "3 mitos gigantes sobre el alisado orgánico que debes dejar de creer hoy mismo ❌"
            ],
            cta: "Visítanos en Tunja o Moniquirá para una valoración personalizada y comprueba la diferencia 💖"
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
            audioRecomendado: "Voz en off clara + música de fondo acústica o trending aesthetic suave",
            gancho: {
                tiempo: "0:00 - 0:03 (Primeros 3 segundos)",
                visual: "Primer plano impactante del cabello brillante en movimiento o expresión de sorpresa mirando a la cámara.",
                audio: randomHook,
                textoPantalla: randomHook.replace(/[^\w\s¿?¡!]/gi, '').slice(0, 45) + "..."
            },
            problema: {
                tiempo: "0:03 - 0:12 (El problema)",
                visual: "Muestra tomas rápidas de cabello con frizz o usando plancha con vapor.",
                audio: `Seguro te pasa que vives frustrada porque ${pain.toLowerCase()}, y sientes que ningún tratamiento de salón te dura más de dos semanas.`,
                textoPantalla: "¿Te pasa esto todos los días? 🤦‍♀️"
            },
            solucion: {
                tiempo: "0:12 - 0:28 (La solución de Julie Alisados)",
                visual: "Tomas en el salón: aplicando producto, lavando en el lavacabezas con abundante agua, secando solo con secador y manos, y el resultado final brillante.",
                audio: `Por eso en Julie Alisados creamos un protocolo diferente: ${solution}. Con nuestra fórmula orgánica libre de formol, tu fibra capilar queda protegida, suave y con un brillo espejo real.`,
                textoPantalla: "✨ Liso Saludable 100% Enjuagable\n🌿 Sin Formol ni Olores Fuertes"
            },
            cierre: {
                tiempo: "0:28 - 0:35 (Llamado a la acción - CTA)",
                visual: "Julie o la estilista sonriendo señalando el botón de WhatsApp, mientras la clienta mueve su cabello feliz.",
                audio: `${topic.cta}. Estamos en Tunja y Moniquirá. ¡Comenta 'QUIERO MI LISO' o dale clic al enlace de nuestro perfil!`,
                textoPantalla: "📍 Tunja & Moniquirá\n📲 Clic en el enlace del perfil para agendar"
            },
            copyInstagram: sanitizeText(`✨ ${randomHook}\n\n¿Cansada de lidiar con el frizz y la plancha todos los días? En Julie Alisados transformamos tu cabello con tecnología 100% saludable, enjuagable y libre de formol.\n\n🌿 Beneficios clave:\n• ${topic.solutions.join("\n• ")}\n\n📍 Visítanos en nuestras sedes:\n• Tunja: Av. Olímpica #190, Pasaje Boulevard Local 140\n• Moniquirá: Cra 6 # 18-68\n\n📲 Agenda tu valoración al WhatsApp: +57 304 358 8180 (Enlace directo en la biografía).\n\n${BRAND.hashtagsGenerales.join(" ")}`)
        };
    };

    const generateCarousel = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.alisado_saludable;

        let slides = [
            {
                slide: 1,
                tipo: "PORTADA (Gancho)",
                titulo: sanitizeText(topic.hooks[0]),
                visual: "Foto de resultado impecable antes/después con texto grande y tipografía elegante.",
                nota: "El objetivo es incitar a deslizar hacia la izquierda."
            },
            {
                slide: 2,
                tipo: "EL PROBLEMA OCULTO",
                titulo: "Lo que muchas no te cuentan...",
                contenido: sanitizeText(`• ${topic.painPoints[0]}\n• Los químicos agresivos plastifican la fibra capilar en vez de nutrirla.\n• Terminas esclava del secador y la plancha cada fin de semana.`),
                visual: "Foto en detalle de puntas resecas o cabello perdiendo brillo."
            },
            {
                slide: 3,
                tipo: "LA DIFERENCIA SALUDABLE",
                titulo: "¿Por qué el Alisado Saludable es diferente?",
                contenido: sanitizeText(`🌿 100% Libre de Formol y derivados tóxicos.\n💧 Enjuagable en el salón: te vas con el cabello limpio y sin olores.\n✨ Aporte de más de 14 aminoácidos esenciales que reconstruyen la fuerza interna.`),
                visual: "Foto aplicando el producto con pincel en el salón de Julie Alisados."
            },
            {
                slide: 4,
                tipo: "LOS RESULTADOS REALES",
                titulo: "Lo que vas a disfrutar todos los días:",
                contenido: sanitizeText(`1. Salir de la ducha y secar tu cabello solo con aire tibio en 5 minutos.\n2. Cero frizz incluso en días de lluvia o humedad.\n3. Brillo espejo y movimiento natural con suavidad al tacto.`),
                visual: "Foto o video de la clienta moviendo su cabello con brillo intenso."
            },
            {
                slide: 5,
                tipo: "CUIDADO EN CASA",
                titulo: "El secreto para que dure 4 a 6 meses:",
                contenido: sanitizeText(`Usa siempre nuestra línea especializada JA By Julie Valencia:\n• Shampoo y Acondicionador sin sal ni parabenos.\n• Termoprotector diario contra el sol y calor.\n• Aceite Reparador de Argán y Macadamia en las puntas.`),
                visual: "Foto estética de los productos de la línea de Cuidado Capilar JA."
            },
            {
                slide: 6,
                tipo: "LLAMADO A LA ACCIÓN (CTA)",
                titulo: "¡Empieza tu transformación hoy!",
                contenido: sanitizeText(`📍 Sedes en Tunja y Moniquirá.\n💬 Escríbenos al WhatsApp: 304 358 8180\n\n👉 Guarda este post para no perderlo y compártelo con tu amiga que no suelta la plancha.`),
                visual: "Logo de Julie Alisados con botones de WhatsApp e iconos de guardar/compartir."
            }
        ];

        let copy = sanitizeText(`Desliza para descubrir cómo transformar tu cabello sin dañarlo ➡️✨\n\n${topic.title}: La verdadera alternativa para lucir un liso de salón todos los días sin pasar horas frente al espejo.\n\n¿Tienes dudas sobre si tu cabello es apto? Escríbenos al link de nuestra bio y una de nuestras especialistas te asesorará con todo el cariño 💖\n\n${BRAND.hashtagsGenerales.join(" ")}`);

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
                texto: sanitizeText(`✨ ¿Cansada de la plancha todos los días?\n\nEn Julie Alisados te dejamos el cabello liso, brillante y sedoso con nuestro Alisado Saludable 100% libre de formol.\n\n🌸 Saldrás de nuestra sede con el cabello completamente lavado y seco al aire.\n\n📍 Sedes: Tunja y Moniquirá\n📲 Responde a este estado para cotizar o agendar tu cita de esta semana 💖`)
            },
            {
                tipo: "Difusión / Recordatorio de Retoque (Clientas 4-6 meses)",
                texto: sanitizeText(`Hola bella 💖! Esperamos que estés teniendo un día hermoso.\n\nTe escribimos de Julie Alisados para recordarte que ya han pasado varios meses desde tu último tratamiento y es el momento ideal para realizar el retoque de tu raíz antes de que pierdas la disciplina en tu cabello.\n\nTenemos cupos disponibles para esta semana en nuestras sedes de Tunja y Moniquirá. ¿Te gustaría que te reservemos tu espacio? 🌸✨`)
            },
            {
                tipo: "Promoción de la Línea de Cuidado Capilar",
                texto: sanitizeText(`¿Sabías que el 70% de la duración de tu alisado depende de lo que usas en la ducha? 🚿✨\n\nNuestros combos JA By Julie Valencia (Extractos Naturales y Aceite de Argán) son 100% libres de sal y sulfatos agresivos para mantener tu brillo intacto por meses.\n\n📦 Envíos a todo el país y entrega inmediata en sedes de Tunja y Moniquirá. ¡Pide el tuyo respondiendo a este mensaje! 🛍️`)
            },
            {
                tipo: "Oferta Especial / Cupos de Fin de Semana",
                texto: sanitizeText(`🚨 ¡ÚLTIMOS 3 CUPOS PARA ESTE FIN DE SEMANA! 🚨\n\nSi quieres lucir un cabello impecable, brillante y sin frizz para tus eventos, ¡este es tu momento!\n\n📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n\nEscríbenos ahora mismo para apartar tu cita antes de que se agoten 📲✨`)
            }
        ];
    };

    const generateTipsArticle = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.alisado_saludable;

        return {
            titulo: sanitizeText(`Guía Completa: Cómo lograr un ${topic.title} y mantenerlo perfecto por meses`),
            extracto: sanitizeText(`Descubre los secretos profesionales para transformar tu cabello con fórmulas 100% libres de formol y cuidados en casa con la línea JA By Julie Valencia.`),
            secciones: [
                {
                    subtitulo: sanitizeText("¿Por qué elegir un Alisado Saludable sin químicos agresivos?"),
                    contenido: sanitizeText(`Durante años, muchas personas creyeron erróneamente que para tener un cabello liso era necesario exponerse a vapores molestos y formol. En Julie Alisados rompimos ese paradigma con formulaciones enriquecidas con más de 14 aminoácidos y proteínas que nutren la fibra capilar desde el interior.`)
                },
                {
                    subtitulo: sanitizeText("La importancia del lavado en el salón"),
                    contenido: sanitizeText(`Una de nuestras señas de identidad es la tecnología enjuagable: no te vas a tu casa con el producto en la cabeza ni tienes que esperar 3 días para lavarte el cabello. En el salón lavamos tu cabello con agua abundante y lo secamos simplemente con aire de secador y las manos para que veas el resultado real inmediato.`)
                },
                {
                    subtitulo: sanitizeText("Cómo cuidar tu tratamiento en casa"),
                    contenido: sanitizeText(`Para garantizar una duración de 4 a 6 meses, recomendamos usar exclusivamente shampoos sin sal como el Dúo Extractos Naturales o el Dúo Aceite de Argán de nuestra línea JA, además de proteger tu cabello con el Termoprotector JA antes de exponerlo a herramientas térmicas o al sol.`)
                }
            ],
            cta: sanitizeText(`¿Quieres vivir la experiencia en persona? Te esperamos en nuestras sedes de Tunja (Pasaje Boulevard Local 140) y Moniquirá (Cra 6 # 18-68). ¡Agenda tu cita al WhatsApp +57 304 358 8180!`)
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