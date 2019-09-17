import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getVehicles, deleteVehicles } from "../../store/actions";
import { selectVehicle } from "../../store/actions/selectVehicle.js";
import VehicleForm from "./VehicleForm";
import Button from 'react-bootstrap/Button';
import "./Vehicles.css"


class Vehicles extends React.Component {
  state = {
    id: null,
    editing: false
  }

  componentDidMount(){
    this.props.getVehicles()
      .then(res => {
          this.props.selectVehicle(this.props.vehicles.vehicles[0].id);
      })
    
    
  }

  editVehicleToggle = (id) => {
    this.setState({
      id,
      editing: !this.state.editing
    })
  }
  clearForm = () => {
    this.setState({
      id: null, 
      editing: false
    })
  }
  selected = (id) => {
    this.props.selectVehicle(id);
  }

  render() {
    // console.log("getVEHICLE", this.props.vehicles.vehicles && this.props.vehicles.vehicles[0])
    return(
      <div >
      {this.props.vehicles.vehicles && this.props.vehicles.vehicles.map( e => {
        //console.log("vehicle e", e)
        return(
        <div className={`vehicle-tabs ${e.id === this.props.selected_id && `highlight`}`}>
        {e.id === this.props.selected_id ? <p className="highlighted">selected for routing</p> : <Button variant="warning" onClick={() => {this.selected(e.id)}}>select</Button>}
        
        
        <p>Vehicle Information</p>
        <div>
        <p className="vehicle-name">name: {e.name}</p>
        <p className="vehicle-name">height: {e.height}</p>
        <p className="vehicle-name">id: {e.id}</p>
        <Button onClick={() => {this.props.deleteVehicles(e.id)}} variant="warning">del</Button>
        <Button onClick={() => {
            this.editVehicleToggle(e.id);
          }} variant="warning">update</Button>
        <p className="expand-vehicle-icon">+</p>
        </div>
            {this.state.editing && this.state.id === e.id && <VehicleForm currentVehicle={e} id={this.state.id} clearForm={this.clearForm} editing={this.state.editing} editVehicleToggle={this.editVehicleToggle}/>}
        </div>
      )}
      )}
      
      </div>
    )
  }
}

const mapStateToProps = state => ({
  vehicles: state.vehicles,
  selected_id: state.selected_id
})

export default withRouter(connect(
  mapStateToProps, { getVehicles, deleteVehicles, selectVehicle }
)(Vehicles))