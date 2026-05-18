import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.tag && (
        <span className={`product-tag tag-${product.tag}`}>
          {product.tag === 'novo' ? 'NOVO' : 'SALE'}
        </span>
      )}

      <div className="product-image-wrap">
        <img
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="product-image"
        />

        {/* Quick actions on hover */}
        <div className={`product-hover-panel ${hovered ? 'visible' : ''}`}>
          <div className="size-picker">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(s); }}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            className={`add-bag-btn ${added ? 'added' : ''} ${!selectedSize ? 'disabled' : ''}`}
            onClick={handleAdd}
          >
            <ShoppingBag size={16} />
            {added ? 'Adicionado!' : !selectedSize ? 'Escolha o tamanho' : 'Adicionar à sacola'}
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="color-dots">
          {product.colors.map((c) => (
            <button
              key={c}
              className={`color-dot ${selectedColor === c ? 'active' : ''}`}
              title={c}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">R$ {product.price.toLocaleString('pt-BR')},00</span>
          <span className="product-colors">{product.colors.length} cores</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
