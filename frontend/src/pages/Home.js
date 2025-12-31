import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaCheck } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Revoluciona tu
                <span className="hero-title-accent"> Pádel</span>
              </h1>
              <p className="hero-description">
                PadelStats es el sensor inteligente que se coloca en el canto de tu pala para 
                medir potencia, precisión, efecto y exigencia física. Mejora tu juego con 
                datos precisos y análisis detallado.
              </p>
              <div className="hero-buttons">
                <Link to="/producto" className="primary-button">
                  Ver Producto
                  <FaArrowRight className="button-icon" />
                </Link>
                <button className="secondary-button">
                  <FaPlay className="button-icon-left" />
                  Ver Demo
                </button>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-card">
                <div className="product-main-card">
                  <div className="product-image">
                    <span className="product-image-placeholder">Imagen del Producto</span>
                  </div>
                </div>
                {/* Floating stats cards */}
                <div className="floating-stats">
                  <div className="stat-card top-left">
                    <div className="stat-value">95%</div>
                    <div className="stat-label">Precisión</div>
                  </div>
                </div>
                <div className="floating-stats">
                  <div className="stat-card bottom-right">
                    <div className="stat-value">4.5h</div>
                    <div className="stat-label">Batería</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Características Principales
            </h2>
            <p className="features-subtitle">
              Descubre todo lo que PadelStats puede medir y cómo te ayuda a mejorar tu rendimiento
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: '⚡',
                title: 'Medición de Potencia',
                description: 'Analiza la fuerza de cada golpe con precisión milimétrica'
              },
              {
                icon: '🎯',
                title: 'Precisión Tracking',
                description: 'Rastrea la exactitud de tus golpes y mejora tu control'
              },
              {
                icon: '🌪️',
                title: 'Análisis de Efecto',
                description: 'Mide el spin y efecto aplicado a cada pelota'
              },
              {
                icon: '💪',
                title: 'Exigencia Física',
                description: 'Controla tu desgaste físico y optimiza tu rendimiento'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="product-details-section">
        <div className="product-details-container">
          <div className="product-details-grid">
            <div className="product-details-content">
              <h2 className="section-title">
                La Tecnología más Avanzada
              </h2>
              <p className="section-description">
                PadelStats utiliza sensores de última generación para capturar cada detalle 
                de tu juego. Desde la velocidad de tu golpe hasta el análisis biomecánico 
                de tu técnica.
              </p>
              
              <ul className="features-list">
                {[
                  'Sensores de alta precisión integrados',
                  'Conectividad Bluetooth 5.0',
                  'Batería de larga duración (4.5h)',
                  'Resistencia al agua IPX7',
                  'App móvil gratuita incluida',
                  'Análisis detallado en tiempo real'
                ].map((feature, index) => (
                  <li key={index} className="feature-list-item">
                    <FaCheck className="feature-check" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="price-highlight">
                <div className="price-row">
                  <span className="price-label">Precio especial:</span>
                  <div>
                    <span className="original-price">€84.99</span>
                    <span className="price-value">€59.99</span>
                  </div>
                </div>
                <div className="price-row">
                  <span className="discount-badge">Pack de 4 por €49.99 c/u</span>
                </div>
              </div>

              <Link to="/producto" className="primary-button">
                Ver Detalles del Producto
                <FaArrowRight className="button-icon" />
              </Link>
            </div>
            <div className="product-details-image">
              <div className="product-details-image-container">
                <span className="product-image-placeholder">Imagen Técnica del Sensor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            ¿Listo para llevar tu pádel al siguiente nivel?
          </h2>
          <p className="cta-subtitle">
            Únete a miles de jugadores que ya mejoran su rendimiento con PadelStats
          </p>
          <Link to="/producto" className="cta-button">
            <FaArrowRight className="button-icon-left" />
            Comprar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;