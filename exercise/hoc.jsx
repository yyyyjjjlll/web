import { useEffect, useState } from "react"

function withUser(WrappedComponent) {
  // const [user, setUser] = useState('a')
  return (props) => {
    useEffect(
    )
    <WrappedComponent {...props} user={user}/>
  }
}

function Profile(props) {
  const { user } = props
  return (
    <div>
      当前用户：{user}
    </div>
  )
}

const ProfilewithUser = withUser(Profile)

export default ProfilewithUser