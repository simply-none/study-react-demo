import { useMemo,memo, useState } from "react"

function createTodos () {
  const todos = []
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: 'todo ' + i,
      ccompleted: Math.random() > 0.5
    })
  }
  return todos
}

function filterTodos (todos, tab) {
  console.log('渲染了吗')
  

  return todos.filter(todo => {
    if (tab === 'all') {
      return true
    } else if (tab === 'active') {
      return !todo.ccompleted
    } else if (tab === 'completed') {
      return todo.ccompleted
    }
  })
}

const List = memo(function List ({items}) {
  let startTime = performance.now()
  while(performance.now() - startTime < 500) {
    // 这里模拟500毫秒延迟
  }

  return (
    <ul>
        { items.map(todo => (
          <li key={todo.id}>
            {todo.ccompleted ? 
            <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
  )
})

function TodoList ({todos, theme, tab}) {
  // 这里在theme改变时不会渲染，仅在todos、tab改变时才会
  // const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])
  // 这里任何props改变都会渲染
  const visibleTodos = filterTodos(todos, tab)
  return (
    <div className={theme}>
      <p><b>note: <code>filterTodos</code>is artificially slowed down!</b></p>
      <List items={visibleTodos}/>
    </div>
  )
}

const todos = createTodos()

export default function App() {
  const [tab, setTab] = useState('all')
  const [isDark, setIsDark] = useState(false)
  return (
    <>
      <button onClick={() => setTab('all')}>all</button>
      <button onClick={() => setTab('active')}>active</button>
      <button onClick={() => setTab('completed')}>completed</button>
      <br/>
      <label>
        <input type="checkbox" checked={isDark} onChange={e => setIsDark(e.target.checked)}/>
        Dark mode
      </label>
      <hr/>
      <TodoList todos={todos} tab={tab} theme={isDark ? 'dark' : 'light'}/>
    </>
  )
}