import React from 'react'
import Container from '@material-ui/core/Container'
import { Button, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const QuestionaryScreen = () => {
  const cls = useStyles()
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
  }

  return (
    <Container>
      <h2>Você viajou ou esteve em contato com alguém possivelmente doente nos últimos 14 dias?</h2>
      <p>
        Só um médico pode dar um diagnóstico oficial, mas se você esteve em contato com
        alguém possivelmente doente nos últimos 14 dias, é melhor se isolar.
      </p>
      <div className={cls.buttons}>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Não
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Sim
        </Button>
      </div>
    </Container>
  )
}

export default QuestionaryScreen
