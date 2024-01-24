import { useState } from "react";

export default function App () {
  const [key, setKey] = useState(Date.now)

  function changeKey () {
    setKey(Date.now())
  }

  return (
    <>
      <button onClick={changeKey}>重置</button>
      <Form key={key}/>
    </>
  )
}

function Form () {
  const [val, setVal] = useState('')
  return (
    <>
      <input  value={val} onChange={e => setVal(e.target.value)}/>
      <p>当前的val：{val}</p>
    </>
  )
}