import { useState } from "react";

function createInitialTodos() {
  console.log('渲染了吗：' + new Date())
  const initialTodos = [];
  for (let i = 0; i < 500; i++) {
    initialTodos.push({
      id: i,
      text: "item" + i,
    });
  }
  return initialTodos;
}

export default function App() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState("");

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          setTodos(() => {
            return [
              {
                id: Date.now(),
                text: text,
              },
              ...todos,
            ];
          });
        }}
      >
        仅在初始化渲染
      </button>

      <div
        style={{
          display: "flex",
        }}
      >
        <ul
          style={{
            flex: 1,
          }}
        >
          {todos.map((todo) => {
            return <li key={todo.id}>{todo.text}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
