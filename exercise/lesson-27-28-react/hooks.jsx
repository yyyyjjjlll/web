// hooks：use+业务
// 内置hooks：useEffect、useRef……
// 自定义hooks：use+特定业务
// 本质封装复用逻辑

function useUser() {
  const [user, setUser] = useState(null)
  const value = user
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser('a')
      // return user
    }, 500);
    return clearTimeout(timer)
  }, [])
  return user
}
function profile1(){
  const use = useUser()
}

function Profile(props) {
  // const { user } = props
  const user = useUser()
  return (
    <div>
      登录页绿色：{user}
    </div>
  )
}
profile1()
// 为什么hooks不能在if中，Hooks Rules