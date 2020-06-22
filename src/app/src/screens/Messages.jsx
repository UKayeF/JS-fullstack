import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Drawer, Grid, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Mail } from '@material-ui/icons';
import Appbar from '../Components/Appbar';
import useMessages from '../hooks/useMessages';
import { formatDatum } from '../utils/functions';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  fullwidth: {
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
})
const Messages = () => {
  const classes = useStyles();
  const messages = useMessages();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <Appbar/>
      <Grid container xs={12}>
        <List>
          {
            (messages || []).map(({ from, to, title, body, createdAt }, index) => (
              <ListItem key={index}>
                <Card className={classes.fullwidth}>
                  <CardHeader avatar={<Mail/>} title={title}/>
                  <CardContent>
                    <Typography variant='subtitle1'>Datum: <b>{formatDatum(createdAt)}</b></Typography>
                    <Typography variant='subtitle1'>From: <b>{from}</b>, To: <b>{to || 'undefined'}</b></Typography>
                    <br/>
                    <Typography variant='h6'>{body}</Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))
          }
        </List>
        <Drawer anchor='bottom' open={drawerOpen} onClose={() => setDrawerOpen(false)}>

        </Drawer>
      </Grid>
    </div>
  );
};

export default Messages;
