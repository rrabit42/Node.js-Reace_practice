import React from 'react'

function LandingPage() {


  useEffect(() => {
    axios.get('http://localhost:5000/api/hello') // get request를 서버에 보낸다.
    .then(response => console.log(response.data)) // response 데이터를 콘솔창에 보여준다.
  }, [])

  return (
    <div>
      LandingPage
    </div>
  )
}

export default LandingPage