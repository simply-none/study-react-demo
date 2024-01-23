import { useId, useState } from "react";

// 全局计数器，避免重新渲染导致变更
let nexter = 3

function AddToList({ addListItem }) {
  const [input, setInput] = useState("");

  return (
    <>
      {/* onchange: 用传过来的props，这样就能变更父组件的状态了 */}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => addListItem(input)}>add</button>
    </>
  );
}

function ListItem({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  let content;
  if (isEditing) {
    content = (
      <>
        <input
          value={todo.name}
          onChange={(e) => {
            onChange({
              ...todo,
              name: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>save</button>
      </>
    );
  } else {
    content = (
      <>
        {todo.name}
        <button onClick={() => setIsEditing(true)}>edit</button>
      </>
    );
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={(e) => {
            onChange({
              ...todo,
              done: e.target.checked,
            });
          }}
        />
        {content}
        <button onClick={() => onDelete(todo.id)}>delete</button>
      </label>
    </>
  );
}

function List({ list, editListItem, removeListItem }) {
  return (
    <>
      <ul>
        {list.map((l) => {
          return (
            <ListItem
              key={l.id}
              todo={l}
              onChange={editListItem}
              onDelete={removeListItem}
            ></ListItem>
          );
        })}
      </ul>
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useState([
    { id: 0, name: "Buy milk", done: true },
    { id: 1, name: "Eat tacos", done: false },
    { id: 2, name: "Brew tea", done: false },
  ]);

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: ++nexter,
        name: title,
        done: false
      }
    ])
  }

  function handleChangeTodos(nextTodo) {
    setTodos(todos.map(t => {
      console.log(t, nextTodo,'tj')
      if (t.id === nextTodo.id) {
        return nextTodo
      } else {
        return t
      }
    }))
  }

  function handleDeleteTodo(todoid) {
    setTodos(todos.filter(t => t.id !== todoid))
  }

  return (
    <>
      <AddToList addListItem={handleAddTodo}/>
      <List list={todos} editListItem={handleChangeTodos} removeListItem={handleDeleteTodo}/>
    </>
  )
}
