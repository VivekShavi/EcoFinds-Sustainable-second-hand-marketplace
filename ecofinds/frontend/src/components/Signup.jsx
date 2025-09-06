import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

export default function Signup(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('');
  const nav = useNavigate();
  const [err,setErr]=useState(null);

  async function submit(e){
    e.preventDefault();
    try{
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password, username })
      });
      if(!res.ok){ const b=await res.json().catch(()=>({})); setErr(b.message||'Signup failed'); return; }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/');
    }catch(err){ setErr('Server error'); }
  }

  return (
    <div className="form">
      <h2>Sign Up</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
