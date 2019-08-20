import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        email: "",
        name: '',
        password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              autoFocus
              type="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="username">
            <FormLabel>Username</FormLabel>
            <FormControl
              value={this.state.username}
              onChange={this.handleChange}
              type="username"
            />
          </FormGroup>
          <FormGroup controlId="email">
            <FormLabel>E-Mail</FormLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
