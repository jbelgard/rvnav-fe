import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getVehicles } from "../../store/actions";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from '../nav/Nav';
import "./VehicleForm.css"


class Vehicles extends React.Component {
  constructor(){
    super()
    this.state = {
      ok: ''
    }
  }

  componentDidMount(){
    this. setState({
      ok: "hahahah"
    })
    this.props.getWalmarts();
  }

  render() {
    return(
      <div>
      {this.state.ok}
      {console.log("get", this.props.vehicles)}
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