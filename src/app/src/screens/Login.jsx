import React, { useState } from 'react';
import { Button, FormControl, Grid, Input, InputLabel, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fetch from '../utils/Fetch';

const useStyles = makeStyles(theme => ({
  fullwidth: {
    width: '100%',
  },
  root: {
    margin: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserInputChange = evt => setUsername(evt.target.value);
  const handlePassInputChange = evt => setPassword(evt.target.value);
  const handleSubmit = async evt => {
    const data = {
      user: username,
      pass: password,
    };

    const init = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const token = await new Fetch('tokens', init).fetch();
    localStorage.setItem('auth-token', token);
    alert('Success!');

  }

  return (
    <Grid className={classes.root} container justify='center'
          direction='row' alignItems='center' style={{ height: '100vh' }}>
      <Grid item xs={12} md={4} lg={2}>
        <Paper elevation={1}>
          <form className={classes.root}>
            <Grid item xs={12}>
              <FormControl required className={classes.fullwidth}>
                <InputLabel htmlFor='login-name'>
                  Benutzername
                </InputLabel>
                <Input
                  id='login-name'
                  onChange={handleUserInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required className={classes.fullwidth}>
                <InputLabel htmlFor='login-pass'>
                  Passwort
                </InputLabel>
                <Input
                  id='login-pass'
                  onChange={handlePassInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' className={classes.fullwidth}
                      onClick={handleSubmit}>
                Einloggen
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
