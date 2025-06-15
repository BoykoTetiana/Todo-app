import { useState } from "react";


export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write the case..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-main">Add</button>
    </form>
  );
}