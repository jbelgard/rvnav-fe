import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      <div className="button-container">
        <Link to="/map">
          <Button variant="light">Use as guest</Button>
        </Link>
        <Link to="/auth">
          <Button variant="warning">Log in / Sign up</Button>
        </Link>
      </div>
      <div className="intro">
        <h1>RV Life</h1>
        <p>
          Welcome to RV Life. The app that helps you travel safely in you RV. We
          take into account factors like vehicle size and weight to give you the
          best route! And show points of interest along the way. Try our app
          today to get the best navigation for you and your vehicle.
        </p>
      </div>
      <Link to="/" className="about">
        <a>About the team</a>
      </Link>
    </div>
  );
};

export default LandingPage;
