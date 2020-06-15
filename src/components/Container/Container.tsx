import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  }
}));

const Container: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      {children}
    </main>
  )
};

export default Container;