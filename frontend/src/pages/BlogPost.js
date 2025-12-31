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
      featured_image: null,
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
      featured_image: null,
      author: 'Soporte Técnico',
      created_at: '2024-01-02T11:20:00Z',
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
            <div className="h-64 md:h-80 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Imagen del artículo</span>
            </div>
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