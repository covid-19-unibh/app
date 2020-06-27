import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export type SentOrReceived = 'sent' | 'received'

export interface Message {
  type: SentOrReceived
  text: string
}

interface PropTypes {
  messages: Message[]
}

const useStyles = makeStyles((theme) => ({
  message: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
    borderRadius: '5px',
    whiteSpace: 'break-spaces',
  },
  received: {
    marginRight: theme.spacing(5),
    background: '#fff',
  },
  sent: {
    marginLeft: theme.spacing(5),
    background: theme.palette.primary.light,
  },
}))

export default function Chat({ messages }: PropTypes) {
  const classes = useStyles()

  return (
    <div>
      {messages.map((msg, index) => {
        const typeClass = msg.type === 'received'
          ? classes.received
          : classes.sent

        return (
          <div
            key={index}
            className={`${classes.message} ${typeClass}`}
          >
            {msg.text}
          </div>
        )
      })}
    </div>
  )
}
