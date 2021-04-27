import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Calculator from '../src/Modules/Calculator/calulator'
import Login from '../src/Modules/Login/login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    //define routes for every module in app.
    <Router>
      <Switch>
        <Route path="/calculator">
          <Calculator />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
