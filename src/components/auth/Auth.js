import React, { Component } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import './Auth.css';
import Nav from '../nav/Nav';
import Button from 'react-bootstrap/Button';

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
      <>
        <Nav />
        <div className="auth-wrapper">
          <div className="form-wrapper">
          <div className="top-buttons">
          <p
          className={`form-toggle ${this.state.login && "active-tab"}`}
          onClick={this.toggleLogin}>Login</p>
          <p 
          className={`form-toggle ${!this.state.login && "active-tab"}`}
          
          onClick={this.toggleRegister}>Register</p>
          </div>
          {this.state.login ? <Login /> : <Register />}
          </div>
        </div>
      </>
    );
  }
}
