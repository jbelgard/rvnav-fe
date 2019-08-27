import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { vehicleData } from "../../store/actions";
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
       axle_count: '', //integer, unit implied
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

  componentDidMount(){

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
    let weight = this.state.specifications.weight;
    let axle_count = this.state.specifications.axle_count;
    let vehicle_class = this.state.specifications.class;
    let trailer = this.state.specifications.trailer;
    if(vehicle_class === "Trailer"){
      vehicle_class = "";
      trailer = true;
    }
    console.log("h", height);
    console.log("w", width);
    console.log("l", length);
 
    parseFloat(height);
    parseFloat(length);
    parseFloat(width);
    parseFloat(weight);
    parseInt(axle_count);
    let send = {
      height: height,
      width: width,
      length: length,
      weight: weight,
      axle_count: axle_count,
      vehicle_class: vehicle_class,
      trailer: trailer,
      dual_tires: this.state.specifications.dual_tires
    }
    console.log("send object", send);

    return this.props.vehicleData()
  }



  inputCheck = (input) => {

    this.feetCheck(input);

  }

  stateDoer = () => {
    
    this.setState({
      specifications: {
        ...this.state.specifications,
        
   
      }
      })
 
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

  feetCheck = (input) => {
    const inputNumerical = parseInt(input);
    if(isNaN(input) === true){
      return false;
    } else if(inputNumerical < 0 || inputNumerical > 255) {
      return false;
    } else {
      return true;
    }
  }

  render(){
    return(
      <div>
        <Nav />
      {/* <div className="vehicle-form-wrap"> */}
      <Form className="vehicle-form" onSubmit={this.vehicleSubmit}>
      <p className="vehicle-spec">Height</p>
        <div className="form-section">
        <Form.Group>
        <Form.Label>Feet</Form.Label>
          <Form.Control        
            type="number"
            name='heightFeet'
            
            // this.state.specifications.heightFeet === 0 ? undefined : 
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
            name='heightInches'
            
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
            name='widthFeet'
            placeholder="8"
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
            name='widthInches'
            placeholder="11"
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
            name='lengthFeet'
            placeholder="25"
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
            name='lengthInches'
            placeholder="8"
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
            name='weight'
            placeholder="5000"
            value={this.state.specifications.weight}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        </div>
        <p className="vehicle-spec">Axle Count</p>
        <div className="form-section">
        <Form.Group>
          <Form.Label>Axles</Form.Label>
          <Form.Control        
            type="number"
            name='axle_count'
            placeholder="2"
            value={this.state.specifications.axle_count}
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
{/*         
      </div> */}

      </div>
    )
  }

}

const mapStateToProps = state => ({
  //isLoggingIn:state.isLoggingIn
})

export default withRouter(connect(
  mapStateToProps, {  }
)(VehicleForm))