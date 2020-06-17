import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { Toolbar, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

interface PropTypes {
  title: string;
  onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: PropTypes) {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          onClick={onMenuClick}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}