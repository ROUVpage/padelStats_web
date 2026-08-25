import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [demoOpen, setDemoOpen] = useState(false);
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
                <button className="secondary-button" onClick={() => setDemoOpen(true)}>
                  <FaPlay className="button-icon-left" />
                  Ver Demo
                </button>
              </div>
            </div>
            <div className="product-showcase">
              <div className="product-card">
                <div className="product-main-card">
                  <div className="product-image" style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0a0a'}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'linear-gradient(145deg,#111,#1a1a1a)',border:'2px solid #4ade80',borderRadius:'1.5rem',width:'160px',height:'120px',boxShadow:'0 0 32px rgba(74,222,128,0.25)'}}>
                      <span style={{fontSize:'3.5rem',fontWeight:900,color:'#4ade80',letterSpacing:'-2px',lineHeight:1}}>PS</span>
                      <span style={{fontSize:'0.6rem',color:'#9ca3af',letterSpacing:'0.15em',marginTop:'6px',textTransform:'uppercase'}}>PadelStats</span>
                    </div>
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
                title: 'Análisis Técnico',
                description: 'Analiza todos tus golpes y movimientos en la pista'
              },
              {
                title: 'Medición de Potencia',
                description: 'Analiza la fuerza y el peso aplicados en cada golpe'
              },
              {
                title: 'Prevención de Lesiones',
                description: 'Identifica patrones de movimiento lesivos'
              },
              {
                title: 'Exigencia Física',
                description: 'Controla tu desgaste físico y optimiza tu rendimiento'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
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
              <div className="product-details-image-container" style={{background:'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src="/demo-app.png" alt="PadelStats App" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transform:'scale(1.25)',transformOrigin:'center',borderRadius:'0.5rem',display:'block'}} />
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
          <Link to="/producto" className="cta-button cta-button--soldout">
            Producto Agotado
          </Link>
        </div>
      </section>
      {demoOpen && (
        <div className="demo-overlay" onClick={() => setDemoOpen(false)}>
          <div className="demo-modal" onClick={e => e.stopPropagation()}>
            <button className="demo-close" onClick={() => setDemoOpen(false)}>
              <FaTimes />
            </button>
            <img src="/producto-padelstats.png" alt="Demo PadelStats" className="demo-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;