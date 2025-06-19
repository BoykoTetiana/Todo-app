import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' чи 'register'

  return (
    <div className="auth-container">
      <div className="toggle-switch">
        <button 
          className={`toggle-btn ${mode === 'login' ? 'active' : ''}`} 
          onClick={() => setMode('login')}
        >
          Увійти
        </button>
        <button 
          className={`toggle-btn ${mode === 'register' ? 'active' : ''}`} 
          onClick={() => setMode('register')}
        >
          Зареєструватись
        </button>
      </div>

      {mode === 'login'
        ? <Login onLoginSuccess={onLoginSuccess} />
        : <Register onRegisterSuccess={() => setMode('login')} />}
    </div>
  );
}

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, done: false };
    setTodos([...todos, newTodo]);
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
      const data = await res.json();
      const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
      const formattedTodos = data.map((todo, index) => ({
        id: maxId + index + 1,
        text: todo.title,
        done: false,
      }));
      setTodos((prev) => [...prev, ...formattedTodos]);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="theme-switch">
        <button className="theme-button" onClick={() => setDarkMode(prev => !prev)}>
          <img
            src={
              darkMode
                ? "https://img.icons8.com/?size=100&id=88644&format=png&color=000000"
                : "https://img.icons8.com/?size=100&id=bv1XgSVyIgCb&format=png&color=000000"
            }
            alt="theme icon"
            className="theme-icon"
          />
        </button>
      </div>

      <h1>My TODO List</h1>

      <TodoForm addTodo={addTodo} fetchTodos={fetchTodos} />

      <TodoList
        todos={todos}
        toggleDone={toggleDone}
        deleteTodo={deleteTodo}
        fetchTodos={fetchTodos}
      />
    </div>
  );
}


