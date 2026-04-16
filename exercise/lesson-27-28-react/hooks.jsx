// hooks：use+业务
// 内置hooks：useEffect、useRef……
// 自定义hooks：use+特定业务
// 本质封装复用逻辑

import { useEffect, useState } from "react";

function useUser() {
  const [user, setUser] = useState(null)
  // const value = user
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser('a')
      // return user
    }, 500);
    return clearTimeout(timer)
  }, [])
  return user
}
// function profile1(){
//   const use = useUser()
// }

function Profile(props) {
  // const { user } = props
  const user = useUser()
  return (
    <div>
      登录页绿色：{user}
    </div>
  )
}
Profile()

function Demo(){
  const [count, setCount] = useState(0)
  if(false){
    const [name, setName] = useState('张三')
  }
  // const [name, setName] = useState('张三')
  useEffect(()=>{
    console.log('hello')
  }, []) 

}

// 为什么hooks不能在if中，Hooks Rules
// 1、调用链
// 2、hook靠调用位置识别，false和true的调用位置不同

// hooks规则
// 1、放在顶层
// 2、放在函数组件或自定义hooks里
// 3、不能放在条件语句里


const fetchData = () => {
  const [user, setUser] = useState(null) // 报错
}