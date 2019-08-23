import React, { Component } from 'react';
import { getData } from './store/actions/index.js';
import { connect } from 'react-redux';
import './App.css';
import { Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Map from './components/map/Map';
import LandingPage from './components/landingPage/LandingPage';
import Nav from './components/nav/Nav';
class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={LandingPage} />
        <Route path="/auth" component={Auth} />
        <Route path="/map" component={Map} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(
  mapStateToProps,
  { getData }
)(App);
