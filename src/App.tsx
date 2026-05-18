import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Lookbook from './pages/Lookbook/Lookbook';
import Sale from './pages/Sale/Sale';
import About from './pages/About/About';
import './App.css';

const AppInner: React.FC = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/produto/:id" element={<ProductDetail />} />
      <Route path="/lookbook" element={<Lookbook />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/sobre" element={<About />} />
    </Routes>
    <Footer />
    <Cart />
  </>
);

function App() {
  return (
    <Router>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </Router>
  );
}

export default App;
