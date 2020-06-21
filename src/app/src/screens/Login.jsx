import React, { useState } from 'react';
import { Button, FormControl, Grid, Input, InputLabel } from '@material-ui/core';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserInputChange = evt => setUsername(evt.target.value);
  const handlePassInputChange = evt => setPassword(evt.target.value);
  const handleSubmit = evt => console.log(btoa(`${username}:${password}`));

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={3}>
        <form>
          <FormControl required>
            <InputLabel htmlFor='login-name'>Benutzername</InputLabel>
            <Input
              id='login-name'
              aria-described-by='Enter username'
              onChange={handleUserInputChange}
            />
          </FormControl>
          <FormControl required>
            <InputLabel htmlFor='login-pass'>Passwort</InputLabel>
            <Input
              id='login-pass'
              aria-described-by='Enter password'
              onChange={handlePassInputChange}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Einloggen</Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
