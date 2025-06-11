import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './App.css';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
      done: false, // <- тут примусово ставимо false, щоб всі були не виконані
    }));

    setTodos((prev) => [...prev, ...formattedTodos]);
  } catch (err) {
    console.error("Fetch failed", err);
  }
};

  return (
    <div className="App">
      <h1>My TODO List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleDone={toggleDone}
        deleteTodo={deleteTodo}
        fetchTodos={fetchTodos}
      />
    </div>
  );
}

