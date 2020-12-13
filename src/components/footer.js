import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.level1,
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }  
}));


const Footer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.content}>
        meh.
      </footer>
    </div>
  )
};

export default Footer;