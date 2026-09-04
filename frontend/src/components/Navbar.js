import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  const labels = language === 'en'
    ? { home: 'Home', product: 'Product', help: 'Help', soldOut: 'Sold out' }
    : { home: 'Inicio', product: 'Producto', help: 'Ayuda', soldOut: 'Agotado' };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              PadelStats
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <div className="menu-items">
              <Link
                to="/"
                className={`menu-link ${isActive('/') ? 'active' : 'inactive'}`}
              >
                {labels.home}
              </Link>
              <Link
                to="/producto"
                className={`menu-link ${isActive('/producto') ? 'active' : 'inactive'}`}
              >
                {labels.product}
              </Link>
              <Link
                to="/blog"
                className={`menu-link ${
                  isActive('/blog') || location.pathname.startsWith('/blog/') 
                    ? 'active' : 'inactive'
                }`}
              >
                Blog
              </Link>
              <Link
                to="/ayuda"
                className={`menu-link ${isActive('/ayuda') ? 'active' : 'inactive'}`}
              >
                {labels.help}
              </Link>
              <span className="cta-button cta-button--soldout">
                {labels.soldOut}
              </span>
              <select
                className="language-select"
                value={language}
                onChange={(event) => changeLanguage(event.target.value)}
                aria-label="Language"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-controls">
            <select
              className="language-select"
              value={language}
              onChange={(event) => changeLanguage(event.target.value)}
              aria-label="Language"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
            <button onClick={toggleMenu} className="mobile-menu-button" aria-label="Toggle menu">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? '' : 'hidden'}`}>
          <div className="mobile-menu-content">
            <Link
              to="/"
              className={`mobile-menu-link ${isActive('/') ? 'active' : 'inactive'}`}
              onClick={() => setIsOpen(false)}
            >
              {labels.home}
            </Link>
            <Link
              to="/producto"
              className={`mobile-menu-link ${isActive('/producto') ? 'active' : 'inactive'}`}
              onClick={() => setIsOpen(false)}
            >
              {labels.product}
            </Link>
            <Link
              to="/blog"
              className={`mobile-menu-link ${
                isActive('/blog') || location.pathname.startsWith('/blog/') 
                  ? 'active' : 'inactive'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/ayuda"
              className={`mobile-menu-link ${isActive('/ayuda') ? 'active' : 'inactive'}`}
              onClick={() => setIsOpen(false)}
            >
              {labels.help}
            </Link>
            <span
              className="mobile-cta-button mobile-cta-button--soldout"
            >
              {labels.soldOut}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;