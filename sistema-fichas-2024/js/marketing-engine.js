/**
 * Julie Alisados - Marketing Engine v3.0 (IA Generativa & Temas Personalizados)
 * Generador inteligente de contenido para Redes Sociales y Blog
 * Soporta tendencias virales automáticas Y búsqueda/redacción sobre CUALQUIER TEMA PERSONALIZADO que escriba la usuaria.
 * 100% fundamentado en dermatología, tricología y química cosmética.
 * CERO PSEUDOCIENCIA.
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
            "#JulieAlisados", "#AlisadoSaludable", "#GlassHair", "#TricologiaCapilar", 
            "#AlisadosTunja", "#AlisadosMoniquira", "#CabelloSano", "#Boyaca", "#CuidadoCapilar"
        ]
    };

    // Filtro estricto de vocabulario prohibido y pseudociencia
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

    // Biblioteca de Temáticas y Tendencias Virales Activas
    const TOPICS = {
        glass_hair: {
            title: "Tendencia 'Glass Hair': El Efecto Espejo Líquido Viral en TikTok",
            categoria: "Tendencia Viral",
            target: "Mujeres que buscan el acabado ultra liso, pulido, brillante y con caída de seda.",
            painPoints: [
                "Cabello opaco y poroso que absorbe la luz en vez de reflejarla",
                "Frizz estático que arruina el efecto liso perfecto",
                "Dependencia excesiva de siliconas pesadas que dejan el cabello grasoso"
            ],
            solutions: [
                "Alineación molecular y sellado termoactivo que cierra las escamas de la cutícula al 100%",
                "Reflejo de luz directo (Efecto Glass) gracias a la superficie cuticular completamente plana y pulida",
                "Movimiento líquido natural sin sensación de grasa ni apelmazamiento"
            ],
            hooks: [
                "El secreto detrás del efecto 'Glass Hair' viral de TikTok que todas quieren este mes 🪞✨",
                "¿Por qué tu cabello no tiene brillo espejo aunque uses mil gotas de silicona? 😱",
                "Cómo lograr un liso con caída líquida y brillo reflectivo real sin formol 💧✨"
            ],
            cta: "Consigue el efecto Glass Hair en Julie Alisados. ¡Escríbenos al WhatsApp para agendar tu valoración!"
        },
        skinification: {
            title: "Tendencia 'Skinification Capilar': Cuidar el Cuero Cabelludo como el Rostro",
            categoria: "Tendencia Viral",
            target: "Mujeres interesadas en la salud capilar integral, raíz grasa y nutrición avanzada.",
            painPoints: [
                "Saturar el cuero cabelludo con aceites pesados provocando foliculitis y asfixia",
                "Raíz grasa a las 24 horas de lavado y puntas resecas",
                "Falta de exfoliación y equilibrio del microbioma en el cuero cabelludo"
            ],
            solutions: [
                "Skinification: tratar el cuero cabelludo con el mismo rigor que la piel del rostro (ácido hialurónico, biotina y extractos botánicos)",
                "Dúo Extractos Naturales JA (1000 ml) con 12 botánicos purificantes para oxigenar el folículo sin resecar",
                "Dúo Argán con Ácido Hialurónico (500 ml) para hidratar la fibra reteniendo 1000 veces su peso en agua"
            ],
            hooks: [
                "Skinification Capilar: La razón por la que debes tratar tu cuero cabelludo como la piel de tu cara 🧴✨",
                "¿Tu raíz es grasa pero tus puntas son una paja? Estás cometiendo este error al lavarte 🚿❌",
                "Por qué el Ácido Hialurónico y la Biotina son el dúo invencible para tu cabello 💧🔬"
            ],
            cta: "Descubre la línea de Skinification Capilar JA By Julie Valencia con envíos a todo el país 🛍️"
        },
        hair_cycling: {
            title: "Tendencia 'Hair Cycling': El Método de Ciclado Capilar Semanal",
            categoria: "Tendencia Viral",
            target: "Clientas que quieren maximizar los resultados de su rutina en casa alternando días.",
            painPoints: [
                "Usar siempre el mismo producto hasta saturar la fibra capilar",
                "Acumulación de residuos y pérdida de volumen en la raíz",
                "No saber cuándo hidratar, cuándo nutrir y cuándo purificar"
            ],
            solutions: [
                "Hair Cycling: Día 1 Purificación (Extractos Naturales) • Día 2 Nutrición Lipídica (Argán + Macadamia) • Día 3 Protección & Descanso",
                "Evita el acostumbramiento y la saturación cuticular",
                "Garantiza que el alisado o terapia dure intacto hasta por 6 meses"
            ],
            hooks: [
                "El método 'Hair Cycling' que recomiendan los tricólogos para que tu cabello nunca se estanque 🔄✨",
                "¿Sientes que tu shampoo ya no te hace el mismo efecto? Necesitas ciclar tu rutina así 🚿",
                "La rutina de 3 pasos de Hair Cycling que multiplica el brillo de tu alisado 💖"
            ],
            cta: "Arma tu kit de Hair Cycling con nuestros combos JA. Escríbenos al WhatsApp para asesorarte 📲"
        },
        ciencia_crecimiento: {
            title: "La Verdad del Crecimiento Capilar (Retención vs Quiebre)",
            categoria: "Ciencia Capilar",
            target: "Mujeres frustradas que sienten que su cabello 'no les crece' o que recurren a mitos.",
            painPoints: [
                "Creer que el cabello no crece o que está 'estancado'",
                "Gastar dinero en menjurjes caseros o cortar el cabello en luna llena esperando milagros",
                "Puntas abiertas y quebradizas que se rompen al mismo ritmo que crece la raíz"
            ],
            solutions: [
                "Explicación biológica real: el cabello crece entre 1 y 1.2 cm al mes desde el folículo piloso según la genética y la fase anágena",
                "El verdadero problema no es el crecimiento, es la 'rotura en las puntas' por falta de lípidos y proteínas",
                "Al nutrir, sellar la cutícula y usar termoprotección, evitas que las puntas se partan y finalmente notas cómo ganas largo real mes a mes"
            ],
            hooks: [
                "¿Cortarse el cabello en luna llena hace que crezca más rápido? Te explicamos la verdad científica 🔬🌕",
                "Tu cabello SÍ está creciendo, pero lo estás perdiendo en las puntas por esta razón 🛑✨",
                "Por qué los menjurjes caseros (como cebolla o mayonesa) pueden dañar tu fibra capilar en vez de ayudarla 🙅‍♀️"
            ],
            cta: "Aprende a cuidar tu fibra capilar con ciencia real. Asesórate con nuestras profesionales en Tunja y Moniquirá al WhatsApp 📲"
        },
        alisado_saludable: {
            title: "Alisado Saludable (Tecnología Enjuagable & Tricología)",
            categoria: "Tratamiento Salón",
            target: "Mujeres que buscan un liso perfecto, brillante y sedoso 100% libre de formol.",
            painPoints: [
                "Cansada de plancharte todos los días provocando daño térmico acumulado",
                "Miedo a los químicos agresivos y al olor picante del formol que plastifica la fibra",
                "Frizz incontrolable cuando hay humedad ambiental"
            ],
            solutions: [
                "Alineación de la fibra mediante ácidos orgánicos biocompatibles y más de 14 aminoácidos",
                "Nutrición interna que respeta la estructura proteica sin quemar la cutícula",
                "Tecnología enjuagable: el proceso concluye lavando el cabello 100% en el salón con agua abundante"
            ],
            hooks: [
                "¿Por qué el formol NO alisa, sino que plastifica y ahoga tu cabello? Te lo explicamos 🔬⚠️",
                "La ciencia detrás de salir de la ducha y tener un liso perfecto secado solo con aire tibio ✨",
                "3 señales de que tu fibra capilar te está suplicando que dejes la plancha diaria 🛑"
            ],
            cta: "Escríbenos al WhatsApp y agenda tu valoración técnica personalizada en Tunja o Moniquirá 📲"
        },
        emulsion_zero: {
            title: "Emulsión Zero (Fórmula Biocompatible para Niñas y Madres)",
            categoria: "Tratamiento Salón",
            target: "Niñas desde 4 años, mamás lactantes, embarazadas y cabellos ultra procesados.",
            painPoints: [
                "El dolor diario de peinar cabellos rebeldes o con volumen excesivo en las mañanas",
                "Preocupación legítima de las madres por la seguridad toxicológica de los productos",
                "Falta de alternativas suaves y seguras en el mercado tradicional"
            ],
            solutions: [
                "Fórmula botánica con pH equilibrado y agentes acondicionadores certificados",
                "Disciplina y suaviza el rizo sin romper enlaces agresivos ni emitir vapores tóxicos",
                "Facilita el desenredo diario en minutos protegiendo el cuero cabelludo sensible"
            ],
            hooks: [
                "Mamá: la ciencia detrás de un desenredo suave y seguro para tu pequeña sin lágrimas 👧🎀",
                "¿Qué hace que la Emulsión Zero sea 100% segura para niñas y madres lactantes? 🔬💖",
                "Disciplina, brillo y suavidad para el cabello infantil sin un solo gramo de formol ✨"
            ],
            cta: "Dale a tu pequeña mañanas felices y sin tirones. Agenda su cita en Julie Alisados al WhatsApp 📲"
        },
        reposicion_aminoacidos: {
            title: "Reposición de Aminoácidos (SOS Anti-Quiebre & Reconstrucción)",
            categoria: "Terapia Capilar",
            target: "Cabellos elásticos, chiclosos, decolorados o con daño químico severo.",
            painPoints: [
                "Pérdida de masa proteica tras decoloraciones que vuelve el cabello chicloso",
                "Cabello que se rompe al contacto con el agua o al cepillar",
                "Porosidad extrema que impide retener la hidratación"
            ],
            solutions: [
                "Aporte directo de cisteína, arginina y aminoácidos de bajo peso molecular que penetran al córtex",
                "Reconstrucción de la fuerza tensil y detención inmediata del efecto chicle",
                "Sellado lipídico que devuelve la elasticidad sana a la fibra capilar"
            ],
            hooks: [
                "¿Cabello chicloso después de una decoloración? Así es como la química lo repara 🔬🚨",
                "Prueba de elasticidad: cómo saber si tu cabello perdió su masa proteica en 5 segundos 🧪",
                "No cortes tu cabello decolorado antes de devolverle sus aminoácidos esenciales 💇‍♀️❌"
            ],
            cta: "Realizamos una prueba técnica de elasticidad gratuita en tu valoración. ¡Escríbenos hoy mismo!"
        },
        cuidado_casa: {
            title: "Química del Cuidado en Casa JA By Julie Valencia",
            categoria: "Línea de Productos",
            target: "Clientas con alisado o cabello que busca mantenimiento profesional diario.",
            painPoints: [
                "El uso de shampoos con cloruro de sodio (sal) y sulfatos agresivos que abren la cutícula y barren el alisado",
                "Estrés térmico y fotooxidativo por exposición solar y secadores sin protección",
                "Puntas abiertas por pérdida de lípidos naturales"
            ],
            solutions: [
                "Fórmulas con pH ácido controlado (4.5 a 5.5) para mantener la cutícula sellada",
                "Dúo Extractos Naturales (1000 ml) con 12 botánicos purificantes para cuero cabelludo graso",
                "Dúo Argán con Biotina y Ácido Hialurónico (500 ml) para rescate lipídico de cabellos secos",
                "Termoprotector JA que crea una barrera física contra el calor, rayos UV y polución",
                "Aceite Reparador de Argán y Macadamia JA (60 ml) rico en Omega 7 para sellar puntas sin engrasar"
            ],
            hooks: [
                "¿Por qué los shampoos con sal arruinan tu alisado? La explicación científica que nadie te da 🚿🔬",
                "La física de la plancha: por qué un termoprotector es obligatorio para no quemar la queratina 🔥🛡️",
                "3 reglas de oro respaldadas por la ciencia para que tu alisado dure más de 5 meses ✨"
            ],
            cta: "Consigue tu kit de cuidado capilar JA con envío a todo el país o en nuestras sedes de Tunja y Moniquirá 🛍️"
        }
    };

    // Función Inteligente para Generar desde un TEMA PERSONALIZADO
    const buildCustomTopic = (customQuery) => {
        const clean = sanitizeText(customQuery).trim();
        if (!clean) return TOPICS.glass_hair;

        return {
            title: `Especial: ${clean.charAt(0).toUpperCase() + clean.slice(1)}`,
            categoria: "Tema Personalizado",
            target: "Clientas de Julie Alisados interesadas en este tema específico.",
            painPoints: [
                `Lidiar con ${clean.toLowerCase()} sin saber cuál es el tratamiento adecuado`,
                "Tener miedo a empeorar la condición de la fibra capilar por usar productos agresivos",
                "Falta de asesoría personalizada y diagnósticos erróneos"
            ],
            solutions: [
                `Protocolo especializado de Julie Alisados adaptado para ${clean.toLowerCase()}`,
                "Fórmulas 100% libres de formol enriquecidas con aminoácidos y botánicos",
                "Diagnóstico capilar previo y asesoría de mantenimiento con la línea JA By Julie Valencia"
            ],
            hooks: [
                `¿Tienes dudas sobre ${clean.toLowerCase()}? Esto es lo que necesitas saber antes de tu cita ✨🔍`,
                `Todo lo que nadie te había explicado sobre ${clean.toLowerCase()} según la ciencia capilar 🔬`,
                `3 claves fundamentales para cuidar tu cabello si tienes ${clean.toLowerCase()} 💖`
            ],
            cta: `¿Quieres una valoración personalizada para tu caso? Escríbenos al WhatsApp de Julie Alisados (+57 304 358 8180) 📲`
        };
    };

    const getTopicData = (topicKey, customQuery = "") => {
        if (customQuery && customQuery.trim().length > 2) {
            return buildCustomTopic(customQuery);
        }
        return TOPICS[topicKey] || TOPICS.glass_hair;
    };

    const generateReelScript = (topicKey, customQuery = "") => {
        const topic = getTopicData(topicKey, customQuery);
        const randomHook = topic.hooks[Math.floor(Math.random() * topic.hooks.length)];
        const pain = topic.painPoints[Math.floor(Math.random() * topic.painPoints.length)];
        const solution = topic.solutions[Math.floor(Math.random() * topic.solutions.length)];

        return {
            titulo: `Guion Reel / TikTok: ${topic.title}`,
            duracionSugerida: "30 a 45 segundos",
            audioRecomendado: "Voz en off clara y profesional + música trending aesthetic suave",
            gancho: {
                tiempo: "0:00 - 0:03 (Primeros 3 segundos)",
                visual: "Primer plano nítido del cabello brillante en movimiento o prueba visual en cámara.",
                audio: randomHook,
                textoPantalla: randomHook.replace(/[^\w\s¿?¡!]/gi, '').slice(0, 45) + "..."
            },
            problema: {
                tiempo: "0:03 - 0:12 (El problema / Empatía)",
                visual: "Tomas rápidas de cabello con frizz o cometiendo errores cotidianos de cuidado.",
                audio: `La mayoría de personas creen que ${pain.toLowerCase()}, pero el secreto real está en cómo tratas la cutícula.`,
                textoPantalla: "¿Te pasa esto con tu cabello? 🤦‍♀️"
            },
            solucion: {
                tiempo: "0:12 - 0:28 (La solución profesional en Julie Alisados)",
                visual: "Tomas de salón: lavando en lavacabezas con agua abundante, secado solo con manos y secador, mostrando el brillo real.",
                audio: `La respuesta técnica es: ${solution}. En Julie Alisados logramos este resultado con tecnología saludable 100% libre de formol.`,
                textoPantalla: "✨ Resultados Reales • Sin Filtros\n🌿 Libre de Formol • Enjuagable"
            },
            cierre: {
                tiempo: "0:28 - 0:35 (Llamado a la acción - CTA)",
                visual: "Estilista sonriendo junto a la clienta moviendo su cabello con brillo y soltura.",
                audio: `${topic.cta}. Visítanos en Tunja o Moniquirá. ¡Clic al enlace del perfil!`,
                textoPantalla: "📍 Sedes en Tunja & Moniquirá\n📲 Agenda tu cita al WhatsApp"
            },
            copyInstagram: sanitizeText(`✨ ${randomHook}\n\n¿Quieres lucir un cabello impecable y saludable?\n\n🌿 **Claves de este resultado:**\n• ${topic.solutions.join("\n• ")}\n\n📍 **Sedes Oficiales:**\n• Tunja: Av. Olímpica #190, Pasaje Boulevard Local 140\n• Moniquirá: Cra 6 # 18-68\n\n📲 **Asesoría y citas:** WhatsApp +57 304 358 8180 (Enlace directo en la biografía).\n\n${BRAND.hashtagsGenerales.join(" ")}`)
        };
    };

    const generateCarousel = (topicKey, customQuery = "") => {
        const topic = getTopicData(topicKey, customQuery);

        let slides = [
            {
                slide: 1,
                tipo: "PORTADA (Gancho)",
                titulo: sanitizeText(topic.hooks[0]),
                visual: "Foto de resultado de impacto con tipografía editorial en dorado y blanco.",
                nota: "Invita a deslizar para conocer el secreto del tratamiento."
            },
            {
                slide: 2,
                tipo: "EL ERROR COMÚN",
                titulo: "Lo que muchas no saben:",
                contenido: sanitizeText(`• ${topic.painPoints[0]}\n• Los químicos agresivos o formol solo asfixian la fibra capilar.\n• La verdadera transformación ocurre desde el interior con aminoácidos.`),
                visual: "Foto en detalle de fibra capilar o textura del producto."
            },
            {
                slide: 3,
                tipo: "EL PROTOCOLO TÉCNICO",
                titulo: "La diferencia saludable:",
                contenido: sanitizeText(`✨ ${topic.solutions[0]}\n🌿 Aporte de aminoácidos biocompatibles sin vapores molestos.\n💧 Retención hídrica prolongada sin frizz ni estática.`),
                visual: "Foto aplicando el tratamiento con pincel en Julie Alisados."
            },
            {
                slide: 4,
                tipo: "RESULTADO COMPROBADO",
                titulo: "Lo que vas a disfrutar:",
                contenido: sanitizeText(`1. Salir de la ducha y secar tu cabello solo con manos en minutos.\n2. Cero frizz incluso en días de lluvia.\n3. Caída suelta, sedosa y brillo espejo real.`),
                visual: "Foto o video del cabello en movimiento con luz natural."
            },
            {
                slide: 5,
                tipo: "MANTENIMIENTO EN CASA",
                titulo: "El secreto para que dure meses:",
                contenido: sanitizeText(`Usa la línea oficial JA By Julie Valencia:\n• Shampoos sin sal ni sulfatos agresivos (pH 4.5 - 5.5).\n• Termoprotector diario contra planchas y sol.\n• Gotas de Aceite de Argán y Macadamia JA en puntas.`),
                visual: "Foto estética de los productos JA By Julie Valencia."
            },
            {
                slide: 6,
                tipo: "LLAMADO A LA ACCIÓN (CTA)",
                titulo: "¡Pide tu cita hoy mismo!",
                contenido: sanitizeText(`📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n💬 WhatsApp: 304 358 8180\n\n👉 Guarda este post y compártelo con tu amiga.`),
                visual: "Logo de Julie Alisados con iconos de interacción de redes."
            }
        ];

        let copy = sanitizeText(`Desliza para descubrir todo sobre este tema ➡️✨\n\n${topic.title}: La combinación perfecta entre estética de salón y salud capilar real.\n\n¿Tienes dudas? Escríbenos al enlace de la bio y te asesoramos con gusto 💖\n\n${BRAND.hashtagsGenerales.join(" ")}`);

        return {
            titulo: `Carrusel de 6 Diapositivas: ${topic.title}`,
            slides: slides,
            copy: copy
        };
    };

    const generateWhatsAppMessages = (customQuery = "") => {
        const customText = customQuery ? sanitizeText(customQuery).trim() : "";
        const topicMention = customText ? `sobre *${customText}*` : "sobre nuestro Alisado Saludable";

        return [
            {
                tipo: "Estado de WhatsApp (Venta & Asesoría)",
                texto: sanitizeText(`✨ ¿Buscabas información ${topicMention}?\n\nEn Julie Alisados cuidamos tu fibra capilar con fórmulas 100% libres de formol y enjuagables en salón.\n\n📍 Sedes: Tunja y Moniquirá\n📲 Responde a este estado para cotizar o agendar tu cita 💖`)
            },
            {
                tipo: "Difusión / Cuidado Especializado",
                texto: customText ? sanitizeText(`Hola bella 💖! ¿Sabías que el tratamiento adecuado para ${customText.toLowerCase()} requiere un diagnóstico profesional y nutrición con aminoácidos?\n\nEn Julie Alisados formulamos protocolos libres de químicos agresivos para que tu cabello luzca impecable.\n\n📦 Escríbenos para asesorarte o pedir tu kit oficial JA con envíos a toda Colombia! 🛍️✨`) : sanitizeText(`Hola bella 💖! ¿Sabías que el secreto de un cabello abundante y brillante empieza en el cuero cabelludo?\n\nNuestra línea JA By Julie Valencia equilibra la grasa en la raíz y nutre las puntas con Ácido Hialurónico, Biotina y 12 Extractos Botánicos.\n\n📦 Pide tu combo hoy con envío inmediato a todo Colombia respondiendo a este mensaje! 🛍️✨`)
            },
            {
                tipo: "Recordatorio de Retoque de Raíz",
                texto: sanitizeText(`¡Hola hermosa! 🌸 Te saludamos de Julie Alisados.\n\nSi ya pasaron entre 4 y 6 meses desde tu último tratamiento, tu raíz está lista para retoque. Alisar a tiempo la raíz nueva mantiene tu disciplina perfecta sin dañar los largos.\n\nTenemos cupos disponibles para esta semana en Tunja y Moniquirá. ¿Te agendamos un turno? 💖`)
            },
            {
                tipo: "Alerta de Cupos / Especial",
                texto: customText ? sanitizeText(`🚨 ¡ESPECIAL: ${customText.toUpperCase()}! 🚨\n\n¿Quieres solucionar esto de forma saludable y sin maltratar tu cabello?\n\n📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n\nEscríbenos ahora mismo y asegura tu valoración con nuestras profesionales 📲✨`) : sanitizeText(`🚨 ¡ÚLTIMOS CUPOS PARA ESTE FIN DE SEMANA! 🚨\n\nLuce un cabello impecable y sin frizz para tus eventos sin esclavizarte a la plancha.\n\n📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n\nEscríbenos ahora mismo y asegura tu cita antes de que se agoten 📲✨`)
            }
        ];
    };

    const generateTipsArticle = (topicKey, customQuery = "") => {
        const topic = getTopicData(topicKey, customQuery);
        const clean = customQuery ? sanitizeText(customQuery).trim() : "";

        if (clean && clean.length > 2) {
            return {
                titulo: sanitizeText(`Guía Especializada: ${clean.charAt(0).toUpperCase() + clean.slice(1)}`),
                extracto: sanitizeText(`Todo lo que necesitas saber sobre ${clean.toLowerCase()} con respaldo científico, tricología y salud para tu fibra capilar.`),
                secciones: [
                    {
                        subtitulo: sanitizeText(`1. Diagnóstico y evaluación para ${clean.toLowerCase()}`),
                        contenido: sanitizeText(`Cada tipo de cabello responde de manera única según su porosidad, elasticidad y antecedentes químicos. Para abordar ${clean.toLowerCase()}, en Julie Alisados evaluamos la fibra antes de cualquier servicio para garantizar un resultado seguro y duradero.`)
                    },
                    {
                        subtitulo: sanitizeText("2. Por qué evitar químicos agresivos y formol"),
                        contenido: sanitizeText(`Muchos productos tradicionales contienen formol que plastifica la cutícula temporalmente pero la debilita a largo plazo. En Julie Alisados utilizamos fórmulas bio-orgánicas y tecnología enjuagable que nutre con aminoácidos esenciales.`)
                    },
                    {
                        subtitulo: sanitizeText("3. El protocolo de cuidado en el hogar"),
                        contenido: sanitizeText(`Para garantizar una duración de 4 a 6 meses, es indispensable utilizar shampoos sin sal con pH balanceado y termoprotectores como los de la línea oficial JA By Julie Valencia.`)
                    }
                ],
                cta: sanitizeText(`¿Lista para lucir el cabello de tus sueños? Agenda tu cita en nuestras sedes de Tunja (Pasaje Boulevard Local 140) o Moniquirá (Cra 6 # 18-68). ¡Escríbenos al WhatsApp +57 304 358 8180!`)
            };
        }

        return {
            titulo: sanitizeText(`Guía Especializada: ${topic.title}`),
            extracto: sanitizeText(`Todo lo que necesitas saber para cuidar tu cabello con respaldo científico, tricología y salud para tu fibra capilar.`),
            secciones: [
                {
                    subtitulo: sanitizeText("1. La importancia de un diagnóstico capilar profesional"),
                    contenido: sanitizeText(`Cada tipo de cabello responde de manera única según su porosidad, elasticidad y antecedentes químicos. En Julie Alisados evaluamos la fibra antes de cualquier servicio para garantizar un resultado seguro y duradero.`)
                },
                {
                    subtitulo: sanitizeText("2. Por qué evitar químicos agresivos y formol"),
                    contenido: sanitizeText(`Muchos productos tradicionales contienen formol que plastifica la cutícula temporalmente pero la debilita a largo plazo. En Julie Alisados utilizamos fórmulas orgánicas y tecnología enjuagable que nutre con aminoácidos esenciales.`)
                },
                {
                    subtitulo: sanitizeText("3. El protocolo de cuidado en el hogar"),
                    contenido: sanitizeText(`Para garantizar una duración de 4 a 6 meses, es indispensable utilizar shampoos sin sal con pH balanceado y termoprotectores como los de la línea oficial JA By Julie Valencia.`)
                }
            ],
            cta: sanitizeText(`¿Lista para lucir el cabello de tus sueños? Agenda tu cita en nuestras sedes de Tunja (Pasaje Boulevard Local 140) o Moniquirá (Cra 6 # 18-68). ¡Escríbenos al WhatsApp +57 304 358 8180!`)
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