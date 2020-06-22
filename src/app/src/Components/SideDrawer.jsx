import React from 'react';
import { Avatar, Drawer, List, ListItem, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: { margin: theme.spacing(0) },
  avatar: { margin: theme.spacing(1) },
}))

const SideDrawer = ({ open, setOpen }) => {
  const currentUser = localStorage.getItem('username');
  const classes = useStyles();

  return (
    <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
      <List className={classes.root}>
        <ListItem key='username'>
          <Avatar alt='user icon' className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography variant='h6'>{currentUser}</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
