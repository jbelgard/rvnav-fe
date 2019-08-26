import React from 'react';

import { connect } from 'react-redux';
import { register, login } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import '../Auth.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: '',
        first_name: '',
        last_name: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  registerSubmit = e => {
    e.preventDefault();
    window.gtag("event", "register", {
      event_category: "access",
      event_label: "register"
    });
    console.log("creds", this.state.credentials);
    this.props.register(this.state.credentials)
      .then(res => {
        if (res) {
          this.props
            .login({
              username: this.state.credentials.username,
              password: this.state.credentials.password
            })
            .then(res => {
              this.setState({
                username: '',
                password: '',
                first_name: '',
                last_name: ''
              });
              if (res) {
                this.props.history.push('/map');
              }
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="RVman4000"
              type="string"
              value={this.state.credentials.username}
              onChange={this.handleChange}
              required
            ></Form.Control>
            <Form.Label>First Name</Form.Label>

            <Form.Control
              name="first_name"
              placeholder="Jim"
              type="string"
              value={this.state.credentials.first_name}
              onChange={this.handleChange}
              required
            ></Form.Control>
            <Form.Label>Last Name</Form.Label>

            <Form.Control
              name="last_name"
              placeholder="Smith"
              type="string"
              value={this.state.credentials.last_name}
              onChange={this.handleChange}
              required
            ></Form.Control>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="1egdhuy!!%^kjhd"
              value={this.state.credentials.password}
              onChange={this.handleChange}
              required
            ></Form.Control>
            <Button
              variant="warning"
              onClick={this.registerSubmit}
              type="submit"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { register, login }
  )(RegisterForm)
);
