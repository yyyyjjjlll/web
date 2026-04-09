import { useEffect, useState } from "react"
// HOC：with+业务
function withUser(WrappedComponent) {
  return (props) => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
      setTimeout(() => {
        setUser('b') 
      }, 500);
    },[])
    return <WrappedComponent {...props} user={user}/>
  }
}

function Profile(props) {
  const { user } = props
  return (
    <div>
      登录页绿色：{user}
    </div>
  )
}

function Profile2(props) {
  const { user } = props
  return (
    <div>
      详情页红色：{user}
    </div>
  )
}

const ProfilewithUser = withUser(Profile)
export default function APP(){
  return <ProfilewithUser title='标题'/>
}