import React, {useState} from 'react';

export default function Dashboard(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null') || {});
  const [username, setUsername] = useState(user.username || '');

  async function save(){
    const token = localStorage.getItem('token');
    if(!token) { alert('Login'); return; }
    // Minimal: backend auth endpoints for update not provided earlier; implement quick user patch call if you add it.
    // For now we update local storage
    const updated = { ...user, username };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    alert('Saved locally (implement backend update for persistence)');
  }

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <div>
        <img src="https://placehold.co/100x100?text=User" alt="user" />
      </div>
      <div>Email: {user.email}</div>
      <div>
        <label>Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}
