
"use client"
import Image from "next/image";
// import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  let [i, si] = useState('')
  let router = useRouter()
  function c (e) {
    console.log(e)
    si(e.target.value)
    
  }
  function p () {
    router.push(i)
  }
  return (
    <>
      <input value={i} onChange={c} />
      <button onClick={p}>go</button>
      <hr/>
    </>
  );
}
