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
      // .then(res => {    
      //   if(res && this.props.vehicles.vehicles ){
          
      //    }  
      // })
  }
  // componentDidUpdate(prevProps){
  //   if(prevProps.vehicles.vehicles && prevProps.vehicles.vehicles.length != this.props.vehicles.vehicles.length){
  //     this.props.selectVehicle(this.props.vehicles.vehicles[0].id);   
  //   }
  // }

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
  deselect = () => {
    this.props.selectVehicle(null);
  }

  render() {
    console.log("getVEHICLE", this.props.vehicles)
    return(
      <div >
      {this.props.vehicles.vehicles && this.props.vehicles.vehicles.map( e => {
        //console.log("vehicle e", e)
        return(
        <div className={`vehicle-tabs ${e.id === this.props.selected_id && `highlight`}`}>
        {e.id === this.props.selected_id ? <> <p className="select-text">selected for routing</p> <Button className="select-btn" variant="warning" onClick={() => {this.deselect(e.id)}}>deselect</Button> </>: <Button className="select-btn" variant="warning" onClick={() => {this.selected(e.id)}}>select</Button>}
        
        
        
        <div className="vehicle-txt">
        <p className="vehicle-information">Vehicle Information</p>
        <p className="vehicle-name">name - {e.name}</p>
        <p className="vehicle-name">{e.height > 0 ? `height - ${e.height} feet` : null}</p>
        <p className="vehicle-name">{e.width > 0 ? `width - ${e.width} feet` : null}</p>
        <p className="vehicle-name">{e.length > 0 ? `length - ${e.length} feet` : null}</p>
        <p className="vehicle-name"> {e.weight > 0 ? `weight - ${e.weight} pounds` : null}</p>
        <p className="vehicle-name"> {e.vehicle_class !== "" ? `class - ${e.vehicle_class}` : null}</p>
        <p className="vehicle-name"> {e.dual_tires === true ? `tires - dually` : null}</p>
        <p className="vehicle-name"> {e.axel_count > 0 ? `axels - ${e.axel_count}` : null}</p>
        </div>
        <div className="edit-delete">
        <Button className="vehicle-btn" onClick={() => {this.props.deleteVehicles(e.id)}} variant="warning">Delete</Button>
        <Button className="vehicle-btn" onClick={() => {
            this.editVehicleToggle(e.id);
        }} variant="warning">Update</Button>
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