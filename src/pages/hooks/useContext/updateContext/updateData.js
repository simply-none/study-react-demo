import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export default function App() {
  let [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      {theme}
      <Form className={theme} />
      <label>
        <input
          type="checkbox"
          checked={theme === "light"}
          onChange={(e) => {
            setTheme(e.target.checked ? "light" : "dark");
          }}
        />
        use dark mode
      </label>
    </ThemeContext.Provider>
  );
}

function Form() {
  const theme = useContext(ThemeContext);
  return (
    <ThemeContext.Provider value={theme + 1}>
      <div className={theme}>
        <Pannel title="welcome">
          <Button>登陆</Button>
          <Button>登出</Button>
        </Pannel>
      </div>
    </ThemeContext.Provider>
  );
}

function Pannel({ title, children }) {
  // 使用createContext创建的context
  const theme = useContext(ThemeContext);
  const [atheme, setTheme] = useState("pannel-" + theme);

  useEffect(() => {
    if (!atheme.includes(theme)) {
      setTheme("pannel-" + theme);
    }
  }, [atheme, theme]);

  return (
    // 这里拦截了，所以使用的是这里的value
    <ThemeContext.Provider value={theme + "1"}>
      <section>
        <h1>{title}</h1>
        {children}
      </section>
    </ThemeContext.Provider>
  );
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return <button className={className}>{children}</button>;
}
