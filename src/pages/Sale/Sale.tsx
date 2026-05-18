import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './Sale.css';

const Sale: React.FC = () => {
  const saleProducts = products.filter((p) => p.tag === 'sale');

  return (
    <div className="sale-page">
      <div className="sale-hero">
        <h1>SALE</h1>
        <p>Peças selecionadas com até 40% de desconto</p>
        <div className="sale-badge-row">
          <span className="sale-badge">Frete grátis</span>
          <span className="sale-badge">Troca gratuita</span>
          <span className="sale-badge">Por tempo limitado</span>
        </div>
      </div>

      <div className="sale-content">
        <div className="sale-header">
          <h2>{saleProducts.length} produtos em promoção</h2>
          <p>Aproveite antes que acabe!</p>
        </div>
        <div className="sale-grid">
          {saleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
};

export default Sale;
