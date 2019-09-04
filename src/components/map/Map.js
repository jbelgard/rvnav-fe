import React, { Component } from 'react';
import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import RoutingForm from './routingForm';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "./Map.css"


class MapPage extends Component {
  constructor(){
    super()
    this.state = {
      start: '',
      end: '',
      sidebarOpen: false,
      directionsService: {},
      directionsDisplay: {}
    }
  }

  componentDidMount() {
    console.log("local storage token", localStorage);
    this.setState({ sidebarOpen: !this.state.sidebarOpen }) 
    this.renderMap()
    this.walmart()
  }

  walmart = () => {
    var coords = {
      latitude: 41.839344, 
      longitude: -87.65784,
      distance: 6
    }
    return axios.post("http://eb-flask-rv-dev.us-east-1.elasticbeanstalk.com/fetch_walmart", coords)
      .then(res => {
        
        let mart = {
          lat: res.data[0].Latitude,
          lng: res.data[0].Longitude
        }
  
        this.initMap(mart)
      })
      .catch(err => {
        console.log(err);
      })

  }
  toggleSidebar = ()=> {
    this.setState({ sidebarOpen: !this.state.sidebarOpen }) 
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP}&callback=initMap`)
    window.initMap = this.initMap
  }

  calculateAndDisplayRoute = (directionsS, directionsD) => {
    directionsS.route({
      origin: this.state.start,
      destination: this.state.end,
      travelMode: 'DRIVING'
    }, function(response, status) {
        if(status === 'OK') {
          directionsD.setDirections(response)
        } else {
          window.alert('Directions request failed due to' + status)
        }

    })
  }

  initMap = (mart) => {
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

      this.setState({
        directionsService,
        directionsDisplay 
      })


    directionsDisplay.setMap(map)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //marker for users location
        new window.google.maps.Marker({map:map, position: pos});
        //new window.google.maps.Marker({map:map, position: mart});
        map.setCenter(pos);
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Error finding location")
    }
    this.onChangeHandler();
    
    document.querySelector('form').addEventListener('submit', this.onChangeHandler)
  }
  routeChangeHandler = (e) => {
   this.setState({
     [e.target.name]: e.target.value
    })
  }

  onChangeHandler = () => {
    // e.preventDefault()
    if(this.state.start.length > 0){
      this.calculateAndDisplayRoute(this.state.directionsService, this.state.directionsDisplay)
    }
    
  }
  render(){
  return (
    <div>
      {/* <Nav /> */}
      <div className="open-button-wrap">
      <i className="fas fa-arrow-circle-right" onClick = {this.toggleSidebar}   ></i>
      <NavLink className="logout-btn" to="/">{localStorage.token ? `Log Out` : `Login / Signup`}</NavLink>
      
     
      </div>
      <Sidebar 
      routeChangeHandler={this.routeChangeHandler} 
      onChangeHandler={this.onChangeHandler}
      initMap={this.initMap}
      start={this.state.start}
      end={this.state.end}
      toggleSidebar = {this.toggleSidebar} sidebarOpen = {this.state.sidebarOpen} />
      

      <div id="map" ></div>
    </div>
  );
}
}

function loadScript(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  
}

export default MapPage;