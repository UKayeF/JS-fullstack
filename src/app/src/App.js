import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Login from './screens/Login';
import { createMuiTheme } from '@material-ui/core';
import Home from './screens/Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#57cae7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff8103',
      contrastText: '#ffffff',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/'>
            <Login/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
