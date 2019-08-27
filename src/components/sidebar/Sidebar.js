import React, { Component } from 'react'
import './sidebar.css';

export class Sidebar extends Component {
    render() {
        return (
            <div id = 'overlayNav' class = 'overlay'>
                <a href = 'javascript:void(0)' class = 'closebtn' onclick = 'closeNav()'>&times;</a>
                <div class = 'overlay-content'>
                    {/* // here goes the form from blake */}
                </div>    
                <div id = 'mainsidebar'>
                    <button class = 'openbtn' onclick = 'openNav()'>Options</button>
                    {/* // button to bring out sidebar */}
                </div>            
            </div>            
        )        
        function openNav() {
            document.getElementById('overlayNav').style.width = '25%';
        }
        function closeNav() {
            document.getElementById('overlayNav').style.width = '0%';
        }
    }
}

export default Sidebar