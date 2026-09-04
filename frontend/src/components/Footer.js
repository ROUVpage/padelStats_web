import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">PadelStats</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              {isEnglish ? 'The smart sensor that revolutionizes your padel game.' : 'El sensor inteligente que revoluciona tu juego de pádel.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{isEnglish ? 'Quick Links' : 'Enlaces Rápidos'}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/producto" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {isEnglish ? 'Product' : 'Producto'}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/ayuda" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {isEnglish ? 'Help' : 'Ayuda'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{isEnglish ? 'Support' : 'Soporte'}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ayuda" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {isEnglish ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
                </Link>
              </li>
              <li>
                <Link to="/ayuda" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {isEnglish ? 'Contact' : 'Contacto'}
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {isEnglish ? 'Terms of Use' : 'Términos de Uso'}
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-gray-300 hover:text-primary-400 transition-colors">
                  {isEnglish ? 'Privacy Policy' : 'Política de Privacidad'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {isEnglish ? '© 2024 PadelStats. All rights reserved.' : '© 2024 PadelStats. Todos los derechos reservados.'}
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            {isEnglish ? 'Download the app: ' : 'Descarga la app: '}
            <a href="#" className="text-primary-400 hover:text-primary-300 ml-1">Play Store</a> | 
            <a href="#" className="text-primary-400 hover:text-primary-300 ml-1">App Store</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;