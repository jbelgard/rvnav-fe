import React, { Component } from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import "./Auth.css";
import { Link } from "react-router-dom";
import icon from "../../assets/img/rvnav.png";
import { connect } from "react-redux";
import { logout } from "../../store/actions";

class Auth extends Component {
  state = {
    login: true
  };


  componentDidMount() {
    this.props.logout();
  }

  toggleLogin = () => {
    this.setState({ login: true });
  };
  toggleRegister = () => {
    this.setState({ login: false });
  };
  render() {
    return (
      <>
        {/* <Nav /> */}
        <div className="auth-wrapper">
          <Link to="/" className="image-link">
              <img className="logo-image" src={icon} alt="logo" />
          </Link>
          <div className="form-wrapper">
            <div className="top-buttons">
              <p
                className={`form-toggle ${this.state.login && "active-tab"}`}
                onClick={this.toggleLogin}
              >
                Login
              </p>
              <p
                className={`form-toggle ${!this.state.login && "active-tab"}`}
                onClick={this.toggleRegister}
              >
                Register
              </p>
            </div>
            {this.state.login ? <Login /> : <Register />}
          </div>
          <Link to="/" className="about">
            About the team
          </Link>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  console.log("state in route form", state)
  return{
  selected_id: state.selected_id,
  vehicles: state.vehicles}
}

export default connect(
  mapStateToProps, {logout}
)(Auth)