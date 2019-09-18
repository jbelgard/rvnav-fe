import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";

const RoutingForm = (props) => {
    let name = "no vehicle";
    props.vehicles.vehicles && props.vehicles.vehicles.map( e => {
      if(e.id === props.selected_id){
         name = e.name;
      }
    })
    return (
      <div>
        

        <>
        <div className="routing-with">
        <p>{`you are routing with `}</p>
        <span>{`${name}`}</span>
        </div>
        <form className="route-form" onSubmit={(event) => {
          event.preventDefault()
          props.onChangeHandler()
         
          }}>
        <Form.Control autoFocus={true} className="route-input" id="start" required type="text"  placeholder="Start" name="start" value={props.start} onChange={props.routeChangeHandler}/> 
        <Form.Control className="route-input" id="end" required type="text"  placeholder="end" name="end" value={props.end} onChange={props.routeChangeHandler}/> 
        <Button variant="warning" id="route-button" type="submit"> Plot Course</Button>
        </form>
        </>
        {props.loading === true ? <p className="route-loading">Loading...</p> : null }
      </div>
    )
}

const mapStateToProps = state => {
  console.log("state in route form", state)
  return{selected_id: state.selected_id,
  vehicles: state.vehicles}
}

export default connect(
  mapStateToProps
)(RoutingForm)
