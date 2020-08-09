import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 버튼 누를 때마다 페이지가 리프레쉬가 되는 것을 막기 위해! 그럼 밑에 있는 로직을 실행할 수 없으니까!

    // 서버에 보내기
    let body = {
      email: Email,
      password: Password
    }

    // Redux 데이터 FLOW: 1. React Component에서 dispatch(action)
    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        props.history.push('/') // 페이지 redirect!
      } else {
        alert('Error')
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height:'100vh'
    }}>
      <form style={{display: 'flex', flexDirection:'column'}}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        {/* 타이핑을 할 때 onChange라는 이벤트를 발생시켜서 state을 바껴주고 그럼 value가 바뀌는 것! */}
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage