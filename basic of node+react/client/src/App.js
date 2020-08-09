import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'


function App() {
  return (
    <Router>
      <div>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/*
          기존 코드
            <Route path="/">
              <LoginPage />
            </Route>
          를 한줄로 적는 방법
          */}
          {/*
            이렇게 Page component들을 Auth Component에 넣었다!
            몇개의 옵션과 함께!
          */}
          <Route exact path="/" component = {Auth(LandingPage, null)} />
          <Route exact path="/login" component = {Auth(LoginPage, false)} />
          <Route exact path="/register" component = {Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;