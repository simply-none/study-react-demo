import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0)

  // 函数为参数
  // 在这种情况下，他的值是根据先前的值来推测的，所以每一次调用，下面的c都是不一样的
  function add3 () {
    setCount(c => c+1)
    setCount(c => c+1)
    setCount(c => c+1)
  }

  // 值为参数
  function onlyAdd1() { 
    // 由于批量更新策略，这里的count每次都是一样的
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    // 即使后面有 无数个setCount(count + 1)，也只更新一次，因为react是批量更新状态的

  }

  return (
    <>
      <button onClick={add3}>加3(真加3)</button>
      <button onClick={onlyAdd1}>加3(只加1)</button>
      <br/>
      <p>当前count: {count}</p>
    </>
  )
}