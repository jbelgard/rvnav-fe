import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MapPage from "./Map.js";


export class RoutingForm extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  componentDidMount() {
    console.log("route form props", this.props);
  }
    

  render() {
    return (
      <div>
        <form className="route-form" onSubmit={(event) => {
          event.preventDefault()
          this.props.onChangeHandler()
          }}>
        <Form.Control className="route-input" id="start" required type="text" placeholder="Start" name="start" value={this.props.start} onChange={this.props.routeChangeHandler}/> 
        <Form.Control className="route-input" id="end" required type="text" placeholder="end" name="end" value={this.props.end} onChange={this.props.routeChangeHandler}/> 
        <Button variant="warning" id="route-button" type="submit"> Plot Course</Button>
        </form>
      </div>
    )
  }
}




export default RoutingForm;
