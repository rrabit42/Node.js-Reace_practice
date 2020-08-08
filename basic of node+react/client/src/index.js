import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers';

// 원래 createStore로만 Store 가져오는 건데 그럼 객체밖에 못받기 때문에 promise와 ReduxThunk을 이용해 만들어준다!
const createStoreWithMiddlweware = applyMiddleware(promiseMiddleware, ReduxThunk) (createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddlweware(Reducer,
      //redux extension
      //툴을 이용해서 리덕스를 좀 더 편하게 사용할 수 있게
      // 크롬에서 'Redux DevTools' 다운 받기
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
