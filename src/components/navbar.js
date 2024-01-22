
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './navbar.module.css'

export default function Home() {
  let router = useRouter()
  let navPath = []
  useEffect(() => {
    if (window) {
      navPath = JSON.parse(localStorage.getItem('nav-path'))
      navPath = navPath.join('/').split('/')
    }
    if (!navPath || navPath.length === 0) {
      navPath = ['hooks', 'useEffect', 'connect-to-chat', '', '']
    }
    setNavLevel(navPath)
  }, [])
  let [navLevel, setNavLevel] = useState(navPath)

  function setLevel(e, lev, index) {
    let v = e.target.value
    console.log(e, lev, index, e.target.value)
    setNavLevel(prev => {
      return prev.map((item, i) => {
        return i === index ? v : item
      })
    })
    console.log(navLevel)
  }
  function toNav() {

    let fil = navLevel.map(item => item.replace(/^\s+|\s+$/g, '')).filter(i => i)
    console.log(fil)
    localStorage.setItem('nav-path', JSON.stringify(fil))
    let path = '/' + fil.join('/')
    console.log(path)
    router.push(path)
  }
  return (
    <>
      <span>导航跳转</span>
      {
        navLevel.map((lev, index) => {
          return (
            <span key={index}>
              <input className={styles.input} value={lev} onChange={(e) => setLevel(e, lev, index)} />
            </span>
          )
        })
      }
      <button onClick={toNav}>go</button>
      <hr />
    </>
  );
}
