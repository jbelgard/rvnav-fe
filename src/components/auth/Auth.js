import React, { Component } from 'react';
import Login from './login/Login';
import Register from './register/Register';

export default class Auth extends Component {
  state = {
    login: true
  };

  toggleLogin = () => {
    this.setState({ login: true });
  };
  toggleRegister = () => {
    this.setState({ login: false });
  };
  render() {
    return (
      <div>
        <button onClick={this.toggleLogin}>login</button>
        <button onClick={this.toggleRegister}>register</button>
        {this.state.login ? <Login /> : <Register />}
      </div>
    );
  }
}
