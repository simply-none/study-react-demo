import { Suspense, useEffect, useState } from "react";

export default function App() {
  let d = Date.now()
  let [id, setId] = useState(d)
  return (
    <Suspense fallback={<Loading/>}>
      <Details id={id}></Details>
  </Suspense>
  )
}

function Loading () {
  return (
    <>
      <h2>loading......</h2>
    </>
  )
}

function Details ({id}) {
  let startTime = performance.now()
  while(performance.now() - startTime < 3000) {
    // 这里模拟500毫秒延迟
  }
  return (
    <>
      <p>
        当前的id是：{id}
      </p>
    </>
  )

}