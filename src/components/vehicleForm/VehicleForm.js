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
      //these inputs are in their own object so that specifications can be sent direvtly to the BE
      inputs: {
        heightFeet: '', // value that stores the user entry of height in feet
        heightInches: '', // value that stores the user entry of height in inches
        widthFeet: '',
        widthInches: '',
        lengthFeet: '', 
        lengthInches: '',
      },
      //this is the object that will be sent to the BE
      specifications: {
       height: 0, // value that gets sent to the backend, after combinining heightFeet and heightInches into one unit
       width: 0, // these 3 width values follow the same structure as height
       length: 0, // these 3 length values follow the same structure as height
       weight: '',  //this will be sent in pounds? check BE docs
       axle_count: '', //integer, unit implied
       class: '', //controlled input of one letter
       //created_at: '', //check BE for format, generate date with js
       dual_tires: false, //Bool, checkbox
       trailer: false,  //Bool, checkbox
      },
      messages: {
        message: '',
        distanceMessage: '',
        widthMessage: '',
        lengthMessage: '',
      }
    }
  }

  componentDidMount(){

  }
  
  handleChange = (event) => {
    this.setState({
        inputs: {
            ...this.state.inputs,
            [event.target.name]: event.target.value
        }, 
        specifications: {
          ...this.state.specifications,
          [event.target.name]: event.target.value          
        }
    })
  }
  
  vehicleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      specifications: {
        height: this.combineDistanceUnits(this.state.inputs.heightInches, this.state.inputs.heightFeet),
        width: this.combineDistanceUnits(this.state.inputs.widthInches, this.state.inputs.widthFeet),
        length: this.combineDistanceUnits(this.state.inputs.lengthInches, this.state.inputs.lengthFeet)
   
      }
        })
    // this.state.specifications.
    // this.state.specifications.
    // this.state.specifications.
      
      console.log("spec object", this.state.specifications);
  }

  inputCheck = (input) => {

    this.feetCheck(input);

  }

  combineDistanceUnits = (inchesEntry, feetEntry) => {
    parseInt(inchesEntry);
    parseInt(feetEntry);
    const inchesCombined = inchesEntry + (feetEntry*12);
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
      <Form className="vehicle-form">
      <p className="vehicle-spec">Height</p>
        <div className="form-section">
        <Form.Group>
        <Form.Label>Feet</Form.Label>
          <Form.Control        
            type="string"
            name='heightFeet'
            placeholder="13"
            value={this.state.inputs.heightFeet}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        <p className="plus">+</p>
        <Form.Group>
        <Form.Label>Inches</Form.Label>
          <Form.Control        
            type="string"
            name='heightInches'
            placeholder="7"
            value={this.state.inputs.heightInches}
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
            type="string"
            name='widthFeet'
            placeholder="8"
            value={this.state.inputs.widthFeet}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        <p className="plus">+</p>
        <Form.Group>
        <Form.Label>Inches</Form.Label>
          <Form.Control        
            type="string"
            name='widthInches'
            placeholder="11"
            value={this.state.inputs.widthInches}
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
            type="string"
            name='lengthFeet'
            placeholder="25"
            value={this.state.inputs.lengthFeet}
            onChange={this.handleChange}
            required>
        </Form.Control>
        </Form.Group>
        <p className="plus">+</p>
        <Form.Group>
        <Form.Label>Inches</Form.Label>
          <Form.Control        
            type="string"
            name='lengthInches'
            placeholder="8"
            value={this.state.inputs.lengthInches}
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
            type="string"
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
            type="string"
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
      <Form.Check name="class"inline label="A" type="radio" id={`inline-text-1`} />
      <Form.Check name="class" inline label="B" type="radio" id={`inline-text-2`} />
      <Form.Check name="class"inline label="C" type="radio" id={`inline-text-2`} />
      <Form.Check name="class" inline label="Trailer" type="radio" id={`inline-text-2`} />
      </Form.Group>
      <a target="_blank" rel="noopener noreferrer" href="https://rvs.autotrader.com/articles/buying-a-recreational-vehicle-rv-classes-explained">What class of vehicle do I have?</a>

      <p className="vehicle-spec">Tires</p>
      <Form.Check name="dual_tires" label="I have a dual wheel vehicle"  id={`inline-text-2`} />

      <Button variant="warning" onClick={this.vehicleSubmit}>Submit</Button>
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