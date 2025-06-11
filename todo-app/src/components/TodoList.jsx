import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleDone, deleteTodo }) {
  return (
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
  );
}

