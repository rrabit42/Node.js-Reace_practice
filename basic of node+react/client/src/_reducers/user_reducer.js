// Redux 데이터 FLOW: 4. (previousState, action) => nextState

import {
  LOGIN_USER
} from '../_actions/types';

export default function(state = {}, action) {
  switch (action.type){
    case LOGIN_USER:
      // spread operator : 여기 코드에서는 state를 똑같이 가져온다는 뜻
      return {...state, loginSuccess: action.payload}
      break;

    default:
      return state;
  }
}