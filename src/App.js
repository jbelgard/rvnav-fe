import React, { Component } from 'react';
import { getData } from "./actions/index.js";
import { connect } from "react-redux";
import './App.css';

import Login from './login/Login';
import Register from './register/Register';
//import axios from 'axios';

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.getData();
    // axios
    //   .get('https://labs15rvlife.herokuapp.com/api/v1')
    //   .then(({ data }) => {
    //     console.log(data);
    //     this.setState({ data });
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {console.log("data", this.props.data[0])}
          {this.props.data.map(obj => (
            <p>{obj.value.message}</p>
          ))}
        </header>
        <Login />
        <Register />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  }
};

export default connect(
  mapStateToProps,
  {getData}
)(App);
