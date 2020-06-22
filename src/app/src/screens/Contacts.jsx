import React from 'react';
import useContacts from '../hooks/useContacts';
import Appbar from '../Components/Appbar';
import { Card, CardHeader, List, ListItem } from '@material-ui/core';
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

const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts()
  return (
    <div>
      <Appbar/>
      <List>
        {
          (contacts || []).map((contact, index) => (
            <ListItem key={index}>
              <Card className={classes.fullwidth}>
                <CardHeader title={contact}/>
              </Card>
            </ListItem>
          ))
        }
      </List>
    </div>
  );
};

export default Contacts;
