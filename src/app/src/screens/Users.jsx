import React from 'react';
import Appbar from '../Components/Appbar';
import useUsers from '../hooks/useUsers';
import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, List, ListItem } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import Fetch from '../utils/Fetch';
import { formatDatum } from '../utils/functions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  floatRight: {
    margin: '0 0 auto auto',
  },
  fullwidth: {
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
}));

const Users = () => {
  const classes = useStyles();
  const users = useUsers();
  const friendUser = username => async () => {
    const data = {
      user: localStorage.getItem('username'),
      contact: username,
    }
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
    const response = await new Fetch('contacts', init).fetch();
  }

  return (
    <div>
      <Appbar/>
      <Grid container xs={12}>
        <List>
          {
            (users || []).map(({ username, createdAt }, index) => (
              <ListItem key={index}>
                <Card className={classes.fullwidth}>
                  <CardHeader title={username}/>
                  <CardContent>
                    Mitglied seit <b>{formatDatum(createdAt)}</b>
                  </CardContent>
                  <CardActions>
                    <IconButton className={classes.floatRight} onClick={friendUser(username)}>
                      <PersonAdd/>
                    </IconButton>
                  </CardActions>
                </Card>
              </ListItem>
            ))
          }
        </List>
      </Grid>
    </div>
  );
};

export default Users;
