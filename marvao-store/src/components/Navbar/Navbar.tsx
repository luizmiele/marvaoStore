import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { totalItems, setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { label: 'New In', path: '/' },
    { label: 'Camisas', path: '/catalogo?categoria=camisa' },
    { label: 'Bermudas', path: '/catalogo?categoria=bermuda' },
    { label: 'Lookbook', path: '/lookbook' },
    { label: 'Sale', path: '/sale', className: 'sale' },
  ];

  const isActive = (path: string) => {
    const base = path.split('?')[0];
    if (base === '/') return location.pathname === '/';
    return location.pathname.startsWith(base);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className="nav-links desktop">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`nav-link ${l.className || ''} ${isActive(l.path) ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="logo">MARVÃO</Link>

        <div className="nav-icons">
          <button className="icon-btn" aria-label="Buscar"><Search size={19} /></button>
          <Link to="/sobre" className="icon-btn" aria-label="Conta"><User size={19} /></Link>
          <button className="icon-btn cart-btn" onClick={() => setCartOpen(true)} aria-label="Sacola">
            <ShoppingBag size={19} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className={`mobile-nav-link ${l.className || ''} ${isActive(l.path) ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/sobre" className="mobile-nav-link">Sobre Nós</Link>
      </div>
    </header>
  );
};

export default Navbar;
