import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const inputStyle = { width: '100%', padding: '10px', marginBottom: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#667eea', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' };
const containerStyle = { maxWidth: '350px', margin: '60px auto', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' };

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" style={btnStyle}>Login</button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('successful') ? '#28a745' : '#dc3545', fontSize: '13px' }}>{message}</p>}
      <p style={{ marginTop: '15px', fontSize: '13px', color: '#666' }}>
        No account? <a href="/register" style={{ color: '#667eea', textDecoration: 'none' }}>Register</a>
      </p>
    </div>
  );
}
