import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import VehicleForm from '../vehicleForm/VehicleForm';
import './sidebar.css';

export class Sidebar extends Component {
    state = {
        vehicleFormOpen: false,

    }
    toggleVehicleForm = () => {
        this.setState({
            vehicleFormOpen: !this.state.vehicleFormOpen
        })
    }
    render() {
        console.log(this.props);
        return (
            <div id = 'overlayNav' className = {`overlay ${this.props.sidebarOpen ? 'open': 'close'}`}>
                <button className = 'closebtn' onClick = {this.props.toggleSidebar}>&times;</button>
                <div className = 'overlay-content'>
                    <div>
                        <p>Hello World!</p>
                        <button onClick={this.toggleVehicleForm}>vehicle form</button>
                        {this.state.vehicleFormOpen && <VehicleForm/>}
                        {/* <Route path="/vehicle-form" component={VehicleForm} /> */}
                        <NavLink exact to="/vehicle-form" style={{ marginRight: 10 }}>
                        Vehicle Form
                        </NavLink>
                    </div>
                </div>    
                <div id = 'mainsidebar'>
                    {/* <button className = 'openbtn' onClick = {this.props.toggleSidebar}>Options</button> */}
                    {/* // button to bring out sidebar */}
                </div>            
            </div>            
        )        
    }
}

export default Sidebar