import { useReducer } from "react"

export default function App(){
  const [state, dispatch] = useReducer(reducer, { age: 42 })

  return (
    <>
      <button onClick={() => dispatch({type: 'incremented'})}>incremented</button>
      <p>age: {state.age}</p>
    </>
  )
}

function reducer(state, action) {
  if (action.type === 'incremented') {
    return {
      age: state.age + 1
    }
  }
  throw Error('unknown action.')
}