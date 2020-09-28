import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import React from 'react';

import UserView from "./components/user/UserView";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Settings from "./components/Settings";
import {BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" exact>
          <Login></Login>
        </Route>
        <Route path="/profile" exact>
          <div className="app">
            <UserView></UserView>
            <div className="postView">PostView</div>
          </div>
        </Route>
        <Route path="/settings" exact>
          <Settings></Settings>
        </Route>
        <Redirect from="/" to="/login" exact></Redirect>
        <Route>
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </React.Fragment>
  )
}

ReactDOM.render(<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
