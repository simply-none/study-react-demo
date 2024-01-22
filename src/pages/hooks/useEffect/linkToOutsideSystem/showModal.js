import { useEffect, useRef, useState } from "react";

function ModalDialog({isOpen, children}) {
  const ref = useRef(null)

  useEffect(() => {
    console.log(ref, isOpen, 'isopen')
    // 当关闭时也是会执行的，所以此处拦截
    if(!isOpen) {
      // useEffect要么返回一个函数，要么返回undefined，否则报错
      return undefined
    }
    const dialog = ref.current
    dialog.showModal()
    return () => {
      dialog.close()
    }
  }, [isOpen])

  return (
      <dialog ref={ref}>{children}</dialog>
  )
}

export default function App() {
  const [show, setShow] = useState(false)

  return (
    <>
      <button onClick={() => setShow(true)}>open</button>
      <ModalDialog isOpen={show}>
        hello,
        <br/>
        <button onClick={() => setShow(false)}>close</button>
      </ModalDialog>
    </>
  )
}