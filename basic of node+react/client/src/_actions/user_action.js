import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER
} from './types'

// Redux 데이터 FLOW: 2. action 정의
export function loginUser(dataTosubmit) {
  // 서버에서 받은 response.data를 request에 저장!
  const request = axios.post('/api/users/login', dataTosubmit)
  .then(response => response.data)

  // Redux 데이터 FLOW: 3. Reducer로 보내기
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataTosubmit) {
  // 서버에서 받은 response.data를 request에 저장!
  const request = axios.post('/api/users/register', dataTosubmit)
  .then(response => response.data)

  // Redux 데이터 FLOW: 3. Reducer로 보내기
  return {
    type: REGISTER_USER,
    payload: request
  }
}