import { useEffect, useState } from "react";

function fetchData (name) {
  return new Promise((res, rej) => {
    let random = Math.ceil((Math.random() * 3) * 1000)
    setTimeout(() => {
      res(`请求数据${name}: 用了${random}毫秒返回`)
    }, random);
  })
}

export default function Page (){
  const [person, setPerson] = useState('alice')
  const [bio, setBio] = useState(null)

  useEffect(() => {
    let ignore = false
    setBio(null)
    fetchData(person).then(result => {
      // 防止重复请求
      if (!ignore) {
        setBio(result)
      }
    })
    return () => {
      // 防止重复请求，在每改变一次就重置一次
      ignore = true
    }
  }, [person])

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value)
      }}>
        <option value={'alice'}>alice</option>
        <option value={'bob'}>bob</option>
        <option value={'taylor'}>taylor</option>
      </select>
      <hr/>
      <p>
        <i>{bio ?? 'loading...'}</i>
      </p>
    </>
  )
}