import React from 'react';
import { Button, Form } from 'react-bootstrap';

import Input from '../components/Input';
import * as storage from '../services/localStorage';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      registerButtonDisabled: false,
      password: '',
      user: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    storage.checkUsersDatabase();
  }

  componentDidUpdate(_oldState, newState) {
    const { password, user } = this.state;
    if (newState.password !== password || newState.user !== user) {
      this.handleChange();
    }
  }

  handleChange() {
    const { password, user } = this.state;
    this.setState({ registerButtonDisabled: user.length > 5 && password.length > 5 });
  }

  handleClick() {
    const { password, user } = this.state;
    if (storage.createUser(user, password)) {
      return this.props.history.push('/');
    } else alert('Usuário já cadastrado');
  }

  render() {
    return (
      <div className="login-frame">
        <div style={{ padding: '10px' }}>
          <Form>
            <Form.Group>
              <Form.Label>Usuário:</Form.Label>
              <Input
                className="form-control"
                onChange={ (e) => this.setState({ user: e.target.value }) }
                type="text"
                value={this.state.user} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha:</Form.Label>
              <Input
                className="form-control"
                onChange={ (e) => this.setState({ password: e.target.value })}
                type="password"
                value={this.state.password}
              />
            </Form.Group>
            <Form.Group>
              <Button
                block
                disabled={ !this.state.registerButtonDisabled }
                onClick={this.handleClick}
                variant="secondary"
              >
                Registrar
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
 }

 export default Register;
