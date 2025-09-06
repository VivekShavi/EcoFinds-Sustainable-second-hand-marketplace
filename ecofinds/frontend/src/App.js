import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductFeed from './components/ProductFeed';
import AddProduct from './components/AddProduct';
import MyListings from './components/MyListings';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Purchases from './components/Purchases';
import Dashboard from './components/Dashboard';

function App() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem('token');
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div>
      <header className="topbar">
        <Link to="/" className="logo">EcoFinds</Link>
        <nav>
          <Link to="/">Feed</Link>
          {isLogged && <Link to="/my-listings">My Listings</Link>}
          <Link to="/cart">Cart</Link>
          {isLogged ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<ProductFeed/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/my-listings" element={<MyListings/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/purchases" element={<Purchases/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

