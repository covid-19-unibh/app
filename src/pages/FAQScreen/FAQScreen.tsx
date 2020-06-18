import React from 'react'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Container from '../../components/Container/Container'
import Chat from '../../components/Chat/Chat'

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: `calc(100vh - ${theme.spacing(7)}px)`,
  },
  footer: {
    background: '#fff',
    boxShadow: theme.shadows[2],
  },
  input: {
    border: 'none',
    fontFamily: 'inherit',

    '&:focus': {
      outline: 'none',
    },
  },
  form: {
    display: 'flex',
    padding: theme.spacing(2),
    justifyContent: 'space-between',
  },
}))

export default function FAQScreen() {
  const cls = useStyles()

  return (
    <div className={cls.content}>
      <Container>
        <Chat />
      </Container>
      <footer className={cls.footer}>
        <form className={cls.form} autoComplete="off" noValidate>
          <input className={cls.input} placeholder="Faça uma pergunta..." />
          <Button>
            <SendIcon color="primary" />
          </Button>
        </form>
      </footer>
    </div>
  )
}
