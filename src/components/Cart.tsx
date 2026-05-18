import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, isOpen, onClose, onRemove }) => {
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <>
      <div className={`cart-backdrop ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Minha Sacola</h2>
          <button className="icon-btn" onClick={onClose}><X size={22} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Sua sacola está vazia.</p>
            <button className="carousel-cta" onClick={onClose}>Continuar comprando</button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, idx) => (
                <li key={idx} className="cart-item">
                  <img src={item.product.images[0]} alt={item.product.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product.name}</p>
                    <p className="cart-item-meta">{item.color} · {item.size}</p>
                    <p className="cart-item-price">R$ {item.product.price.toLocaleString('pt-BR')},00</p>
                  </div>
                  <button className="icon-btn remove-btn" onClick={() => onRemove(idx)}>
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>R$ {total.toLocaleString('pt-BR')},00</span>
              </div>
              <button className="checkout-btn">Finalizar pedido</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Cart;
