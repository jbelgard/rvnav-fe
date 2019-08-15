import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios
      .get('https://labs15rvlife.herokuapp.com/api/v1')
      .then(({ data }) => {
        console.log(data);
        this.setState({ data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.data.message}</p>
        </header>
      </div>
    );
  }
}

export default App;
