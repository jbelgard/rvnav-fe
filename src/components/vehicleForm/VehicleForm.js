import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { addVehicle } from "../../store/actions";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from '../nav/Nav';
import "./VehicleForm.css"

class VehicleForm extends React.Component {
  constructor() {
    super()
    this.state = {
      //these specifications are in their own object so that specifications can be sent direvtly to the BE
      //this is the object that will be sent to the BE
      specifications: {
      // height: 0, // value that gets sent to the backend, after combinining heightFeet and heightInches into one unit
       heightFeet: '', // value that stores the user entry of height in feet
       heightInches: '', // value that stores the user entry of height in inches
     //  width: 0, // these 3 width values follow the same structure as height
       widthFeet: '',
       widthInches: '',
    //   length: 0, // these 3 length values follow the same structure as height
       lengthFeet: '', 
       lengthInches: '',
       weight: '',  //this will be sent in pounds? check BE docs
       axel_count: '', //integer, unit implied
       class: '', //controlled input of one letter
       //created_at: '', //check BE for format, generate date with js
       dual_tires: false, //Bool, checkbox
       trailer: false,  //Bool, checkbox
      }
      // messages: {
      //   message: '',
      //   distanceMessage: '',
      //   widthMessage: '',
      //   lengthMessage: '',
      // }
    }
  }
  
  handleChange = (event) => {
    this.setState({
        specifications: {
          ...this.state.specifications,
          [event.target.name]: parseInt(event.target.value)         
        }
    })
  }
  handleCheck = (event) => {
    //const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
     specifications: {
      ...this.state.specifications,       
      [event.target.name]: event.target.checked
     }
    }) 
  }
  handleRadio = (event) => {
    //const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
     specifications: {
      ...this.state.specifications,       
      class: event.target.value
     }
    }) 
  }
  vehicleSubmit = (event) => {
    
    event.preventDefault();
    console.log("ahh");
    let height = this.combineDistanceUnits(this.state.specifications.heightInches, this.state.specifications.heightFeet);
    let width = this.combineDistanceUnits(this.state.specifications.widthInches, this.state.specifications.widthFeet);
    let length = this.combineDistanceUnits(this.state.specifications.lengthInches, this.state.specifications.lengthFeet);
    let weight =  this.state.specifications.weight;
    let axel_count = this.state.specifications.axel_count;
    let vehicle_class = this.state.specifications.class;
    let trailer = this.state.specifications.trailer;
    if(vehicle_class === "Trailer"){
      vehicle_class = "";
      trailer = true;
    }
    if(weight === ""){
      weight = 0;
    } 
    if(axel_count === ""){
      axel_count = 0;
    } 
    parseFloat(height);
    parseFloat(length);
    parseFloat(width);
    parseFloat(weight);
    parseInt(axel_count);
    let send = {
      height: height,
      width: width,
      length: length,
      weight: weight,
      axel_count: axel_count,
      vehicle_class: vehicle_class,
      trailer: trailer,
      dual_tires: this.state.specifications.dual_tires
    }

    return this.props.addVehicle(send);
  }



  combineDistanceUnits = (inchesIn, feetIn) => {
    let inches = inchesIn;
    let feet = feetIn;
    if(feet === ""){
      feet = 0;
    } if (inches === ""){
      inches = 0;
    }
    const inchesCombined = feet + (inches / 12);
    return inchesCombined;
  }

  render(){
    return(
      <div>
        
      <Form className="vehicle-form" onSubmit={this.vehicleSubmit}>
      <p className="vehicle-spec">Height</p>
        <div className="form-section">
        <Form.Group>
        <Form.Label>Feet</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="100"
            name='heightFeet'
            placeholder="0"
            value={this.state.specifications.heightFeet}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        <p className="plus">+</p>
        <Form.Group>
        <Form.Label>Inches</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="11"
            name='heightInches'
            placeholder="0"
            
            // this.state.specifications.heighInches === 0 ? undefined :
            value={ this.state.specifications.heightInches}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        </div>


        <p className="vehicle-spec">Width</p>
        <div className="form-section">
        <Form.Group>
          <Form.Label>Feet</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="100"
            name='widthFeet'
            placeholder="0"
            value={this.state.specifications.widthFeet}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        <p className="plus">+</p>
        <Form.Group>
        <Form.Label>Inches</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="11"
            name='widthInches'
            placeholder="0"
            value={this.state.specifications.widthInches}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        </div>


        <p className="vehicle-spec">Length</p>
        <div className="form-section">
        <Form.Group>
          <Form.Label>Feet</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="100"
            name='lengthFeet'
            placeholder="0"
            value={this.state.specifications.lengthFeet}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        <p className="plus">+</p>
        <Form.Group>
        <Form.Label>Inches</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="11"
            name='lengthInches'
            placeholder="0"
            value={this.state.specifications.lengthInches}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        </div>


        <p className="vehicle-spec">Weight</p>
        <div className="form-section">
        <Form.Group>
          <Form.Label>Pounds</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="99000"
            name='weight'
            placeholder="0"
            value={this.state.specifications.weight}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        </div>
        <p className="vehicle-spec">Axel Count</p>
        <div className="form-section">
        <Form.Group>
          <Form.Label>axels</Form.Label>
          <Form.Control        
            type="number"
            min="0"
            max="10"
            name='axel_count'
            placeholder="0"
            value={this.state.specifications.axel_count}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        </div>


        <p className="vehicle-spec">Class</p>
      <Form.Group className="class-radios">
      <Form.Check name="class"inline label="A" type="radio" id={`inline-text-1`} 
      value="A"
      checked={this.state.specifications.class === "A"} onChange={this.handleRadio}
      />
      <Form.Check name="class" inline label="B" type="radio" id={`inline-text-2`} 
      value="B"
      checked={this.state.specifications.class === "B"} onChange={this.handleRadio}
      />
      <Form.Check name="class" inline label="C" type="radio" id={`inline-text-2`} 
      value="C"
      checked={this.state.specifications.class === "C"} onChange={this.handleRadio}
      />
      <Form.Check name="class" inline label="Trailer" type="radio" 
            value="Trailer"
            checked={this.state.specifications.class === "Trailer"}
            onChange={this.handleRadio}
      id={`inline-text-2`} />
      </Form.Group>
      <a target="_blank" rel="noopener noreferrer" href="https://rvs.autotrader.com/articles/buying-a-recreational-vehicle-rv-classes-explained">What class of vehicle do I have?</a>

      <p className="vehicle-spec">Tires</p>
      <Form.Check 
      name="dual_tires" 
      type="checkbox"
      checked={this.state.specifications.dual_tires}
      onChange={this.handleCheck}
      label="I have a dual wheel vehicle" 
      id={`inline-text-2`} 
      />

      <Button type="submit" variant="warning" onClick={this.vehicleSubmit}>Submit</Button>
        </Form>

      </div>
    )
  }

}

const mapStateToProps = state => ({})

export default withRouter(connect(
  mapStateToProps, { addVehicle }
)(VehicleForm))