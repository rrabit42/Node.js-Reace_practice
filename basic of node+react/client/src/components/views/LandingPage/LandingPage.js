import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {


  useEffect(() => {
    axios.get('api/hello') // get request를 서버에 보낸다. 이제 타겟을 설정했으니 앞에 부분은 지워도됨! (엔드포인트만 남겨놓기)
    .then(response => console.log(response.data)) // response 데이터를 콘솔창에 보여준다.
  }, [])

  return (
    <div>
      LandingPage
    </div>
  )
}

export default LandingPage