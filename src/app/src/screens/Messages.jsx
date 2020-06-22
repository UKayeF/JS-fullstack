import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, Drawer, Fab, Grid, IconButton, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, Mail, Reply } from '@material-ui/icons';
import Appbar from '../Components/Appbar';
import useMessages from '../hooks/useMessages';
import { formatDatum } from '../utils/functions';
import MessageInput from '../Components/MessageInput';

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
  newMail: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(2),
  },
}));

const Messages = () => {
  const classes = useStyles();
  const messages = useMessages();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mailTo, setMailTo] = useState(null);

  return (
    <div>
      <Appbar/>
      <Grid container xs={12}>
        <List>
          {
            (messages || []).map(({ from, to, title, body, createdAt, incoming }, index) => (
              <ListItem key={index}>
                <Card className={classes.fullwidth}>
                  <CardHeader avatar={<Mail/>} title={title}/>
                  <CardContent>
                    <Typography variant='subtitle1'>Datum: <b>{formatDatum(createdAt)}</b></Typography>
                    <Typography variant='subtitle1'>From: <b>{from}</b>, To: <b>{to || 'undefined'}</b></Typography>
                    <br/>
                    <Typography variant='h6'>{body}</Typography>
                  </CardContent>
                  {
                    incoming ? (
                      <CardActions>
                        <IconButton className={classes.floatRight} onClick={() => {
                          setMailTo(from);
                          setDrawerOpen(true);
                        }}>
                          <Reply />
                        </IconButton>
                      </CardActions>
                    ) : null
                  }
                </Card>
              </ListItem>
            ))
          }
        </List>
        <Fab className={classes.newMail} color='primary' onClick={() => setDrawerOpen(true)}>
          <Mail />
        </Fab>
        <Drawer anchor='bottom' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <IconButton onClick={() => {
            setDrawerOpen(false);
            setMailTo(null);
          }}>
            <Close />
          </IconButton>
          <MessageInput mailTo={mailTo} />
        </Drawer>
      </Grid>
    </div>
  );
};

export default Messages;
