import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselSlides } from '../data/products';

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 400);
  };

  const prev = () => go((current - 1 + carouselSlides.length) % carouselSlides.length);
  const next = () => go((current + 1) % carouselSlides.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = carouselSlides[current];

  return (
    <section className="carousel">
      <div
        className={`carousel-bg ${animating ? 'fade-out' : 'fade-in'}`}
        style={{
          backgroundImage: `url(${slide.bg})`,
        }}
      />
      <div className="carousel-overlay" style={{ background: slide.filter }} />

      <div className="carousel-content">
        <p className="carousel-subtitle">{slide.subtitle}</p>
        <h1 className="carousel-title">{slide.title}</h1>
        <button className="carousel-cta">{slide.cta}</button>
      </div>

      <button className="carousel-arrow left" onClick={prev}><ChevronLeft size={28} /></button>
      <button className="carousel-arrow right" onClick={next}><ChevronRight size={28} /></button>

      <div className="carousel-dots">
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
