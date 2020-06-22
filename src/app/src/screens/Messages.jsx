import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '../Components/Appbar';

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
const Messages = () => {
  const classes = useStyles();

  return (
    <div>
      <Appbar />
    </div>
  );
};

export default Messages;
