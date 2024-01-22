import { useEffect, useState } from "react";

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    // window（浏览器api）属于外部系统，所以必须在useEffect中使用，在外部使用获取不到值
    window.addEventListener("pointermove", handleMove);

    // cleanup函数，在组件卸载时调用
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  });

  // 返回一个鼠标光标移动的区域
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    ></div>
  );
}
