import React from 'react';
import { Button } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <div className="home-frame">
        <div style={{ padding: '10px' }}>
          <Button
            block
            onClick={() => this.props.history.push('/login')}
            size="lg"
            variant="secondary"
          >
            Login
          </Button>{' '}
          <Button
            block
            onClick={() => this.props.history.push('/register')}
            size="lg"
            variant="secondary"
          >
            Registrar
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
