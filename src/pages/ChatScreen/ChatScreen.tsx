import React, { useState, useCallback, useReducer } from 'react'
import axios from 'axios'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Container from '../../components/Container/Container'
import Chat, { Message, SentOrReceived } from '../../components/Chat/Chat'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type FormEvent = React.FormEvent<HTMLFormElement>

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
    width: '100%',

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

const ibmService = axios.create({
  baseURL: `${process.env.IBM_ASSISTANT_URL}/${process.env.IBM_ASSISTANT_ID}/`,
  auth: {
    username: 'apikey',
    password: `${process.env.IBM_ASSISTANT_API_KEY}`
  }
})

const buildMessage = (type: SentOrReceived, text: string) => ({
  type,
  text
})

const initialState = {
  messages: [buildMessage('received', 'Bem-vindo! Qual sua dúvida?')],
}

const stateReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'appendMessage':
      return {
        ...state,
        messages: [ ...state.messages, action.payload ]
      }
  }
}

export default function ChatScreen() {
  const cls = useStyles()
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const [message, setMessage] = useState('')

  const appendMessage = useCallback((msg: Message) => {
    dispatch({ type: 'appendMessage', payload: msg })
  }, [dispatch])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault() // prevent page reload
    appendMessage(buildMessage('sent', message))
    setMessage('')

    ibmService
      .post('message?version=2020-04-01', { input: { text: message }})
      .then((res) => {
        const { data: { output: { generic: answers } } } = res
        appendMessage(buildMessage('received', answers[0].text))
      })

  }, [message, appendMessage])

  return (
    <div className={cls.content}>
      <Container>
        <Chat messages={state.messages} />
      </Container>
      <footer className={cls.footer}>
        <form
          className={cls.form}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            value={message}
            className={cls.input}
            placeholder="Faça uma pergunta..."
            onChange={(e: ChangeEvent) => setMessage(e.target.value)}
          />
          <Button type="submit">
            <SendIcon color="primary" />
          </Button>
        </form>
      </footer>
    </div>
  )
}
