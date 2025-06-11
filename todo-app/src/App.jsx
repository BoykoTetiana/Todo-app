import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import  './App.css';


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
    setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo));
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>My TODO List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleDone={toggleDone} deleteTodo={deleteTodo} />
    </div>
  );
}

