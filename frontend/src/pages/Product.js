import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaBatteryFull, FaWifi, FaShieldAlt, FaMobile, FaShoppingCart } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';
import './Product.css';

const Product = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const [selectedTab, setSelectedTab] = useState('features');
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState(null);
  const [visibleFeatures, setVisibleFeatures] = useState({});
  const [allowReveal, setAllowReveal] = useState(true);
  const navigate = useNavigate();

  // Características del producto (debe declararse antes de usarse en cálculos)
  const features = isEnglish ? [
    { title: 'Power Measurement', description: 'Analyze the force applied to every shot with high-precision sensors. Get detailed metrics for impact speed and energy transferred to the ball.', details: ['Measurement range: 0-130 km/h', 'Accuracy: ±2%', 'Unit: Newtons (N)'], image: '' },
    { title: 'Technique Analysis', description: 'Evaluate your shot technique in real time, analyzing posture, movement and execution to identify opportunities to improve.', details: ['Biomechanical shot analysis', 'Technical movement correction', 'Personalized technical recommendations'], image: '' },
    { title: 'Ball Speed', description: 'Measure the exact speed the ball reaches after impact, essential for assessing the effectiveness of every shot.', details: ['Ball exit speed', 'Racket speed', 'Energy transfer optimization'], image: '' },
    { title: 'Physical Demand', description: 'Monitor your physical exertion during play. Track the intensity of each shot and optimize performance throughout the match.', details: ['Muscle demand per shot', 'Interactive physical-exertion chart', 'Recovery tips tailored to you'], image: '' },
    { title: 'Impact Point', description: 'Identify the exact point where the ball hits the racket to find and maintain the sweet spot for greater control.', details: ['Improve accuracy on every shot', 'Your racket sweet spot', 'Clean ball impact'], image: '' },
    { title: 'Shot Classification', description: 'Automatically identify every shot type: forehands, backhands, volleys, smashes, bandejas and drop shots.', details: ['Automatic shot detection', 'Movement pattern analysis', 'Shot-by-shot classification'], image: '' },
    { title: 'Injury Prevention', description: 'An advanced injury detection and prevention system that analyzes movement patterns and joint stress in real time.', details: ['Risky movement detection', 'Joint overload analysis', 'Injury-prevention guidance'], image: '' },
    { title: 'Spin Measurement', description: 'Analyze spin applied to every ball, including topspin, slice and sidespin. Refine your technique with precise ball-rotation data.', details: ['Rotation speed detection', 'Complex spin analysis', 'Topspin, slice and sidespin differentiation'], image: '' }
  ] : [
    {
      title: 'Medición de Potencia',
      description: 'Analiza la fuerza aplicada en cada golpe con sensores de alta precisión. Obtén métricas detalladas sobre la velocidad de impacto y la energía transferida a la pelota.',
      details: [
        'Rango de medición: 0-130 km/h',
        'Precisión: ±2%',
        'Unidad de medida: Newtons (N)'
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
        'Exigencia muscular por golpe',
        'Gráfico interactivo del desgaste físico',
        'Consejos para la recuperación específicos para ti'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Punto de Impacto',
      description: 'Identifica el punto exacto donde la pelota golpea la pala, ayudándote a encontrar y mantener el punto dulce para mayor control.',
      details: [
        'Mejora tu precisión en cada golpe',
        'Punto dulce de tu pala',
        'Impacto limpio de la pelota'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Clasificación de Cada Golpe',
      description: 'Identifica automáticamente el tipo de golpe ejecutado: drive, revés, voleas, remates, bandejas y dejadas con análisis individual.',
      details: [
        'Detección automática de cada golpe',
        'Análisis de patrones de movimiento',
        'Clasificación de cada golpe'        
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Prevención de Lesiones',
      description: 'Sistema avanzado de detección y prevención de lesiones que analiza patrones de movimiento y estrés articular en tiempo real.',
      details: [
        'Detección de movimientos de riesgo',
        'Análisis de sobrecarga articular',
        'Consejos para prevenir las lesiones'
      ],
      image: '' // URL de imagen a rellenar
    },
    {
      title: 'Medición de Efecto',
      description: 'Analiza el spin aplicado a cada pelota, incluyendo efecto liftado, cortado y lateral. Perfecciona tu técnica con datos precisos del giro de la pelota.',
      details: [
        'Detección de la velocidad de rotación',
        'Análisis de efectos complejos',
        'Diferenciación entre liftado, cortado y lateral'
      ],
      image: '' // URL de imagen a rellenar
    }
  ];

  // Revelar características progresivamente al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!allowReveal) return;
        entries.forEach((entry) => {
          const index = entry.target.getAttribute('data-index');
          if (entry.isIntersecting) {
            setVisibleFeatures((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    const nodes = document.querySelectorAll('.feature-block');
    nodes.forEach((node) => observer.observe(node));

    return () => {
      nodes.forEach((node) => observer.unobserve(node));
    };
  }, [allowReveal, features.length]);

  const allVisible = features.every((_, idx) => visibleFeatures[idx]);
  const collapseFeatures = () => {
    setAllowReveal(false);
    setVisibleFeatures({ 0: true });
  };

  const expandFeatures = () => {
    setAllowReveal(true);
    setVisibleFeatures({ 0: true });
  };

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

  const specifications = isEnglish ? [
    { label: 'Battery life', value: '4h 30min', icon: <FaBatteryFull /> }, { label: 'Connectivity', value: 'Bluetooth 5.0', icon: <FaWifi /> }, { label: 'Resistance', value: 'IPX7 - Highly durable', icon: <FaShieldAlt /> }, { label: 'Weight', value: '12g', icon: '⚖️' }, { label: 'Dimensions', value: '4x2x1 cm', icon: '📏' }, { label: 'Material', value: 'Polycarbonate', icon: '🛡️' }, { label: 'Mobile app', value: 'Free iOS/Android', icon: <FaMobile /> }, { label: 'Memory', value: '250 matches', icon: '🧠' }
  ] : [
    { label: 'Duración de batería', value: '4h 30min', icon: <FaBatteryFull /> },
    { label: 'Conectividad', value: 'Bluetooth 5.0', icon: <FaWifi /> },
    { label: 'Resistencia', value: 'IPX7 - Muy duradera', icon: <FaShieldAlt /> },
    { label: 'Peso', value: '12g', icon: '⚖️' },
    { label: 'Dimensiones', value: '4x2x1 cm', icon: '📏' },
    { label: 'Material', value: 'Policarbonato', icon: '🛡️' },
    { label: 'App móvil', value: 'iOS/Android gratuita', icon: <FaMobile /> },
    { label: 'Memoria', value: '250 partidos', icon: '🧠' }
  ];

  const renderedFeatures = allowReveal ? features : features.slice(0, 1);

  return (
    <div className="product-container">
      {/* Interactive Features Section - Moved to Top */}
      <section className="features-section" id="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              {isEnglish ? 'PadelStats Features' : 'Características PadelStats'}
            </h2>
            <p className="features-subtitle">
              {isEnglish ? 'Discover everything PadelStats can measure and analyze in every shot' : 'Descubre todo lo que PadelStats puede medir y analizar en cada golpe'}
            </p>
          </div>
          
          {/* Vertical feature stack with entrada/salida suave */}
          <div className="features-stack">
            {renderedFeatures.map((feature, index) => (
              <div
                key={feature.title}
                data-index={index}
                className={`feature-block ${visibleFeatures[index] ? 'visible' : ''}`}
              >
                <div className="feature-block-grid">
                  <div>
                    <div className="feature-block-header">
                      <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="feature-title">{feature.title}</h3>
                    </div>
                    <p className="feature-description">{feature.description}</p>
                    <ul className="feature-details">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="feature-detail-item">
                          <FaCheck className="feature-check-icon" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="features-actions">
              {allowReveal && allVisible ? (
                <button className="feature-button secondary" onClick={collapseFeatures}>
                  {isEnglish ? 'Show less' : 'Ver menos'}
                </button>
              ) : null}
              {!allowReveal ? (
                <button className="feature-button" onClick={expandFeatures}>
                  {isEnglish ? 'Show more features' : 'Ver más características'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="product-hero">
        <div className="product-hero-container">
          <div className="product-hero-grid">
            <div>
              <div className="product-image-container" style={{padding:0}}>
                <img src="/producto-nuevo.png" alt="PadelStats Sensor" style={{width:'100%',height:'auto',display:'block'}} />
              </div>
            </div>
            <div>
              <h1 className="product-title">
                PadelStats Sensor
              </h1>
              <p className="product-subtitle">
                {isEnglish ? 'The first smart sensor designed specifically for padel. It attaches easily to the edge of your racket and records every shot with professional accuracy.' : 'El primer sensor inteligente diseñado específicamente para pádel. Se coloca fácilmente en el canto de tu pala y registra cada golpe con precisión profesional.'}
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
                        {isEnglish ? 'PACK OF 4 - BEST PRICE!' : '¡PACK DE 4 - MEJOR PRECIO!'}
                      </div>
                    )}
                  </div>
                  <div className="quantity-selector">
                    <label className="quantity-label">{isEnglish ? 'Quantity:' : 'Cantidad:'}</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        if (value > 0) {
                          setQuantity(value);
                          setQuantityError(null);
                        } else {
                          setQuantityError(true);
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        if (value <= 0) {
                          setQuantityError(true);
                          setQuantity(1);
                        }
                      }}
                      className="quantity-input"
                    />
                  </div>
                  {quantityError && (
                    <div className="quantity-error">
                      <p>{isEnglish ? 'This value is invalid. Please enter a valid number.' : 'El valor no es válido. Por favor, ingresa un número válido.'}</p>
                      <a href="/ayuda" className="error-help-link">{isEnglish ? 'Need help? Click here' : '¿Necesitas ayuda? Pulsa aquí'}</a>
                    </div>
                  )}
                </div>
                <button 
                  disabled
                  className="cart-button cart-button--soldout"
                >
                  {isEnglish ? 'Product Sold Out' : 'Producto Agotado'}
                </button>
                <p className="savings-text">
                  {quantity >= 4 ? 
                    isEnglish ? `Save €${((84.99 - 49.99) * quantity).toFixed(2)} with the pack of ${quantity}` : `Ahorro de €${((84.99 - 49.99) * quantity).toFixed(2)} con el pack de ${quantity}` :
                    isEnglish ? `Save €${((84.99 - 59.99) * quantity).toFixed(2)}` : `Ahorro de €${((84.99 - 59.99) * quantity).toFixed(2)}`
                  }
                </p>
              </div>

              {/* Key Benefits */}
              <div className="benefits-grid">
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">{isEnglish ? 'Free shipping' : 'Envío gratis'}</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">{isEnglish ? '2-year warranty' : 'Garantía 2 años'}</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">{isEnglish ? 'App included' : 'App incluida'}</span>
                </div>
                <div className="benefit-item">
                  <FaCheck className="benefit-check" />
                  <span className="benefit-text">{isEnglish ? '30-day returns' : 'Devolución 30 días'}</span>
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
              { id: 'features', label: isEnglish ? 'Features' : 'Características' },
              { id: 'specs', label: isEnglish ? 'Specifications' : 'Especificaciones' },
              { id: 'app', label: isEnglish ? 'Mobile App' : 'App Móvil' }
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
                {isEnglish ? 'All PadelStats Features' : 'Todas las Características PadelStats'}
              </h3>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-card-content">
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
                {isEnglish ? 'Technical Specifications' : 'Especificaciones Técnicas'}
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
                    {isEnglish ? 'The free mobile app lets you view all your statistics, analyze your progress and compare your performance with other players.' : 'La aplicación móvil gratuita te permite visualizar todas tus estadísticas, analizar tu progreso y comparar tu rendimiento con otros jugadores.'}
                  </p>
                  
                  <div className="app-features">
                    {[
                      ...(isEnglish ? ['Real-time analysis', 'Match history', 'Comparisons and rankings', 'Personalized tips', 'iOS and Android compatibility'] : ['Análisis en tiempo real', 'Histórico de partidos', 'Comparativas y rankings', 'Consejos personalizados', 'Compatibilidad iOS y Android'])
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
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-container">
          <h2 className="cta-title">
            {isEnglish ? 'Ready to elevate your game?' : '¿Todo listo para elevar tu juego?'}
          </h2>
          <p className="cta-subtitle">
            {isEnglish ? 'Join the smart padel revolution with PadelStats' : 'Únete a la revolución del pádel inteligente con PadelStats'}
          </p>
          <button 
            disabled
            className="cta-button cta-button--soldout"
          >
            {isEnglish ? 'Product Sold Out' : 'Producto Agotado'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Product;