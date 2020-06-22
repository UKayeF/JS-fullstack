import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import SideDrawer from './SideDrawer';

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

const Appbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const logout = () => {
    history.push('/');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
  }
  const goTo = path => () => history.push(path);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const openSideDrawer = () => setSideDrawerOpen(true);

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' className={classes.menuButton} onClick={openSideDrawer}>
          <Menu/>
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          <Button color='inherit' onClick={goTo('/messages')}>
            Nachrichten
          </Button>
        </Typography>
        <Typography variant='h6' className={classes.title}>
          <Button color='inherit' onClick={goTo('/contacts')}>
            Kontakte
          </Button>
        </Typography>
        <Typography variant='h6' className={classes.title}>
          <Button color='inherit' onClick={goTo('/users')}>
            Benutzer
          </Button>
        </Typography>
        <Button color='inherit' onClick={logout}>Ausloggen</Button>
      </Toolbar>
      <SideDrawer open={sideDrawerOpen} setOpen={setSideDrawerOpen}/>
    </AppBar>
  )
}

export default Appbar;
