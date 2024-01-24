import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);
export default function App() {
  const [theme, setTheme] = useState(null);

  return (
    <ThemeContext.Provider
    // 传递一个对象给context，这样就可以调用祖先组件的方法了
      value={{
        theme,
        setTheme,
      }}
    >
      <Form/>

    </ThemeContext.Provider>
  );
}

function Form() {
  let {theme} = useContext(ThemeContext)
  return (
    <Pannel title={theme}>
      <section>
        <Button>login</Button>
        <Button>logout</Button>
      </section>
    </Pannel>
  );
}

function Pannel({ title, children }) {
  return (
    <>
      <h1>当前的theme：{title}</h1>
      {children}
    </>
  );
}

function Button({ children }) {
  const {
    theme,
    setTheme
  } = useContext(ThemeContext)
  return (
    <>
      <button onClick={() => setTheme('btn'  + children)} className={'button-' + theme}>
        {children}
      </button>
    </>
  );
}
