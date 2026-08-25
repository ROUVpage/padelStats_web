import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaEye, FaArrowLeft, FaShare, FaHeart } from 'react-icons/fa';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // Datos de ejemplo para artículos completos
  const samplePosts = {
    'como-mejorar-tecnica-remate-padel': {
      id: 1,
      title: 'Cómo mejorar tu técnica de remate en pádel',
      slug: 'como-mejorar-tecnica-remate-padel',
      content: `
        <p>El remate es uno de los golpes más espectaculares y decisivos en el pádel. Un buen remate puede ser la diferencia entre ganar o perder un punto crucial. Con PadelStats, hemos analizado miles de remates para identificar las claves del éxito.</p>

        <h2>¿Qué hace efectivo un remate?</h2>
        <p>Nuestros datos muestran que los remates más efectivos combinan tres elementos clave:</p>
        <ul>
          <li><strong>Potencia controlada:</strong> Velocidades entre 80-120 km/h son las más efectivas</li>
          <li><strong>Precisión en la zona de impacto:</strong> El punto óptimo está a 15cm del marco superior</li>
          <li><strong>Angle de ataque:</strong> Entre 45-60 grados para maximizar la efectividad</li>
        </ul>

        <h2>Técnica correcta paso a paso</h2>
        <ol>
          <li><strong>Posicionamiento:</strong> Colócate debajo de la pelota, con el pie derecho (si eres diestro) ligeramente adelantado</li>
          <li><strong>Preparación:</strong> Eleva la pala por encima de la cabeza, formando un arco natural</li>
          <li><strong>Impacto:</strong> Contacta la pelota en el punto más alto posible, con el brazo completamente extendido</li>
          <li><strong>Seguimiento:</strong> Completa el movimiento dirigiendo la pala hacia donde quieres que vaya la pelota</li>
        </ol>

        <h2>Errores más comunes</h2>
        <p>Según nuestro análisis de datos con PadelStats, estos son los errores que más perjudican la efectividad del remate:</p>
        <ul>
          <li>Impactar demasiado atrás (reduce un 35% la potencia)</li>
          <li>No usar todo el cuerpo en el golpe (pérdida del 25% de efectividad)</li>
          <li>Tensión excesiva en el brazo (genera imprecisión)</li>
        </ul>

        <h2>Ejercicios específicos para mejorar</h2>
        <p>Practica estos ejercicios con tu sensor PadelStats para monitorear tu progreso:</p>

        <h3>1. Remates estáticos</h3>
        <p>Tu compañero te lanza pelotas para que remated desde la línea de fondo. Enfócate en la técnica correcta y revisa las métricas de potencia y precisión en tu app.</p>

        <h3>2. Remates en movimiento</h3>
        <p>Practica remates mientras te desplazas hacia atrás. Esto mejora tu coordinación y timing.</p>

        <h3>3. Remates con objetivo</h3>
        <p>Coloca conos en diferentes zonas de la cancha rival y practica la precisión de tus remates.</p>

        <h2>Monitorización con PadelStats</h2>
        <p>Con PadelStats puedes:</p>
        <ul>
          <li>Medir la velocidad exacta de cada remate</li>
          <li>Analizar tu zona de impacto óptima</li>
          <li>Comparar tu progreso semana a semana</li>
          <li>Recibir consejos personalizados basados en tus datos</li>
        </ul>

        <p>Recuerda que la mejora en el remate requiere práctica constante y análisis de datos. Con PadelStats, tienes las herramientas para convertirte en un rematador letal.</p>
      `,
      excerpt: 'Descubre los secretos para ejecutar remates más efectivos y potentes en el pádel.',
      featured_image: 'https://images.unsplash.com/photo-1554068865-24ceec697d3b?w=1200&h=500&fit=crop&auto=format',
      author: 'PadelStats Team',
      created_at: '2024-01-15T10:00:00Z',
      views: 0
    },
    'guia-conectar-padelstats-movil': {
      id: 5,
      title: 'Guía completa: Cómo conectar PadelStats a tu móvil',
      slug: 'guia-conectar-padelstats-movil',
      content: `
        <p>Conectar tu sensor PadelStats a tu smartphone es muy sencillo. En esta guía te explicamos paso a paso cómo hacerlo y solucionamos los problemas más comunes.</p>

        <h2>Requisitos previos</h2>
        <ul>
          <li>Smartphone con Bluetooth 4.0 o superior</li>
          <li>App PadelStats instalada (disponible en Play Store y App Store)</li>
          <li>Sensor PadelStats cargado (luz verde intermitente)</li>
        </ul>

        <h2>Paso 1: Descargar la aplicación</h2>
        <p>Ve a tu tienda de aplicaciones:</p>
        <ul>
          <li><strong>Android:</strong> Busca "PadelStats" en Google Play Store</li>
          <li><strong>iOS:</strong> Busca "PadelStats" en la App Store</li>
        </ul>
        <p>La aplicación es completamente gratuita y no requiere suscripción.</p>

        <h2>Paso 2: Activar el sensor</h2>
        <ol>
          <li>Presiona el botón de encendido del sensor durante 3 segundos</li>
          <li>Verás una luz azul parpadeante que indica modo de emparejamiento</li>
          <li>El sensor permanecerá en este modo durante 2 minutos</li>
        </ol>

        <h2>Paso 3: Conectar desde la app</h2>
        <ol>
          <li>Abre la aplicación PadelStats</li>
          <li>Toca el botón "Conectar Sensor" en la pantalla principal</li>
          <li>La app buscará automáticamente sensores disponibles</li>
          <li>Selecciona tu sensor PadelStats de la lista</li>
          <li>Confirma el emparejamiento cuando aparezca la solicitud</li>
        </ol>

        <h2>Configuración inicial</h2>
        <p>Una vez conectado, configura estos parámetros:</p>
        <ul>
          <li><strong>Mano dominante:</strong> Diestra o zurda</li>
          <li><strong>Tipo de pala:</strong> Potencia, control o polivalente</li>
          <li><strong>Nivel de juego:</strong> Principiante, intermedio o avanzado</li>
        </ul>

        <h2>Problemas comunes y soluciones</h2>

        <h3>El sensor no aparece en la lista</h3>
        <ul>
          <li>Verifica que el Bluetooth esté activado en tu móvil</li>
          <li>Asegúrate de que el sensor esté en modo emparejamiento (luz azul)</li>
          <li>Reinicia la búsqueda desde la app</li>
        </ul>

        <h3>Conexión inestable durante el juego</h3>
        <ul>
          <li>Mantén el móvil cerca (máximo 10 metros del sensor)</li>
          <li>Evita interferencias de otros dispositivos Bluetooth</li>
          <li>Verifica que la batería del sensor esté cargada (mínimo 20%)</li>
        </ul>

        <h3>Datos que no se sincronizan</h3>
        <ul>
          <li>Cierra y vuelve a abrir la aplicación</li>
          <li>Desconecta y vuelve a conectar el sensor</li>
          <li>Verifica tu conexión a Internet para la sincronización</li>
        </ul>

        <h2>Consejos para un mejor rendimiento</h2>
        <ul>
          <li>Coloca el móvil en un lugar estable durante el partido</li>
          <li>No cierres la app durante el juego</li>
          <li>Revisa las actualizaciones periódicamente</li>
          <li>Limpia el sensor regularmente con un paño húmedo</li>
        </ul>

        <p>Con estos pasos, tu PadelStats estará listo para registrar todos tus golpes y ayudarte a mejorar tu juego. ¡A jugar!</p>
      `,
      excerpt: 'Tutorial paso a paso para conectar tu sensor PadelStats con la aplicación móvil.',
      featured_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=500&fit=crop&auto=format',
      author: 'Soporte Técnico',
      created_at: '2024-01-02T11:20:00Z',
      views: 0
    },
    'analisis-datos-zona-golpe-ideal': {
      id: 2,
      title: 'Análisis de datos: ¿Cuál es tu zona de golpe ideal?',
      slug: 'analisis-datos-zona-golpe-ideal',
      content: `
        <p>Uno de los factores más determinantes en el rendimiento de un jugador de pádel es el punto de impacto en la pala. Con PadelStats hemos analizado más de 50.000 golpes para responder a una pregunta clave: ¿dónde debes golpear la pelota para maximizar potencia y control?</p>

        <h2>¿Qué es la zona de golpe ideal?</h2>
        <p>La zona de golpe ideal, conocida como "sweet spot", es el área de la pala donde el impacto genera la mayor transferencia de energía a la pelota con el menor nivel de vibración. Impactar fuera de esta zona no solo reduce tu potencia, sino que también incrementa el riesgo de lesiones en el codo y la muñeca.</p>

        <h2>Lo que dicen los datos</h2>
        <p>Nuestro análisis de 50.000 golpes registrados con PadelStats revela datos sorprendentes:</p>
        <ul>
          <li><strong>Solo el 38% de los golpes</strong> de jugadores amateur impactan en la zona óptima</li>
          <li>Los jugadores avanzados alcanzan un <strong>72% de precisión</strong> en el sweet spot</li>
          <li>Golpear en el marco superior reduce la potencia un <strong>41%</strong></li>
          <li>El impacto en el corazón de la pala genera un <strong>23% más de velocidad</strong> de bola</li>
        </ul>

        <h2>Zonas de la pala y su impacto</h2>

        <h3>Zona central (sweet spot)</h3>
        <p>Es el área más grande de la superficie de golpeo. Aquí la vibración es mínima y la transferencia de energía máxima. Los mejores jugadores concentran el 70-80% de sus golpes en esta zona.</p>

        <h3>Zona superior</h3>
        <p>Los remates ejecutados en la zona superior tienen potencia, pero menor control. Es la zona preferida para golpes ofensivos cuando la pelota llega alta.</p>

        <h3>Zona inferior</h3>
        <p>Cuando impactas en la parte baja de la pala pierdes hasta un 35% de potencia. Esta zona se utiliza en globos defensivos donde la potencia no es prioritaria.</p>

        <h3>Marcos laterales</h3>
        <p>El impacto en los marcos genera vibraciones extremas y prácticamente nula transferencia de energía. Es el golpe que más lesiones produce.</p>

        <h2>Cómo encontrar tu zona óptima con PadelStats</h2>
        <p>El sensor PadelStats detecta automáticamente el punto de impacto en cada golpe y te proporciona un mapa de calor visual en la aplicación. Con este mapa puedes:</p>
        <ul>
          <li>Ver dónde estás golpeando habitualmente</li>
          <li>Comparar tu zona de impacto con jugadores de tu nivel</li>
          <li>Seguir la evolución semana a semana</li>
          <li>Identificar qué tipos de golpe tienen peor precisión</li>
        </ul>

        <h2>Ejercicios para mejorar tu precisión</h2>

        <h3>Ejercicio 1: El punto de color</h3>
        <p>Marca el sweet spot de tu pala con un rotulador de tiza. Practica durante 15 minutos fijándote en que la pelota siempre deje huella en esa zona. La tiza te dará feedback visual inmediato.</p>

        <h3>Ejercicio 2: Globos controlados</h3>
        <p>Practica series de globos lentos con tu compañero, centrado únicamente en el punto de impacto. La velocidad reducida te da tiempo para ajustar la posición de la pala.</p>

        <h3>Ejercicio 3: Análisis post-sesión</h3>
        <p>Después de cada entrenamiento, revisa el mapa de calor de PadelStats y establece un objetivo de mejora concreto para la siguiente sesión.</p>

        <p>Mejorar tu zona de golpe ideal es uno de los cambios técnicos con mayor retorno de inversión en el pádel. Con los datos de PadelStats, puedes hacerlo de forma objetiva y medible.</p>
      `,
      excerpt: 'Con PadelStats hemos analizado miles de golpes para determinar cuál es la zona óptima de impacto en la pala.',
      featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=500&fit=crop&auto=format',
      author: 'Dr. Carlos Martínez',
      created_at: '2024-01-12T14:30:00Z',
      views: 0
    },
    'errores-comunes-padel-segun-datos': {
      id: 3,
      title: 'Los errores más comunes en el pádel según los datos',
      slug: 'errores-comunes-padel-segun-datos',
      content: `
        <p>Gracias a los datos recogidos de más de 10.000 partidos con PadelStats, hemos podido identificar los errores técnicos más frecuentes entre jugadores de todos los niveles. Conocerlos es el primer paso para corregirlos.</p>

        <h2>Metodología del análisis</h2>
        <p>Durante 12 meses, analizamos partidos de 2.400 jugadores únicos distribuidos en 5 niveles de habilidad. Los errores se clasificaron en tres categorías: errores técnicos, errores tácticos y errores físicos. En este artículo nos centramos en los técnicos, que representan el 61% de los puntos perdidos directamente.</p>

        <h2>Error #1: Golpear con el brazo, no con el cuerpo (presente en el 78% de los jugadores)</h2>
        <p>El error más extendido en el pádel amateur es iniciar el golpe con el brazo en lugar de con la rotación de caderas y hombros. Los datos de PadelStats muestran que los jugadores que usan solo el brazo generan una media de 34 km/h menos de velocidad en sus golpes respecto a quienes usan todo el cuerpo.</p>
        <p><strong>Cómo corregirlo:</strong> Practica frente a un espejo. Antes de golpear, gira las caderas en dirección contraria a la pelota. El brazo debe llegar al golpe como consecuencia de esa rotación, no como iniciador.</p>

        <h2>Error #2: Punto de impacto tardío (64% de los jugadores)</h2>
        <p>Impactar la pelota cuando ya ha pasado la altura ideal es uno de los errores que más puntos directos regalan al rival. Nuestros datos muestran que los golpes tardíos tienen un 47% más de probabilidad de ir a la red o fuera.</p>
        <p><strong>Cómo corregirlo:</strong> Trabaja el anticipamiento de la posición. Muévete hacia la pelota antes de que bote. La clave está en leer el juego antes de que la pelota llegue a tu lado.</p>

        <h2>Error #3: Mal posicionamiento en la pista (58% de los jugadores)</h2>
        <p>El análisis de movimiento de PadelStats revela que el 58% de los puntos perdidos tienen su origen en una mala posición en la pista antes de recibir el golpe. Estar demasiado adelantado, demasiado atrás o descentrado reduce drásticamente las opciones de respuesta.</p>
        <p><strong>Cómo corregirlo:</strong> Aprende las posiciones base para cada situación: defensa en el fondo, ataque en la red, y transición. El sistema de análisis táctico de PadelStats te muestra en el mapa de la pista dónde estabas cuando perdiste cada punto.</p>

        <h2>Error #4: Falta de consistencia en el grip (51% de los jugadores)</h2>
        <p>Cambiar el agarre durante el golpe o usar el mismo grip para todos los tipos de golpe es más común de lo que parece. Los sensores de PadelStats detectan variaciones en la presión del grip que correlacionan directamente con la imprecisión del golpe.</p>
        <p><strong>Cómo corregirlo:</strong> Trabaja conscientemente el grip continental para golpes de pared y el grip de este para drives y volea. Haz ejercicios de mantenimiento del grip con gomas elásticas para reforzar los músculos del antebrazo.</p>

        <h2>Error #5: Velocidad excesiva en los golpes defensivos (43% de los jugadores)</h2>
        <p>Querer golpear fuerte cuando estás en posición defensiva es un error que duplica el número de fallos no forzados. Los datos muestran que los jugadores que reducen la velocidad en posición defensiva ganan un 31% más de puntos en esas situaciones.</p>
        <p><strong>Cómo corregirlo:</strong> En defensa, prioriza la colocación sobre la potencia. Un globo bien colocado vale más que un drive potente que acaba en la red.</p>

        <h2>Tu perfil de errores personalizado</h2>
        <p>Con PadelStats, no tienes que depender de estadísticas generales. La aplicación genera tu perfil individual de errores basándose en tus propios partidos, indicándote en qué áreas específicas concentrar tu entrenamiento.</p>

        <p>Recuerda: identificar el error es el 50% del trabajo. El otro 50% es la repetición consciente de la corrección. Los datos te dan el mapa; tú decides si caminas por él.</p>
      `,
      excerpt: 'Analizamos los datos de más de 10.000 partidos registrados con PadelStats para identificar los errores técnicos más frecuentes.',
      featured_image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=500&fit=crop&auto=format',
      author: 'Ana García',
      created_at: '2024-01-08T09:15:00Z',
      views: 0
    },
    'entrenamiento-datos-revolucion-padel': {
      id: 4,
      title: 'Entrenamiento con datos: La revolución del pádel',
      slug: 'entrenamiento-datos-revolucion-padel',
      content: `
        <p>El pádel ha evolucionado de ser un deporte de ocio a una disciplina técnicamente exigente en la que los datos están marcando la diferencia entre jugadores de todos los niveles. El entrenamiento basado en datos ya no es solo para profesionales: PadelStats lo pone al alcance de cualquier aficionado.</p>

        <h2>¿Qué es el entrenamiento basado en datos?</h2>
        <p>El entrenamiento basado en datos es un enfoque metodológico que utiliza métricas objetivas para guiar las decisiones de entrenamiento. En lugar de entrenar "a ojo" o basándose únicamente en sensaciones, los datos permiten:</p>
        <ul>
          <li>Identificar con precisión las áreas de mejora</li>
          <li>Medir el progreso de forma objetiva</li>
          <li>Personalizar el entrenamiento según las necesidades reales del jugador</li>
          <li>Prevenir lesiones detectando patrones de movimiento de riesgo</li>
        </ul>

        <h2>Cómo los profesionales ya usan los datos</h2>
        <p>Los circuitos profesionales de pádel llevan años recopilando datos de partidos. Las parejas número 1 del mundo utilizan análisis de video avanzado, sensores de movimiento y software estadístico para preparar cada torneo. Estudian las tendencias de servicio del rival, los patrones de juego en momentos de presión y las zonas de la pista donde cometen más errores.</p>
        <p>Lo que antes requería un equipo de analistas y un presupuesto elevado, hoy está disponible para cualquier jugador gracias a sensores como PadelStats.</p>

        <h2>Las métricas que transforman el entrenamiento</h2>

        <h3>Velocidad de impacto</h3>
        <p>Saber la velocidad exacta de cada golpe te permite establecer objetivos de potencia concretos y medir si tu entrenamiento de fuerza está teniendo efecto en tu juego. Los datos de PadelStats muestran que los jugadores que monitorizan su velocidad de impacto mejoran un promedio del 18% en 3 meses de entrenamiento dirigido.</p>

        <h3>Frecuencia de golpeo por tipo</h3>
        <p>¿Cuántos drives, voleas, bandeja y remates ejecutas en un partido típico? Muchos jugadores se sorprenden al ver que golpean mucho menos de ciertos tipos de lo que creían. Estos datos ayudan a equilibrar el entrenamiento técnico.</p>

        <h3>Exigencia física por partidos</h3>
        <p>El sensor PadelStats mide también la intensidad física de cada sesión. Esto permite periodizar el entrenamiento: saber cuándo exigirte más y cuándo recuperar, evitando el sobreentrenamiento y maximizando la adaptación.</p>

        <h3>Consistencia técnica</h3>
        <p>La variabilidad en los parámetros de golpeo es un indicador clave de la calidad técnica. Un jugador avanzado tiene menos dispersión en sus datos que un jugador en desarrollo. Reducir esa variabilidad es uno de los objetivos más claros que los datos pueden marcar.</p>

        <h2>Caso práctico: 3 meses con PadelStats</h2>
        <p>Jorge, jugador de nivel 3 con 5 años de experiencia, comenzó a usar PadelStats en enero. Su objetivo era mejorar la potencia de su remate. Los datos iniciales mostraban una velocidad media de impacto de 67 km/h y un 42% de precisión en el sweet spot.</p>
        <p>Siguiendo las recomendaciones personalizadas de la app, centró su entrenamiento en la rotación de cadera y en la preparación anticipada. A los 3 meses, su velocidad media era de 84 km/h (+25%) y su precisión en el sweet spot había subido al 68%. "Siempre había entrenado mucho, pero nunca había sabido exactamente en qué concentrarme", explica Jorge.</p>

        <h2>El futuro: entrenamiento adaptativo con IA</h2>
        <p>La siguiente frontera del entrenamiento con datos es la personalización en tiempo real mediante inteligencia artificial. PadelStats está desarrollando un sistema que, basándose en tu historial de datos, generará planes de entrenamiento dinámicos que se adapten automáticamente a tu progreso y a los objetivos que marques.</p>

        <p>El pádel con datos no es el futuro: es el presente. Y la buena noticia es que nunca ha sido tan accesible.</p>
      `,
      excerpt: 'El entrenamiento basado en datos está transformando el pádel. Descubre cómo los sensores inteligentes como PadelStats están cambiando la forma de entrenar.',
      featured_image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=500&fit=crop&auto=format',
      author: 'PadelStats Team',
      created_at: '2024-01-05T16:45:00Z',
      views: 0
    },
    'futuro-padel-ia-analisis-predictivo': {
      id: 6,
      title: 'El futuro del pádel: Inteligencia artificial y análisis predictivo',
      slug: 'futuro-padel-ia-analisis-predictivo',
      content: `
        <p>La inteligencia artificial está irrumpiendo en el mundo del deporte con una velocidad impresionante. En el tenis, la IA ya predice el resultado de los partidos con un 75% de precisión antes de que empiecen. En el fútbol, los clubes de élite usan machine learning para detectar lesiones antes de que ocurran. El pádel no es una excepción a esta revolución.</p>

        <h2>IA en el deporte: de la teoría a la práctica</h2>
        <p>Durante años, el análisis deportivo avanzado fue exclusivo de los equipos con mayores presupuestos. El coste de los sistemas de tracking, el hardware de procesamiento y los equipos de analistas lo ponía fuera del alcance del deportista medio. Los avances en IA y la miniaturización de los sensores han cambiado radicalmente esta ecuación.</p>
        <p>Hoy, un sensor del tamaño de una moneda puede capturar decenas de parámetros por segundo y un algoritmo de machine learning puede analizarlos en tiempo real desde un smartphone.</p>

        <h2>Análisis predictivo: anticiparse al error antes de cometerlo</h2>
        <p>El análisis predictivo es quizás la aplicación más revolucionaria de la IA en el deporte. En lugar de analizar lo que ya ocurrió, predice lo que va a ocurrir. En pádel, esto se traduce en:</p>
        <ul>
          <li><strong>Predicción de lesiones:</strong> los algoritmos detectan cambios sutiles en los patrones de movimiento que preceden a las lesiones musculares, con semanas de antelación.</li>
          <li><strong>Optimización del rendimiento:</strong> el sistema identifica en qué momento del partido la fatiga empieza a afectar a la técnica y recomienda estrategias de gestión del esfuerzo.</li>
          <li><strong>Análisis táctico predictivo:</strong> basándose en el historial de golpes del rival, el sistema puede sugerir qué tipo de juego maximiza las probabilidades de ganar contra un perfil determinado.</li>
        </ul>

        <h2>Machine learning aplicado al análisis técnico</h2>
        <p>Los modelos de machine learning aprenden de millones de golpes para identificar patrones que el ojo humano no puede detectar. Algunos ejemplos concretos ya en desarrollo:</p>

        <h3>Clasificación automática de golpes</h3>
        <p>Los algoritmos de clasificación distinguen automáticamente entre drive, revés, volea, bandeja, víbora y remate con una precisión superior al 94%. Esto elimina la necesidad de etiquetar manualmente cada golpe y permite análisis estadísticos detallados de forma automática.</p>

        <h3>Detección de fatiga técnica</h3>
        <p>Cuando un jugador se fatiga, su técnica se deteriora de formas específicas: el punto de impacto se desplaza, la velocidad de preparación disminuye, la rotación de caderas se reduce. Los modelos de IA detectan estos patrones y alertan al jugador o al entrenador en tiempo real.</p>

        <h3>Recomendaciones personalizadas</h3>
        <p>Los sistemas de IA pueden generar recomendaciones técnicas personalizadas basadas en el perfil único de cada jugador, comparándolo con el comportamiento de jugadores de niveles superiores con características similares.</p>

        <h2>El roadmap de PadelStats con IA</h2>
        <p>En PadelStats estamos integrando capacidades de inteligencia artificial en varias fases:</p>
        <ul>
          <li><strong>Fase 1 (actual):</strong> análisis en tiempo real de métricas básicas y reportes post-sesión</li>
          <li><strong>Fase 2:</strong> clasificación automática de golpes y detección de patrones técnicos recurrentes</li>
          <li><strong>Fase 3:</strong> modelos predictivos de rendimiento y planes de entrenamiento adaptativos</li>
          <li><strong>Fase 4:</strong> análisis táctico del rival y asistente de estrategia en tiempo real</li>
        </ul>

        <h2>¿Cuándo llegará esto al jugador de a pie?</h2>
        <p>Antes de lo que muchos imaginan. Los modelos de IA ya están entrenándose con los datos de la comunidad PadelStats. Cuantos más usuarios registren sus partidos, más preciso y útil será el sistema para todos.</p>

        <p>La revolución de la IA en el pádel no va a cambiar la esencia del juego: la técnica, el trabajo duro y la inteligencia competitiva siguen siendo fundamentales. Pero va a dar a cada jugador herramientas que antes solo existían en los laboratorios de los equipos profesionales. Y eso cambia todo.</p>
      `,
      excerpt: 'Exploramos cómo la inteligencia artificial y el machine learning están siendo aplicados al análisis del pádel, permitiendo predicciones de rendimiento y consejos personalizados.',
      featured_image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=500&fit=crop&auto=format',
      author: 'Dr. Luis Rodríguez',
      created_at: '2023-12-28T13:10:00Z',
      views: 0
    }
  };

  useEffect(() => {
    // Simular carga de API
    setTimeout(() => {
      const foundPost = samplePosts[slug];
      if (foundPost) {
        setPost(foundPost);
        // Incrementar vistas
        foundPost.views += 1;
      }
      setLoading(false);
    }, 800);
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-6">El artículo que buscas no existe o ha sido eliminado.</p>
          <Link to="/blog" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Blog */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Volver al Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <FaUser className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaCalendar className="mr-2" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaEye className="mr-2" />
                <span>{post.views} vistas</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  liked 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaHeart className={`mr-2 ${liked ? 'text-red-500' : ''}`} />
                {liked ? 'Te gusta' : 'Me gusta'}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FaShare className="mr-2" />
                Compartir
              </button>
            </div>

            {/* Featured Image */}
            {post.featured_image ? (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img src={post.featured_image} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-lg" />
              </div>
            ) : null}
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            style={{
              lineHeight: '1.8',
              fontSize: '1.125rem'
            }}
          >
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3
                [&_p]:text-gray-700 [&_p]:mb-4 [&_p]:leading-relaxed
                [&_ul]:mb-4 [&_ul]:pl-6
                [&_ol]:mb-4 [&_ol]:pl-6
                [&_li]:mb-2 [&_li]:text-gray-700
                [&_strong]:text-gray-900 [&_strong]:font-semibold
              "
            />
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Te puede interesar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/blog/analisis-datos-zona-golpe-ideal" 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Análisis de datos: ¿Cuál es tu zona de golpe ideal?
              </h3>
              <p className="text-gray-600 text-sm">
                Con PadelStats hemos analizado miles de golpes para determinar cuál es la zona óptima...
              </p>
            </Link>
            
            <Link 
              to="/blog/errores-comunes-padel-segun-datos" 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Los errores más comunes en el pádel según los datos
              </h3>
              <p className="text-gray-600 text-sm">
                Analizamos los datos de más de 10,000 partidos registrados con PadelStats...
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            ¿Te gustó este artículo?
          </h2>
          <p className="text-primary-100 mb-6">
            Suscríbete para recibir más consejos y análisis de pádel
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button className="bg-accent-500 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-accent-600 transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;