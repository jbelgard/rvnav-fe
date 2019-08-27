import React, { Component } from 'react'
import './sidebar.css';

export class Sidebar extends Component {
    render() {
        console.log(this.props);
        return (
            <div id = 'overlayNav' className = {`overlay ${this.props.sidebarOpen ? 'open': 'close'}`}>
                <button className = 'closebtn' onClick = {this.props.toggleSidebar}>&times;</button>
                <div className = 'overlay-content'>
                    <div>
                        <p>Hello World!</p>
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