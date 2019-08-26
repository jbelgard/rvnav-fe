import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Map from './components/map/Map';
import LandingPage from './components/landingPage/LandingPage';
import VehicleForm from './components/vehicleForm/VehicleForm';

const App = () => {
  return (
    <div className="App">
      <Route path="/" exact component={LandingPage} />
      <Route path="/auth" component={Auth} />
      <Route path="/map" component={Map} />
      <Route path="/vehicle-form" component={VehicleForm} />
    </div>
  );
};

export default App;
