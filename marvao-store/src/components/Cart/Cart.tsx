import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <>
      <div className={`cart-backdrop ${cartOpen ? 'visible' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-left">
            <ShoppingBag size={18} />
            <h2>Minha Sacola</h2>
          </div>
          <button className="icon-btn" onClick={() => setCartOpen(false)}><X size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <p>Sua sacola está vazia.</p>
            <button className="btn-outline" onClick={() => setCartOpen(false)}>Continuar comprando</button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, idx) => (
                <li key={idx} className="cart-item">
                  <img src={item.product.images[0]} alt={item.product.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product.name}</p>
                    <p className="cart-item-meta">{item.color} · Tam. {item.size}</p>
                    <div className="cart-item-bottom">
                      <div className="qty-control">
                        <button onClick={() => updateQuantity(idx, item.quantity - 1)}><Minus size={12} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(idx, item.quantity + 1)}><Plus size={12} /></button>
                      </div>
                      <p className="cart-item-price">R$ {(item.product.price * item.quantity).toLocaleString('pt-BR')},00</p>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(idx)}><Trash2 size={15} /></button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>R$ {totalPrice.toLocaleString('pt-BR')},00</span>
              </div>
              <p className="cart-shipping-note">Frete calculado no checkout</p>
              <button className="checkout-btn">Finalizar pedido</button>
              <button className="btn-outline-dark" onClick={() => setCartOpen(false)}>Continuar comprando</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Cart;
