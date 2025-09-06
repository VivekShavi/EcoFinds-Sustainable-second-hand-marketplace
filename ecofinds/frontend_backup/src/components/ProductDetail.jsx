import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const nav = useNavigate();

  useEffect(()=> {
    (async ()=>{
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if(!res.ok) { nav('/'); return; }
      setProduct(await res.json());
    })();
  }, [id]);

  async function addToCart(){
    const token = localStorage.getItem('token');
    if(!token){ alert('Login to add'); nav('/login'); return; }
    const res = await fetch(`${BASE_URL}/cart/add`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId: id, qty: 1 })
    });
    if(res.ok) alert('Added to cart');
    else alert('Failed');
  }

  if(!product) return <div>Loading...</div>;
  return (
    <div className="card">
      <button onClick={()=>nav(-1)}>Back</button>
      <div className="placeholder"><img src={product.imageUrl} alt="" style={{maxWidth:'100%'}}/></div>
      <h2>{product.title}</h2>
      <div>₹{product.price}</div>
      <div><strong>Category:</strong> {product.category}</div>
      <p>{product.description}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
