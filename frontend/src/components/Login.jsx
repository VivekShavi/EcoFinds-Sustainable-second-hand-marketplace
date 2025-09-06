import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { request, BASE_URL } from '../api';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();
  const [err,setErr]=useState(null);

  async function submit(e){
    e.preventDefault();
    try{
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
      });
      if(!res.ok) {
        const b = await res.json().catch(()=>({}));
        setErr(b.message || 'Login failed');
        return;
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/');
    }catch(err){ setErr('Server error'); }
  }

  return (
    <div className="form">
      <h2>Login</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
