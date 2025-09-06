import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import { BASE_URL } from '../api';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All','Electronics','Books','Fashion','Home'];

export default function ProductFeed(){
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');

  async function load(){
    let url = `${BASE_URL}/products?limit=40`;
    if(category && category !== 'All') url += `&category=${encodeURIComponent(category)}`;
    if(q) url += `&q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  }

  useEffect(()=>{ load(); }, [q, category]);

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input placeholder="Search by title" value={q} onChange={e=>setQ(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <Link to="/add"><button>+ Add Product</button></Link>
      </div>

      <div className="grid">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
