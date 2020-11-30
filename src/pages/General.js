import React from 'react';
import { Button } from 'react-bootstrap';

import * as Storage from '../services/localStorage';

class General extends React.Component {
  constructor(props) {
    super(props);

    this.logoff = this.logoff.bind(this);
  }

  componentDidMount() {
    if (!Storage.validateUser()) {
      alert('Você não está logado!');
      return this.props.history.push('/');
    }
  }

  logoff() {
    Storage.logoff();
    return this.props.history.push('/');
  }

  render() {
    return (
      <div className="general-frame">
        <div style={{ padding: '10px' }}>
          <Button
            block
            onClick={() => this.props.history.push('/stock')}
            size="lg"
            variant="secondary"
          >
            Visão Geral
          </Button>{' '}
          <Button
            block
            onClick={() => this.props.history.push('/report')}
            size="lg"
            variant="secondary"
          >
            Gerar Relatório
          </Button>{' '}
          <Button
            block
            onClick={this.logoff}
            size="lg"
            variant="secondary"
          >
            Sair
          </Button>
        </div>
      </div>
    );
  }
}

export default General;
