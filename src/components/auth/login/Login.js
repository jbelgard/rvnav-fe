import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../store/actions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Auth.css';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  handleChange = event => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value
      }
    });
  };

  loginSubmit = (event) => {
    event.preventDefault();
    window.gtag("event", "login", {
      event_category: "access",
      event_label: "login"
    });
    return this.props
    .login(this.state.credentials)
      .then(res => {
        this.setState({
          username: '',
          password: ''
        });
        if (res) {
          this.props.history.push('/map');
        }
        // if (this.state.username.value == '') {
        //   window.alert('Please enter your username');
        //   this.state.username.focus();
        //   return false;
        // }
      
        // if (this.state.password.value == '') {
        //   window.alert('Please enter a valid password');
        //   this.state.password.focus();
        //   return false;
        // }
      })
      .catch(err => {
        console.log(err);
      });


  };

  

  render() {
    return (
      <div>
        <Form onSubmit={this.loginSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>

            <Form.Control
              type="string"
              name="username"
              placeholder="Username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
              required
            ></Form.Control>
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
              required
            ></Form.Control>
            <Button variant="warning" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //isLoggingIn:state.isLoggingIn
});

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(LoginForm)
);
