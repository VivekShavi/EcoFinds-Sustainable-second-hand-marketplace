import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

export default function AddProduct(){
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('Electronics');
  const [desc,setDesc]=useState('');
  const [price,setPrice]=useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(!token){ alert('Login first'); nav('/login'); return; }
    const body = { title, category, description: desc, price: Number(price), imageUrl: 'https://placehold.co/600x400?text=No+Image' };
    const res = await fetch(`${BASE_URL}/products`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body)
    });
    if(!res.ok){ const b=await res.json().catch(()=>({})); alert(b.message || 'Error'); return; }
    nav('/');
  }

  return (
    <div className="form">
      <h2>Add New Product</h2>
      <form onSubmit={submit}>
        <input placeholder="Product Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Electronics</option>
          <option>Books</option>
          <option>Fashion</option>
          <option>Home</option>
        </select>
        <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input placeholder="Price (number)" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
}
