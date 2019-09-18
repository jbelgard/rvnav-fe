import React, { Component } from "react";

import { connect } from "react-redux";
import { register, login } from "../../../store/actions";
import { withRouter } from "react-router-dom";
import "../Auth.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/* eslint-disable no-useless-escape */
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        errors: {
          username: "",
          first_name: "",
          last_name: "",
          password: "",
          email: ""
        }
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.credentials.errors;

    switch (name) {
      case "username":
        errors.username =
          value.length < 5
            ? "Username must be at least 5 characters long!"
            : "";
        break;

      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;

      case "first_name":
        errors.first_name =
          value.length < 0 ? "First name must be 2 characters long!" : "";
        break;

      case "last_name":
        errors.last_name =
          value.length < 0 ? "Last name must be 2 characters long!" : "";
        break;

      case "password":
        errors.password =
          value.length < 8
            ? "Password must be at least 8 characters long!"
            : "";
        break;
      default:
        break;
    }

    this.setState({
      credentials: { ...this.state.credentials, errors, [name]: value }
    });
  };

  registerSubmit = e => {
    e.preventDefault();
    window.gtag("event", "register", {
      event_category: "access",
      event_label: "register"
    });
    if (validateForm(this.state.credentials.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
    console.log("creds", this.state.credentials);
    this.props
      .register({
        username: this.state.credentials.username,
        password: this.state.credentials.password,
        email: this.state.credentials.email,
        first_name: this.state.credentials.first_name,
        last_name: this.state.credentials.last_name
      })
      .then(res => {
        if (res) {
          this.props
            .login({
              username: this.state.credentials.username,
              password: this.state.credentials.password
            })
            .then(res => {
              this.setState({
                credentials: {
                  username: "",
                  password: "",
                  first_name: "",
                  last_name: ""
                }
              });
              if (res) {
                this.props.history.push("/map");
              }
            });
        }
      })
      .catch(err => {
        console.log("register err", err);
      });
  };

  //   registerSubmit = e => {
  //     e.preventDefault();
  //     if (validateForm(this.state.credentials.errors)) {
  //       console.info('Valid Form')
  //     } else {
  //       console.error('Invalid Form')
  //     }
  // }

  render() {
    const { errors } = this.state.credentials;
    // const isEnabled = this.state.credentials.username.length >= 5 && this.state.credentials.email.length > 2 && this.state.credentials.password.length >= 8;
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Username*</Form.Label>
            <Form.Control
              name="username"
              placeholder="Username"
              type="string"
              value={this.state.credentials.username}
              onChange={this.handleChange}
              noValidate
            ></Form.Control>
            {errors.username.length > 0 && (
              <p className="error">{errors.username}</p>
            )}

            <Form.Label>First Name (Optional)</Form.Label>
            <Form.Control
              name="first_name"
              placeholder="First name"
              type="string"
              value={this.state.credentials.first_name}
              onChange={this.handleChange}
            ></Form.Control>

            <Form.Label>Last Name (Optional)</Form.Label>
            <Form.Control
              name="last_name"
              placeholder="Last name"
              type="string"
              value={this.state.credentials.last_name}
              onChange={this.handleChange}
            ></Form.Control>

            <Form.Label>Email*</Form.Label>
            <Form.Control
              name="email"
              placeholder="Email"
              type="email"
              value={this.state.credentials.email}
              onChange={this.handleChange}
              noValidate
            ></Form.Control>
            {errors.email.length > 0 && <p className="error">{errors.email}</p>}

            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
              noValidate
            ></Form.Control>
            {errors.password.length > 0 && (
              <p className="error">{errors.password}</p>
            )}

            <div className="info">
              <small>* Required</small>
            </div>

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
