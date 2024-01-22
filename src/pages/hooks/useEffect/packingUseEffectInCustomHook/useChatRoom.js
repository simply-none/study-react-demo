const { useEffect, useState } = require("react")


function createConnection(serverUrl, roomId) {
  return {
    connect() {
      console.log(`连接到${roomId}在${serverUrl}`)
    },
    disconnect(){
      console.log(`取消连接${roomId}在${serverUrl}`)
    }
  }
}

// 封装useEffect在自定义hook中
function useChatRoom({serverUrl, roomId}) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [serverUrl, roomId])
}

function ChatRoom({roomId}) {
  const [serverUrl, setServerUrl] = useState('https://xxx')

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  })

  return (
    <>
      <label>
        server url: {''}
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)}/>
      </label>
      <h1>欢迎来到{roomId} room</h1>
    </>
  )
}

export default function App() {
  const [roomId, setRoomId] = useState('general')

  const [show, setShow] = useState(false)

  return (
    <>
      <label>
        选择chat room：{''}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value={'general'}>general</option>
          <option value={'travel'}>traval</option>
          <option value={'music'}>music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? '关闭chat': '打开chat'}
      </button>
      {show && <hr/>}
      {show && <ChatRoom roomId={roomId} />}
    </>
  )
}
