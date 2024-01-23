const { useState, useEffect } = require("react");

// 存储之前的count
// 注意useState只是初始状态，后续如果count变更了，prev还想继续跟着变，则需要调用setPrev才行
function Child ({count}) {
  const [prev, setPrev] = useState(count)
  if (prev !== count) {
    // 设置prev的值，必须在当前的条件语句中，否则会一直无限循环渲染
    // 即出现：Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
    setPrev(count)
    // 在调用set函数之后，接着输出prev，还是之前的值【谨记】
    console.log(prev)
  }

  return (
    <>
      <p>count: { count }</p>
      <p>prev: {prev}</p>
    </>
  )
}

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(c => c+1)}>加1</button>
      <button onClick={() => setCount(c => c-1)}>减1</button>
      <br/>
      <Child count={count}/>
    </>
  )
}