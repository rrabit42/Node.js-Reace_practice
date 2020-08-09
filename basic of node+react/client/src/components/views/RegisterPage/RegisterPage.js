import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 버튼 누를 때마다 페이지가 리프레쉬가 되는 것을 막기 위해! 그럼 밑에 있는 로직을 실행할 수 없으니까!

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    } // 같지 않으면 그 이후로 진입을 못함

    // 서버에 보내기
    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    // Redux 데이터 FLOW: 1. React Component에서 dispatch(action)
    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
        props.history.push("/login")
      } else {
        alert("Failed to sign up")
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)
