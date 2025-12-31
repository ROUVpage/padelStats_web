import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <h3 className="footer-section-title">PadelStats</h3>
            <div className="footer-section-content">
              <p>
                El sensor inteligente que revoluciona tu juego de pádel. 
                Mide tu potencia, precisión, efecto y mucho más para mejorar tu rendimiento.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FaFacebook />
                </a>
                <a href="#" className="social-link">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/producto" className="footer-link">
                  Producto
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/blog" className="footer-link">
                  Blog
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/ayuda" className="footer-link">
                  Ayuda
                </Link>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Términos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-section-title">Soporte</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/ayuda" className="footer-link">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/ayuda" className="footer-link">
                  Contacto
                </Link>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Política de Privacidad
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Newsletter */}
          <div className="footer-section">
            <h4 className="footer-section-title">Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>padelstats0@gmail.com</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+34 000 000 000</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>España</span>
              </div>
            </div>

            <div className="newsletter-form">
              <h5 className="footer-section-title">Newsletter</h5>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="newsletter-input"
                />
                <button className="newsletter-button">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <div className="payment-icon">VISA</div>
              <div className="payment-icon">MC</div>
              <div className="payment-icon">PP</div>
              <div className="payment-icon">GPay</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 PadelStats. Todos los derechos reservados.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Play Store</a>
              <a href="#" className="footer-bottom-link">App Store</a>
              <a href="#" className="footer-bottom-link">Política de Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;