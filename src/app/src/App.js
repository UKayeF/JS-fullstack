import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
