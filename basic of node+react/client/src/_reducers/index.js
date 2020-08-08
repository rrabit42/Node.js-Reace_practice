/*
store가 있다. 여기에 reducer가 여러개가 있을 수 있음.
reducer 안에서 하는 일이 어떻게 state가 변하는걸 보여준 후에
변한 마지막 값을 리턴해주는게 리듀서다.
User, Post, Number, Comment 등 여러 State이 있을 수 있기 때문에 reducer가 나눠져 있다.
이걸 combineReducers를 이용해서 RootReducer에서 하나로 합쳐줌!!

지금 그래서 여러 리듀서를 합쳐주는걸 여기서 작업하는것!
*/

import { combineReducers } from 'redux';
// import user from './user_reducer';
// import comment from './comment_reducer';

const rootReducer = combineReducers({
  //user, comment
})

export default rootReducer;