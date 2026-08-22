/**
 * Julie Alisados - Marketing Engine v4.0 (Brand Book & Multi-Objective AI)
 * Generador inteligente de contenido para Redes Sociales, WhatsApp y Blog SEO
 * 100% Alineado al Brand Book Oficial:
 * - Slogan: "Más que un liso, una transformación"
 * - Tagline: "El Alisado Saludable #1 de Colombia • By Julie Valencia"
 * - 4 Valores de Marca: Health-First, Professional Transparency, Scientific Innovation, Personalized Excellence
 * - Paleta Oficial: #D4AF37 (Antique Gold), #111111 (Obsidian Black), #FFF0F5 (Rose Ice), #FFD1DC (Blush Pink)
 * - Tipografías: Playfair Display / Lato & Outfit
 * 
 * Objetivos de Contenido Soportados:
 * 1. 'venta' -> 🎯 Venta Directa & Agendamiento (Alta conversión, urgencia, llamada a WhatsApp)
 * 2. 'educativo_clienta' -> 🎓 Educativo para Clientas (Cuidado en casa, retención de largo, mitos vs ciencia)
 * 3. 'tecnico_estilista' -> ✂️ Técnico & Educativo para Estilistas (Química de aminoácidos, pH 4.5-5.5, protocolo de salón)
 */

