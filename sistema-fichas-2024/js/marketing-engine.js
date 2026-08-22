/**
 * Julie Alisados - Marketing Engine v3.5 (Redacción Fluida, Humana & Experta)
 * Generador inteligente de contenido para Redes Sociales y Blog
 * Redacción profesional y natural de guiones de Reels, Carruseles, WhatsApp y Blog.
 * CERO frases robóticas. CERO pseudociencia. 100% Identidad Julie Alisados.
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
            "#JulieAlisados", "#AlisadoSaludable", "#CabelloSano", "#TricologiaCapilar", 
            "#AlisadosTunja", "#AlisadosMoniquira", "#CuidadoCapilar", "#Boyaca"
        ]
    };

    // Filtro estricto de vocabulario prohibido
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

    // Biblioteca de Temáticas y Tendencias Virales
    const TOPICS = {
        glass_hair: {
            title: "Tendencia 'Glass Hair': Efecto Espejo Líquido Viral",
            target: "Mujeres que buscan un cabello ultra brillante, pulido y con movimiento de seda.",
            painPoints: [
                "Tu cabello luce opaco y sin vida aunque uses miles de siliconas o aceites pesados",
                "El frizz se activa con el mínimo cambio de clima y arruina tu peinado",
                "Sientes el cabello pesado, grasoso y sin soltura natural"
            ],
            solutions: [
                "Alineamos y sellamos la cutícula al 100% para que refleje la luz natural como un espejo",
                "Fórmula orgánica enriquecida con aminoácidos que aportan caída líquida y sedosidad",
                "Tecnología enjuagable: saldrás del salón con el cabello completamente lavado y seco al aire"
            ],
            hooks: [
                "El secreto detrás del efecto 'Glass Hair' que todas están pidiendo este mes 🪞✨",
                "¿Por qué tu cabello no tiene brillo espejo aunque le pongas mil productos? 😱",
                "Cómo lograr un liso con caída líquida y brillo reflectivo real sin formol 💧✨"
            ],
            cta: "Consigue este brillo espejo en Julie Alisados. ¡Escríbenos al WhatsApp y agenda tu cita en Tunja o Moniquirá! 📲"
        },
        skinification: {
            title: "Skinification Capilar: Cuidado de Raíz con Ácido Hialurónico",
            target: "Clientas con raíz grasa, cuero cabelludo sensible o puntas resecas.",
            painPoints: [
                "Tu raíz amanece grasosa a las 24 horas pero tus puntas están resecas como paja",
                "Saturar el cuero cabelludo con aceites pesados que terminan asfixiando el folículo",
                "Sentir picazón o acumulación de residuos por usar shampoos inadecuados"
            ],
            solutions: [
                "Cuidar el cuero cabelludo con el mismo rigor que la piel del rostro usando botánicos y ácido hialurónico",
                "Dúo Extractos Naturales JA (1000 ml) con 12 botánicos que oxigenan y equilibran la grasa de la raíz",
                "Dúo Argán con Ácido Hialurónico (500 ml) para retener la hidratación profunda en medios y puntas"
            ],
            hooks: [
                "Skinification Capilar: Por qué deberías cuidar tu cuero cabelludo igual que tu rostro 🧴✨",
                "¿Tu raíz es grasa pero tus puntas están secas? Estás cometiendo este error al lavarte 🚿❌",
                "El poder del Ácido Hialurónico y los extractos botánicos para rescatar tu cabello 💧🔬"
            ],
            cta: "Lleva tu kit de cuidado capilar JA con envíos a todo el país o visítanos en nuestras sedes 🛍️"
        },
        hair_cycling: {
            title: "Hair Cycling: El Método de Ciclado Capilar Semanal",
            target: "Mujeres que desean una rutina semanal organizada para mantener su cabello siempre sano.",
            painPoints: [
                "Usar siempre el mismo producto hasta que sientes que el cabello 'se acostumbró'",
                "Pérdida de volumen y sensación de pesadez por sobrecarga de nutrientes",
                "Dudas sobre cuándo purificar, cuándo hidratar y cuándo nutrir"
            ],
            solutions: [
                "Alternar días de purificación suave (Extractos) con días de nutrición lipídica profunda (Argán y Macadamia)",
                "Evitar la saturación de la fibra para que los tratamientos siempre penetren al 100%",
                "Prolongar la duración de tu Alisado Saludable hasta por 6 meses con brillo intacto"
            ],
            hooks: [
                "El método 'Hair Cycling' que recomiendan las expertas para que tu cabello nunca se estanque 🔄✨",
                "¿Sientes que tu shampoo ya no te funciona igual? Necesitas aplicar este ciclado capilar 🚿",
                "La rutina de 3 pasos de Hair Cycling que multiplica la vida de tu alisado 💖"
            ],
            cta: "Asesórate con nuestras especialistas y arma tu rutina ideal en Julie Alisados 📲"
        },
        ciencia_crecimiento: {
            title: "La Verdad del Crecimiento Capilar (Retención vs Quiebre)",
            target: "Mujeres que sienten que su cabello no les crece o que creen en mitos.",
            painPoints: [
                "Sentir que tu cabello está 'estancado' y no pasa del mismo largo hace meses",
                "Gastar tiempo en cortar el cabello en luna llena o aplicar menjurjes caseros sin resultado",
                "Puntas abiertas que se rompen al mismo ritmo que crece la raíz"
            ],
            solutions: [
                "Biológicamente tu cabello crece de 1 a 1.2 cm por mes desde el folículo piloso",
                "El verdadero problema es el quiebre de las puntas resecas por falta de lípidos y calor de planchas",
                "Al nutrir con Aceite de Argán y proteger con Termoprotector JA, evitas la rotura y retienes tu largo real"
            ],
            hooks: [
                "¿Cortarte el cabello en luna llena hace que crezca más rápido? Te contamos la verdad científica 🔬🌕",
                "Tu cabello SÍ está creciendo, pero lo estás perdiendo en las puntas por esta razón 🛑✨",
                "Por qué los menjurjes caseros de cocina pueden dañar tu fibra capilar en vez de ayudarte 🙅‍♀️"
            ],
            cta: "Aprende a retener tu largo con ciencia real. ¡Agenda tu valoración en Tunja o Moniquirá al WhatsApp! 📲"
        },
        alisado_saludable: {
            title: "Alisado Saludable: Tecnología Enjuagable y 100% Libre de Formol",
            target: "Mujeres que desean un liso perfecto, sedoso y seguro para su salud.",
            painPoints: [
                "Estar cansada de plancharte todos los días quemando tu cabello con calor excesivo",
                "Miedo a los olores fuertes, picazón en los ojos o humo del formol tradicional",
                "Frizz incontrolable cuando llueve o en climas húmedos"
            ],
            solutions: [
                "Alineamos tu fibra capilar con ácidos orgánicos biocompatibles y más de 14 aminoácidos",
                "Aportamos brillo espejo y nutrición profunda respetando la elasticidad natural",
                "Tecnología enjuagable: el procedimiento termina lavando el cabello en el salón y secando solo con manos"
            ],
            hooks: [
                "¿Por qué el formol NO alisa, sino que plastifica y quema tu cabello? Te lo explicamos 🔬⚠️",
                "La magia de salir de la ducha y ver tu cabello liso y brillante secado solo con aire tibio ✨",
                "3 señales claras de que tu cabello te está pidiendo a gritos dejar la plancha diaria 🛑"
            ],
            cta: "Escríbenos al WhatsApp y agenda tu valoración técnica personalizada en Tunja o Moniquirá 📲"
        },
        emulsion_zero: {
            title: "Emulsión Zero: Suavidad y Cero Lágrimas para Niñas y Madres",
            target: "Niñas desde 4 años, mamás lactantes, embarazadas y cabellos ultra delicados.",
            painPoints: [
                "El drama de todas las mañanas antes de ir al colegio desenredando con dolor y tirones",
                "Miedo de las mamás a exponer a sus hijas a químicos agresivos o vapores tóxicos",
                "Cabellos rebeldes, crespos o con mucho volumen difíciles de manejar"
            ],
            solutions: [
                "Fórmula botánica extra suave con pH equilibrado y agentes acondicionadores seguros",
                "Reduce el volumen en un 80-90% y disciplina el rizo sin alterar la estructura natural",
                "Facilita el peinado matutino en solo 2 minutos con total comodidad"
            ],
            hooks: [
                "Mamá: ¿las mañanas antes del colegio son un dolor de cabeza por culpa del cepillo? 👧🎀",
                "¿Existe un tratamiento de disciplina verdaderamente seguro para niñas? Conoce la Emulsión Zero ✨",
                "Transformamos el cabello de esta princesa sin lágrimas, sin formol y con puro brillo 💖"
            ],
            cta: "Haz que las mañanas de tu pequeña sean fáciles y felices. ¡Agenda su cita en Julie Alisados! 📲"
        },
        reposicion_aminoacidos: {
            title: "Reposición de Aminoácidos: Rescate Anti-Quiebre y SOS Decoloración",
            target: "Cabellos elásticos, chiclosos, decolorados o con daño químico.",
            painPoints: [
                "Cabello chicloso que se estira y se parte cuando está mojado tras una decoloración",
                "Pérdida de masa proteica, textura áspera y puntas abiertas",
                "Miedo a tener que cortarse el cabello para sanarlo"
            ],
            solutions: [
                "Inyección intensiva de queratina biomimética y aminoácidos que penetran al córtex",
                "Detiene el efecto chicle y devuelve la fuerza tensil desde la primera sesión",
                "Restaura la elasticidad sana sin necesidad de cortar tu cabello"
            ],
            hooks: [
                "¡Alerta! Si tu cabello hace esto cuando está mojado, está a punto de romperse 😱🚨",
                "Cómo recuperamos un cabello decolorado y chicloso en una sola sesión técnica 🔬✨",
                "No cortes tu cabello maltratado antes de devolverle sus aminoácidos esenciales 💇‍♀️❌"
            ],
            cta: "Realizamos una prueba de elasticidad gratuita en tu valoración. ¡Escríbenos hoy mismo al WhatsApp! 📲"
        },
        cuidado_casa: {
            title: "Química del Cuidado en Casa JA By Julie Valencia",
            target: "Clientas que quieren que su alisado o tratamiento les dure más de 5 meses.",
            painPoints: [
                "Usar shampoos con sal del supermercado que barren los aminoácidos del alisado en 3 semanas",
                "Plancharse o secarse el cabello sin termoprotector, quemando la cutícula",
                "Falta de brillo y puntas resecas por no usar un aceite reparador adecuado"
            ],
            solutions: [
                "Fórmulas con pH ácido controlado (4.5 a 5.5) 100% libres de sal y sulfatos agresivos",
                "Termoprotector JA que crea un escudo contra el calor de secadores, rayos UV y polución",
                "Aceite Reparador de Argán y Macadamia JA (60 ml) rico en Omega 7 para sellar puntas con tacto seco"
            ],
            hooks: [
                "¿Por qué los shampoos con sal arruinan tu alisado? La explicación técnica que nadie te da 🚿🔬",
                "Por qué el Termoprotector JA es tu mejor amigo para no quemar la queratina con la plancha 🔥🛡️",
                "3 hábitos indispensables en tu ducha para que tu alisado te dure hasta 6 meses impecable ✨"
            ],
            cta: "Pide tu combo de cuidado capilar JA con entrega en Tunja y Moniquirá o envío nacional 🛍️"
        }
    };

    // MOTOR DE INTELIGENCIA PARA TEMAS PERSONALIZADOS (Redacción humana y contextual)
    const buildCustomTopic = (customQuery) => {
        const text = sanitizeText(customQuery).trim();
        const lower = text.toLowerCase();

        // 1. Decoloración / Mechas / Rubios / Tintes
        if (/mecha|decolora|rubi|balayage|tinte|tintura|color|chicl/i.test(lower)) {
            return {
                title: `Cuidado Experto: ${text}`,
                target: "Mujeres con cabellos tinturados o decolorados que buscan brillo y fuerza.",
                painPoints: [
                    "Sientes que la decoloración resecó tu cabello o lo dejó poroso y difícil de peinar",
                    "Miedo a que un tratamiento de alisado barra tu color rubio o dañe tu proceso químico",
                    "Puntas abiertas que se parten con facilidad al cepillar"
                ],
                solutions: [
                    "Evaluación técnica previa con prueba de elasticidad para garantizar compatibilidad total",
                    "Aporte concentrado de aminoácidos y lípidos que sellan la cutícula sin alterar tu color",
                    "Mantenimiento en casa con la línea JA libre de sal para conservar el brillo y la suavidad"
                ],
                hooks: [
                    `¿Tienes ${lower}? Mira cómo lo cuidamos en Julie Alisados sin maltratarlo 🔬✨`,
                    `Lo que nadie te dice sobre ${lower} y cómo mantenerlo suave como la seda 💖`,
                    `3 consejos profesionales para transformar tu cabello si tienes ${lower} 🛑💇‍♀️`
                ],
                cta: `Agenda tu prueba de diagnóstico capilar para ${lower} al WhatsApp de Julie Alisados (+57 304 358 8180) 📲`
            };
        }

        // 2. Niñas / Madres / Cuidado Infantil
        if (/niña|hija|pequeña|infantil|mama|lactan|embaraz/i.test(lower)) {
            return {
                title: `Cuidado Especial: ${text}`,
                target: "Madres que buscan un cuidado capilar suave, seguro y sin dolor para sus hijas.",
                painPoints: [
                    "El sufrimiento diario al desenredar el cabello antes de ir al colegio",
                    "Preocupación por la seguridad de los productos y miedo a químicos agresivos",
                    "Cabellos con mucho volumen o frizz difíciles de peinar"
                ],
                solutions: [
                    "Fórmula botánica Emulsión Zero: 100% libre de formol, segura y certificada",
                    "Disciplina el rizo y reduce el volumen facilitando el peinado en solo 2 minutos",
                    "Protección suave que aporta brillo natural sin lágrimas ni tirones"
                ],
                hooks: [
                    `Mamá: la solución perfecta y segura si tu pequeña tiene ${lower} 👧🎀`,
                    `Cómo transformar las mañanas de peinado en momentos felices y sin lágrimas ✨`,
                    `La verdad sobre los tratamientos seguros para niñas y madres lactantes 💖`
                ],
                cta: `Bríndale a tu pequeña mañanas sin dolor. ¡Agenda su cita en Julie Alisados al WhatsApp! 📲`
            };
        }

        // 3. Frizz / Clima / Humedad / Lluvia / Frío
        if (/frizz|clima|frio|humed|lluvia|esponj|boyaca|tunja|moniquira/i.test(lower)) {
            return {
                title: `Guía Anti-Frizz: ${text}`,
                target: "Mujeres que luchan contra el frizz y los cambios de clima.",
                painPoints: [
                    "Sales impecable de tu casa y a los 10 minutos el clima te infla el cabello con frizz",
                    "Esclavizarte a la plancha todos los días solo para controlar el volumen",
                    "Falta de hidratación interna que hace que la fibra absorba la humedad ambiental"
                ],
                solutions: [
                    "Alisado Saludable con sellado cuticular que actúa como escudo impermeable contra la humedad",
                    "Termoprotector JA de uso diario que bloquea el frizz y perfuma el cabello todo el día",
                    "Cabello liso, disciplinado y con caída suelta sin importar si llueve o hace frío"
                ],
                hooks: [
                    `¿El clima de nuestra región arruina tu peinado? Esta es la solución definitiva 🌧️✨`,
                    `El secreto para salir a la calle y mantener tu cabello 100% liso y sin frizz 💁‍♀️`,
                    `Por qué tu cabello se esponja con el frío y cómo evitarlo según la ciencia capilar 🔬`
                ],
                cta: `Olvídate del frizz para siempre. ¡Visítanos en Tunja o Moniquirá y luce tu liso perfecto! 📲`
            };
        }

        // 4. Promociones / Descuentos / Fin de Semana / Fechas Especiales
        if (/promo|descuent|oferta|2x1|regalo|fin de semana|cupo|agenda|cita/i.test(lower)) {
            return {
                title: `Especial: ${text}`,
                target: "Clientas que buscan aprovechar cupos y promociones exclusivas en salón.",
                painPoints: [
                    "Dejar tu cita para última hora y quedarte sin cupo para el fin de semana",
                    "Gastar en tratamientos que no te duran ni un mes",
                    "Querer lucir un cabello impecable para tus eventos especiales"
                ],
                solutions: [
                    "Atención técnica personalizada en nuestras cómodas sedes de Tunja y Moniquirá",
                    "Resultados garantizados con fórmulas orgánicas y tecnología enjuagable",
                    "Asesoría completa y recomendaciones de cuidado en casa con la línea JA"
                ],
                hooks: [
                    `¡Atención! Si estabas esperando el momento perfecto para consentir tu cabello, es hoy 🌸✨`,
                    `Cupos limitados para esta semana: Luce un liso de revista en Julie Alisados 💖`,
                    `Todo lo que necesitas saber sobre nuestra atención especial de ${lower} 📲`
                ],
                cta: `¡Escríbenos ahora mismo al WhatsApp (+57 304 358 8180) y asegura tu turno antes de que se completen! 🏃‍♀️✨`
            };
        }

        // 5. Fallback Natural y Profesional para cualquier otro tema libre
        return {
            title: `Especial: ${text}`,
            target: `Clientas interesadas en ${lower}.`,
            painPoints: [
                `Tener dudas sobre cómo cuidar adecuadamente tu cabello respecto a ${lower}`,
                "Miedo a usar productos comerciales que resequen tus puntas o dañen tu fibra capilar",
                "Falta de asesoría técnica honesta y personalizada"
            ],
            solutions: [
                `Protocolo especializado de Julie Alisados diseñado para ${lower}`,
                "Fórmulas saludables 100% libres de formol enriquecidas con aminoácidos esenciales",
                "Mantenimiento en casa con la línea oficial JA By Julie Valencia para conservar tu brillo"
            ],
            hooks: [
                `¿Sabías esto sobre ${lower}? Hoy te contamos lo que los expertos recomiendan ✨🔬`,
                `Todo lo que necesitas saber sobre ${lower} para lucir un cabello espectacular 💖`,
                `3 secretos profesionales que cambiarán tu rutina si te interesa ${lower} 🛑`
            ],
            cta: `¿Quieres una valoración personalizada para tu cabello? Escríbenos al WhatsApp (+57 304 358 8180) y te asesoramos con gusto 📲`
        };
    };

    const getTopicData = (topicKey, customQuery = "") => {
        if (customQuery && customQuery.trim().length >= 2) {
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
            audioRecomendado: "Voz en off clara y profesional + música trending aesthetic suave de fondo",
            gancho: {
                tiempo: "0:00 - 0:03 (Primeros 3 segundos)",
                visual: "Primer plano impactante del cabello brillante en movimiento con luz natural o toma de antes/después.",
                audio: randomHook,
                textoPantalla: randomHook.replace(/[^\w\s¿?¡!]/gi, '').slice(0, 45) + "..."
            },
            problema: {
                tiempo: "0:03 - 0:12 (El problema / Empatía)",
                visual: "Tomas rápidas de cabello con frizz o mostrando la frustración de peinarse todos los días.",
                audio: `Seguro te ha pasado que ${pain.toLowerCase()}. Y sientes que ningún tratamiento comercial te da una solución duradera.`,
                textoPantalla: "¿Te pasa esto con tu cabello? 🤦‍♀️"
            },
            solucion: {
                tiempo: "0:12 - 0:28 (La solución en Julie Alisados)",
                visual: "Tomas en salón: aplicando tratamiento con brocha, lavando con abundante agua en el lavacabezas, secando solo con manos y secador, mostrando el brillo real.",
                audio: `Por eso en Julie Alisados trabajamos diferente: ${solution}. Cuidamos la salud de tu fibra capilar sin vapores molestos ni formol.`,
                textoPantalla: "✨ Resultados Reales • Sin Filtros\n🌿 Libre de Formol • Enjuagable"
            },
            cierre: {
                tiempo: "0:28 - 0:35 (Llamado a la acción - CTA)",
                visual: "Clienta sonriendo feliz moviendo su cabello suelto y señalando el botón de agendamiento.",
                audio: `${topic.cta}. Estamos en Tunja y Moniquirá. ¡Comenta 'QUIERO MI CITA' o dale clic al enlace de nuestro perfil!`,
                textoPantalla: "📍 Sedes en Tunja & Moniquirá\n📲 Agenda tu cita al WhatsApp"
            },
            copyInstagram: sanitizeText(`✨ ${randomHook}\n\nEn Julie Alisados nos apasiona transformar tu cabello con fórmulas saludables, 100% libres de formol y enjuagables en salón.\n\n🌿 **Beneficios clave:**\n• ${topic.solutions.join("\n• ")}\n\n📍 **Visítanos en nuestras sedes:**\n• Tunja: Av. Olímpica #190, Pasaje Boulevard Local 140\n• Moniquirá: Cra 6 # 18-68\n\n📲 **Asesoría y citas:** WhatsApp +57 304 358 8180 (Enlace directo en la biografía).\n\n${BRAND.hashtagsGenerales.join(" ")}`)
        };
    };

    const generateCarousel = (topicKey, customQuery = "") => {
        const topic = getTopicData(topicKey, customQuery);

        let slides = [
            {
                slide: 1,
                tipo: "PORTADA (Gancho)",
                titulo: sanitizeText(topic.hooks[0]),
                visual: "Foto de resultado impecable con tipografía editorial en dorado y blanco.",
                nota: "Invita a deslizar hacia la izquierda para descubrir el contenido."
            },
            {
                slide: 2,
                tipo: "EL PROBLEMA",
                titulo: "Lo que muchas clientas nos cuentan:",
                contenido: sanitizeText(`• ${topic.painPoints[0]}\n• Los químicos agresivos o formol solo asfixian y plastifican la fibra capilar.\n• Terminas esclava de la plancha cada fin de semana.`),
                visual: "Foto en detalle de puntas o textura de la fibra capilar."
            },
            {
                slide: 3,
                tipo: "LA DIFERENCIA SALUDABLE",
                titulo: "¿Por qué nuestro protocolo es único?",
                contenido: sanitizeText(`✨ ${topic.solutions[0]}\n🌿 Fórmulas orgánicas con más de 14 aminoácidos esenciales.\n💧 Enjuagable en salón: te vas con el cabello limpio y sin olores fuertes.`),
                visual: "Foto aplicando el tratamiento con pincel en Julie Alisados."
            },
            {
                slide: 4,
                tipo: "RESULTADOS COMPROBADOS",
                titulo: "Lo que vas a disfrutar todos los días:",
                contenido: sanitizeText(`1. Salir de la ducha y secar tu cabello solo con manos y secador en minutos.\n2. Cero frizz incluso en días de lluvia o humedad.\n3. Brillo espejo, caída suelta y suavidad al tacto.`),
                visual: "Foto o video del cabello en movimiento con luz natural."
            },
            {
                slide: 5,
                tipo: "CUIDADO EN CASA",
                titulo: "El secreto para que dure hasta 6 meses:",
                contenido: sanitizeText(`Usa siempre nuestra línea especializada JA By Julie Valencia:\n• Shampoos sin sal ni sulfatos agresivos (pH 4.5 - 5.5).\n• Termoprotector diario contra el sol y calor.\n• Gotas de Aceite de Argán y Macadamia en puntas.`),
                visual: "Foto estética de los productos JA By Julie Valencia."
            },
            {
                slide: 6,
                tipo: "LLAMADO A LA ACCIÓN (CTA)",
                titulo: "¡Empieza tu transformación hoy!",
                contenido: sanitizeText(`📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n💬 WhatsApp: +57 304 358 8180\n\n👉 Guarda este post para consultarlo y compártelo con tu amiga que no suelta la plancha.`),
                visual: "Logo de Julie Alisados con iconos de interacción de redes."
            }
        ];

        let copy = sanitizeText(`Desliza para descubrir cómo transformar tu cabello sin dañarlo ➡️✨\n\n${topic.title}: La combinación perfecta entre estética de revista y salud capilar real.\n\n¿Quieres saber cuál es el tratamiento ideal para tu tipo de cabello? Escríbenos al enlace de nuestra bio y te asesoramos con mucho gusto 💖\n\n${BRAND.hashtagsGenerales.join(" ")}`);

        return {
            titulo: `Carrusel de 6 Diapositivas: ${topic.title}`,
            slides: slides,
            copy: copy
        };
    };

    const generateWhatsAppMessages = (customQuery = "") => {
        const topic = getTopicData("", customQuery);
        const topicClean = customQuery ? sanitizeText(customQuery).trim() : "nuestro Alisado Saludable";

        return [
            {
                tipo: "Estado de WhatsApp (Venta & Asesoría)",
                texto: sanitizeText(`✨ ¿Buscabas información sobre *${topicClean}*?\n\nEn Julie Alisados cuidamos tu fibra capilar con fórmulas 100% libres de formol y enjuagables en salón.\n\n🌸 Saldrás con el cabello limpio, sedoso y brillante.\n\n📍 Sedes: Tunja y Moniquirá\n📲 Responde a este estado para cotizar o agendar tu cita 💖`)
            },
            {
                tipo: "Difusión / Cuidado de Raíz & Nutrición",
                texto: sanitizeText(`Hola bella 💖! ¿Sabías que el secreto de un cabello abundante y brillante empieza en el cuero cabelludo?\n\nNuestra línea JA By Julie Valencia equilibra la grasa en la raíz y nutre las puntas con Ácido Hialurónico, Biotina y 12 Extractos Botánicos.\n\n📦 Pide tu combo hoy con envío inmediato a todo Colombia respondiendo a este mensaje! 🛍️✨`)
            },
            {
                tipo: "Recordatorio de Retoque de Raíz",
                texto: sanitizeText(`¡Hola hermosa! 🌸 Te saludamos de Julie Alisados.\n\nSi ya pasaron entre 4 y 6 meses desde tu último tratamiento, tu raíz está lista para retoque. Alisar a tiempo la raíz nueva mantiene tu disciplina perfecta sin dañar los largos.\n\nTenemos cupos disponibles para esta semana en Tunja y Moniquirá. ¿Te agendamos un turno? 💖`)
            },
            {
                tipo: "Alerta de Cupos de Fin de Semana",
                texto: sanitizeText(`🚨 ¡ÚLTIMOS CUPOS PARA ESTE FIN DE SEMANA! 🚨\n\nLuce un cabello impecable, brillante y sin frizz para tus eventos sin esclavizarte a la plancha.\n\n📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n\nEscríbenos ahora mismo y asegura tu cita antes de que se agoten 📲✨`)
            }
        ];
    };

    const generateTipsArticle = (topicKey, customQuery = "") => {
        const topic = getTopicData(topicKey, customQuery);

        return {
            titulo: sanitizeText(`Guía Especializada: ${topic.title}`),
            extracto: sanitizeText(`Un análisis desde la tricología y la dermatología capilar para entender la salud de tu fibra capilar con base científica y sin mitos.`),
            secciones: [
                {
                    subtitulo: sanitizeText("1. La importancia de un diagnóstico capilar profesional"),
                    contenido: sanitizeText(`Cada tipo de cabello responde de manera única según su porosidad, elasticidad y antecedentes químicos. En Julie Alisados evaluamos el estado de tu fibra capilar antes de cualquier procedimiento para garantizar resultados impecables y seguros.`)
                },
                {
                    subtitulo: sanitizeText("2. Por qué evitar químicos agresivos y formol"),
                    contenido: sanitizeText(`Muchos productos tradicionales contienen formol que plastifica la cutícula temporalmente pero la deshidrata y debilita por dentro. En Julie Alisados trabajamos con ácidos orgánicos biocompatibles y más de 14 aminoácidos que reestructuran el cabello respetando su elasticidad natural.`)
                },
                {
                    subtitulo: sanitizeText("3. El protocolo de cuidado en el hogar"),
                    contenido: sanitizeText(`Para garantizar una duración de 4 a 6 meses, es indispensable utilizar shampoos sin sal con pH balanceado y termoprotectores como los de la línea oficial JA By Julie Valencia antes de cualquier exposición térmica o solar.`)
                }
            ],
            cta: sanitizeText(`¿Deseas una valoración profesional para tu tipo de cabello? Visítanos en Tunja (Pasaje Boulevard Local 140) o Moniquirá (Cra 6 # 18-68). ¡Agenda tu cita al WhatsApp +57 304 358 8180!`)
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