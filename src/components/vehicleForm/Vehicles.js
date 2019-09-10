import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getVehicles } from "../../store/actions";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from '../nav/Nav';
import "./Vehicles.css"


class Vehicles extends React.Component {

  componentDidMount(){
    this.props.getVehicles();
  }

  render() {
    // console.log("get", this.props.vehicles[0] && this.props.vehicles[0].vehicles[0].name)
    return(
      <div>
      {this.props.vehicles[0] && this.props.vehicles[0].vehicles.map( e => (
        <div className="vehicle-tabs">
        <p className="vehicle-name">{e.name}</p>
        <p className="expand-vehicle-icon">+</p>
        </div>
      ))}
      {}
      
      </div>
    )
  }
}

const mapStateToProps = state => ({
  vehicles: state.vehicles
})

export default withRouter(connect(
  mapStateToProps, { getVehicles }
)(Vehicles))