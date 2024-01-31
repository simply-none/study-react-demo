import { useState } from "react";

const foods = [{
  id: 0,
  name: '寿司',
  description: '寿司是一道传统的日本菜，是用醋米饭做成的'
}, {
  id: 1,
  name: '木豆',
  description: '制作木豆最常见的方法是在汤中加入洋葱、西红柿和各种香料'
}, {
  id: 2,
  name: '饺子',
  description: '饺子是用未发酵的面团包裹咸的或甜的馅料，然后在沸水中煮制而成的'
}, {
  id: 3,
  name: '烤肉串',
  description: '烤肉串是一种很受欢迎的食物，是用肉串和肉块做成。'
}, {
  id: 4,
  name: '点心',
  description: '点心是广东人的传统喜好，是在餐馆吃早餐和午餐时喜欢吃的一系列小菜'
}];


export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [inputVal, setInputVal] = useState('')
  const [keyword, setkeyword] = useState('')
  // 由于keyword状态变更，导致重渲染，从而引发items重计算
  const items = filterItems(keyword, foods)
  return (
    <>
      <h2>xxxx</h2>
      <Panel title={'关于x'} isActive={activeIndex === 0 } onShow={() => setActiveIndex(0)}>
        xxxxx
      </Panel>
      <h2>yyyyy</h2>
      <Panel title={'关于y'} isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        yyyyy
      </Panel>
      <hr/>
      <div>
      <Input val={inputVal} onChange={(d) => setInputVal(d)}/>
      <Input val={inputVal} onChange={(d) => setInputVal(d)}/>
      </div>
      <hr/>
      <div>
        <SearchBar keyword={keyword} onSearch={(data) => {
          setkeyword(data)
        }}></SearchBar>
        <List items={items}/>
      </div>
    </>
  )
}

// 每次仅仅展示一个panel：将控制状态的变量和函数都传递给子组件
function Panel({title, children, isActive, onShow}) {

  return (
    <section className="pannel">
      <h3>{title}</h3>
      {
        isActive ? (
          <p>{children}</p>
        ) : (
          <button onClick={onShow}>
            显示
          </button>
        )
      }
    </section>
  )
}

// 两个输入框内容同步
function Input({val, onChange}) {
  return (
    <div>
      <input value={val} onInput={(e) => onChange(e.target.value)} placeholder='请输入'/>
    </div>
  )
}

// 搜索过滤
function filterItems (keyword, items) {
  return items.filter(item => item.name.includes(keyword))
}

function SearchBar ({keyword, onSearch}) {
  return (
    <>
      <input value={keyword} onChange={(e) => onSearch(e.target.value)}/>
    </>
  )
}

function List ({items}) {
  return (
    <ul>
      {
      items.map(item => {
        return <li key={item.id}>{item.name}, {item.description}</li>
      })
    }
    </ul>
  )
}