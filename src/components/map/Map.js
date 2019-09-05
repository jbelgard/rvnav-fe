import React, { Component } from 'react'
import Location from '../location/location.js'
import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import RoutingForm from './routingForm';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "./Map.css"


class MapPage extends Component {
    constructor(props) {
      super(props);

      this.platform = null;
      this.map = null;

      this.state = {
          app_id: 'arvginqRfleoK8308SvJ',
          app_code: 'sFz75OkwERmUxkBGeUjepg',
          center: {
              lat: 33.150673,
              lng: -96.823608,
          },
          zoom: 7,
          theme: props.theme,
          style: props.style,
      }
  }


  toggleSidebar = ()=> {
    this.setState({ sidebarOpen: !this.state.sidebarOpen }) 
  }

  
  componentDidMount() {
    this.platform = new window.H.service.Platform(this.state);

    var layer = this.platform.createDefaultLayers();
    var container = document.getElementById('here-map');

    this.map = new window.H.Map(container, layer.normal.map, {
        center: this.state.center,
        zoom: this.state.zoom,
      })

    var events = new window.H.mapevents.MapEvents(this.map);
    // eslint-disable-next-line
    var behavior = new window.H.mapevents.Behavior(events);
    // eslint-disable-next-line
    var ui = new window.H.ui.UI.createDefault(this.map, layer)
}    

  render(){
  return (
    <div>
      {/* <Nav /> */}
      <div className="open-button-wrap">
      <i className="fas fa-arrow-circle-right" onClick = {this.toggleSidebar}   ></i>
      <NavLink className="logout-btn" to="/auth">{localStorage.token ? `Log Out` : `Login / Signup`}</NavLink>
      
     
      </div>
      <Sidebar 
      routeChangeHandler={this.routeChangeHandler} 
      onChangeHandler={this.onChangeHandler}
      initMap={this.initMap}
      start={this.state.start}
      end={this.state.end}
      toggleSidebar = {this.toggleSidebar} sidebarOpen = {this.state.sidebarOpen} />

      <div id="here-map" location={this.Location} style={{width: '100%', height: '400px', background: 'grey' }} />
      {/* <div id="map" ></div> */}
    </div>
  );
}
}


export default MapPage;