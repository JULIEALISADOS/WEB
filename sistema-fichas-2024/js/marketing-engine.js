/**
 * Julie Alisados - Marketing Engine v2.0 (Tendencias Virales & Tricología Real)
 * Generador inteligente de contenido para Redes Sociales y Blog
 * Monitoreo de tendencias virales en belleza capilar (Glass Hair, Skinification, Hair Cycling, Retención).
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
        // 🔥 TENDENCIAS VIRALES
        glass_hair: {
            title: "🔥 Tendencia 'Glass Hair': El Efecto Espejo Líquido Viral en TikTok",
            categoria: "Tendencia Viral",
            target: "Mujeres que buscan el acabado ultra liso, pulido, brillante y con caída de seda que es tendencia global.",
            painPoints: [
                "Cabello opaco y poroso que absorbe la luz en vez de reflejarla",
                "Frizz estático que arruina el efecto liso perfecto",
                "Dependencia excesiva de siliconas pesadas que dejan el cabello grasoso y pesado"
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
            title: "🔥 Tendencia 'Skinification Capilar': Cuidar el Cuero Cabelludo como el Rostro",
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
            title: "🔥 Tendencia 'Hair Cycling': El Método de Ciclado Capilar Semanal",
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
        // 🔬 CIENCIA & TRICOLOGÍA
        ciencia_crecimiento: {
            title: "🔬 La Verdad del Crecimiento Capilar (Retención vs Quiebre)",
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
            title: "✨ Alisado Saludable (Tecnología Enjuagable & Tricología)",
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
            title: "👧 Emulsión Zero (Fórmula Biocompatible para Niñas y Madres)",
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
            title: "🧪 Reposición de Aminoácidos (SOS Anti-Quiebre & Reconstrucción)",
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
            title: "🧼 Química del Cuidado en Casa JA By Julie Valencia",
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

    const generateReelScript = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.glass_hair;
        const randomHook = topic.hooks[Math.floor(Math.random() * topic.hooks.length)];
        const pain = topic.painPoints[Math.floor(Math.random() * topic.painPoints.length)];
        const solution = topic.solutions[Math.floor(Math.random() * topic.solutions.length)];

        return {
            titulo: `Guion Reel / TikTok: ${topic.title}`,
            duracionSugerida: "30 a 45 segundos",
            audioRecomendado: "Voz en off clara y profesional + música trending aesthetic o beat dinámico en tendencia",
            gancho: {
                tiempo: "0:00 - 0:03 (Primeros 3 segundos)",
                visual: "Primer plano nítido demostrando el efecto visual (brillo espejo en movimiento, efecto líquido o prueba en cámara).",
                audio: randomHook,
                textoPantalla: randomHook.replace(/[^\w\s¿?¡!]/gi, '').slice(0, 45) + "..."
            },
            problema: {
                tiempo: "0:03 - 0:12 (El problema / Mito viral)",
                visual: "Tomas de cabello con frizz, opaco o cometiendo errores cotidianos de cuidado.",
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
            copyInstagram: sanitizeText(`✨ ${randomHook}\n\n¿Quieres sumarte a las mejores tendencias capilares con resultados profesionales y saludables?\n\n🌿 **Claves de este resultado:**\n• ${topic.solutions.join("\n• ")}\n\n📍 **Sedes Oficiales:**\n• Tunja: Av. Olímpica #190, Pasaje Boulevard Local 140\n• Moniquirá: Cra 6 # 18-68\n\n📲 **Asesoría y citas:** WhatsApp +57 304 358 8180 (Enlace directo en la biografía).\n\n${BRAND.hashtagsGenerales.join(" ")}`)
        };
    };

    const generateCarousel = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.glass_hair;

        let slides = [
            {
                slide: 1,
                tipo: "PORTADA (Gancho de Tendencia)",
                titulo: sanitizeText(topic.hooks[0]),
                visual: "Foto de resultado de impacto con tipografía editorial en dorado y blanco.",
                nota: "Invita a deslizar para conocer el secreto de la tendencia."
            },
            {
                slide: 2,
                tipo: "EL ERROR / MITO",
                titulo: "Por qué no lo habías logrado:",
                contenido: sanitizeText(`• ${topic.painPoints[0]}\n• Usar productos inadecuados solo engrasa la superficie.\n• La verdadera transformación ocurre desde el interior de la fibra capilar.`),
                visual: "Foto en detalle de fibra capilar o textura del producto."
            },
            {
                slide: 3,
                tipo: "LA CIENCIA DETRÁS DE LA TENDENCIA",
                titulo: "El protocolo técnico:",
                contenido: sanitizeText(`✨ Sellado cuticular perfecto que permite el reflejo total de la luz.\n🌿 Aporte de aminoácidos biocompatibles sin asfixiar la médula.\n💧 Retención hídrica prolongada sin frizz ni estática.`),
                visual: "Foto aplicando el tratamiento con pincel en Julie Alisados."
            },
            {
                slide: 4,
                tipo: "RESULTADO COMPROBADO",
                titulo: "Lo que verás en el espejo:",
                contenido: sanitizeText(`1. Salir de la ducha y secar tu cabello solo con manos en minutos.\n2. Cero frizz en climas húmedos.\n3. Caída suelta, sedosa y brillo espejo real.`),
                visual: "Foto o video del cabello en movimiento con luz natural."
            },
            {
                slide: 5,
                tipo: "MANTENIMIENTO EN CASA",
                titulo: "Cómo conservarlo por meses:",
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

        let copy = sanitizeText(`Desliza para descubrir cómo lograr esta tendencia en tu cabello ➡️✨\n\n${topic.title}: La combinación perfecta entre estética de revista y salud capilar real.\n\n¿Quieres saber cuál es el protocolo ideal para ti? Escríbenos al enlace de la bio y te asesoramos con gusto 💖\n\n${BRAND.hashtagsGenerales.join(" ")}`);

        return {
            titulo: `Carrusel de Tendencia: ${topic.title}`,
            slides: slides,
            copy: copy
        };
    };

    const generateWhatsAppMessages = () => {
        return [
            {
                tipo: "Estado de WhatsApp (Tendencia Glass Hair)",
                texto: sanitizeText(`🪞 ¿Quieres el efecto 'Glass Hair' (brillo espejo) en tu cabello?\n\nEn Julie Alisados logramos un liso líquido, suelto y con brillo reflectivo real con nuestro Alisado Saludable 100% libre de formol.\n\n📍 Sedes: Tunja y Moniquirá\n📲 Responde a este estado para cotizar o agendar tu cita 💖`)
            },
            {
                tipo: "Difusión / Skinification Capilar (Cuero Cabelludo & Raíz)",
                texto: sanitizeText(`Hola bella 💖! ¿Sabías que el secreto de un cabello abundante y brillante empieza en el cuero cabelludo?\n\nNuestra línea JA By Julie Valencia equilibra la grasa en la raíz y nutre las puntas con Ácido Hialurónico, Biotina y 12 Extractos Botánicos.\n\n📦 Pide tu combo hoy con envío inmediato a todo Colombia respondiendo a este mensaje! 🛍️✨`)
            },
            {
                tipo: "Recordatorio de Retoque (Mantén tu Liso de Revista)",
                texto: sanitizeText(`¡Hola hermosa! 🌸 Te saludamos de Julie Alisados.\n\nSi ya pasaron entre 4 y 6 meses desde tu último Alisado Saludable, tu raíz está lista para retoque. Alisar a tiempo la raíz nueva mantiene tu disciplina perfecta sin dañar los largos.\n\nTenemos cupos disponibles para esta semana en Tunja y Moniquirá. ¿Te agendamos un turno? 💖`)
            },
            {
                tipo: "Alerta de Cupos de Fin de Semana",
                texto: sanitizeText(`🚨 ¡ÚLTIMOS CUPOS PARA ESTE FIN DE SEMANA! 🚨\n\nLuce un cabello impecable y sin frizz para tus eventos sin esclavizarte a la plancha.\n\n📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n\nEscríbenos ahora mismo y asegura tu cita antes de que se agoten 📲✨`)
            }
        ];
    };

    const generateTipsArticle = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.glass_hair;

        return {
            titulo: sanitizeText(`Tendencias & Ciencia: ${topic.title}`),
            extracto: sanitizeText(`Todo lo que necesitas saber para sumarte a las tendencias capilares más virales con respaldo científico y salud para tu fibra capilar.`),
            secciones: [
                {
                    subtitulo: sanitizeText("1. El origen y la física detrás de esta tendencia"),
                    contenido: sanitizeText(`Las tendencias actuales en belleza buscan acabados naturales, pulidos y con movimiento orgánico. A nivel óptico, el brillo no es más que el reflejo de la luz sobre una cutícula capilar completamente plana y sellada. Cuando el cabello está poroso o dañado por formol o calor excesivo, la luz se dispersa y el cabello luce opaco.`)
                },
                {
                    subtitulo: sanitizeText("2. Por qué no debes usar siliconas pesadas para simular brillo"),
                    contenido: sanitizeText(`Muchos productos comerciales crean una falsa ilusión de brillo aplicando siliconas no solubles que terminan asfixiando el cabello y acumulando peso. En Julie Alisados trabajamos con aceites finos como el Aceite Reparador de Argán y Macadamia JA (rico en Omega 7) y formulaciones biocompatibles que nutren sin dejar residuo graso.`)
                },
                {
                    subtitulo: sanitizeText("3. El protocolo en salón y el cuidado en el hogar"),
                    contenido: sanitizeText(`Para lograr una durabilidad de 4 a 6 meses, es indispensable combinar el servicio profesional en salón con una rutina libre de sal y cloruros agresivos en casa. La línea JA By Julie Valencia garantiza que la cutícula permanezca sellada en cada lavado.`)
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