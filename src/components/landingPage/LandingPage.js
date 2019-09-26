import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import icon from "../../assets/img/rvnav.png";
import "./LandingPage.css";
import { connect } from "react-redux";
import { logout } from "../../store/actions";

class LandingPage extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div className="landing-page-wrapper">
        <div className="button-container">
          <Link to="/map" >
            <Button variant="light">Use as guest</Button>
          </Link>
          <Link to="/auth">
            <Button variant="warning">Login / Register</Button>
          </Link>
        </div>
        <div className="intro">
          <img className="intro-logo" src={icon} alt="logo" />
          <p>
            Welcome to RV Nav. The app that helps you travel safely in your RV.
            We take into account factors like vehicle size and weight to give
            you the best route! And show points of interest along the way. Try
            our app today to get the best navigation for you and your vehicle.
          </p>
        </div>
        <a href = "/aboutus.html" className="about" target = "_blank" rel = "noopener noreferrer nofollow">
          About the team
        </a>
      </div>
    );
  }
}
const mapStateToProps = state => {
return{
selected_id: state.selected_id,
vehicles: state.vehicles}
}

export default connect(
mapStateToProps, {logout}
)(LandingPage)
