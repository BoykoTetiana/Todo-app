import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleDone, deleteTodo, fetchTodos }) {
  return (
    <div>
      <button className="btn-fetch" onClick={fetchTodos}>Fetch Todos</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
