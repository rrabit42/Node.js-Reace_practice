import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

function LandingPage(props) {


  useEffect(() => {
    axios.get('api/hello') // get request를 서버에 보낸다. 이제 타겟을 설정했으니 앞에 부분은 지워도됨! (엔드포인트만 남겨놓기)
    .then(response => console.log(response.data)) // response 데이터를 콘솔창에 보여준다.
  }, [])

  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
    .then(response => {
      if(response.data.success) {
        props.history.push("/login")
      } else {
        console.log(response.data)
        alert('로그아웃 실패')
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height:'100vh'
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default withRouter(LandingPage)