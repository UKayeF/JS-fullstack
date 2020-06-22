import React from 'react';
import useContacts from '../hooks/useContacts';
import Appbar from '../Components/Appbar';
import { Card, CardHeader, List } from '@material-ui/core';

const Contacts = () => {
  const contacts = useContacts()
  return (
    <div>
      <Appbar />
      <List>
        {
          contacts ? contacts.map(contact => (
            <Card>
              <CardHeader title={contact} />
            </Card>
          )) : null
        }
      </List>
    </div>
  );
};

export default Contacts;
