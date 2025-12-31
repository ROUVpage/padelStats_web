import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaQuestionCircle, FaChevronDown, FaChevronUp, FaMobile, FaBluetooth, FaBatteryFull, FaShieldAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import './Help.css';

const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta General',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: '¿Cómo descargar la app PadelStats en mi móvil?',
      answer: 'Puedes descargar la app PadelStats de forma completamente gratuita desde las tiendas oficiales: Play Store para Android y App Store para iOS. Simplemente busca "PadelStats" en tu tienda de aplicaciones y descárgala. La app no requiere suscripción ni pagos adicionales.',
      icon: <FaMobile />
    },
    {
      id: 2,
      question: '¿Cómo conectar mi PadelStats al móvil?',
      answer: 'Para conectar tu sensor PadelStats: 1) Asegúrate de tener la app instalada, 2) Enciende el sensor manteniendo presionado el botón durante 3 segundos hasta ver la luz azul parpadeante, 3) Abre la app y toca "Conectar Sensor", 4) Selecciona tu dispositivo PadelStats de la lista, 5) Confirma el emparejamiento. El proceso tarda menos de 1 minuto.',
      icon: <FaBluetooth />
    },
    {
      id: 3,
      question: '¿Cuánto dura la batería del PadelStats?',
      answer: 'La batería del PadelStats tiene una duración de 4 horas y 30 minutos de uso continuo. Esto es suficiente para aproximadamente 3-4 partidos completos. El sensor se carga completamente en 2 horas usando el cable USB-C incluido. Puedes verificar el nivel de batería desde la app móvil.',
      icon: <FaBatteryFull />
    },
    {
      id: 4,
      question: '¿Qué tan resistente es el PadelStats?',
      answer: 'El PadelStats está diseñado para ser muy duradero. Cuenta con certificación IPX7, lo que significa que es resistente al agua y sudor. Su carcasa de fibra de plástico reforzado puede soportar impactos fuertes sin dañarse. Ha sido probado en más de 100,000 golpes sin degradación del rendimiento.',
      icon: <FaShieldAlt />
    },
    {
      id: 5,
      question: '¿El sensor afecta el peso o balance de mi pala?',
      answer: 'No, el PadelStats pesa solo 12 gramos, lo que representa menos del 3% del peso total de una pala estándar. Su diseño aerodinámico y posición en el canto de la pala no altera el centro de gravedad ni la sensación de juego. La mayoría de usuarios no notan diferencia en el manejo.',
      icon: '⚖️'
    },
    {
      id: 6,
      question: '¿Puedo usar PadelStats en competiciones oficiales?',
      answer: 'Sí, PadelStats cumple con todas las regulaciones oficiales de la FIP (Federación Internacional de Pádel). Su instalación no modifica las dimensiones reglamentarias de la pala y no ofrece ventaja competitiva durante el juego, solo registra datos para análisis posterior.',
      icon: '🏆'
    },
    {
      id: 7,
      question: '¿Qué datos exactos mide el sensor?',
      answer: 'PadelStats registra múltiples métricas: velocidad de golpe (0-200 km/h), zona de impacto en la pala, tipo de golpe (drive, revés, remate, etc.), efecto aplicado (rpm de spin), potencia desarrollada, precisión del golpe, y exigencia física de cada movimiento. Todos los datos se sincronizan automáticamente con tu perfil.',
      icon: '📊'
    },
    {
      id: 8,
      question: '¿Funciona el sensor sin conexión a Internet?',
      answer: 'Sí, PadelStats puede funcionar completamente sin conexión durante el juego. El sensor almacena todos los datos localmente (hasta 500 partidos) y se sincroniza automáticamente con la nube cuando recuperes la conexión a Internet. Solo necesitas Internet para ver estadísticas avanzadas y comparativas.',
      icon: '📡'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch('http://localhost:8000/api/help/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', subject: 'Consulta General', message: '' });
        
        setTimeout(() => {
          setSubmissionStatus(null);
        }, 5000);
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="help-container">
      {/* Header Section */}
      <section className="help-header">
        <div className="help-header-container">
          <h1 className="help-title">Centro de Ayuda</h1>
          <p className="help-subtitle">
            Encuentra respuestas a tus preguntas sobre PadelStats o contáctanos directamente
          </p>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="help-main">
        <div className="help-main-container">
          <div className="quick-help">
            <h2 className="section-title">Ayuda Rápida</h2>
            <div className="quick-help-grid">
              <div className="help-card">
                <FaMobile className="help-card-icon" />
                <h3 className="help-card-title">Descarga la App</h3>
                <p className="help-card-description">
                  Disponible gratis en Play Store y App Store
                </p>
              </div>
              <div className="help-card">
                <FaBluetooth className="help-card-icon" />
                <h3 className="help-card-title">Conectar Sensor</h3>
                <p className="help-card-description">
                  Guía paso a paso para emparejar tu dispositivo
                </p>
              </div>
              <div className="help-card">
                <FaQuestionCircle className="help-card-icon" />
                <h3 className="help-card-title">Soporte 24/7</h3>
                <p className="help-card-description">
                  Estamos aquí para ayudarte en todo momento
                </p>
              </div>
            </div>
          </div>

          {/* Main Help Sections */}
          <div className="help-sections">
            {/* FAQ Section */}
            <div className="faq-section">
              <h2 className="section-title">Preguntas Frecuentes</h2>
              <ul className="faq-list">
                {faqs.map((faq) => (
                  <li key={faq.id} className="faq-item">
                    <div 
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span>{faq.question}</span>
                      <span className={`faq-toggle ${openFAQ === faq.id ? 'expanded' : ''}`}>
                        {openFAQ === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    <div className={`faq-answer ${openFAQ === faq.id ? 'expanded' : 'collapsed'}`}>
                      {faq.answer}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Form Section */}
            <div className="contact-section">
              <h2 className="section-title">Contáctanos</h2>
              
              {submissionStatus === 'success' && (
                <div className="success-message">
                  <FaCheck className="success-icon" />
                  ¡Mensaje enviado correctamente! Te responderemos pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Consulta General">Consulta General</option>
                    <option value="Soporte Técnico">Soporte Técnico</option>
                    <option value="Problema con el Producto">Problema con el Producto</option>
                    <option value="Sugerencia">Sugerencia</option>
                    <option value="Garantía">Garantía</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    placeholder="Describe tu consulta o problema..."
                    rows="5"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="submit-button"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span className="loading-text">Enviando...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="button-icon" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;