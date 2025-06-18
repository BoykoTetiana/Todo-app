import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Помилка логіну');
        return;
      }

      setMessage('Успішний вхід!');
      localStorage.setItem('token', data.token);

      onLoginSuccess();

    } catch (error) {
      setMessage('Помилка мережі');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Увійти</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Увійти</button>

      {message && <p className="message">{message}</p>}
    </form>
  );
}
