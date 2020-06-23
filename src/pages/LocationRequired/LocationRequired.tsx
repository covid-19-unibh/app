import React from 'react'
import Container from '@material-ui/core/Container'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

const RequestLocationScreen = () => {
  return (
    <Container>
      <h2>Você não pode usar o app sem habilitar sua localização.</h2>
      <p>
        Se você negou essa permissão anteriormente, a única maneira de
        habilitá-la é usando as configurações do seu navegador.
      </p>
      <p>
        Esse é um mecanismo dos navegadores para garantir a segurança
        dos usuários.
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/114662?visit_id=637285389946099728-3597978535&rd=1">
            Habilitando permissões no Google Chrome
          </a>
        </li>
      </ul>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
        >
          Voltar para o mapa
        </Button>
      </Link>
    </Container>
  );
};

export default RequestLocationScreen;
