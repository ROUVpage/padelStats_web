import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaEye, FaBookOpen } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para el blog
  const samplePosts = [
    {
      id: 1,
      title: 'Cómo mejorar tu técnica de remate en pádel',
      slug: 'como-mejorar-tecnica-remate-padel',
      excerpt: 'Descubre los secretos para ejecutar remates más efectivos y potentes en el pádel. Analizamos la técnica correcta, errores comunes y ejercicios específicos para mejorar tu juego ofensivo.',
      featured_image: null,
      author: 'PadelStats Team',
      category: 'Técnica',
      created_at: '2024-01-15T10:00:00Z',
      views: 1250
    },
    {
      id: 2,
      title: 'Análisis de datos: ¿Cuál es tu zona de golpe ideal?',
      slug: 'analisis-datos-zona-golpe-ideal',
      excerpt: 'Con PadelStats hemos analizado miles de golpes para determinar cuál es la zona óptima de impacto en la pala. Te mostramos los resultados y cómo aplicarlos a tu juego.',
      featured_image: null,
      author: 'Dr. Carlos Martínez',
      category: 'Análisis',
      created_at: '2024-01-12T14:30:00Z',
      views: 890
    },
    {
      id: 3,
      title: 'Los errores más comunes en el pádel según los datos',
      slug: 'errores-comunes-padel-segun-datos',
      excerpt: 'Analizamos los datos de más de 10,000 partidos registrados con PadelStats para identificar los errores técnicos más frecuentes y cómo corregirlos.',
      featured_image: null,
      author: 'Ana García',
      category: 'Estadísticas',
      created_at: '2024-01-08T09:15:00Z',
      views: 2100
    },
    {
      id: 4,
      title: 'Entrenamiento con datos: La revolución del pádel',
      slug: 'entrenamiento-datos-revolucion-padel',
      excerpt: 'El entrenamiento basado en datos está transformando el pádel. Descubre cómo los sensores inteligentes como PadelStats están cambiando la forma de entrenar y competir.',
      featured_image: null,
      author: 'PadelStats Team',
      category: 'Tecnología',
      created_at: '2024-01-05T16:45:00Z',
      views: 1680
    },
    {
      id: 5,
      title: 'Guía completa: Cómo conectar PadelStats a tu móvil',
      slug: 'guia-conectar-padelstats-movil',
      excerpt: 'Tutorial paso a paso para conectar tu sensor PadelStats con la aplicación móvil. Incluye solución a problemas comunes de conectividad y configuración inicial.',
      featured_image: null,
      author: 'Soporte Técnico',
      category: 'Tutoriales',
      created_at: '2024-01-02T11:20:00Z',
      views: 3250
    },
    {
      id: 6,
      title: 'El futuro del pádel: Inteligencia artificial y análisis predictivo',
      slug: 'futuro-padel-ia-analisis-predictivo',
      excerpt: 'Exploramos cómo la inteligencia artificial y el machine learning están siendo aplicados al análisis del pádel, permitiendo predicciones de rendimiento y consejos personalizados.',
      featured_image: null,
      author: 'Dr. Luis Rodríguez',
      category: 'Investigación',
      created_at: '2023-12-28T13:10:00Z',
      views: 750
    }
  ];

  useEffect(() => {
    // Simular carga de API
    setTimeout(() => {
      setBlogPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogPostCard = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-image">
        <span className="blog-image-placeholder">Imagen del artículo</span>
      </div>
      
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-date">{formatDate(post.created_at)}</span>
          <span className="blog-category">{post.category}</span>
        </div>

        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
        <div className="loading-text">Cargando artículos...</div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      {/* Header Section */}
      <section className="blog-header">
        <div className="blog-header-container">
          <h1 className="blog-title">Blog PadelStats</h1>
          <p className="blog-subtitle">
            Descubre los últimos consejos, análisis técnicos y novedades sobre 
            el mundo del pádel y la tecnología deportiva
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog-main">
        <div className="blog-main-container">
          {blogPosts.length > 0 ? (
            <div className="blog-grid">
              {blogPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FaBookOpen className="empty-icon" />
              <h3 className="empty-title">No hay artículos disponibles</h3>
              <p className="empty-description">
                Estamos trabajando en nuevos contenidos. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;