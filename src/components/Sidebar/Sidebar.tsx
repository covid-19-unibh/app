import React from 'react';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MapIcon from '@material-ui/icons/Map'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
}));

interface PropTypes {
  open: boolean;
  onToggle: () => void
}

export default function Sidebar({ open, onToggle }: PropTypes) {
  const classes = useStyles();

  return (
    <Drawer
        anchor="left"
        open={open}
        onClose={onToggle}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={onToggle}
          onKeyDown={onToggle}
        >
          <List>
            <ListItem button key="Map">
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <Link to="/">
                <ListItemText primary="Mapa" />
              </Link>
            </ListItem>
            <ListItem button key="FAQ">
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <Link to="/faq">
                <ListItemText primary="FAQ" />
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
  )
}