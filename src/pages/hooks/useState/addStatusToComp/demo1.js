import { useState } from "react";

export default function App () {
  const [text, setText] = useState('hello')
  const [checked, setChecked] = useState(false)

  function handleChange (e) {
    setText(e.target.value)
  }

  function handleChecked (e) {
    console.log(e)
    setChecked(e.target.checked)
  }

  return (
    <>
      <input value={text} onChange={handleChange}/>
      <br/>
      你选择了：<input type="checkbox" checked={checked} onChange={handleChecked}/>
      <br/>
      <p>you typed：{text}，选择了：{checked.toString()}</p>
      <button onClick={() => setText('hello')}>reset</button>
    </>
  )
}