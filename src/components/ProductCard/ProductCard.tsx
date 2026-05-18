import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSize) return;
    addToCart(product, selectedSize, product.colors[selectedColorIdx]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.tag && (
        <span className={`product-tag tag-${product.tag}`}>
          {product.tag === 'novo' ? 'NOVO' : `−${discount}%`}
        </span>
      )}

      <Link to={`/produto/${product.id}`} className="product-image-wrap">
        <img
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="product-image"
        />
        <div className={`product-hover-overlay ${hovered ? 'visible' : ''}`}>
          <div className="size-picker">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setSelectedSize(s); }}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            className={`add-bag-btn ${added ? 'added' : ''} ${!selectedSize ? 'muted' : ''}`}
            onClick={handleAdd}
          >
            <ShoppingBag size={15} />
            {added ? 'Adicionado!' : !selectedSize ? 'Selecione o tamanho' : 'Adicionar à sacola'}
          </button>
        </div>
      </Link>

      <div className="product-info">
        <div className="product-colors-row">
          {product.colorHex.map((hex, i) => (
            <button
              key={i}
              className={`color-swatch ${selectedColorIdx === i ? 'active' : ''}`}
              style={{ background: hex }}
              title={product.colors[i]}
              onClick={() => setSelectedColorIdx(i)}
            />
          ))}
        </div>
        <Link to={`/produto/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-rating">
          <Star size={11} fill="#c9a84c" color="#c9a84c" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviewCount})</span>
        </div>
        <div className="product-pricing">
          <span className="product-price">R$ {product.price.toLocaleString('pt-BR')},00</span>
          {product.originalPrice && (
            <span className="product-original">R$ {product.originalPrice.toLocaleString('pt-BR')},00</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
