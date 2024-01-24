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
  const [text, setText] = useState("");

  const [todos2, setTodos2] = useState(createInitialTodos());

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />

      <button
        onClick={() => {
          setText('')
          setTodos2(() => {
            return [
              {
                id: Date.now(),
                text: text,
              },
              ...todos2,
            ];
          });
        }}
      >
        每次都渲染
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
          {todos2.map((todo) => {
            return <li key={todo.id}>{todo.text}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
