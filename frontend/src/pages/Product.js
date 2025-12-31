import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaBatteryFull, FaWifi, FaShieldAlt, FaMobile, FaShoppingCart } from 'react-icons/fa';
import './Product.css';

const Product = () => {
  const [selectedTab, setSelectedTab] = useState('features');
  const [quantity, setQuantity] = useState(1);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  // Efecto para ciclar automáticamente entre características
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
        setIsTransitioning(false);
      }, 800); // Tiempo para que desaparezca completamente
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  const calculatePrice = () => {
    if (quantity >= 4) {
      return 49.99 * quantity;
    }
    return 59.99 * quantity;
  };

  const calculateOriginalPrice = () => {
    return 84.99 * quantity;
  };

  const goToCart = () => {
    // Guardar datos del carrito en localStorage
    const cartData = {
      quantity: quantity,
      unitPrice: quantity >= 4 ? 49.99 : 59.99,
      originalPrice: 84.99
    };
    localStorage.setItem('padelstats_cart', JSON.stringify(cartData));
    navigate('/carrito');
  };

  const features = [
    {
      title: 'Medición de Potencia',
      description: 'Analiza la fuerza aplicada en cada golpe con sensores de alta precisión. Obtén métricas detalladas sobre la velocidad de impacto y la energía transferida a la pelota.',
      details: [
        'Rango de medición: 0-130 km/h',
        'Precisión: ±2%',
        'Frecuencia de muestreo: 1000Hz'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Análisis de Precisión',
      description: 'Rastrea la exactitud de tus golpes y mejora tu control. El sistema detecta la zona de impacto y calcula desviaciones del punto óptimo.',
      details: [
        'Detección de zona de golpe',
        'Análisis de consistencia',
        'Métricas de control de pala'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Medición de Efecto',
      description: 'Analiza el spin aplicado a cada pelota, incluyendo efecto liftado, cortado y lateral. Perfecciona tu técnica con datos precisos del giro de la pelota.',
      details: [
        'Detección de spin rate (rpm)',
        'Análisis de efectos complejos',
        'Diferenciación entre liftado, cortado y lateral'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Análisis de Técnica',
      description: 'Evalúa tu técnica de golpe en tiempo real, analizando la postura, movimiento y ejecución para identificar áreas de mejora.',
      details: [
        'Análisis biomecánico del golpe',
        'Corrección del movimiento técnicamente',
        'Recomendaciones técnicas personalizadas'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Velocidad de la Bola',
      description: 'Mide la velocidad exacta que alcanza la pelota después del impacto, fundamental para evaluar la efectividad de cada golpe.',
      details: [
        'Velocidad de salida de la pelota',
        'Velocidad de la pala',
        'Optimización de la transferencia de energía'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Exigencia Física',
      description: 'Monitorea tu desgaste físico durante el juego. Controla la intensidad de cada golpe y optimiza tu rendimiento a lo largo del partido.',
      details: [
        'Exigencia cardiovascular por golpe',
        'Fuerza muscular aplicada',
        'Indicador de fatiga y riesgo de lesión'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Punto de Impacto',
      description: 'Identifica el punto exacto donde la pelota golpea la pala, ayudándote a encontrar y mantener el punto dulce para mayor control.',
      details: [
        'Localización precisa del impacto',
        'Punto dulce de tu pala',
        'Golpeo limpio de la pelota'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Clasificación de Cada Golpe',
      description: 'Identifica automáticamente el tipo de golpe ejecutado: drive, revés, voleas, remates, bandejas y dejadas con análisis individual.',
      details: [
        'Reconocimiento automático de golpe',
        'Estadísticas por tipo de golpe',
        'Análisis de patrones de juego'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Medición de Posibles Lesiones',
      description: 'Sistema avanzado de detección y prevención de lesiones que analiza patrones de movimiento y estrés articular en tiempo real.',
      details: [
        'Detección de movimientos de riesgo',
        'Análisis de sobrecarga articular',
        'Alertas de prevención de lesiones'
      ],
      image: '' // URL de imagen a rellenar
    }
  ];

  const specifications = [
    { label: 'Duración de batería', value: '4h 30min', icon: <FaBatteryFull /> },
    { label: 'Conectividad', value: 'Bluetooth 5.0', icon: <FaWifi /> },
    { label: 'Resistencia', value: 'IPX7 - Muy duradera', icon: <FaShieldAlt /> },
    { label: 'Peso', value: '12g', icon: '⚖️' },
    { label: 'Dimensiones', value: '4x2x1 cm', icon: '📐' },
    { label: 'Material', value: 'Fibra de plástico reforzado', icon: '🧱' },
    { label: 'App móvil', value: 'iOS/Android gratuita', icon: <FaMobile /> },
    { label: 'Memoria', value: '500 partidos', icon: '💾' }
  ];

  return (
    <div className="product-container">
      {/* Interactive Features Section - Moved to Top */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Características PadelStats
            </h2>
            <p className="features-subtitle">
              Descubre todo lo que PadelStats puede medir y analizar en cada golpe
            </p>
          </div>
          
          {/* Interactive Feature Display */}
          <div className="features-card">
            <div className={`feature-content ${
              isTransitioning ? 'transitioning' : 'visible'
            }`}>
              <div className="feature-grid">
                <div>
                  <div className="feature-image-container">
                    {features[currentFeatureIndex].image ? (
                      <img 
                        src={features[currentFeatureIndex].image} 
                        alt={features[currentFeatureIndex].title}
                        className="feature-image"
                      />
                    ) : (
                      <span className="feature-image-placeholder">Imagen {features[currentFeatureIndex].title}</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="feature-title">
                    {features[currentFeatureIndex].title}
                  </h3>
                  <p className="feature-description">
                    {features[currentFeatureIndex].description}
                  </p>
                  <ul className="feature-details">
                    {features[currentFeatureIndex].details.map((detail, idx) => (
                      <li key={idx} className="feature-detail-item">
                        <FaCheck className="feature-check-icon" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Feature Navigation Dots */}
            <div className="navigation-dots">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index !== currentFeatureIndex) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentFeatureIndex(index);
                        setIsTransitioning(false);
                      }, 800);
                    }
                  }}
                  className={`nav-dot ${
                    index === currentFeatureIndex ? 'active' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="product-hero">
        <div className="product-hero-container">
          <div className="product-hero-grid">
            <div>
              <div className="product-image-container">
                <span className="product-image-placeholder">Imagen PadelStats Sensor</span>
              </div>
            </div>
            <div>
              <h1 className="product-title">
                PadelStats Sensor
              </h1>
              <p className="product-subtitle">
                El primer sensor inteligente diseñado específicamente para pádel. 
                Se coloca fácilmente en el canto de tu pala y registra cada golpe 
                con precisión profesional.
              </p>

              {/* Price Section */}
              <div className="price-section">
                <div className="price-header">
                  <div className="price-container">
                    <div className="original-price">
                      €{calculateOriginalPrice().toFixed(2)}
                    </div>
                    <div className="current-price">
                      €{calculatePrice().toFixed(2)}
                    </div>
                    {quantity >= 4 && (
                      <div className="pack-badge">
                        ¡PACK DE 4 - MEJOR PRECIO!
                      </div>
                    )}
                  </div>
                  <div className="quantity-selector">
                    <label className="quantity-label">Cantidad:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="quantity-select"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  onClick={goToCart}
                  className="cart-button"
                >
                  <FaShoppingCart className="cart-icon" />
                  Ir al Carrito - €{calculatePrice().toFixed(2)}
                </button>
                <p className="savings-text">
                  {quantity >= 4 ? 
                    `Ahorro de €${((84.99 - 49.99) * quantity).toFixed(2)} con el pack de ${quantity}` :
                    `Ahorro de €${((84.99 - 59.99) * quantity).toFixed(2)}`
                  }
                </p>
              </div>

              {/* Key Benefits */}
              <div className="benefits-grid">
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">Envío gratis</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">Garantía 2 años</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">App incluida</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">Devolución 30 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="tabs-section">
        <div className="tabs-container">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            {[
              { id: 'features', label: 'Características' },
              { id: 'specs', label: 'Especificaciones' },
              { id: 'app', label: 'App Móvil' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`tab-button ${
                  selectedTab === tab.id ? 'active' : 'inactive'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {selectedTab === 'features' && (
            <div className="tab-content">
              <h3 className="tab-title">
                Todas las Características PadelStats
              </h3>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-card-content">
                      <div className="feature-icon-container">
                        {feature.image ? (
                          <img 
                            src={feature.image} 
                            alt={feature.title}
                            className="feature-icon-image"
                          />
                        ) : (
                          <div className="feature-icon-placeholder">
                            <span className="feature-icon-text">Img</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="feature-card-title">
                          {feature.title}
                        </h4>
                        <p className="feature-card-description">
                          {feature.description}
                        </p>
                        <ul className="feature-card-details">
                          {feature.details.map((detail, idx) => (
                            <li key={idx} className="feature-card-detail-item">
                              <FaCheck className="feature-card-check" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'specs' && (
            <div className="tab-content">
              <h3 className="tab-title">
                Especificaciones Técnicas
              </h3>
              <div className="specs-grid">
                {specifications.map((spec, index) => (
                  <div key={index} className="spec-card">
                    <div className="spec-icon">
                      {spec.icon}
                    </div>
                    <div className="spec-label">{spec.label}</div>
                    <div className="spec-value">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'app' && (
            <div className="tab-content">
              <div className="app-grid">
                <div>
                  <h3 className="app-title">
                    App PadelStats
                  </h3>
                  <p className="app-description">
                    La aplicación móvil gratuita te permite visualizar todas tus estadísticas, 
                    analizar tu progreso y comparar tu rendimiento con otros jugadores.
                  </p>
                  
                  <div className="app-features">
                    {[
                      'Análisis en tiempo real',
                      'Histórico de partidos',
                      'Comparativas y rankings',
                      'Consejos personalizados',
                      'Compatibilidad iOS y Android'
                    ].map((feature, index) => (
                      <div key={index} className="app-feature-item">
                        <FaCheck className="app-check" />
                        <span className="app-feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="app-buttons">
                    <button className="app-button app-store-button">
                      <FaMobile className="app-icon" />
                      App Store
                    </button>
                    <button className="app-button play-store-button">
                      <FaMobile className="app-icon" />
                      Play Store
                    </button>
                  </div>
                </div>
                <div className="app-screenshot-container">
                  <span className="app-screenshot-placeholder">Screenshots de la App</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-container">
          <h2 className="cta-title">
            ¿Todo listo para elevar tu juego?
          </h2>
          <p className="cta-subtitle">
            Únete a la revolución del pádel inteligente con PadelStats
          </p>
          <button 
            onClick={goToCart}
            className="cta-button"
          >
            <FaShoppingCart className="cart-icon" />
            Ir al Carrito - €{calculatePrice().toFixed(2)}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Product;