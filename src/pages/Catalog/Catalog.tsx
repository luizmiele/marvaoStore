import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './Catalog.css';

type SortKey = 'relevancia' | 'menor-preco' | 'maior-preco' | 'avaliacao';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaParam = searchParams.get('categoria') || '';
  const [sort, setSort] = useState<SortKey>('relevancia');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(500);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoriaParam) list = list.filter((p) => p.category === categoriaParam);
    if (selectedSizes.length) list = list.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)));
    list = list.filter((p) => p.price <= priceMax);
    if (sort === 'menor-preco') list.sort((a, b) => a.price - b.price);
    if (sort === 'maior-preco') list.sort((a, b) => b.price - a.price);
    if (sort === 'avaliacao') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [categoriaParam, selectedSizes, priceMax, sort]);

  const allSizes = ['P', 'M', 'G', 'GG', 'XGG', '38', '40', '42', '44', '46'];

  const title = categoriaParam === 'camisa' ? 'Camisas' : categoriaParam === 'bermuda' ? 'Bermudas' : 'Todos os Produtos';

  return (
    <div className="catalog-page">
      <div className="catalog-hero">
        <h1>{title}</h1>
        <p>{filtered.length} produtos encontrados</p>
      </div>

      <div className="catalog-layout">
        {/* Sidebar filter */}
        <aside className={`filter-sidebar ${filterOpen ? 'open' : ''}`}>
          <div className="filter-header">
            <h3>Filtros</h3>
            <button className="filter-close" onClick={() => setFilterOpen(false)}><X size={18} /></button>
          </div>

          <div className="filter-group">
            <h4>Categoria</h4>
            {[{ label: 'Todos', val: '' }, { label: 'Camisas', val: 'camisa' }, { label: 'Bermudas', val: 'bermuda' }].map((c) => (
              <label key={c.val} className="filter-radio">
                <input type="radio" name="cat" checked={categoriaParam === c.val}
                  onChange={() => { const p = new URLSearchParams(); if (c.val) p.set('categoria', c.val); setSearchParams(p); }} />
                {c.label}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Tamanho</h4>
            <div className="size-grid">
              {allSizes.map((s) => (
                <button key={s} className={`filter-size-btn ${selectedSizes.includes(s) ? 'active' : ''}`}
                  onClick={() => toggleSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Preço máximo: <strong>R$ {priceMax}</strong></h4>
            <input type="range" min={50} max={500} step={10} value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))} className="price-range" />
            <div className="price-labels"><span>R$ 50</span><span>R$ 500</span></div>
          </div>

          {(selectedSizes.length > 0 || priceMax < 500 || categoriaParam) && (
            <button className="clear-filters" onClick={() => { setSelectedSizes([]); setPriceMax(500); setSearchParams({}); }}>
              Limpar filtros
            </button>
          )}
        </aside>

        <div className="catalog-main">
          <div className="catalog-toolbar">
            <button className="filter-toggle-btn" onClick={() => setFilterOpen(!filterOpen)}>
              <SlidersHorizontal size={16} /> Filtros
            </button>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="relevancia">Relevância</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="avaliacao">Melhor avaliação</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <p>Nenhum produto encontrado com os filtros selecionados.</p>
              <button onClick={() => { setSelectedSizes([]); setPriceMax(500); }}>Limpar filtros</button>
            </div>
          ) : (
            <div className="catalog-grid">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
