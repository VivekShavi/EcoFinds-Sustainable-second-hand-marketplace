import React, {useEffect, useState} from 'react';
import { BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

export default function CartPage(){
  const [cart, setCart] = useState({ items: [] });
  const nav = useNavigate();

  async function load(){
    const token = localStorage.getItem('token');
    if(!token){ nav('/login'); return; }
    const res = await fetch(`${BASE_URL}/cart`, { headers: { Authorization: `Bearer ${token}` }});
    setCart(await res.json());
  }
  useEffect(()=>{ load(); }, []);

  async function remove(pid){
    const token = localStorage.getItem('token');
    await fetch(`${BASE_URL}/cart/remove`, {
      method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({ productId: pid })
    });
    load();
  }

  async function checkout(){
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/orders/checkout`, {
      method:'POST', headers:{ Authorization:`Bearer ${token}` }
    });
    if(res.ok){ alert('Order placed'); nav('/purchases'); }
    else alert('Checkout failed');
  }

  const total = (cart.items || []).reduce((s,i)=> s + (i.productId?.price || 0) * i.qty, 0);
  return (
    <div>
      <h2>Cart</h2>
      <div className="grid">
        {cart.items?.map(i => (
          <div key={i.productId._id} className="card">
            <div className="placeholder"><img src={i.productId.imageUrl} alt="" style={{maxWidth:'100%'}}/></div>
            <h4>{i.productId.title}</h4>
            <div>Qty: {i.qty}</div>
            <div>₹{i.productId.price}</div>
            <button onClick={()=>remove(i.productId._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div style={{marginTop:12}}>
        <strong>Total: ₹{total}</strong>
      </div>
      <button onClick={checkout} style={{marginTop:8}}>Checkout (simulate)</button>
    </div>
  );
}
