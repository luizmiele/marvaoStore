import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './Home.css';

const Home: React.FC = () => {
  const newIn = products.filter((p) => p.tag === 'novo').slice(0, 4);
  const camisas = products.filter((p) => p.category === 'camisa').slice(0, 4);
  const bermudas = products.filter((p) => p.category === 'bermuda').slice(0, 4);

  return (
    <div className="home">
      <Carousel />

      {/* Categories strip */}
      <section className="categories-strip">
        <Link to="/catalogo?categoria=camisa" className="cat-card">
          <div className="cat-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80)' }} />
          <div className="cat-overlay" />
          <div className="cat-label">
            <span>Camisas</span>
            <small>Ver tudo →</small>
          </div>
        </Link>
        <Link to="/catalogo?categoria=bermuda" className="cat-card">
          <div className="cat-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80)' }} />
          <div className="cat-overlay" />
          <div className="cat-label">
            <span>Bermudas</span>
            <small>Ver tudo →</small>
          </div>
        </Link>
        <Link to="/sale" className="cat-card cat-sale">
          <div className="cat-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80)' }} />
          <div className="cat-overlay" />
          <div className="cat-label">
            <span>Sale</span>
            <small>Até 40% OFF →</small>
          </div>
        </Link>
      </section>

      {/* New In */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Novidades</h2>
            <p className="section-desc">As últimas peças que chegaram</p>
          </div>
          <Link to="/catalogo" className="see-all">Ver tudo →</Link>
        </div>
        <div className="products-grid">
          {newIn.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Mid banner */}
      <section className="mid-banner">
        <div className="mid-banner-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1400&q=80)' }} />
        <div className="mid-banner-overlay" />
        <div className="mid-banner-content">
          <p className="mid-banner-eyebrow">Estilo sem esforço</p>
          <h2 className="mid-banner-title">Feito para quem<br/>não para</h2>
          <Link to="/lookbook" className="carousel-cta">Ver Lookbook</Link>
        </div>
      </section>

      {/* Camisas */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Camisas</h2>
            <p className="section-desc">Para todas as ocasiões</p>
          </div>
          <Link to="/catalogo?categoria=camisa" className="see-all">Ver tudo →</Link>
        </div>
        <div className="products-grid">
          {camisas.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Bermudas */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Bermudas</h2>
            <p className="section-desc">Conforto e estilo em cada passo</p>
          </div>
          <Link to="/catalogo?categoria=bermuda" className="see-all">Ver tudo →</Link>
        </div>
        <div className="products-grid">
          {bermudas.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Benefits bar */}
      <section className="benefits-bar">
        {[
          { icon: '🚚', title: 'Frete grátis', sub: 'Acima de R$ 299' },
          { icon: '🔄', title: 'Troca fácil', sub: '30 dias sem complicação' },
          { icon: '🔒', title: 'Pagamento seguro', sub: 'Pix, cartão e boleto' },
          { icon: '🌿', title: 'Sustentável', sub: 'Algodão certificado' },
        ].map((b) => (
          <div className="benefit" key={b.title}>
            <span className="benefit-icon">{b.icon}</span>
            <div>
              <p className="benefit-title">{b.title}</p>
              <p className="benefit-sub">{b.sub}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
