import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MapPage from "./Map.js";

const RoutingForm = (props) => {

    return (
      <div>
        <form className="route-form" onSubmit={(event) => {
          event.preventDefault()
          props.onChangeHandler()
          }}>
        <Form.Control className="route-input" id="start" required type="text" placeholder="Start" name="start" value={props.start} onChange={props.routeChangeHandler}/> 
        <Form.Control className="route-input" id="end" required type="text" placeholder="end" name="end" value={props.end} onChange={props.routeChangeHandler}/> 
        <Button variant="warning" id="route-button" type="submit"> Plot Course</Button>
        </form>
      </div>
    )
}




export default RoutingForm;
