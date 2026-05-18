import React from 'react';
import { Link } from 'react-router-dom';
import './Lookbook.css';

const looks = [
  {
    id: 1, title: 'Verão Urbano',
    desc: 'Camisa de linho + bermuda sarja. O duo perfeito para a cidade.',
    img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=80',
    tags: ['#1', '#7'],
  },
  {
    id: 2, title: 'Resort Casual',
    desc: 'Listras marineras + bermuda tactel. Da piscina ao restaurante.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
    tags: ['#4', '#10'],
  },
  {
    id: 3, title: 'Business Light',
    desc: 'Oxford clássica + bermuda alfaiataria. Elegante sem esforço.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80',
    tags: ['#2', '#11'],
  },
  {
    id: 4, title: 'Fim de Semana',
    desc: 'Malha essencial + moletom. Conforto máximo para o seu descanso.',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80',
    tags: ['#3', '#7'],
  },
  {
    id: 5, title: 'Sunset Vibes',
    desc: 'Viscose Sunset + bermuda jeans. Para o fim do dia com estilo.',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80',
    tags: ['#5', '#9'],
  },
  {
    id: 6, title: 'Weekend Getaway',
    desc: 'Flanela Field + bermuda linho. Partiu litoral.',
    img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&q=80',
    tags: ['#6', '#12'],
  },
];

const Lookbook: React.FC = () => (
  <div className="lookbook-page">
    <div className="lookbook-hero">
      <div className="lookbook-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600&q=80)' }} />
      <div className="lookbook-hero-overlay" />
      <div className="lookbook-hero-content">
        <span className="lb-eyebrow">Coleção 2025</span>
        <h1>Lookbook</h1>
        <p>Inspirações de estilo para cada ocasião</p>
      </div>
    </div>

    <div className="looks-grid">
      {looks.map((look, i) => (
        <article key={look.id} className={`look-card ${i % 3 === 0 ? 'wide' : ''}`}>
          <div className="look-img-wrap">
            <img src={look.img} alt={look.title} className="look-img" />
            <div className="look-overlay">
              <div className="look-content">
                <h2>{look.title}</h2>
                <p>{look.desc}</p>
                <Link to="/catalogo" className="look-cta">Ver produtos</Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>

    <div className="lookbook-cta-section">
      <h2>Monte o seu look</h2>
      <p>Explore nosso catálogo completo e encontre as peças para compor o seu estilo.</p>
      <Link to="/catalogo" className="btn-dark">Ver catálogo</Link>
    </div>
  </div>
);

export default Lookbook;
