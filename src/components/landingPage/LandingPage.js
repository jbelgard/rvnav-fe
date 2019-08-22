import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <Link to="/auth">login or register</Link>
      <Link to="/map">view map</Link>
    </div>
  );
};

export default LandingPage;
