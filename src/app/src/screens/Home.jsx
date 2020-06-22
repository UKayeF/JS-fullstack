import React from 'react';
import { Grid } from '@material-ui/core';
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

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction='row' className={classes.fullwidth}>
        <Appbar />
      </Grid>
    </div>
  );
};

export default Home;
