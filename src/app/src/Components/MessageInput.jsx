import React, { useState } from 'react';
import { Card, CardActions, CardContent, FormControl, IconButton, Input, InputLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import Fetch from '../utils/Fetch';

const useStyles = makeStyles(theme => ({
  root: {},
  fullwidth: { width: '100%' },
}))

const MessageInput = ({ mailTo }) => {
  const classes = useStyles();

  const [recipient, setRecipient] = useState(mailTo);
  const handleRecipientChange = evt => setRecipient(evt.target.value);

  const [title, setTitle] = useState('');
  const handleTitleChange = evt => setTitle(evt.target.value);

  const [body, setBody] = useState('');
  const handleBodyChange = evt => setBody(evt.target.value);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const canSend = recipient && body;

  const handleSubmit = async () => {
    const data = {
      title,
      body,
      from: localStorage.getItem('username'),
      to: recipient,
    };
    const init = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const path = 'messages/send';
    const result = await new Fetch(path, init).fetch();
    if (result){
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
    else {
      setError(true);
      setSuccess(false);
    }
  }

  return (
    <div>
      <Card>
        <CardContent>
          <FormControl required className={classes.fullwidth}>
            <InputLabel htmlFor='recipient'>
              Empfänger
            </InputLabel>
            <Input id='recipient' onChange={handleRecipientChange} value={recipient}/>
          </FormControl>
          <FormControl className={classes.fullwidth}>
            <InputLabel htmlFor='title'>
              Betreff
            </InputLabel>
            <Input id='title' onChange={handleTitleChange}/>
          </FormControl>
          <FormControl className={classes.fullwidth}>
            <InputLabel htmlFor='body'>
              Inhalt
            </InputLabel>
            <Input id='body' onChange={handleBodyChange}/>
          </FormControl>
          {
            error ? (
              <Typography variant='h6'>Nachricht konnte nicht gesendet werden!</Typography>
            ) : null
          }
          {
            success ? (
              <Typography variant='h6'>Nachricht erfolgreich gesendet!</Typography>
            ) : null
          }
        </CardContent>
        <CardActions>
          <IconButton disabled={!canSend} onClick={handleSubmit}>
            <Send/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default MessageInput;