const JulieMarketingEngine = (() => {
    // Reglas de marca y datos oficiales
    const BRAND = {
        name: "Julie Alisados",
        slogan: "Más que un liso, una transformación",
        tagline: "El Alisado Saludable #1 de Colombia • By Julie Valencia",
        whatsapp: "573043588180",
        whatsappDisplay: "+57 304 358 8180",
        whatsappLink: "https://wa.me/573043588180",
        sedes: [
            { ciudad: "Tunja", direccion: "Avenida Olímpica #190, Pasaje Boulevard, Local 140" },
            { ciudad: "Moniquirá", direccion: "Carrera 6 # 18 - 68" }
        ],
        values: [
            { name: "Salud Primero (Sin Formol)", desc: "Prioridad absoluta a la salud capilar y respiratoria. 100% libre de formol." },
            { name: "Transparencia Profesional", desc: "Diagnóstico técnico honesto con prueba de elasticidad real." },
            { name: "Innovación Científica", desc: "Aminoácidos biocompatibles, pH equilibrado 4.5-5.5 y tecnología enjuagable." },
            { name: "Excelencia Personalizada", desc: "Tratamiento personalizado a la medida de cada fibra capilar." }
        ],
        colors: {
            gold: "#D4AF37",
            black: "#111111",
            blush: "#FFD1DC",
            roseIce: "#FFF0F5",
            goldLight: "#F2D06B",
            goldDark: "#A68612"
        },
        hashtagsGenerales: [
            "#JulieAlisados", "#MasQueUnLisoUnaTransformacion", "#AlisadoSaludable", 
            "#CabelloSano", "#TricologiaCapilar", "#AlisadosTunja", "#AlisadosMoniquira", 
            "#CuidadoCapilar", "#BoyacaSaludable", "#LibreDeFormol"
        ]
    };

    // Filtro estricto de vocabulario prohibido y normalización
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
                "Fórmula orgánica enriquecida con aminoácidos biocompatibles que aportan caída líquida y sedosidad",
                "Tecnología enjuagable: saldrás del salón con el cabello completamente lavado y seco al aire"
            ],
            hooks: {
                venta: [
                    "El secreto detrás del efecto 'Glass Hair' que todas están pidiendo este mes 🪞✨",
                    "¿Quieres un cabello con brillo espejo que solo requiera secarse con aire tibio? 💖",
                    "Así transformamos un cabello con frizz en un liso líquido de revista en una sola sesión 💧✨"
                ],
                educativo_clienta: [
                    "¿Por qué tu cabello no tiene brillo espejo aunque le pongas mil aceites? Te lo explicamos 😱",
                    "La diferencia real entre un cabello con silicona pesada y un brillo espejo saludable 🪞🌿",
                    "Cómo mantener el efecto Glass Hair en tu casa lavándolo correctamente sin sal 🚿✨"
                ],
                tecnico_estilista: [
                    "Protocolo técnico: Cómo lograr el sellado plano de cutícula para el efecto 'Glass Hair' 🔬✂️",
                    "La termodinámica del planchado: Grados exactos y número de pasadas según la elasticidad 🌡️✨",
                    "Por qué un pH ácido balanceado (4.5 a 5.5) es el responsable del reflejo óptico de la luz 📐🔬"
                ]
            },
            cta: {
                venta: "Consigue este brillo espejo en Julie Alisados. ¡Escríbenos al WhatsApp (+57 304 358 8180) y agenda tu turno en Tunja o Moniquirá! 📲",
                educativo_clienta: "Aprende a cuidar tu brillo con nuestra línea oficial JA By Julie Valencia. ¡Pide tu combo con envíos nacionales! 🛍️✨",
                tecnico_estilista: "Eleva el estándar de tu salón con protocolos científicos de Julie Alisados. ¡Síguenos para más capacitaciones técnicas! ✂️📚"
            }
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
                "Dúo Extractos Naturales JA (1000 ml) con 12 botánicos que oxigenan y equilibran el sebo",
                "Dúo Argán con Ácido Hialurónico (500 ml) para retener la hidratación profunda en medios y puntas"
            ],
            hooks: {
                venta: [
                    "¿Raíz grasa y puntas secas? Conoce el protocolo que equilibra tu cuero cabelludo en una cita 🧴✨",
                    "Dile adiós a lavarte el cabello todos los días con nuestro tratamiento de Skinification Capilar 🚿💖",
                    "Tu cuero cabelludo merece el mismo amor que tu rostro: Agenda tu diagnóstico en Julie Alisados 🌸📲"
                ],
                educativo_clienta: [
                    "Skinification Capilar: Por qué deberías cuidar tu cuero cabelludo igual que tu rostro 🧴✨",
                    "¿Tu raíz es grasa pero tus puntas están secas? Estás cometiendo este error al lavarte 🚿❌",
                    "El poder del Ácido Hialurónico y los extractos botánicos para oxigenar tu folículo piloso 💧🔬"
                ],
                tecnico_estilista: [
                    "Tricología aplicada: Manejo de cuero cabelludo graso vs deshidratación de fibra en salón 🔬💆‍♀️",
                    "El rol del Ácido Hialurónico de bajo peso molecular en la corteza capilar 🧪📐",
                    "Cómo diagnosticar folículos obstruidos antes de aplicar un alisado o tratamiento 🔎✂️"
                ]
            },
            cta: {
                venta: "Agenda tu diagnóstico de cuero cabelludo y fibra en Tunja o Moniquirá. WhatsApp: +57 304 358 8180 📲",
                educativo_clienta: "Lleva tu kit de cuidado capilar JA con 12 extractos botánicos. ¡Envíos a todo el país! 🛍️",
                tecnico_estilista: "Integra diagnóstico tricológico en tu salón y multiplica la retención de tus clientas ✂️✨"
            }
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
            hooks: {
                venta: [
                    "El método 'Hair Cycling' que hace que tu alisado de Julie Alisados dure más de 6 meses impecable 🔄✨",
                    "¿Quieres una rutina personalizada paso a paso según tu tipo de fibra? Te la armamos en salón 💖📲",
                    "Descubre el secreto para que tu cabello nunca se sienta pesado ni reseco en ningún clima 🌧️✨"
                ],
                educativo_clienta: [
                    "El método 'Hair Cycling' que recomiendan las expertas para que tu cabello nunca se estanque 🔄✨",
                    "¿Sientes que tu shampoo ya no te funciona igual? Necesitas aplicar este ciclado capilar 🚿",
                    "La rutina de 3 pasos de Hair Cycling que multiplica la vida de tu alisado 💖"
                ],
                tecnico_estilista: [
                    "Cronograma capilar vs Hair Cycling: Fundamentos de formulación y rotación de activos 🧪📚",
                    "Equilibrio hidro-lipídico-proteico: Cómo prescribir la rutina perfecta post-procedimiento 🔬✂️",
                    "Por qué la alternancia de tensioactivos suaves previene la acumulación polimérica en salón 🧼💡"
                ]
            },
            cta: {
                venta: "Asesórate con nuestras especialistas y agenda tu cita en Julie Alisados al WhatsApp: +57 304 358 8180 📲",
                educativo_clienta: "Pide la asesoría de rutina en casa JA con envíos directos a tu puerta 🛍️📦",
                tecnico_estilista: "Capacita a tu equipo en prescripción capilar personalizada con la metodología Julie Valencia ✂️"
            }
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
            hooks: {
                venta: [
                    "Tu cabello SÍ crece: Deja de perderlo por quiebre y luce un largo de impacto con Julie Alisados 🌸✨",
                    "¿Cansada de cortar tus puntas cada mes? Protegemos tu largo con nuestro Alisado Saludable 💖📲",
                    "Retén tu largo real sin esclavizarte a la plancha. ¡Agenda tu valoración hoy mismo! 🏃‍♀️✨"
                ],
                educativo_clienta: [
                    "¿Cortarte el cabello en luna llena hace que crezca más rápido? Te contamos la verdad científica 🔬🌕",
                    "Tu cabello SÍ está creciendo, pero lo estás perdiendo en las puntas por esta razón 🛑✨",
                    "Por qué los menjurjes caseros de cocina pueden dañar tu fibra capilar en vez de ayudarte 🙅‍♀️"
                ],
                tecnico_estilista: [
                    "Fisiología del crecimiento folicular vs degradación de la cutícula distal 🔬📐",
                    "Cómo explicar a la clienta la diferencia entre tasa de mitosis y retención de longitud 📚✂️",
                    "Prueba de tracción y elasticidad: El diagnóstico obligatorio antes de cualquier química 🧪🔎"
                ]
            },
            cta: {
                venta: "Aprende a retener tu largo con ciencia real. ¡Agenda tu valoración en Tunja o Moniquirá al WhatsApp (+57 304 358 8180)! 📲",
                educativo_clienta: "Protege tus puntas diariamente con nuestro Óleo de Argán y Macadamia JA. ¡Pídelo hoy! 🛍️",
                tecnico_estilista: "Domina el diagnóstico tricológico para fidelizar clientas exigentes en tu salón ✂️💡"
            }
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
                "Alineamos tu fibra capilar con ácidos orgánicos biocompatibles y más de 14 aminoácidos esenciales",
                "Aportamos brillo espejo y nutrición profunda respetando la elasticidad natural",
                "Tecnología enjuagable: el procedimiento termina lavando el cabello en el salón y secando solo con manos"
            ],
            hooks: {
                venta: [
                    "Imagina salir de la ducha, secar tu cabello solo con el aire tibio de tus manos y lucir impecable ✨",
                    "Liso espejo, cero frizz y 100% libre de formol: Vive la experiencia Julie Alisados 💖📲",
                    "Cupos limitados para esta semana en Tunja y Moniquirá: ¡Reserva tu turno de transformación! 🏃‍♀️🌸"
                ],
                educativo_clienta: [
                    "¿Por qué el formol NO alisa, sino que plastifica y asfixia tu cabello? Te lo explicamos 🔬⚠️",
                    "La magia de salir del salón con el cabello completamente lavado: Tecnología enjuagable JA ✨",
                    "3 señales claras de que tu cabello te está pidiendo a gritos dejar la plancha diaria 🛑"
                ],
                tecnico_estilista: [
                    "Química orgánica capilar: Ruptura y reorganización de puentes disulfuro sin aldehídos 🧪🔬",
                    "Por qué la tecnología enjuagable protege los pulmones del estilista y garantiza el resultado real 🌬️✂️",
                    "Control térmico según fototipo capilar y antecedentes de decoloración previa 🌡️📐"
                ]
            },
            cta: {
                venta: "¡Escríbenos al WhatsApp (+57 304 358 8180) y agenda tu transformación en Tunja o Moniquirá! 'Más que un liso, una transformación' 📲💖",
                educativo_clienta: "Conoce más sobre nuestra filosofía de Salud Primero (100% Libre de Formol) y cuida tu salud capilar con Julie Alisados 🌿✨",
                tecnico_estilista: "Actualízate hacia la cosmética orgánica profesional libre de formol con Julie Alisados ✂️📚"
            }
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
                "Fórmula botánica extra suave con pH equilibrado y agentes acondicionadores biocompatibles",
                "Reduce el volumen en un 80-90% y disciplina el rizo sin alterar la estructura natural",
                "Facilita el peinado matutino en solo 2 minutos con total comodidad y sin lágrimas"
            ],
            hooks: {
                venta: [
                    "Mamá: Haz que las mañanas antes del colegio sean de sonrisas y no de tirones con Emulsión Zero 👧🎀",
                    "Disciplina, brillo y suavidad para las más consentidas sin químicos agresivos en Julie Alisados 💖📲",
                    "El tratamiento favorito de las mamás en Boyacá: Cero lágrimas, cero formol y peinados en 2 minutos ✨"
                ],
                educativo_clienta: [
                    "¿Existe un tratamiento de disciplina verdaderamente seguro para niñas? Conoce la Emulsión Zero ✨",
                    "Mamá: Cómo cuidar el cabello delicado de tu pequeña sin exponerla a químicos tóxicos 👧🌿",
                    "Por qué la Emulsión Zero es la opción recomendada durante la etapa de lactancia y maternidad 🤱💖"
                ],
                tecnico_estilista: [
                    "Formulación biocompatible para cutículas jóvenes y cueros cabelludos sensibles 🔬👧",
                    "Protocolo de relajación de onda sin alteración permanente en menores de edad 📐✂️",
                    "Manejo ético y consentimiento informado en tratamientos capilares infantiles 📋💡"
                ]
            },
            cta: {
                venta: "Haz que las mañanas de tu princesa sean fáciles y felices. ¡Agenda su cita en Julie Alisados al WhatsApp: +57 304 358 8180! 👧📲",
                educativo_clienta: "Descubre cómo cuidar el cabello de tus hijas con amor y productos seguros en Julie Alisados 🌸✨",
                tecnico_estilista: "Aprende el protocolo de atención y aplicación segura para el público infantil y maternal ✂️👧"
            }
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
                "Inyección intensiva de queratina biomimética y más de 14 aminoácidos que penetran al córtex",
                "Detiene el efecto chicle y devuelve la fuerza tensil desde la primera sesión",
                "Restaura la elasticidad sana sin necesidad de cortar tu cabello"
            ],
            hooks: {
                venta: [
                    "¡SOS! Si tu cabello quedó elástico o chicloso por una decoloración, podemos salvarlo hoy mismo 🚨✨",
                    "No cortes tu cabello maltratado: Recupera su fuerza y brillo con nuestra Reposición de Aminoácidos 💖📲",
                    "Testimonios reales: De cabello chicloso a cabello fuerte, sedoso y brillante en una sola cita 🔬🌸"
                ],
                educativo_clienta: [
                    "¡Alerta! Si tu cabello hace esto cuando está mojado, está a punto de romperse 😱🚨",
                    "Cómo recuperamos un cabello decolorado y chicloso con ciencia real de aminoácidos 🔬✨",
                    "Por qué una mascarilla común no repara el daño químico profundo en el córtex capilar 🛑💇‍♀️"
                ],
                tecnico_estilista: [
                    "Terapia de choque proteico: Reconstrucción del complejo de membrana celular (CMC) 🔬🧪",
                    "Cómo recuperar la elasticidad antes de autorizar cualquier servicio térmico de alisado 📐✂️",
                    "Carga catiónica y peso molecular: La clave para la adhesión de aminoácidos al córtex 🧪💡"
                ]
            },
            cta: {
                venta: "Realizamos una prueba de elasticidad gratuita en tu valoración. ¡Escríbenos hoy mismo al WhatsApp (+57 304 358 8180)! 📲✨",
                educativo_clienta: "Salva tu cabello con fórmulas científicas y asesoría profesional en Julie Alisados 🌸🔬",
                tecnico_estilista: "Domina los protocolos de rescate capilar SOS para evitar quiebres en tu salón ✂️📚"
            }
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
            hooks: {
                venta: [
                    "Lleva el secreto del salón a tu ducha: Combo Cuidado en Casa JA con envío inmediato a todo el país 🛍️✨",
                    "¿Quieres que tu alisado te dure hasta 6 meses impecable? Esta es la rutina exacta que necesitas 💖📲",
                    "Promoción especial en tu kit de cuidado capilar JA By Julie Valencia: ¡Pídelo al WhatsApp! 📦🌸"
                ],
                educativo_clienta: [
                    "¿Por qué los shampoos con sal arruinan tu alisado? La explicación técnica que nadie te da 🚿🔬",
                    "Por qué el Termoprotector JA es tu mejor amigo para no quemar la queratina con la plancha 🔥🛡️",
                    "3 hábitos indispensables en tu ducha para que tu alisado te dure hasta 6 meses impecable ✨"
                ],
                tecnico_estilista: [
                    "La importancia del mantenimiento con pH 4.5-5.5 para mantener cerrada la cutícula post-alisado 🔬📐",
                    "Estrategia de reventa y fidelización: Cómo educar a la clienta para proteger tu trabajo en salón ✂️💼",
                    "Termoprotección por siliconas volátiles vs aceites pesados: Análisis de conductividad térmica 🧪🔥"
                ]
            },
            cta: {
                venta: "Pide tu combo oficial JA con entrega inmediata en Tunja y Moniquirá o envío nacional. WhatsApp: +57 304 358 8180 🛍️📲",
                educativo_clienta: "Protege tu inversión capilar con productos formulados específicamente para cabello alisado 🌿✨",
                tecnico_estilista: "Ofrece a tus clientas la línea de cuidado profesional con mayor rentabilidad y respaldo ✂️📦"
            }
        }
    };

    // MOTOR DE INTELIGENCIA PARA TEMAS PERSONALIZADOS CON OBJETIVOS
    const buildCustomTopic = (customQuery, objective = "venta") => {
        const text = sanitizeText(customQuery).trim();
        const lower = text.toLowerCase();

        let baseTarget = `Clientas interesadas en ${lower}.`;
        let basePain = [
            `Tener dudas sobre cómo cuidar adecuadamente tu cabello respecto a ${lower}`,
            "Miedo a usar productos comerciales que resequen tus puntas o dañen tu fibra capilar",
            "Falta de asesoría técnica honesta y personalizada"
        ];
        let baseSol = [
            `Protocolo especializado de Julie Alisados diseñado para ${lower}`,
            "Fórmulas saludables 100% libres de formol enriquecidas con aminoácidos esenciales",
            "Mantenimiento en casa con la línea oficial JA By Julie Valencia para conservar tu brillo"
        ];

        let hooksMap = {
            venta: [
                `¿Buscas la mejor solución profesional para ${lower}? En Julie Alisados te garantizamos resultados reales 💖✨`,
                `Transforma tu cabello y dile adiós a las dudas sobre ${lower} con nuestras especialistas 🌸📲`,
                `Agenda tu cita en Tunja o Moniquirá y disfruta de un tratamiento a la medida para ${lower} 🏃‍♀️✨`
            ],
            educativo_clienta: [
                `¿Sabías esto sobre ${lower}? Hoy te contamos lo que la ciencia capilar recomienda ✨🔬`,
                `Todo lo que necesitas saber sobre ${lower} para lucir un cabello espectacular y sin daños 💖`,
                `3 errores muy comunes respecto a ${lower} que están maltratando tus puntas 🛑💇‍♀️`
            ],
            tecnico_estilista: [
                `Fundamento técnico y consideraciones químicas en el abordaje de ${lower} en salón 🔬✂️`,
                `Protocolo paso a paso: Cómo optimizar los tiempos y la seguridad técnica en ${lower} 📐🧪`,
                `Diagnóstico de compatibilidad y pH recomendado al trabajar con ${lower} 🧪💡`
            ]
        };

        let ctaMap = {
            venta: `¿Quieres una valoración personalizada para tu cabello? Escríbenos al WhatsApp (+57 304 358 8180) y asegura tu turno 📲✨`,
            educativo_clienta: `Descubre más consejos de cuidado saludable siguiendo a Julie Alisados. ¡Escríbenos para asesorarte! 🌸🌿`,
            tecnico_estilista: `Perfecciona tus técnicas en salón con el respaldo científico de Julie Alisados ✂️📚`
        };

        // Detección contextual
        if (/mecha|decolora|rubi|balayage|tinte|tintura|color|chicl/i.test(lower)) {
            baseTarget = "Mujeres con cabellos tinturados o decolorados que buscan brillo y fuerza.";
            basePain = [
                "Sientes que la decoloración resecó tu cabello o lo dejó poroso y difícil de peinar",
                "Miedo a que un tratamiento de alisado barra tu color rubio o dañe tu proceso químico",
                "Puntas abiertas que se parten con facilidad al cepillar"
            ];
            baseSol = [
                "Evaluación técnica previa con prueba de elasticidad para garantizar compatibilidad total",
                "Aporte concentrado de aminoácidos y lípidos que sellan la cutícula sin alterar tu color",
                "Mantenimiento en casa con la línea JA libre de sal para conservar el brillo y la suavidad"
            ];
            hooksMap.venta = [
                `¿Cabello decolorado o con mechas? Mira cómo lo alisamos y reparamos en Julie Alisados sin maltratarlo 🔬✨`,
                `Luce un rubio brillante, suave como la seda y sin frizz con nuestro Alisado Saludable 💖📲`,
                `¡Sí es posible alisar un cabello con mechas! Agenda tu prueba de elasticidad gratuita en Tunja o Moniquirá 🌸`
            ];
            hooksMap.educativo_clienta = [
                `¿Tienes mechas o decoloración? Por qué necesitas reponer aminoácidos antes de cualquier plancha 🔬✨`,
                `Lo que nadie te dice sobre el cuidado de cabellos tinturados y cómo evitar el efecto chicle 🛑💇‍♀️`,
                `La rutina en casa JA para mantener tu color intacto y tus puntas selladas como de peluquería 💖`
            ];
            hooksMap.tecnico_estilista = [
                `Protocolo para cabello decolorado fondo 9-10: Termoprotección, temperatura (180°C-200°C) y sellado 🌡️✂️`,
                `Neutralización de tonos y prevención del viraje de color en alisados con ácidos orgánicos 🧪📐`,
                `Evaluación de porosidad y prueba de mecha previa: Criterios de aprobación de servicio 🔬📋`
            ];
        }

        return {
            title: `Especial: ${text}`,
            target: baseTarget,
            painPoints: basePain,
            solutions: baseSol,
            hooks: hooksMap,
            cta: ctaMap
        };
    };

    const getTopicData = (topicKey, customQuery = "", objective = "venta") => {
        if (customQuery && customQuery.trim().length >= 2) {
            return buildCustomTopic(customQuery, objective);
        }
        return TOPICS[topicKey] || TOPICS.glass_hair;
    };

    // 1. GENERADOR DE REEL / TIKTOK
    const generateReelScript = (topicKey, customQuery = "", objective = "venta") => {
        const topic = getTopicData(topicKey, customQuery, objective);
        const objKey = ['venta', 'educativo_clienta', 'tecnico_estilista'].includes(objective) ? objective : 'venta';
        
        const hooksList = (topic.hooks && topic.hooks[objKey]) ? topic.hooks[objKey] : topic.hooks.venta;
        const randomHook = hooksList[Math.floor(Math.random() * hooksList.length)];
        const pain = topic.painPoints[Math.floor(Math.random() * topic.painPoints.length)];
        const solution = topic.solutions[Math.floor(Math.random() * topic.solutions.length)];
        const ctaText = (topic.cta && topic.cta[objKey]) ? topic.cta[objKey] : topic.cta.venta;

        let objLabel = "🎯 Venta Directa & Agendamiento";
        let targetAudience = "Clientas listas para agendar";
        if (objKey === 'educativo_clienta') {
            objLabel = "🎓 Educativo para Clientas / Usuarias";
            targetAudience = "Clientas y seguidoras que buscan aprender a cuidar su cabello";
        } else if (objKey === 'tecnico_estilista') {
            objLabel = "✂️ Técnico & Educativo para Estilistas / Salones";
            targetAudience = "Estilistas, peluqueros y profesionales de la belleza capilar";
        }

        let audioProblema = "";
        let audioSolucion = "";
        let audioCierre = "";

        if (objKey === 'venta') {
            audioProblema = `Si estás cansada de que ${pain.toLowerCase()} y perder horas planchándote todos los días, esto te interesa.`;
            audioSolucion = `En Julie Alisados hacemos que tu rutina cambie por completo: ${solution}. Quedas lista con solo secar al aire y 100% libre de formol.`;
            audioCierre = `${ctaText} ¡Comenta 'TRANSFORMACIÓN' o toca el enlace en nuestro perfil para agendar en Tunja o Moniquirá!`;
        } else if (objKey === 'educativo_clienta') {
            audioProblema = `Muchas clientas nos preguntan por qué ${pain.toLowerCase()}. La respuesta no está en cortar, sino en entender la química de tu fibra.`;
            audioSolucion = `La clave está en cómo cuidamos la cutícula: ${solution}. La salud capilar siempre viene antes que la estética superficial.`;
            audioCierre = `${ctaText} Recuerda: 'Más que un liso, una transformación'. ¡Guarda este video y compártelo con tu amiga! 💖`;
        } else {
            audioProblema = `Como profesionales del salón, sabemos que ${pain.toLowerCase()} suele ser el motivo principal de insatisfacción en clientas exigentes.`;
            audioSolucion = `El abordaje técnico correcto requiere: ${solution}. Respetamos el punto isoeléctrico (pH 4.5-5.5) y la integridad proteica de la fibra.`;
            audioCierre = `${ctaText} Eleva la rentabilidad y reputación de tu salón con protocolos 100% saludables. ¡Guarda esta guía técnica! ✂️`;
        }

        const copyInstagram = sanitizeText(
            `✨ ${randomHook}\n\n` +
            `💎 **${BRAND.name}** • _"${BRAND.slogan}"_\n\n` +
            `🌿 **Puntos Clave:**\n• ${topic.solutions.join("\n• ")}\n\n` +
            `📍 **Nuestras Sedes:**\n` +
            `• Tunja: ${BRAND.sedes[0].direccion}\n` +
            `• Moniquirá: ${BRAND.sedes[1].direccion}\n\n` +
            `📲 **Citas & Asesoría Personalizada:** WhatsApp ${BRAND.whatsappDisplay} (Enlace directo en la biografía).\n\n` +
            `${BRAND.hashtagsGenerales.join(" ")}`
        );

        return {
            titulo: `Guion Reel / TikTok: ${topic.title}`,
            objetivo: objLabel,
            audiencia: targetAudience,
            duracionSugerida: "30 a 45 segundos",
            audioRecomendado: objKey === 'tecnico_estilista' ? "Voz técnica profesional y explicativa + fondo lo-fi sutil" : "Voz en off cálida, cercana y entusiasta + música trending aesthetic",
            gancho: {
                tiempo: "0:00 - 0:03 (Primeros 3 segundos de alto impacto)",
                visual: objKey === 'tecnico_estilista' ? "Primer plano del cabello siendo evaluado con prueba de elasticidad o termómetro digital." : "Primer plano impactante del cabello brillante en movimiento con luz natural o toma de antes/después.",
                audio: randomHook,
                textoPantalla: randomHook.replace(/[^\w\s¿?¡!]/gi, '').slice(0, 50) + "..."
            },
            problema: {
                tiempo: "0:03 - 0:12 (El problema / Empatía técnica)",
                visual: "Tomas rápidas de cabello con frizz o mostrando la frustración de peinarse todos los días.",
                audio: audioProblema,
                textoPantalla: "¿Te pasa esto con tu cabello? 🤦‍♀️"
            },
            solucion: {
                tiempo: "0:12 - 0:28 (La solución y transformación)",
                visual: "Tomas en salón: aplicando tratamiento con brocha, lavando con abundante agua en el lavacabezas, secando solo con manos y secador, mostrando el brillo real.",
                audio: audioSolucion,
                textoPantalla: "✨ Resultados Reales • Sin Filtros\n🌿 Libre de Formol • Enjuagable"
            },
            cierre: {
                tiempo: "0:28 - 0:35 (Llamado a la acción - CTA)",
                visual: "Clienta sonriendo feliz moviendo su cabello suelto y señalando el botón de agendamiento.",
                audio: audioCierre,
                textoPantalla: `📍 Sedes en Tunja & Moniquirá\n📲 WhatsApp: ${BRAND.whatsappDisplay}`
            },
            copyInstagram: copyInstagram
        };
    };

    // 2. GENERADOR DE CARRUSELES
    const generateCarousel = (topicKey, customQuery = "", objective = "venta") => {
        const topic = getTopicData(topicKey, customQuery, objective);
        const objKey = ['venta', 'educativo_clienta', 'tecnico_estilista'].includes(objective) ? objective : 'venta';
        
        const hooksList = (topic.hooks && topic.hooks[objKey]) ? topic.hooks[objKey] : topic.hooks.venta;
        const mainHook = hooksList[Math.floor(Math.random() * hooksList.length)] || hooksList[0];
        const ctaText = (topic.cta && topic.cta[objKey]) ? topic.cta[objKey] : topic.cta.venta;

        let slides = [];

        if (objKey === 'venta') {
            slides = [
                {
                    slide: 1,
                    tipo: "PORTADA (Gancho de Alta Conversión)",
                    titulo: sanitizeText(mainHook),
                    visual: "Foto editorial de resultado impecable con tipografía Playfair Display en dorado #D4AF37 y fondo Obsidian Black #111111.",
                    nota: "Invita a deslizar para descubrir cómo agendar tu cambio de look."
                },
                {
                    slide: 2,
                    tipo: "EL PROBLEMA QUE TE QUITA TIEMPO",
                    titulo: "¿Cansada de la esclavitud de la plancha?",
                    contenido: sanitizeText(`• ${topic.painPoints[0]}\n• Plancharte todos los días reseca y quiebra tus puntas.\n• El clima húmedo o la lluvia arruinan tu peinado en minutos.`),
                    visual: "Foto en detalle de textura con frizz vs cabello planchado maltratado."
                },
                {
                    slide: 3,
                    tipo: "LA SOLUCIÓN JULIE ALISADOS",
                    titulo: "Alisado Saludable: Liso de Revista 100% Real",
                    contenido: sanitizeText(`✨ ${topic.solutions[0]}\n🌿 Fórmulas orgánicas con más de 14 aminoácidos esenciales.\n💧 Enjuagable en salón: te vas con el cabello limpio, sin olores molestos ni formol.`),
                    visual: "Foto aplicando el tratamiento con pincel en las cómodas sedes de Julie Alisados."
                },
                {
                    slide: 4,
                    tipo: "BENEFICIOS DIARIOS",
                    titulo: "Lo que vas a disfrutar a diario:",
                    contenido: sanitizeText(`1. Bañarte, secar solo con manos y secador en 5 minutos y quedar lista.\n2. Cero frizz sin importar el frío o la humedad de Boyacá.\n3. Brillo espejo y sedosidad de 4 a 6 meses.`),
                    visual: "Video corto o carrusel de movimiento fluido con brillo reflectivo."
                },
                {
                    slide: 5,
                    tipo: "GARANTÍA & CUIDADO",
                    titulo: "Tu cabello en manos expertas:",
                    contenido: sanitizeText(`• Diagnóstico personalizado y prueba de elasticidad previa.\n• Asesoría completa de cuidado en casa con la línea JA By Julie Valencia.\n• 20 días de garantía de satisfacción.`),
                    visual: "Foto estética de la línea de productos de cuidado en casa JA."
                },
                {
                    slide: 6,
                    tipo: "LLAMADO A LA ACCIÓN (AGENDA)",
                    titulo: "¡Empieza tu transformación hoy!",
                    contenido: sanitizeText(`📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Carrera 6 # 18-68\n💬 WhatsApp Oficial: ${BRAND.whatsappDisplay}\n\n👉 Envía un mensaje directo y asegura tu turno antes de que se agoten los cupos.`),
                    visual: "Logo oficial de Julie Alisados con insignia 'Más que un liso, una transformación'."
                }
            ];
        } else if (objKey === 'educativo_clienta') {
            slides = [
                {
                    slide: 1,
                    tipo: "PORTADA (Educativa & Curiosidad)",
                    titulo: sanitizeText(mainHook),
                    visual: "Diseño elegante con ilustración o macrofotografía de fibra capilar y tipografía en Antique Gold.",
                    nota: "Enfocado en educar y generar confianza científica."
                },
                {
                    slide: 2,
                    tipo: "EL MITO COMÚN",
                    titulo: "Lo que siempre te habían dicho:",
                    contenido: sanitizeText(`• Creer que el cabello no crece cuando en realidad se quiebra en las puntas.\n• Usar menjurjes de cocina que no tienen pH compatible con tu cabello.\n• Confundir el brillo de silicona pesada con salud capilar real.`),
                    visual: "Comparativa visual de mitos vs realidad."
                },
                {
                    slide: 3,
                    tipo: "LA VERDAD CIENTÍFICA",
                    titulo: "Cómo funciona tu fibra capilar:",
                    contenido: sanitizeText(`🔬 Tu cabello está compuesto en un 85% por queratina y aminoácidos.\n🌿 Cuando la cutícula se abre o deshidrata, pierde lípidos y se rompe.\n💧 La clave es nutrir el córtex con aminoácidos biocompatibles y sellar con pH ácido (4.5 a 5.5).`),
                    visual: "Infografía estética de la estructura de la fibra capilar."
                },
                {
                    slide: 4,
                    tipo: "PASO A PASO EN CASA",
                    titulo: "Los 3 pasos del éxito en tu ducha:",
                    contenido: sanitizeText(`1. Shampoo sin sal ni sulfatos agresivos para no barrer los lípidos.\n2. Termoprotector JA antes de cualquier fuente de calor o sol.\n3. Gotas de Aceite de Argán y Macadamia en puntas húmedas o secas.`),
                    visual: "Foto de los 3 productos indispensables de Julie Alisados."
                },
                {
                    slide: 5,
                    tipo: "FILOSOFÍA SALUD PRIMERO (SIN FORMOL)",
                    titulo: "Por qué decimos 'No al Formol':",
                    contenido: sanitizeText(`⚠️ El formol plastifica la fibra temporalmente pero la asfixia por dentro.\n✨ En Julie Alisados trabajamos con ácidos orgánicos que reordenan la fibra sin dañar tu salud ni tus pulmones.`),
                    visual: "Sello de '100% Libre de Formol • Enjuagable en Salón'."
                },
                {
                    slide: 6,
                    tipo: "CIERRE & VALOR DE MARCA",
                    titulo: "Más que un liso, una transformación",
                    contenido: sanitizeText(`Aprende a amar y cuidar tu cabello con ciencia y empatía.\n\n📍 Sedes en Tunja y Moniquirá\n💬 WhatsApp de Asesoría Gratuita: ${BRAND.whatsappDisplay}\n\n👉 Guarda este post para no perder estos tips y compártelo.`),
                    visual: "Firma de Julie Valencia y logo Julie Alisados."
                }
            ];
        } else {
            // tecnico_estilista
            slides = [
                {
                    slide: 1,
                    tipo: "PORTADA (Masterclass Técnica)",
                    titulo: sanitizeText(mainHook),
                    visual: "Foto técnica de salón profesional con fondo Obsidian Black, divisiones de cabello milimétricas y detalles en Antique Gold.",
                    nota: "Dirigido a estilistas, salones y profesionales de la belleza capilar."
                },
                {
                    slide: 2,
                    tipo: "EL ERROR TÉCNICO HABITUAL",
                    titulo: "Dónde fallan los alisados tradicionales:",
                    contenido: sanitizeText(`• Trabajar a ciegas sin realizar prueba de elasticidad previa.\n• Planchar sobre producto químico sin enjuagar, generando vapores tóxicos y cristalización.\n• Ignorar el estado del punto isoeléctrico de la queratina.`),
                    visual: "Toma en macro de una fibra capilar con daño térmico."
                },
                {
                    slide: 3,
                    tipo: "BIOQUÍMICA DEL ALISADO ORGÁNICO",
                    titulo: "Reorganización de puentes disulfuro:",
                    contenido: sanitizeText(`🧪 Los ácidos orgánicos bio-compatibles actúan en la matriz intercelular.\n🔬 No rompen agresivamente los puentes, sino que los flexibilizan temporalmente.\n✨ El sellado térmico a temperatura controlada (190°C-230°C según la fibra) alinea la cutícula en su nueva posición.`),
                    visual: "Esquema químico de alineación molecular."
                },
                {
                    slide: 4,
                    tipo: "PROTOCOLO DE ENJUAGUE AL 100%",
                    titulo: "Por qué el enjuague previo es innegociable:",
                    contenido: sanitizeText(`1. Elimina todo residuo superficial, evitando humos molestos para el estilista.\n2. Permite que la plancha actúe directamente sobre la queratina modificada.\n3. La clienta ve el resultado real lavado en el salón, sin sorpresas en casa.`),
                    visual: "Foto del cabello en el lavacabezas siendo enjuagado abundantemente."
                },
                {
                    slide: 5,
                    tipo: "PREESCRIPCIÓN Y RENTABILIDAD",
                    titulo: "Multiplica el valor promedio de tu salón:",
                    contenido: sanitizeText(`• Toda clienta debe salir con su kit de mantenimiento con pH ácido 4.5-5.5.\n• Esto previene reclamaciones indebidas y asegura la duración de 4 a 6 meses.\n• Convierte a tu salón en un centro de referencia tricológica.`),
                    visual: "Display elegante de productos profesionales para reventa."
                },
                {
                    slide: 6,
                    tipo: "CIERRE & COMUNIDAD PROFESIONAL",
                    titulo: "Comunidad de Estilistas Julie Alisados",
                    contenido: sanitizeText(`Eleva el estándar de tu salón con protocolos científicos de alto nivel.\n\n📲 Capacitaciones y distribución profesional: WhatsApp ${BRAND.whatsappDisplay}\n\n👉 Guarda esta publicación para consultar la guía técnica en tu salón.`),
                    visual: "Logo de Julie Alisados para Profesionales."
                }
            ];
        }

        const copy = sanitizeText(
            `Desliza para descubrir todo sobre ${topic.title} ➡️✨\n\n` +
            `💎 **${BRAND.name}** • _"${BRAND.slogan}"_\n\n` +
            `${ctaText}\n\n` +
            `📍 **Sedes Oficiales:**\n` +
            `• Tunja: ${BRAND.sedes[0].direccion}\n` +
            `• Moniquirá: ${BRAND.sedes[1].direccion}\n` +
            `💬 WhatsApp: ${BRAND.whatsappDisplay}\n\n` +
            `${BRAND.hashtagsGenerales.join(" ")}`
        );

        return {
            titulo: `Carrusel de 6 Diapositivas: ${topic.title}`,
            objetivo: objKey,
            slides: slides,
            copy: copy
        };
    };

    // 3. GENERADOR DE MENSAJES WHATSAPP (ESTADOS Y DIFUSIÓN)
    const generateWhatsAppMessages = (customQuery = "", objective = "venta") => {
        const topicClean = customQuery ? sanitizeText(customQuery).trim() : "nuestro Alisado Saludable";
        const objKey = ['venta', 'educativo_clienta', 'tecnico_estilista'].includes(objective) ? objective : 'venta';

        if (objKey === 'venta') {
            return [
                {
                    tipo: "Estado de WhatsApp (Oferta & Agendamiento)",
                    texto: sanitizeText(`✨ *¡CUPOS DISPONIBLES PARA ESTA SEMANA!* ✨\n\n¿Quieres salir de la ducha y secar tu cabello solo con manos y secador en minutos?\n\n🌸 *Alisado Saludable Julie Alisados:*\n• 100% Libre de Formol\n• Brillo espejo líquido y sedosidad\n• Duración de 4 a 6 meses\n\n📍 Sedes: Tunja y Moniquirá\n📲 *Responde a este estado ahora mismo para cotizar o apartar tu turno!* 💖`)
                },
                {
                    tipo: "Difusión (Llamado a la Acción Directo)",
                    texto: sanitizeText(`¡Hola hermosa! 🌸 Te saludamos de *Julie Alisados*.\n\n¿Cansada de esclavizarte a la plancha todos los días o de sufrir con el frizz por el clima? 🌧️\n\nTe invitamos a vivir la experiencia de nuestro *Alisado Saludable*: fórmula orgánica con más de 14 aminoácidos que te dejará un cabello liso, suave y con caída suelta.\n\nTenemos agenda abierta en *Tunja y Moniquirá*. ¿Qué día te gustaría consentirte? Respóndenos para darte una asesoría personalizada 💖✨`)
                },
                {
                    tipo: "Recordatorio de Retoque de Raíz",
                    texto: sanitizeText(`¡Hola bella! 🌸 Si ya han pasado entre 4 y 6 meses desde tu última visita a Julie Alisados, tu raíz está lista para su retoque.\n\nAlisar la raíz a tiempo mantiene tu cabello siempre impecable y disciplinado sin necesidad de tocar los largos.\n\n📅 Agenda tu cita esta semana respondiendo a este mensaje. ¡Te esperamos! 💖`)
                },
                {
                    tipo: "Alerta de Últimos Cupos Fin de Semana",
                    texto: sanitizeText(`🚨 *¡ÚLTIMOS 3 CUPOS PARA EL FIN DE SEMANA!* 🚨\n\nLuce un liso espectacular y brillante para tus eventos sin madrugar a plancharte.\n\n📍 Tunja: Pasaje Boulevard Local 140\n📍 Moniquirá: Cra 6 # 18-68\n\n📲 *Escríbenos YA para asegurar tu turno antes de que se agoten!* 🏃‍♀️✨`)
                }
            ];
        } else if (objKey === 'educativo_clienta') {
            return [
                {
                    tipo: "Estado Educativo (Cuidado en Casa & Mitos)",
                    texto: sanitizeText(`💡 *TIP DE ORO DE JULIE ALISADOS* 🚿\n\n¿Sabías que usar shampoo con sal del supermercado barre los aminoácidos de tu alisado en solo 3 semanas?\n\n✨ Para que tu liso te dure hasta 6 meses perfecto, usa siempre shampoos con pH balanceado (4.5 a 5.5) y sin sal agresiva.\n\n📦 *Pide tu combo oficial JA respondiendo a este estado con envío a todo el país!* 🛍️`)
                },
                {
                    tipo: "Difusión Educativa (Retención de Largo vs Quiebre)",
                    texto: sanitizeText(`¡Hola hermosa! 🌸 Hoy queremos compartirte un secreto de salud capilar:\n\nTu cabello SÍ crece (1 a 1.2 cm por mes), pero si tus puntas están resecas, se rompen al mismo ritmo. 🛑\n\n✨ *La solución:* Aplica 2 gotas de Aceite de Argán y Macadamia JA en tus puntas todos los días y usa siempre termoprotector antes del calor.\n\nCuidar tu cabello con ciencia es la mejor inversión. Si necesitas reponer tus productos, ¡respóndenos y te los enviamos hoy mismo! 🛍️💖`)
                },
                {
                    tipo: "Estado de Concientización (No al Formol)",
                    texto: sanitizeText(`⚠️ *POR QUÉ DECIMOS NO AL FORMOL* 🌿\n\nEl formol no alisa: plastifica la cutícula temporalmente y quema la fibra por dentro, desprendiendo gases tóxicos.\n\nEn *Julie Alisados* trabajamos con tecnología enjuagable y aminoácidos orgánicos que respetan tu salud y tus pulmones.\n\n_"Más que un liso, una transformación"_ 💖📲 Pregúntanos por tu valoración técnica.`)
                },
                {
                    tipo: "Tip Semanal (Hair Cycling en Casa)",
                    texto: sanitizeText(`🔄 *RUTINA DE LA SEMANA: HAIR CYCLING* 🔄\n\n1️⃣ Día de Purificación: Shampoo Extractos Naturales JA para oxigenar la raíz.\n2️⃣ Día de Nutrición: Mascarilla Oro Líquido o Línea Argán para reponer lípidos en puntas.\n\n¿Quieres saber cuál es tu rutina ideal? Respóndenos y nuestras especialistas te asesoran gratis 💖✨`)
                }
            ];
        } else {
            // tecnico_estilista
            return [
                {
                    tipo: "Estado Técnico para Estilistas (Química & pH)",
                    texto: sanitizeText(`🔬 *CONSEJO TÉCNICO PARA SALONES* ✂️\n\nEl secreto de un alisado con brillo espejo real está en el control del pH (4.5 a 5.5). Mantener el punto isoeléctrico de la queratina garantiza que la cutícula quede 100% sellada y compacta.\n\n¿Quieres elevar el nivel técnico de tu salón? Síguenos para más contenido profesional con Julie Valencia 📚✂️`)
                },
                {
                    tipo: "Difusión Profesional (Protocolo de Enjuague al 100%)",
                    texto: sanitizeText(`Colega estilista ✂️: ¿Todavía planchas tus alisados con el químico puesto generando humos molestos?\n\nLa tecnología moderna orgánica de Julie Alisados es 100% enjuagable antes del sellado térmico. Proteges tu salud respiratoria, la de tu clienta y garantizas resultados sin sorpresas.\n\n📲 Si te interesa conocer nuestras capacitaciones técnicas para salones, respóndenos a este mensaje! 📚✨`)
                },
                {
                    tipo: "Estado de Diagnóstico (Prueba de Tracción)",
                    texto: sanitizeText(`📋 *PROTOCOLO DE DIAGNÓSTICO OBLIGATORIO* 🔎\n\nAntes de cualquier procedimiento térmico en salón:\n1. Prueba de tracción en mojado (Elasticidad).\n2. Evaluación de porosidad en medios y puntas.\n3. Historial de decoloraciones previas.\n\nLa transparencia profesional es la clave de un negocio exitoso y sin quejas ✂️✨`)
                },
                {
                    tipo: "Oportunidad de Negocio & Reventa en Salón",
                    texto: sanitizeText(`💼 *RENTABILIDAD EN SALÓN: LÍNEA DE REVENTA JA* 🛍️\n\nPrescribir el cuidado post-alisado a tus clientas no solo asegura que tu trabajo dure 6 meses, sino que aumenta tu ticket promedio en un 35%.\n\n📦 Conoce nuestro catálogo de distribución mayorista para profesionales respondiendo a este mensaje! ✂️✨`)
                }
            ];
        }
    };

    // 4. GENERADOR DE ARTÍCULOS DE BLOG / TIPS (SEO)
    const generateTipsArticle = (topicKey, customQuery = "", objective = "venta") => {
        const topic = getTopicData(topicKey, customQuery, objective);
        const objKey = ['venta', 'educativo_clienta', 'tecnico_estilista'].includes(objective) ? objective : 'venta';

        let tituloArticulo = `Guía Especializada: ${topic.title}`;
        let extracto = `Un análisis profundo desde la tricología capilar y la ciencia cosmética para entender la salud de tu fibra con bases reales y sin mitos.`;
        let sec1 = { subtitulo: "1. Diagnóstico Técnico y Estado de la Fibra", contenido: "" };
        let sec2 = { subtitulo: "2. La Bioquímica del Alisado Saludable Libre de Formol", contenido: "" };
        let sec3 = { subtitulo: "3. Protocolo de Mantenimiento con pH Ácido Balanceado", contenido: "" };
        let ctaFinal = "";

        if (objKey === 'venta') {
            tituloArticulo = `${topic.title} • Transforma tu Cabello en Julie Alisados`;
            extracto = `Descubre cómo lograr un cabello liso, radiante y sin frizz con la tecnología orgánica enjuagable más avanzada de Colombia.`;
            sec1.contenido = `En Julie Alisados cada procedimiento comienza con una valoración personalizada. Analizamos el patrón de rizo, la porosidad y la elasticidad para garantizar un resultado del 100% de liso con movimiento natural y sin sensación pesada.`;
            sec2.contenido = `Olvídate de los químicos agresivos y el humo del formol tradicional. Nuestro tratamiento utiliza una sinergia de ácidos orgánicos biocompatibles y más de 14 aminoácidos que reestructuran la fibra de adentro hacia afuera, siendo enjuagado totalmente antes de que salgas del salón.`;
            sec3.contenido = `Para que disfrutes de tu liso perfecto durante más de 5 meses, nuestro equipo te entrega una guía de cuidado con la línea oficial JA By Julie Valencia, asegurando que cada lavada en casa mantenga el brillo espejo del primer día.`;
            ctaFinal = `¿Lista para vivir la experiencia? Visítanos en nuestras sedes de Tunja (Pasaje Boulevard Local 140) o Moniquirá (Carrera 6 # 18-68). ¡Agenda tu cita al WhatsApp +57 304 358 8180! "Más que un liso, una transformación".`;
        } else if (objKey === 'educativo_clienta') {
            tituloArticulo = `La Verdad Científica sobre ${topic.title} • Guía Educativa JA`;
            extracto = `Aprende a diferenciar los mitos de la realidad en el cuidado capilar y descubre por qué la salud de tu fibra siempre debe ir primero.`;
            sec1.contenido = `Muchas mujeres creen que cortar el cabello frecuentemente acelera su crecimiento. Sin embargo, el crecimiento ocurre exclusivamente a nivel folicular en el cuero cabelludo (1 a 1.2 cm al mes). La pérdida de longitud se debe casi siempre a la rotura en las puntas por falta de hidratación y exceso de plancha.`;
            sec2.contenido = `El formol tradicional crea una película plástica impermeable sobre la cutícula que aparenta brillo, pero impide la entrada de agua y nutrientes, provocando que el cabello se vuelva quebradizo a mediano plazo. Por el contrario, los aminoácidos biomiméticos penetran en el córtex reparando la queratina natural.`;
            sec3.contenido = `El cuidado en el hogar debe basarse en productos con pH balanceado (4.5 a 5.5) y libres de sal añadida. La sal común actúa como un detergente abrasivo que abre las escamas de la cutícula y barre los nutrientes. Complementar con termoprotector y gotas de argán sella las puntas con tacto seco.`;
            ctaFinal = `Cuida tu cabello con ciencia y cariño. Conoce más sobre la filosofía de Salud Primero (100% Libre de Formol) de Julie Alisados en nuestras sedes de Tunja y Moniquirá o escríbenos al WhatsApp +57 304 358 8180 para recibir asesoría personalizada.`;
        } else {
            // tecnico_estilista
            tituloArticulo = `Protocolo Técnico: ${topic.title} y Manejo de Enlace Capilar`;
            extracto = `Guía avanzada de tricología aplicada para estilistas y salones sobre sellado térmico y pH balanceado.`;
            sec1.contenido = `El diagnóstico inicial requiere evaluar la resistencia a la tracción húmeda. Si la fibra presenta elongación plástica superior al 30% con memoria lenta, se debe calibrar la temperatura antes del sellado térmico.`;
            sec2.contenido = `Nuestra formulación opera a un pH ácido balanceado de 4.5 a 5.5, reordenando los puentes de cistina mediante puentes de hidrógeno y enlaces iónicos temporales sin romper agresivamente la matriz cortical.`;
            sec3.contenido = `La termodinámica del planchado debe calibrarse: 180°C a 200°C en fibras sensibilizadas o decoloradas y 210°C a 230°C en estructuras vírgenes resistentes, realizando pasadas continuas y uniformes.`;
            ctaFinal = `Eleva el estándar técnico de tu salón con la bioseguridad de Julie Alisados. Contáctanos al +57 304 358 8180 para conocer más sobre nuestros protocolos y distribución técnica en Boyacá.`;
        }

        return {
            titulo: sanitizeText(tituloArticulo),
            extracto: sanitizeText(extracto),
            secciones: [
                { subtitulo: sanitizeText(sec1.subtitulo), contenido: sanitizeText(sec1.contenido) },
                { subtitulo: sanitizeText(sec2.subtitulo), contenido: sanitizeText(sec2.contenido) },
                { subtitulo: sanitizeText(sec3.subtitulo), contenido: sanitizeText(sec3.contenido) }
            ],
            cta: sanitizeText(ctaFinal)
        };
    };

    // 5. GENERADOR DE CONTENIDO A PARTIR DE FOTO / VIDEO (DIAGNÓSTICO VISUAL IA)
    const VISUAL_DIAGNOSTICS = {
        decolorado_mechas: {
            title: "Cabello Decolorado o con Mechas",
            tag: "Decolorado / Mechas",
            hallazgo: "Fibra capilar con alta porosidad, cutícula abierta por decoloración previa y pérdida de masa lipídica. Requiere reposición de aminoácidos y sellado térmico a temperatura calibrada.",
            solucion: "Alisado Saludable 100% libre de formol con aminoácidos biomiméticos que alisan sin alterar el tono rubio ni cristalizar la fibra.",
            hooks: {
                venta: "¿Te dijeron que por tener mechas no te podías alisar? Mira esta transformación 👱‍♀️✨",
                educativo_clienta: "¿Se puede alisar un cabello decolorado sin dañarlo? La verdad científica 🔬✨",
                tecnico_estilista: "Protocolo técnico para alisar cabello con mechas sin barrer color ni sobrecalentar ✂️🌡️"
            },
            audio: "Trending Luxury Acoustic / Upbeat Fashion Pop",
            duracion: "30-40 segundos"
        },
        frizz_humedad: {
            title: "Frizz Severo por Humedad y Clima Frío",
            tag: "Frizz por Humedad",
            hallazgo: "Cutícula porosa e higroscópica que absorbe el agua ambiental, generando hinchamiento desordenado y pérdida de control.",
            solucion: "Sellado hidrofóbico plano con pH ácido balanceado (4.5 a 5.5) que crea una barrera impermeable contra el clima de Boyacá.",
            hooks: {
                venta: "¿Cansada de que el frío o la llovizna arruinen tu cabello en 5 minutos? Mira esto 🌧️➡️✨",
                educativo_clienta: "Por qué tu cabello se esponja con la humedad aunque uses aceites pesados 💧😱",
                tecnico_estilista: "Termodinámica del sellado de cutícula contra la absorción de humedad ambiental 🔬✂️"
            },
            audio: "Chill Modern R&B / Inspiring Beat",
            duracion: "25-35 segundos"
        },
        rizo_rebelde: {
            title: "Rizo Rebelde y Voluminoso (Patrón 3A a 4C)",
            tag: "Rizo Muy Rebelde",
            hallazgo: "Estructura helicoidal con densidad alta de puentes disulfuro y cutícula con aperturas en las zonas de curvatura.",
            solucion: "Reordenamiento molecular orgánico que alinea la fibra al 100% manteniendo la elasticidad natural y aportando movimiento de seda.",
            hooks: {
                venta: "De rizo rebelde y voluminoso a liso espejo en una sola sesión sin formol 🌀➡️💎",
                educativo_clienta: "La diferencia entre quemar un rizo con químicos y flexibilizarlo con aminoácidos 🧪🌿",
                tecnico_estilista: "Protocolo de planchado y número de pasadas en rizos tipo 3C y 4A con fórmula orgánica 📐✂️"
            },
            audio: "Dramatic Reveal Sound / Luxury Viral Glow",
            duracion: "35-45 segundos"
        },
        opaco_danado: {
            title: "Opacidad, Resequedad y Falta de Brillo (Efecto Paja)",
            tag: "Opacidad y Resequedad",
            hallazgo: "Superficie cuticular erosionada y deslipidizada. La luz incidente se dispersa irregularmente provocando ausencia total de reflejo.",
            solucion: "Baño de aminoácidos y nutrición con Aceite de Argán y Macadamia JA que devuelve el reflejo óptico de espejo líquido (Glass Hair).",
            hooks: {
                venta: "Así revivimos un cabello opaco y seco para convertirlo en un espejo líquido 🪞✨",
                educativo_clienta: "¿Por qué tu cabello parece paja aunque le pongas mil mascarillas de supermercado? 🌾❌",
                tecnico_estilista: "Reflectancia óptica y el índice de refracción en la cutícula capilar sellada 🔬💡"
            },
            audio: "Warm Aesthetic Lo-Fi / Elegant Beauty Vibes",
            duracion: "25-35 segundos"
        },
        infantil_madres: {
            title: "Niña, Cabello Infantil o Madre Lactante",
            tag: "Infantil / Lactancia Segura",
            hallazgo: "Fibra capilar delgada o cuero cabelludo sensible. Se requiere máxima bioseguridad, sin humos, sin formol y sin irritación.",
            solucion: "Tratamiento con Emulsión Zero: 100% biocompatible, sin vapores molestos, aprobado para pequeñas desde los 7 años y madres.",
            hooks: {
                venta: "El único tratamiento de disciplina capilar 100% seguro para niñas y mamás en Boyacá 👧💖",
                educativo_clienta: "Por qué jamás debes aplicar alisados tradicionales en niñas pequeñas ⚠️👧",
                tecnico_estilista: "Bioseguridad en salón: Protocolos sin formol para clientas con cuero cabelludo reactivo 🌿🛡️"
            },
            audio: "Sweet Instrumental Piano / Gentle Uplifting Beat",
            duracion: "30-40 segundos"
        },
        resultado_espejo: {
            title: "Resultado Final: Brillo Espejo Glass Hair",
            tag: "Resultado Glass Hair",
            hallazgo: "Cutícula 100% sellada y alineada. Reflejo especular de la luz, caída suelta y cero saturación cosmética residual.",
            solucion: "Mantenimiento con Dúo Argán JA y Termoprotector para preservar el liso impecable durante más de 5 meses.",
            hooks: {
                venta: "Esto es lo que pasa cuando te haces el Alisado Saludable en Julie Alisados 🪞✨",
                educativo_clienta: "El secreto para que tu brillo espejo no se caiga con las lavadas en casa 🚿💎",
                tecnico_estilista: "Control de calidad en salón: Cómo verificar el sellado perfecto en lavacabezas 🔬✂️"
            },
            audio: "Viral Luxury Glow / Modern Fashion Beat",
            duracion: "20-30 segundos"
        },
        retoque_raiz: {
            title: "Retoque de Crecimiento / Raíz Nueva",
            tag: "Retoque de Raíz",
            hallazgo: "Crecimiento natural de 4 a 6 meses en raíz con textura ondulada/frizz, mientras los medios y puntas conservan el liso previo.",
            solucion: "Aplicación técnica localizada en los centímetros de crecimiento nuevo, protegiendo los largos ya procesados con Termoprotector JA.",
            hooks: {
                venta: "¿Tienes 4 meses de crecimiento y tu raíz ya pide ayuda? Mira este retoque impecable 📏✨",
                educativo_clienta: "¿Cada cuánto tiempo debes retocar tu raíz sin sobreprocesar los largos? 📅🌸",
                tecnico_estilista: "Técnica de aislamiento y empalme térmico en retoques de raíz para evitar quiebre ✂️🔬"
            },
            audio: "Upbeat Routine / Salon Day Aesthetic",
            duracion: "25-35 segundos"
        },
        maltratado_calor: {
            title: "Cabello Maltratado por Plancha Diaria",
            tag: "Daño Térmico",
            hallazgo: "Desnaturalización de queratina por exceso de calor directo sin protección térmica. Puntas abiertas y quiebre continuo.",
            solucion: "Alisado Saludable con reposición lipídica que elimina para siempre la necesidad de plancharse a diario.",
            hooks: {
                venta: "Dile adiós a la plancha de todas las mañanas: Liso perfecto solo con secador tibio 🔌❌➡️✨",
                educativo_clienta: "Lo que la plancha diaria le está haciendo a tu fibra capilar por dentro 🛑🔥",
                tecnico_estilista: "Recuperación de corteza con aminoácidos en fibras con shock térmico por plancha 🔬✂️"
            },
            audio: "Dramatic Problem to Solution Sound / Inspiring",
            duracion: "30-40 segundos"
        }
    };

    const generateFromMedia = (mediaType = "image", visualTag = "resultado_espejo", customNotes = "", objective = "venta") => {
        const diag = VISUAL_DIAGNOSTICS[visualTag] || VISUAL_DIAGNOSTICS.resultado_espejo;
        const objKey = ['venta', 'educativo_clienta', 'tecnico_estilista'].includes(objective) ? objective : 'venta';
        const isVideo = mediaType === "video";
        const extraNote = customNotes ? sanitizeText(customNotes).trim() : "";
        const ctaText = TOPICS.alisado_saludable.cta[objKey];

        const mainHook = diag.hooks[objKey] || diag.hooks.venta;
        const visualSubject = isVideo ? "video clip en movimiento" : "fotografía en primer plano";

        // Reel personalizado
        const reel = {
            titulo: sanitizeText(`Reel IA (${diag.tag}): ${mainHook}`),
            objetivo: objKey === 'venta' ? '🎯 Venta Directa' : (objKey === 'educativo_clienta' ? '🎓 Educativo Clienta' : '✂️ Técnico Salón'),
            duracionSugerida: diag.duracion,
            audioRecomendado: diag.audio,
            gancho: {
                tiempo: "0:00 - 0:03s",
                visual: sanitizeText(`Toma dinámica de la ${visualSubject} destacando el estado del cabello (${diag.tag}). Cámara en paneo rápido o efecto zoom in.`),
                audio: sanitizeText(mainHook),
                textoPantalla: sanitizeText(mainHook.replace(/[^\w\s\u00C0-\u017F¿?¡!]/gi, '').trim())
            },
            problema: {
                tiempo: "0:03 - 0:12s",
                visual: sanitizeText(`Detalle en macro de la fibra: ${diag.hallazgo}. ${extraNote ? `Detalle del caso: ${extraNote}.` : ''}`),
                audio: sanitizeText(
                    objKey === 'tecnico_estilista' 
                        ? `Analizamos el estado de la fibra: ${diag.hallazgo}. En salón, aplicar químicos agresivos aquí sería un error fatal.` 
                        : (objKey === 'educativo_clienta'
                            ? `Si te pasa esto en el cabello, no es que no tenga arreglo, es que le falta nutrición real y sellado adecuado.`
                            : `Muchas clientas llegan frustradas porque sienten que su cabello no tiene solución o le temen a los químicos que queman.`)
                ),
                textoPantalla: sanitizeText(`Diagnóstico: ${diag.tag} 🔎`)
            },
            solucion: {
                tiempo: "0:12 - 0:26s",
                visual: sanitizeText(`Proceso en salón Julie Alisados: Aplicación orgánica, enjuague total en lavacabezas con agua tibia y secado al aire mostrando el liso espejo líquido.`),
                audio: sanitizeText(
                    objKey === 'tecnico_estilista'
                        ? `Trabajamos con más de 14 aminoácidos y pH 4.5 a 5.5. Enjuagamos al 100% antes del sellado térmico para proteger la elasticidad.`
                        : (objKey === 'educativo_clienta'
                            ? `Nuestro Alisado Saludable nutre el córtex y alinea la cutícula al 100% sin formol. El cabello queda lavado y seco al instante.`
                            : `Con nuestro Alisado Saludable logramos esta caída de seda, brillo espejo y duración de 4 a 6 meses sin esclavizarte a la plancha.`)
                ),
                textoPantalla: sanitizeText(`✨ Fórmula Orgánica Enjuagable • 100% Libre de Formol`)
            },
            cierre: {
                tiempo: "0:26 - 0:35s",
                visual: sanitizeText(`Resultado final con movimiento natural 'Glass Hair', la clienta sonriendo feliz y datos de contacto de Julie Alisados.`),
                audio: sanitizeText(
                    objKey === 'tecnico_estilista'
                        ? `Eleva el estándar de tu salón con protocolos científicos. Escríbenos al WhatsApp para capacitaciones profesionales.`
                        : `¿Lista para transformar tu cabello? Agenda tu cita en nuestras sedes de Tunja o Moniquirá. Escríbenos al WhatsApp ahora mismo.`
                ),
                textoPantalla: sanitizeText(`📍 Tunja & Moniquirá\n📲 WhatsApp: ${BRAND.whatsappDisplay}`)
            },
            copyInstagram: sanitizeText(
                `${mainHook}\n\n` +
                `🔍 **Diagnóstico Visual:** ${diag.hallazgo}\n\n` +
                `✨ **Nuestra Solución:** ${diag.solucion}\n\n` +
                `${extraNote ? `📝 **Nota del caso:** ${extraNote}\n\n` : ''}` +
                `💎 **${BRAND.name}** • _"${BRAND.slogan}"_\n` +
                `🌿 100% Libre de Formol • Enjuagable en Salón\n\n` +
                `${ctaText}\n\n` +
                `📍 **Sedes Oficiales:**\n` +
                `• Tunja: ${BRAND.sedes[0].direccion}\n` +
                `• Moniquirá: ${BRAND.sedes[1].direccion}\n` +
                `📲 WhatsApp: ${BRAND.whatsappDisplay}\n\n` +
                `${BRAND.hashtagsGenerales.join(" ")} #${diag.tag.replace(/\s+/g, '')}`
            )
        };

        // Carrusel de 6 diapositivas adaptado al diagnóstico
        const slides = [
            {
                slide: 1,
                tipo: "PORTADA (Gancho Visual)",
                titulo: sanitizeText(mainHook),
                contenido: sanitizeText(`Desliza para ver el diagnóstico y la transformación real de este caso ➡️`),
                visual: sanitizeText(`Foto principal de la imagen/video cargada (${diag.tag}) con diseño elegante en Antique Gold y Obsidian Black.`)
            },
            {
                slide: 2,
                tipo: "EL DIAGNÓSTICO",
                titulo: `¿Qué le pasaba a este cabello?`,
                contenido: sanitizeText(`🔎 **Hallazgo Tricológico:**\n${diag.hallazgo}\n\n${extraNote ? `💡 **Detalle adicional:** ${extraNote}` : '⚠️ Sin el tratamiento adecuado, la fibra continúa perdiendo hidratación y quiebre.'}`),
                visual: "Primer plano de la textura inicial con indicadores gráficos dorados."
            },
            {
                slide: 3,
                tipo: "EL ERROR COMÚN",
                titulo: "Lo que NO debes hacer:",
                contenido: sanitizeText(`❌ Aplicar formol o químicos agresivos que asfixian la cutícula.\n❌ Planchar sobre producto sin enjuagar.\n❌ Usar shampoos con sal que resecan y barren los nutrientes.`),
                visual: "Iconografía de alerta suave con estética pulcra de Julie Alisados."
            },
            {
                slide: 4,
                tipo: "EL PROTOCOLO SALUDABLE",
                titulo: "La Transformación en Salón:",
                contenido: sanitizeText(`🌿 Aplicación de fórmula orgánica con 14+ aminoácidos.\n🚿 Enjuague al 100% en lavacabezas (cero humos tóxicos).\n✨ Sellado térmico plano a temperatura calibrada para brillo espejo.`),
                visual: "Foto del proceso de lavado y peinado en el salón boutique."
            },
            {
                slide: 5,
                tipo: "EL RESULTADO",
                titulo: "Liso Líquido 'Glass Hair':",
                contenido: sanitizeText(`💎 Cabello 100% liso, suave y con caída natural.\n💧 Cero frizz ante la lluvia o clima húmedo.\n⏳ Duración garantizada de 4 a 6 meses con mantenimiento en casa.`),
                visual: "Foto del resultado final con reflejo de luz impecable."
            },
            {
                slide: 6,
                tipo: "CIERRE & AGENDAMIENTO",
                titulo: "Tu Cabello en Manos Expertas",
                contenido: sanitizeText(`"Más que un liso, una transformación"\n\n📍 Sedes: Tunja y Moniquirá\n💬 WhatsApp de Citas: ${BRAND.whatsappDisplay}\n\n👉 Guarda este post y compártelo con alguien que necesite esta transformación.`),
                visual: "Firma de Julie Valencia y datos de contacto oficiales."
            }
        ];

        return {
            diagnostico: {
                titulo: sanitizeText(diag.title),
                tag: diag.tag,
                hallazgo: sanitizeText(diag.hallazgo),
                solucion: sanitizeText(diag.solucion),
                enfoque: objKey
            },
            reel: reel,
            carousel: {
                titulo: sanitizeText(`Carrusel IA (${diag.tag}): ${diag.title}`),
                slides: slides,
                copy: reel.copyInstagram
            },
            copy: reel.copyInstagram
        };
    };

    // 6. CREADOR DE PROMPTS VISUALES IA (GOOGLE IMAGEN / MIDJOURNEY / DALL-E / FLOW)
    const PROMPT_THEMES = {
        glass_hair_model: {
            title: "Modelo Glass Hair en Salón Boutique de Lujo",
            description: "Mujer elegante luciendo cabello liso efecto espejo líquido con reflejo dorado y caída de seda.",
            baseEs: "Fotografía publicitaria de ultra alta gama de una mujer colombiana elegante de espaldas y tres cuartos en un salón boutique de lujo. Cabello ultra liso, pulido, con brillo efecto espejo 'Glass Hair' que refleja la luz con movimiento de seda líquida, sin frizz ni pesadez. Paleta de colores oficial: negro obsidiana (#111111), toques de oro envejecido Antique Gold (#D4AF37) y blanco mármol. Iluminación de estudio cinematográfica con softbox lateral que resalta el brillo dorado del cabello. Lente 85mm f/1.4, profundidad de campo suave, calidad 8K hiperrealista, portada de revista de belleza de lujo.",
            baseEn: "Ultra-luxury high-end commercial beauty photograph of an elegant Colombian woman with sleek liquid-mirror 'Glass Hair' in an exclusive boutique salon. Ultra-straight, perfectly aligned, silky glossy hair reflecting studio light like polished obsidian with warm amber and gold highlights, flawless movement, zero frizz. Luxurious modern salon interior with obsidian black marble and subtle Antique Gold (#D4AF37) metallic accents in soft bokeh background. Shot on Hasselblad H6D-100c, 85mm f/1.4 lens, softbox three-point lighting, rim light emphasizing hair shine, hyperrealistic texture, 8k resolution, cinematic color grading, Vogue cover editorial quality",
            artDirection: {
                colores: "Antique Gold (#D4AF37), Obsidian Black (#111111), Rose Ice (#FFF0F5)",
                iluminacion: "Luz de recorte cálida (3200K) en el contorno del cabello con softbox frontal suave.",
                composicion: "Plano medio o tres cuartos con el cabello como centro focal del reflejo.",
                lente: "85mm f/1.4 con apertura amplia y desenfoque cremoso de fondo.",
                consejo: "Ideal para portadas de campañas publicitarias, anuncios de Instagram Ads y banners web de alta conversión."
            }
        },
        macro_fiber: {
            title: "Macrofotografía Científica de Fibra Capilar Alineada",
            description: "Enfoque microscópico en cutícula capilar 100% sellada reflejando destellos dorados de aminoácidos.",
            baseEs: "Fotografía macro científica de una fibra capilar humana perfectamente sellada, lisa y brillante, tratada con aminoácidos orgánicos y pH ácido balanceado. Enfoque microscópico extremo en la cutícula capilar que luce compacta, suave y reflejando destellos de luz dorada (#D4AF37) como una superficie de cristal. Fondo minimalista negro obsidiana (#111111) con sutiles moléculas de aminoácidos y gotas microscópicas de aceite de argán flotando con iluminación de laboratorio de alta tecnología. 8K, hiperrealismo científico cosmético.",
            baseEn: "Scientific macro photography of a single perfectly sealed human hair fiber, treated with organic amino acids. Extreme microscopic close-up revealing flawless, smooth, tightly aligned cuticle scales reflecting brilliant golden light (#D4AF37) like polished crystal. Minimalist obsidian black (#111111) and deep champagne background with subtle glowing cosmetic amino acid molecules and micro-droplets of pure argan oil in soft suspension. Scientific laboratory lighting, high-speed macro lens 100mm f/2.8, depth of field with razor-sharp center, 8k, photorealistic",
            artDirection: {
                colores: "Obsidian Black (#111111), Antique Gold (#D4AF37), Blanco Puro",
                iluminacion: "Luz de laboratorio precisa y puntual sobre el eje de la fibra.",
                composicion: "Macro central con profundidad de campo milimétrica.",
                lente: "100mm f/2.8 Macro Lens con relación 1:1 o 2:1.",
                consejo: "Excelente para publicaciones educativas de tricología, historias científicas y demostración de tecnología sin formol."
            }
        },
        wash_experience: {
            title: "Experiencia en Lavacabezas Spa & Enjuague Libre de Formol",
            description: "Clienta disfrutando de un lavado relajante con agua cristalina y espuma botánica en salón boutique.",
            baseEs: "Fotografía de estilo de vida de lujo en el área de spa capilar de Julie Alisados. Clienta relajada recostada en un sillón ergonómico de lavacabezas negro obsidiana, mientras una estilista profesional enjuaga suavemente el cabello con agua tibia y espuma botánica libre de formol. Iluminación tenue y relajante con velas aromáticas, toallas blancas impecables y detalles dorados Antique Gold. Textura de agua cristalina fluyendo sobre el cabello alineado. Calidad fotográfica 8K, atmósfera de bienestar y exclusividad.",
            baseEn: "Luxury spa lifestyle photograph in an exclusive hair sanctuary salon. Elegant client reclined comfortably in a premium ergonomic black leather wash station, smiling serenely as a professional stylist gently rinses silky smooth hair with crystal water and botanical organic lather. Warm ambient lighting, soft golden candlelight, pristine white rolled towels, subtle Antique Gold (#D4AF37) fixtures in background. Water droplets catching warm highlights. Shot on Sony A7R V, 50mm f/1.2, relaxing luxury atmosphere, hyperrealistic, 8k",
            artDirection: {
                colores: "Blush Pink (#FFD1DC), Obsidian Black (#111111), Antique Gold (#D4AF37)",
                iluminacion: "Luz ambiental tenue, cálida y envolvente.",
                composicion: "Plano medio lateral con sensación de paz y mimo sensorial.",
                lente: "50mm f/1.2 para capturar la atmósfera íntima del spa capilar.",
                consejo: "Perfecta para transmitir la filosofía de salud, confort y cero olores tóxicos."
            }
        },
        before_after_split: {
            title: "Antes y Después Dividido (Split Screen de Alto Impacto)",
            description: "Contraste honesto y dramático entre cabello esponjado con frizz y cabello liso espejo pulido.",
            baseEs: "Fotografía publicitaria de pantalla dividida (Before & After) mostrando una transformación capilar real. Lado izquierdo (Antes): Cabello con frizz rebelde, deshidratado, sin brillo y con volumen desordenado. Lado derecho (Después): Mismo cabello completamente liso, con efecto espejo 'Glass Hair', pulido, sedoso y con brillo líquido deslumbrante. Fondo de salón boutique pulcro en tonos negros y dorados. Transición nítida y honesta, iluminación uniforme de estudio que demuestra la efectividad del Alisado Saludable sin filtros exagerados. 8K.",
            baseEn: "High-impact split screen before-and-after commercial beauty photograph showing real hair transformation. Left side (Before): Frizzy, dry, unaligned, dull textured curly hair under studio lights. Right side (After): The exact same hair transformed into silky, liquid-mirror sleek 'Glass Hair', perfectly straight, intensely shiny, deeply hydrated with healthy bounce. Clean modern salon background in obsidian black and warm gold tones. Authentic, razor-sharp split line, professional studio lighting, 8k resolution, photorealistic",
            artDirection: {
                colores: "Contraste visual neutro en Antes vs Antique Gold (#D4AF37) y brillo en Después",
                iluminacion: "Luz de estudio simétrica de alta fidelidad cromática (CRI 98+).",
                composicion: "División 50/50 vertical con alineación exacta de la modelo.",
                lente: "85mm f/2.8 para nitidez de borde a borde.",
                consejo: "El recurso visual con mayor tasa de conversión para anuncios de agendamiento directo."
            }
        },
        product_still_life: {
            title: "Bodegón de Productos Oficiales JA con Gotas de Oro y Argán",
            description: "Envases cosméticos de lujo sobre mármol negro con salpicaduras doradas y botánicos.",
            baseEs: "Fotografía de producto publicitaria de lujo (Still Life). Botellas elegantes de la línea 'JA By Julie Valencia' (Dúo de Argán con Ácido Hialurónico, Dúo Extractos Naturales y Termoprotector) dispuestas sobre un pedestal de mármol negro obsidiana. Gotas doradas translúcidas de aceite de argán y macadamia cayendo suavemente sobre la superficie pulida. Fondo con sutiles ramas botánicas e iluminación dorada Antique Gold (#D4AF37). Lente macro 100mm f/2.8, reflejos nítidos, estética de cosmética de lujo parisina.",
            baseEn: "Ultra-premium commercial still-life product photography. Sleek amber and black cosmetic bottles with luxury gold typography and labels, placed on an obsidian black marble pedestal with gentle water and argan oil splash droplets. Subtle botanical extracts and golden liquid ribbons floating in the background. Soft golden rim lighting (#D4AF37), dramatic studio lighting, 100mm macro lens, ultra-sharp reflections, luxury cosmetic advertising aesthetic, 8k",
            artDirection: {
                colores: "Obsidian Black (#111111), Antique Gold (#D4AF37), Mármol Oscuro",
                iluminacion: "Reflejos de caja de luz (strip box) marcados en las curvas de las botellas.",
                composicion: "Bodegón triangular armónico con gotas dinámicas.",
                lente: "100mm f/4 para máxima definición en etiquetas y texturas.",
                consejo: "Ideal para promocionar la venta de productos de cuidado en casa con envíos nacionales."
            }
        },
        stylist_consultation: {
            title: "Diagnóstico Tricológico Profesional en Salón Boutique",
            description: "Especialista analizando la elasticidad de la fibra capilar frente a un espejo circular dorado.",
            baseEs: "Fotografía profesional de una consulta tricológica en Julie Alisados. Estilista experta vestida de negro elegante sosteniendo un mechón de cabello de una clienta sonriente para realizar una prueba de elasticidad e inspección de cutícula. Entorno de salón moderno y luminoso con espejos circulares con marco de oro Antique Gold, frascos de tratamiento ordenados y herramientas de salón profesionales. Atmósfera de confianza científica y calidez humana. 8K.",
            baseEn: "Professional documentary beauty photography of a hair specialist conducting an honest elasticity and porosity hair diagnostic in a high-end salon. Friendly expert stylist in chic black uniform analyzing a hair strand with client smiling in the mirror. Modern minimalist boutique salon with circular gold-rimmed backlit mirrors, warm ambient light, high-end hairdressing equipment. 85mm portrait lens, natural expressions, authentic beauty salon atmosphere, 8k",
            artDirection: {
                colores: "Obsidian Black (#111111), Antique Gold (#D4AF37), Blanco Cálido",
                iluminacion: "Luz de espejo retroiluminada combinada con luz difusa suave.",
                composicion: "Plano medio con reflejo en el espejo.",
                lente: "85mm f/1.8 para enfoque nítido en el gesto profesional.",
                consejo: "Excelente para transmitir transparencia profesional y rigor científico."
            }
        },
        mother_daughter: {
            title: "Madre e Hija: Bioseguridad y Emulsión Zero",
            description: "Madre e hija sonrientes en salón luciendo cabello brillante, sano y natural sin formol.",
            baseEs: "Fotografía tierna y elegante de una madre joven y su pequeña hija de 8 años en el salón Julie Alisados. Ambas luciendo un cabello saludable, suave, brillante y peinado con total soltura. La niña ríe feliz mientras la madre le acaricia el cabello. Fondo acogedor de salón boutique con tonos crema, rosa hielo (#FFF0F5) y detalles dorados. Iluminación natural suave de ventanal, transmitiendo seguridad, inocuidad total (sin formol) y amor familiar. 8K.",
            baseEn: "Heartwarming luxury lifestyle photography of a mother and her 8-year-old daughter in a boutique salon. Both showcasing healthy, naturally smooth, shiny, and soft hair. The young girl is laughing happily as her mother smiles beside her. Warm, safe, organic salon environment with soft blush pink (#FFF0F5) and gentle golden accents. Soft natural window lighting, genuine emotions, representing 100% formaldehyde-free safe care for children, 8k, photorealistic",
            artDirection: {
                colores: "Rose Ice (#FFF0F5), Blush Pink (#FFD1DC), Antique Gold (#D4AF37)",
                iluminacion: "Luz natural suave tipo ventanal con reflectores dorados.",
                composicion: "Retrato emocional plano medio de madre e hija.",
                lente: "50mm o 85mm f/1.4 con tonos cálidos y naturales.",
                consejo: "Ideal para promocionar la Emulsión Zero para niñas y madres gestantes/lactantes."
            }
        }
    };

    const generateVisualPrompt = (themeKey = "glass_hair_model", formatKey = "9:16", styleKey = "editorial_luxury", customNotes = "") => {
        const theme = PROMPT_THEMES[themeKey] || PROMPT_THEMES.glass_hair_model;
        const extra = customNotes ? sanitizeText(customNotes).trim() : "";
        const ar = formatKey === "1:1" ? "1:1" : (formatKey === "4:5" ? "4:5" : (formatKey === "16:9" ? "16:9" : "9:16"));

        let styleDescEs = "Fotografía editorial de ultra alta definición 8K con acabado cinematográfico de lujo.";
        let styleDescEn = "hyperrealistic 8k resolution, shot on professional cinema camera, master studio lighting";

        if (styleKey === "commercial_salon") {
            styleDescEs = "Fotografía comercial de salón boutique con iluminación cálida dorada, tonos obsidiana y acentos dorados Antique Gold (#D4AF37).";
            styleDescEn = "commercial beauty advertising, warm luxury salon interior lighting, rich black obsidian and Antique Gold highlights";
        } else if (styleKey === "cinematic_gold") {
            styleDescEs = "Iluminación cinematográfica cálida gold (3200K rim lighting), contraluz dorado intenso, bokeh ámbar y textura de seda líquida hiperrealista.";
            styleDescEn = "cinematic warm gold rim lighting, amber bokeh reflections, liquid silk texture, dramatic golden hour salon backlight";
        } else if (styleKey === "scientific_macro") {
            styleDescEs = "Macrofotografía científica tricológica con lente macro 100mm f/2.8, nitidez milimétrica en cutícula compacta y destellos de aminoácidos.";
            styleDescEn = "scientific trichology macro photography, 100mm f/2.8 macro lens, extreme optical sharpness on cuticle scales, cosmetic amino acid molecules";
        }

        const promptEsFinal = sanitizeText(
            `${theme.baseEs} ${extra ? `Detalles adicionales de la escena: ${extra}.` : ''} Estilo: ${styleDescEs}`
        );

        const promptEnFinal = sanitizeText(
            `${theme.baseEn}, ${extra ? `Additional scene specifics: ${extra}, ` : ''}${styleDescEn} --ar ${ar} --v 6.0 --style raw`
        );

        return {
            titulo: theme.title,
            descripcion: theme.description,
            formato: ar,
            estilo: styleKey,
            promptEs: promptEsFinal,
            promptEn: promptEnFinal,
            artDirection: theme.artDirection
        };
    };

    return {
        BRAND,
        TOPICS,
        VISUAL_DIAGNOSTICS,
        PROMPT_THEMES,
        generateReelScript,
        generateCarousel,
        generateWhatsAppMessages,
        generateTipsArticle,
        generateFromMedia,
        generateVisualPrompt,
        sanitizeText
    };
})();

if (typeof window !== 'undefined') {
    window.JulieMarketingEngine = JulieMarketingEngine;
}