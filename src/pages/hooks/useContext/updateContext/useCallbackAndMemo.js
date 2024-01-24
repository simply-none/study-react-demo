import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  // 使用useCallback包裹函数，进行性能优化
  const login = useCallback((res) => {
    console.log("函数重渲染");
    setUser(res?.user);
  }, []);

  // 使用useMemo包裹对象，进行性能优化
  const contextVal = useMemo(() => {
    console.log("对象重渲染");
    return {
      user,
      login,
    };
    // 这里只有当user改变，才会触发重渲染
  }, [user, login]);

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={contextVal}>
      {theme}
      <button onClick={() => setUser(Date.now())}>改变user</button>
      <button onClick={changeTheme}>改变theme</button>
      <Form login={login} />
    </ThemeContext.Provider>
  );
}

function Form({ login }) {
  const theme = useContext(ThemeContext)
  return (
    <>
    user：{theme.user}<br/>
      <button onClick={login}>登陆</button>
    </>
  );
}
