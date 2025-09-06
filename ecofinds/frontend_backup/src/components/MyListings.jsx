import React, {useEffect, useState} from 'react';
import { BASE_URL } from '../api';
import { Link } from 'react-router-dom';

export default function MyListings(){
  const [listings, setListings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  async function load(){
    // simple approach - fetch all and filter by ownerId (backend could add /my endpoint)
    const res = await fetch(`${BASE_URL}/products?limit=200`);
    const data = await res.json();
    setListings(data.filter(p => p.ownerId === user?.id || (p.ownerId && p.ownerId._id === user?.id)));
  }

  useEffect(()=>{ load(); }, []);

  async function remove(id){
    const token = localStorage.getItem('token');
    if(!token){ alert('Login'); return; }
    if(!confirm('Delete listing?')) return;
    const res = await fetch(`${BASE_URL}/products/${id}`, { method:'DELETE', headers: { Authorization:`Bearer ${token}` }});
    if(res.ok) load();
    else alert('Failed to delete');
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>My Listings</h2>
        <Link to="/add"><button>+ Add</button></Link>
      </div>

      <div className="grid">
        {listings.map(p=>(
          <div key={p._id} className="card">
            <div className="placeholder"><img src={p.imageUrl} alt="" style={{maxWidth:'100%'}}/></div>
            <h4>{p.title}</h4>
            <div>₹{p.price}</div>
            <div style={{marginTop:8}}>
              <Link to={`/product/${p._id}`}><button>View</button></Link>
              <button onClick={()=>remove(p._id)} style={{marginLeft:8}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
