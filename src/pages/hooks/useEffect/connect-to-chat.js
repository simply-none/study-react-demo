"use client"
import { useState, useEffect } from "react";
import { createConnection } from "./chat.js";

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://xxx");
  const [msg, setMsg] = useState([])

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect().then(a => {
      setMsg((state) => {
        state.push(a)
        return state
      })
    });
    // 返回的是cleanup函数
    return () => {
      connection.disconnect().then(a => {
        setMsg((state) => {
          state.push(a)
          return state
        })
      });
    };
  }, [serverUrl, roomId]);

  return (
    <>
      <label>
        Server URL:{" "}
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h1>welcome to the {roomId} room!</h1>
      <hr/>
      {
        msg.map((d) => {
          return (<div key={d}>{d}</div>)
        })
      }
      <br/>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general')
  const [show, setShow] = useState(false)
  return (
    <>

      <label>
        choose the chat room: {''}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'close chat' : 'open chat'}
      </button>
      {show && <hr/>}
      {show && <ChatRoom roomId={roomId}/>}
    </>
  )
}