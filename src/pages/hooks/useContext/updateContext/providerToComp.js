import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null)
const UserContext = createContext(null)

export default function App(){
  const [theme, setTheme] = useState('light')
  
  return (
    <MyProviders theme={theme} setTheme={setTheme}>
      <WelcomePannel></WelcomePannel>
      <label>
        <input type="checkbox" checked={theme==='dark'} onChange={(e) => {
          setTheme(e.target.checked ? 'dark' : 'light')
        }}/>
        use dark mode
      </label>
    </MyProviders>
  )
}

// 将provider封装成组件
function MyProviders({children, theme, setTheme}) {
  const [user, setUser] = useState(null)

  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={{
        user,
        setUser
      }}>
        { children }
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

function WelcomePannel ({children}) {
  const {user} = useContext(UserContext)

  return (
    <Pannel title={user}>
      {user !== null ? <Greeting/> : <LoginForm/>}
    </Pannel>
  )
}

function Pannel ({title, children}) {

  const theme = useContext(ThemeContext)
  console.log(title)
  const className = 'pannel-' + theme
  
  return (
    <section className={className}>
      <h1>{(title?.name || '').toString()}</h1>
      {children}
    </section>
  )
}

function LoginForm () {
  const { setUser } = useContext(UserContext)
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const canlogin = first && second
  return (
    <>
      <label>
        first: 
        <input required value={first} onChange={e => setFirst(e.target.value)}/>
      </label>
      <label>
        second:
        <input required value={second} onChange={e => setSecond(e.target.value)}/>
      </label>
      <Button disabled={!canlogin} onClick={() => {
        setUser({
          name: first + ' ' + second
        })
      }}>登陆</Button>
      {!canlogin && <i>两者必填</i>}
    </>
  )
}

function Greeting () {
  const { user } = useContext(UserContext)
  return (
    <p>你已经登录：账户名是{user.name}</p>
  )
}


function Button ({children, disabled, onClick}) {
  const theme = useContext(ThemeContext)
  const className = 'button-' + theme
  return (
    <button className={className} disabled={disabled} onClick={onClick}>{children}</button>
  )
}