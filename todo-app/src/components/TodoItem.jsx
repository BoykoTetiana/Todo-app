export default function TodoItem({ todo, toggleDone, deleteTodo }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(todo.id)}
      />
      <span
        onClick={() => toggleDone(todo.id)}
        className={todo.done ? "done" : "not-done"}
      >
        {todo.text}
      </span>
      <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>
        ×
      </button>
    </li>
  );
}
