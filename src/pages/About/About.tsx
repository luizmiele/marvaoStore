import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About: React.FC = () => (
  <div className="about-page">
    <div className="about-hero">
      <div className="about-hero-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80)' }} />
      <div className="about-overlay" />
      <div className="about-hero-content">
        <h1>Sobre a Marvão</h1>
        <p>Nascemos para redefinir o que significa vestir bem no cotidiano.</p>
      </div>
    </div>

    <section className="about-section about-mission">
      <div className="about-text">
        <span className="about-eyebrow">Nossa história</span>
        <h2>Feito com propósito</h2>
        <p>A Marvão nasceu em 2019, no coração do Rio de Janeiro, com uma ideia simples: roupas bonitas não precisam ser complicadas. Cada peça que criamos parte do princípio de que o estilo mais autêntico é aquele que você usa todos os dias, sem esforço.</p>
        <p>Trabalhamos apenas com fornecedores certificados, algodão de origem controlada e processos de produção que respeitam as pessoas e o planeta.</p>
      </div>
      <div className="about-img-wrap">
        <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80" alt="Marvão atelier" />
      </div>
    </section>

    <section className="about-values">
      {[
        { num: '01', title: 'Qualidade', desc: 'Cada tecido é selecionado à mão. Cada costura é inspecionada antes de sair da fábrica.' },
        { num: '02', title: 'Sustentabilidade', desc: 'Algodão orgânico certificado, embalagens 100% recicláveis e pegada de carbono zerada até 2026.' },
        { num: '03', title: 'Inclusão', desc: 'Do P ao GG, passando por numeração tradicional. Moda para corpos reais.' },
        { num: '04', title: 'Transparência', desc: 'Sabemos de onde vem cada fio da nossa roupa. E contamos tudo pra você.' },
      ].map((v) => (
        <div className="value-card" key={v.num}>
          <span className="value-num">{v.num}</span>
          <h3>{v.title}</h3>
          <p>{v.desc}</p>
        </div>
      ))}
    </section>

    <section className="about-team">
      <div className="about-team-inner">
        <span className="about-eyebrow">A equipe</span>
        <h2>Pessoas por trás das roupas</h2>
        <p>Somos um time de 30 pessoas apaixonadas por moda, design e sustentabilidade. Baseados em Botafogo, Rio de Janeiro.</p>
        <Link to="/catalogo" className="btn-dark">Conhecer a coleção</Link>
      </div>
    </section>
  </div>
);

export default About;
