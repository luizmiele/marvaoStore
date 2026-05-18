import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onCartOpen: () => void;
  activeFilter: string;
  onFilterChange: (f: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, onCartOpen, activeFilter, onFilterChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const navLinks = [
    { label: 'New In', value: '' },
    { label: 'Camisas', value: 'camisa' },
    { label: 'Bermudas', value: 'bermuda' },
    { label: 'Sale', value: 'sale' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left nav */}
        <nav className="nav-links desktop">
          {navLinks.map((l) => (
            <button
              key={l.value}
              className={`nav-link ${activeFilter === l.value ? 'active' : ''} ${l.label === 'Sale' ? 'sale-link' : ''}`}
              onClick={() => onFilterChange(l.value)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo - center */}
        <div className="logo">MARVÃO</div>

        {/* Right icons */}
        <div className="nav-icons">
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><User size={20} /></button>
          <button className="icon-btn cart-btn" onClick={onCartOpen}>
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="mobile-nav">
          {navLinks.map((l) => (
            <button
              key={l.value}
              className={`mobile-nav-link ${activeFilter === l.value ? 'active' : ''}`}
              onClick={() => { onFilterChange(l.value); setMobileOpen(false); }}
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
