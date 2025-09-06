import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const img = product.imageUrl || 'https://placehold.co/600x400?text=No+Image';
  return (
    <div className="card">
      <div className="placeholder">
        <img src={img} alt="img" style={{maxWidth:'100%', maxHeight:'100%'}}/>
      </div>
      <h4>{product.title}</h4>
      <div>₹{product.price}</div>
      <Link to={`/product/${product._id}`}><button style={{marginTop:8}}>View</button></Link>
    </div>
  );
}
