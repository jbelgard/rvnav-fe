import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { addVehicle } from "../../store/actions";
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
  }

  render() {
    return(
      <div>{this.state.ok}</div>
    )
  }
}

const mapStateToProps = state => ({})

export default withRouter(connect(
  mapStateToProps, { /*getVehicles*/ }
)(Vehicles))