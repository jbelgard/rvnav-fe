import React, { Component } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import './Auth.css';

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
      <div className="auth-wrapper">
        <button onClick={this.toggleLogin}>login</button>
        <button onClick={this.toggleRegister}>register</button>
        {this.state.login ? <Login /> : <Register />}
      </div>
    );
  }
}
