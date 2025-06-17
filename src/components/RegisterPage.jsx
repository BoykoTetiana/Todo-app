import React, { useState } from 'react';

export default function RegisterForm({ onRegisterSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setMessage('Пароль повинен містити мінімум 6 символів, одну велику літеру, одну цифру та один спецсимвол');
      return;
    }

    const userData = { firstName, lastName, birthDate, email };

    try {
      // Імітація виклику API
      // Тут можна викликати свій бекенд, якщо потрібно
      // await fetch(...) 

      // Зберігаємо дані користувача в localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      setMessage('Реєстрація успішна! Дані збережено локально.');
      
      // Очистити форму
      setFirstName('');
      setLastName('');
      setBirthDate('');
      setEmail('');
      setPassword('');

      if (onRegisterSuccess) onRegisterSuccess();

    } catch (error) {
      setMessage('Помилка мережі');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
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
        placeholder="Дата народження"
        value={birthDate}
        onChange={e => setBirthDate(e.target.value)}
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

