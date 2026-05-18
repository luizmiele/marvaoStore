import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, Heart, Share2, Shield, Truck } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) return (
    <div className="not-found">
      <h2>Produto não encontrado</h2>
      <Link to="/catalogo">Voltar ao catálogo</Link>
    </div>
  );

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, product.colors[selectedColorIdx]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="product-detail">
      <div className="detail-breadcrumb">
        <button onClick={() => navigate(-1)} className="back-btn"><ChevronLeft size={16} /> Voltar</button>
        <span>/ {product.category === 'camisa' ? 'Camisas' : 'Bermudas'} / {product.name}</span>
      </div>

      <div className="detail-layout">
        {/* Images */}
        <div className="detail-images">
          <div className="thumb-list">
            {product.images.map((img, i) => (
              <button key={i} className={`thumb ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </button>
            ))}
          </div>
          <div className="main-img-wrap">
            <img src={product.images[activeImg]} alt={product.name} className="main-img" />
            {product.tag && (
              <span className={`detail-tag tag-${product.tag}`}>
                {product.tag === 'novo' ? 'NOVO' : `−${discount}%`}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="detail-info">
          <p className="detail-category">{product.category === 'camisa' ? 'Camisa' : 'Bermuda'}</p>
          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#c9a84c' : 'none'}
                color={i < Math.floor(product.rating) ? '#c9a84c' : '#ddd'} />
            ))}
            <span>{product.rating}</span>
            <span className="review-link">({product.reviewCount} avaliações)</span>
          </div>

          <div className="detail-price">
            <span className="price-current">R$ {product.price.toLocaleString('pt-BR')},00</span>
            {product.originalPrice && (
              <>
                <span className="price-original">R$ {product.originalPrice.toLocaleString('pt-BR')},00</span>
                <span className="price-badge">−{discount}%</span>
              </>
            )}
          </div>

          {/* Color */}
          <div className="detail-section">
            <p className="detail-label">Cor: <strong>{product.colors[selectedColorIdx]}</strong></p>
            <div className="detail-colors">
              {product.colorHex.map((hex, i) => (
                <button key={i}
                  className={`detail-swatch ${selectedColorIdx === i ? 'active' : ''}`}
                  style={{ background: hex }}
                  title={product.colors[i]}
                  onClick={() => setSelectedColorIdx(i)}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="detail-section">
            <p className="detail-label">Tamanho: {selectedSize && <strong>{selectedSize}</strong>}</p>
            <div className="detail-sizes">
              {product.sizes.map((s) => (
                <button key={s}
                  className={`detail-size-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >{s}</button>
              ))}
            </div>
            {!selectedSize && <p className="size-hint">* Selecione um tamanho para continuar</p>}
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <button
              className={`add-to-cart-btn ${added ? 'added' : ''} ${!selectedSize ? 'disabled' : ''}`}
              onClick={handleAdd}
            >
              <ShoppingBag size={18} />
              {added ? 'Adicionado à sacola!' : 'Adicionar à sacola'}
            </button>
            <button className={`wishlist-btn ${wishlisted ? 'active' : ''}`} onClick={() => setWishlisted(!wishlisted)}>
              <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button className="share-btn"><Share2 size={18} /></button>
          </div>

          {/* Details */}
          <div className="detail-meta">
            <div className="meta-item"><Shield size={16} /><span>Material: {product.material}</span></div>
            <div className="meta-item"><Truck size={16} /><span>Frete grátis acima de R$ 299</span></div>
          </div>

          <div className="detail-description">
            <h3>Sobre o produto</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-header">
            <h2 className="section-title">Você também pode gostar</h2>
          </div>
          <div className="products-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
