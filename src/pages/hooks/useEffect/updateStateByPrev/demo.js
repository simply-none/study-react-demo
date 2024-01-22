import { useEffect, useState } from "react";


export default function Counter () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 根据之前的val更新值
      setCount(prevVal => prevVal + 1)
    }, 1000)
    return () => clearInterval(intervalId)
    // 此处就不需要传递依赖数组，因为count并不在setup函数内部
  }, [])

  return (
    <div>
      <h1>{count}</h1>
    </div>
  )
}