import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  message: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
    borderRadius: '5px',
  },
  received: {
    marginRight: theme.spacing(5),
    background: '#fff'
  },
  sent: {
    marginLeft: theme.spacing(5),
    background: theme.palette.primary.light
  }
}))

export default function Chat() {
  const classes = useStyles();

  return (
    <div>
      <div className={`${classes.message} ${classes.received}`}>
        O que você deseja?
      </div>
      <div className={`${classes.message} ${classes.sent}`}>
        Quero informações sobre o COVID-19.
      </div>
    </div>
  )
}