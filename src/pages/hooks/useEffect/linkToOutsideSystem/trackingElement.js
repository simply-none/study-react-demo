import { useRef, useEffect } from "react";

function Box (){ 
  const ref = useRef(null)

  // 当滚动到box时，页面变黑
  useEffect(() => {
    const div  = ref.current
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      console.log(entry, 'entry')
      if (entry.isIntersecting) {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
      } else {
        document.body.style.backgroundColor = 'white'
        document.body.style.color = 'black'
      }
    }, {
      threshold: 1.0
    })
    observer.observe(div)
    return () => {
      observer.disconnect()
    }
    // 一定别忘记，依赖数组，必须传，即使是一个空数组
  }, [])
  return (
    <div ref={ref} style={{
      margin: 20,
      height: 100,
      width: 100,
      border: '2px solid black',
      backgroundColor: 'blue'
    }}></div>
  )
}

function LongSection () {
  let array= (new Array(50)).fill('hhhhhh')
  return (
      <>
      {
        array.map((i, index) => {
          return <li key={index}>i</li>
        })
      }
      </>
  )
}

export default function App() {
  return (
    <>
      <LongSection/>
      <Box/>
      <LongSection/>
      <Box/>
      <LongSection/>
      <Box/>
      <LongSection/>
      <Box/>
      <LongSection/>
      <Box/>
      <LongSection/>
      <Box/>
    </>
  )
}