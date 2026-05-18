import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselSlides } from '../../data/products';
import './Carousel.css';

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  const go = useCallback((next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(next);
      setTransitioning(false);
    }, 500);
  }, [transitioning]);

  const prev = () => go((current - 1 + carouselSlides.length) % carouselSlides.length);
  const next = useCallback(() => go((current + 1) % carouselSlides.length), [current, go]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const slide = carouselSlides[current];

  return (
    <section className="carousel">
      {carouselSlides.map((s, i) => (
        <div
          key={s.id}
          className={`carousel-slide ${i === current ? 'active' : ''} ${transitioning && i === current ? 'transitioning' : ''}`}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}
      <div className="carousel-overlay" style={{ background: slide.filter }} />

      <div className="carousel-content">
        <span className="carousel-eyebrow">Coleção 2025</span>
        <h1 className="carousel-title">{slide.title}</h1>
        <p className="carousel-subtitle">{slide.subtitle}</p>
        <button className="carousel-cta" onClick={() => navigate(slide.ctaLink)}>
          {slide.cta}
        </button>
      </div>

      <button className="carousel-arrow left" onClick={prev} aria-label="Anterior">
        <ChevronLeft size={26} />
      </button>
      <button className="carousel-arrow right" onClick={next} aria-label="Próximo">
        <ChevronRight size={26} />
      </button>

      <div className="carousel-dots">
        {carouselSlides.map((_, i) => (
          <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i+1}`} />
        ))}
      </div>

      <div className="carousel-progress">
        <div className="carousel-progress-bar" key={current} />
      </div>
    </section>
  );
};

export default Carousel;
