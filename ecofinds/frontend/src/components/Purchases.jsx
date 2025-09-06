import React, {useEffect, useState} from 'react';
import { BASE_URL } from '../api';

export default function Purchases(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    (async ()=>{
      const token = localStorage.getItem('token');
      if(!token) return;
      const res = await fetch(`${BASE_URL}/orders`, { headers: { Authorization: `Bearer ${token}` }});
      if(res.ok) setOrders(await res.json());
    })();
  }, []);
  return (
    <div>
      <h2>Previous Purchases</h2>
      <div>
        {orders.map(o => (
          <div key={o._id} className="card" style={{marginBottom:8}}>
            <div>Order ID: {o._id}</div>
            <div>Date: {new Date(o.createdAt).toLocaleString()}</div>
            <div>Total: ₹{o.total}</div>
            <div>Items:</div>
            <ul>
              {o.items.map(it => <li key={it.productId}>{it.qty} × {it.productId}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
