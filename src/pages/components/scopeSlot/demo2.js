function Container(props) {
  return (
    <>
      {/* 接收到的值在该处渲染 */}
      {props.children({ a: 1, b: 2, c: 3 })}
      {props.children({ e: 1, b: 2, c: 3 })}
      <input></input>
      <input></input>
      {props.children({ d: 1, b: 2, c: 3 })}
      <input></input>
    </>
  );
}

function C2ontainer(props) {
  return (
    <>
      <div>
        <input />
        <input />
        <input />
        <input />
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Container>
        {/* 
        通过传递函数实现作用域插槽：
        将下面的内容替换成conteiner内部的props.children位置上的内容，可以返回任意内容 
        其中，每个v都代表一个props.children
        */}
        {(v) =>
          Object.keys(v).map((item) => {
            return (
              <li key={item}>
                {v[item]}: {item}
                <C2ontainer />
              </li>
            );
          })
        }
      </Container>
    </>
  );
}
