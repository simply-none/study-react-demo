import { createContext, useContext, useReducer, useState } from "react";

export default function App (){ 
  return (
    <TasksProvider>
      <h1>day off in kyoto</h1>
      <AddTask/>
      <TaskList/>
    </TasksProvider>
  )
}

let nextId = 100

const TaskContext = createContext(null)
const TaskDispatchContext = createContext(null)

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
]

function AddTask () {
  const [text, setText] = useState('')
  const dispatch = useTasksDispatch()

  return (
    <>
      <input placeholder="add task" value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={() => {
        setText('')
        dispatch({
          type: 'added',
          id: nextId++,
          text: text
        })
      }}>add</button>
    </>
  )
}

function TaskList () {
  const tasks = useTasks()

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task}/>
        </li>
      ))}
    </ul>
  )
}

function Task({task}){
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useTasksDispatch()
  let taskContent
  if (isEditing) {
    taskContent = (
      <>
        <input value={task.text} onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              text: e.target.value
            }
          })
        }}/>
        <button onClick={() => setIsEditing(false)}>save</button>
      </>
    )
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>edit</button>
      </>
    )
  }
  return (
    <label>
      <input type="checkbox" checked={task.done} onChange={e => {
        dispatch({
          type: 'changed',
          task: {
            ...task,
            done: e.target.checked
          }
        })
      }}/>
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        })
      }}>delete</button>
    </label>
  )
}

function tasksReducer(tasks, action) {
  switch(action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ]
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id ===action.task.id) {
          return action.task
        } else {
          return t
        }
      })
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id)
    }
    default: {
      throw Error('unknown action')
    }
  }
}

function useTasks(){
  return useContext(TaskContext)
}

function useTasksDispatch() {
  return useContext(TaskDispatchContext)
}

function TasksProvider ({children}) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  )
  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  )
}