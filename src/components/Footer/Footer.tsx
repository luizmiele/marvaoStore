import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="footer-logo">MARVÃO</div>
        <p className="footer-tagline">Estilo atemporal para o dia a dia.</p>
        <div className="footer-socials">
          <a href="#!" className="social-btn" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="3"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
          <a href="#!" className="social-btn" aria-label="Email"><Mail size={18} /></a>
          <a href="#!" className="social-btn" aria-label="Telefone"><Phone size={18} /></a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Navegação</h4>
        <Link to="/">New In</Link>
        <Link to="/catalogo?categoria=camisa">Camisas</Link>
        <Link to="/catalogo?categoria=bermuda">Bermudas</Link>
        <Link to="/lookbook">Lookbook</Link>
        <Link to="/sale">Sale</Link>
      </div>

      <div className="footer-col">
        <h4>Informações</h4>
        <Link to="/sobre">Sobre Nós</Link>
        <a href="#!">Política de Troca</a>
        <a href="#!">Guia de Tamanhos</a>
        <a href="#!">Sustentabilidade</a>
      </div>

      <div className="footer-col">
        <h4>Atendimento</h4>
        <a href="#!">contato@marvao.com.br</a>
        <a href="#!">WhatsApp</a>
        <p className="footer-hours">Seg–Sex, 9h–18h</p>
        <div className="payment-icons">
          <span>Visa</span><span>Mastercard</span><span>Pix</span>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 Marvão Store. Todos os direitos reservados.</p>
      <p>CNPJ 00.000.000/0001-00</p>
    </div>
  </footer>
);

export default Footer;
