import React, { useState } from 'react';

export default function Register({ onRegisterSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setMessage('Пароль має містити мінімум 6 символів, одну велику літеру, одну цифру та один спецсимвол');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, birthDate, username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Помилка реєстрації');
        return;
      }

      setMessage('Реєстрація пройшла успішно! Тепер увійдіть.');

      // Очистити поля
      setFirstName('');
      setLastName('');
      setBirthDate('');
      setUsername('');
      setEmail('');
      setPassword('');

      if (onRegisterSuccess) onRegisterSuccess();

    } catch (error) {
      setMessage('Помилка мережі');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Реєстрація</h2>

      <input
        type="text"
        placeholder="Ім'я"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Прізвище"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        required
      />

      <input
        type="date"
        value={birthDate}
        onChange={e => setBirthDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Логін"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

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

      <button type="submit">Зареєструватись</button>

      {message && <p className="message">{message}</p>}
    </form>
  );
}

