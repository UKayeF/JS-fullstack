import React from 'react';
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  fullwidth: {
    width: '100%',
  },
  title: {
    flexGrow: 1,
  }
})

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const logout = () => history.push('/');
  const goTo = path => () => history.push(path);

  return (
    <div className={classes.root}>
      <Grid container direction='row' className={classes.fullwidth}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' className={classes.menuButton}>
              <Menu/>
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              <Button color='inherit' onClick={goTo('/nachrichten')}>
                Nachrichten
              </Button>
            </Typography>
            <Button color='inherit' onClick={logout}>Ausloggen</Button>
          </Toolbar>
        </AppBar>

      </Grid>
    </div>
  );
};

export default Home;
