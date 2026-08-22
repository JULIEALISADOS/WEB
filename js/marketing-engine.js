/**
 * Julie Alisados - Marketing Engine v1.1 (Base Científica & Tricología Real)
 * Generador inteligente de contenido para Redes Sociales y Blog
 * 100% fundamentado en dermatología, tricología y química cosmética.
 * CERO PSEUDOCIENCIA (Sin mitos de fases lunares, recetas caseras o promesas milagrosas).
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
            "#JulieAlisados", "#AlisadoSaludable", "#TricologiaCapilar", "#CienciaCapilar", 
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

    // Biblioteca de Temáticas y Datos Clave con Base Científica Real
    const TOPICS = {
        ciencia_crecimiento: {
            title: "La Verdad Científica del Crecimiento Capilar (Retención vs Quiebre)",
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
        const topic = TOPICS[topicKey] || TOPICS.ciencia_crecimiento;
        const randomHook = topic.hooks[Math.floor(Math.random() * topic.hooks.length)];
        const pain = topic.painPoints[Math.floor(Math.random() * topic.painPoints.length)];
        const solution = topic.solutions[Math.floor(Math.random() * topic.solutions.length)];

        return {
            titulo: `Guion Reel / TikTok: ${topic.title}`,
            duracionSugerida: "30 a 45 segundos",
            audioRecomendado: "Voz en off clara y profesional + música de fondo acústica o trending aesthetic suave",
            gancho: {
                tiempo: "0:00 - 0:03 (Primeros 3 segundos)",
                visual: "Primer plano nítido demostrando el efecto (cabello brillante en movimiento, prueba de elasticidad o comparativa visual).",
                audio: randomHook,
                textoPantalla: randomHook.replace(/[^\w\s¿?¡!]/gi, '').slice(0, 45) + "..."
            },
            problema: {
                tiempo: "0:03 - 0:12 (Explicación del mito o problema)",
                visual: "Tomas de cabello con puntas abiertas, uso de planchas con vapor o mitos comunes.",
                audio: `Muchas veces creemos que ${pain.toLowerCase()}, pero la realidad científica es completamente distinta.`,
                textoPantalla: "¿Creías esto sobre tu cabello? 🧐🔬"
            },
            solucion: {
                tiempo: "0:12 - 0:28 (La base científica y solución en Julie Alisados)",
                visual: "Tomas profesionales en el salón: aplicando tratamiento con pincel, lavando en lavacabezas con abundante agua, secando solo con manos y secador, mostrando el brillo real.",
                audio: `Científicamente está comprobado: ${solution}. En Julie Alisados cuidamos la salud de tu fibra capilar con fórmulas 100% libres de formol y ricas en nutrientes reales.`,
                textoPantalla: "✨ Ciencia Capilar Real\n🌿 Sin Formol • 100% Enjuagable"
            },
            cierre: {
                tiempo: "0:28 - 0:35 (Llamado a la acción - CTA)",
                visual: "Julie o la estilista sonriendo señalando el enlace de WhatsApp con el resultado final en movimiento.",
                audio: `${topic.cta}. Estamos en Tunja y Moniquirá. ¡Escríbenos para tu valoración!`,
                textoPantalla: "📍 Tunja & Moniquirá\n📲 Agenda tu valoración al WhatsApp"
            },
            copyInstagram: sanitizeText(`🔬 ${randomHook}\n\nEn el mundo del cuidado capilar abundan los mitos, pero en Julie Alisados trabajamos con ciencia, tricología y fórmulas profesionales respetuosas con tu salud.\n\n🌿 **Lo que debes saber:**\n• ${topic.solutions.join("\n• ")}\n\n📍 **Visítanos en nuestras sedes:**\n• Tunja: Av. Olímpica #190, Pasaje Boulevard Local 140\n• Moniquirá: Cra 6 # 18-68\n\n📲 **Asesoría y citas al WhatsApp:** +57 304 358 8180 (Enlace directo en la biografía).\n\n${BRAND.hashtagsGenerales.join(" ")}`)
        };
    };

    const generateCarousel = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.ciencia_crecimiento;

        let slides = [
            {
                slide: 1,
                tipo: "PORTADA (Gancho Científico)",
                titulo: sanitizeText(topic.hooks[0]),
                visual: "Foto de resultado impecable con texto grande y tipografía editorial elegante.",
                nota: "Invita a deslizar para desmentir el mito o conocer la ciencia."
            },
            {
                slide: 2,
                tipo: "EL MITO VS LA REALIDAD",
                titulo: "La creencia popular:",
                contenido: sanitizeText(`• ${topic.painPoints[0]}\n• Los mitos caseros o lunares no tienen sustento biológico.\n• El cabello es una estructura proteica que responde a la química y a los hábitos correctos.`),
                visual: "Gráfico sutil o foto de cabello mostrando la cutícula."
            },
            {
                slide: 3,
                tipo: "CÓMO FUNCIONA EN REALIDAD",
                titulo: "Lo que dice la Tricología:",
                contenido: sanitizeText(`🔬 El folículo piloso produce fibra capilar a un ritmo constante genético.\n🛡️ La clave del largo y volumen está en la RETENCIÓN: evitar que las puntas se quiebren.\n💧 Mantener un pH ácido y cutículas cerradas previene la pérdida de humedad interna.`),
                visual: "Foto de aplicación de tratamiento en el salón de Julie Alisados."
            },
            {
                slide: 4,
                tipo: "LA SOLUCIÓN EN EL SALÓN",
                titulo: "Tratamientos con Propósito:",
                contenido: sanitizeText(`En Julie Alisados no cubrimos el cabello con químicos plásticos:\n1. Aportamos aminoácidos que reestructuran el córtex.\n2. Sellamos con calor controlado y fórmulas enjuagables.\n3. Tu cabello queda libre de residuos, suave y con brillo real.`),
                visual: "Foto o video del cabello lavado y secado solo a mano con aire tibio."
            },
            {
                slide: 5,
                tipo: "RUTINA EN CASA",
                titulo: "El protocolo de mantenimiento:",
                contenido: sanitizeText(`Usa productos formulados sin sal ni sulfatos agresivos:\n• Shampoos con pH balanceado (Línea JA By Julie Valencia).\n• Termoprotector antes de cualquier exposición térmica o solar.\n• Aceite Reparador de Argán y Macadamia para nutrición de puntas.`),
                visual: "Foto estética de los productos de la línea de Cuidado Capilar JA."
            },
            {
                slide: 6,
                tipo: "LLAMADO A LA ACCIÓN (CTA)",
                titulo: "¡Cuida tu cabello con profesionales!",
                contenido: sanitizeText(`📍 Sedes en Tunja y Moniquirá.\n💬 Escríbenos al WhatsApp: 304 358 8180\n\n👉 Guarda este post para consultarlo y compártelo para que más mujeres conozcan la verdad.`),
                visual: "Logo de Julie Alisados con botones de WhatsApp e iconos de interacción."
            }
        ];

        let copy = sanitizeText(`Desliza para entender cómo funciona realmente tu cabello según la ciencia ➡️🔬\n\n${topic.title}: Aprende a cuidarte con información verificada y tratamientos de salón 100% seguros.\n\n¿Quieres saber cuál es el tratamiento ideal para tu tipo de cabello? Escríbenos al link de nuestra bio y te asesoramos con gusto 💖\n\n${BRAND.hashtagsGenerales.join(" ")}`);

        return {
            titulo: `Carrusel Educativo: ${topic.title}`,
            slides: slides,
            copy: copy
        };
    };

    const generateWhatsAppMessages = () => {
        return [
            {
                tipo: "Estado de WhatsApp (Ciencia & Asesoría)",
                texto: sanitizeText(`🔬 ¿Sientes que tu cabello 'no te crece'?\n\nLa ciencia nos demuestra que el cabello crece ~1 cm al mes, pero si las puntas están quebradizas, se rompe a la misma velocidad.\n\n✨ En Julie Alisados fortalecemos y sellamos tu fibra capilar para que retengas tu largo con brillo y sedosidad.\n\n📍 Tunja & Moniquirá\n📲 Responde a este estado para una valoración personalizada 💖`)
            },
            {
                tipo: "Difusión / Recordatorio de Retoque Saludable",
                texto: sanitizeText(`Hola hermosa 💖! Te saludamos desde Julie Alisados.\n\n¿Sabías que cuando la raíz crece más de 4-5 cm cambia el balance de peso y la disciplina de tu cabello? Es el momento óptimo para tu retoque de Alisado Saludable sin tocar los largos ya tratados.\n\nTenemos agenda abierta para esta semana en nuestras sedes de Tunja y Moniquirá. ¿Te reservamos un turno? 🌸✨`)
            },
            {
                tipo: "Educación de Producto (Línea JA By Julie Valencia)",
                texto: sanitizeText(`¿Por qué no debes usar shampoo con sal después de un alisado? 🚿\n\nLa sal (cloruro de sodio) actúa como un abrasivo que abre la cutícula y barre los aminoácidos del tratamiento.\n\nNuestros combos JA By Julie Valencia son 100% libres de sal y sulfatos agresivos para cuidar tu inversión.\n\n📦 Pide tu kit con entrega en Tunja, Moniquirá o envío nacional respondiendo a este mensaje! 🛍️`)
            },
            {
                tipo: "Oferta de Fin de Semana (Cuidado Profesional)",
                texto: sanitizeText(`🚨 ¡CUPOS LIMITADOS PARA ESTE FIN DE SEMANA! 🚨\n\nDale a tu cabello el descanso de la plancha diaria con un Alisado Saludable o Terapia de Aminoácidos 100% libre de formol.\n\n📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n\nEscríbenos ahora mismo y asegura tu espacio antes de que se completen los turnos 📲✨`)
            }
        ];
    };

    const generateTipsArticle = (topicKey) => {
        const topic = TOPICS[topicKey] || TOPICS.ciencia_crecimiento;

        return {
            titulo: sanitizeText(`Bases Científicas: ${topic.title}`),
            extracto: sanitizeText(`Un análisis desde la tricología y la dermatología capilar para entender la salud de tu fibra capilar sin mitos ni falsas promesas.`),
            secciones: [
                {
                    subtitulo: sanitizeText("1. La biología del cabello y la fase anágena"),
                    contenido: sanitizeText(`El folículo piloso funciona según un ciclo biológico regulado genéticamente (fase anágena de crecimiento, catágena de transición y telógena de reposo). El promedio de crecimiento en seres humanos es de 1 a 1.2 centímetros por mes. Ningún corte en luna llena ni menjurje casero modifica la mitosis celular en la raíz. Lo que marca la diferencia es cómo cuidamos la fibra existente.`)
                },
                {
                    subtitulo: sanitizeText("2. Por qué el formol y los químicos agresivos son perjudiciales"),
                    contenido: sanitizeText(`El formol crea una película plástica superficial sobre la fibra capilar, endureciéndola temporalmente pero asfixiándola y deshidratando su médula interna. Con el tiempo, el cabello plastificado se vuelve quebradizo y se parte con facilidad. En Julie Alisados reemplazamos esto por aportes de aminoácidos biocompatibles y ácidos orgánicos que alinean respetando la elasticidad natural.`)
                },
                {
                    subtitulo: sanitizeText("3. El principio de retención de longitud"),
                    contenido: sanitizeText(`Si tu raíz crece 1 cm al mes pero tus puntas se parten 1 cm por falta de lípidos y exceso de calor, el largo percibido será cero. Utilizar fórmulas sin sal, selladores de puntas como el Aceite de Argán y Macadamia JA y termoprotectores certificados es la única estrategia comprobada para retener longitud.`)
                }
            ],
            cta: sanitizeText(`¿Deseas una valoración profesional basada en el estado real de tu cabello? Visítanos en Tunja (Pasaje Boulevard Local 140) o Moniquirá (Cra 6 # 18-68). ¡Agenda tu cita al WhatsApp +57 304 358 8180!`)
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