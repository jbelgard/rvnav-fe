import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      <h1>RV Life</h1>
      <Link to="/auth">
        <Button variant="warning">Log in / Sign up</Button>
      </Link>
      <Link to="/map">
        <Button variant="light">Pick Route</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
