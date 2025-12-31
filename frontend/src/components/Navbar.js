import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
                Inicio
              </Link>
              <Link
                to="/producto"
                className={`menu-link ${isActive('/producto') ? 'active' : 'inactive'}`}
              >
                Producto
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
                Ayuda
              </Link>
              <Link to="/producto" className="cta-button">
                Comprar Ahora
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="mobile-menu-button">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? '' : 'hidden'}`}>
          <div className="mobile-menu-content">
            <Link
              to="/"
              className={`mobile-menu-link ${isActive('/') ? 'active' : 'inactive'}`}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/producto"
              className={`mobile-menu-link ${isActive('/producto') ? 'active' : 'inactive'}`}
              onClick={() => setIsOpen(false)}
            >
              Producto
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
              Ayuda
            </Link>
            <Link 
              to="/producto" 
              className="mobile-cta-button"
              onClick={() => setIsOpen(false)}
            >
              Comprar Ahora
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;