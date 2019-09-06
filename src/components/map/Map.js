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
let Coordinates = [
      // {lat: -33.868303208030476, lng: 151.19651825636993},
      // {lat: -33.868286399999995, lng: 151.1964951},
      // {lat: -33.868286399999995, lng: 151.1964951},
      // {lat: -33.868225699999996, lng: 151.19641629999998},
      // {lat: -33.8681414, lng: 151.1963152},
      // {lat: -33.86807969999999, lng: 151.19625019999998},
      // {lat: -33.8678652, lng: 151.1960533},
      // {lat: -33.8677709, lng: 151.1959887},
      // {lat: -33.867654900000005, lng: 151.1959164},
      // {lat: -33.8674835, lng: 151.195817},
      // {lat: -33.867342699999995, lng: 151.19573219999998},
      // {lat: -33.8671457, lng: 151.1956274},
      // {lat: -33.866996799999995, lng: 151.1955593},
      // {lat: -33.8667006, lng: 151.1953711},
      // {lat: -33.866626100000005, lng: 151.195321},
      // {lat: -33.86660189999999, lng: 151.19527739999998},
      // {lat: -33.866583, lng: 151.19525099999998},
      // {lat: -33.8665662, lng: 151.1952325},
      // {lat: -33.8665395, lng: 151.1951841},
      // {lat: -33.866529770928025, lng: 151.19515915183553}
    ];

  axios
    .get('https://roads.googleapis.com/v1/snapToRoads?path=-35.27801,149.12958%7C-35.28032,149.12907%7C-35.28099,149.12929%7C-35.28144,149.12984%7C-35.28194,149.13003%7C-35.28282,149.12956%7C-35.28302,149.12881%7C-35.28473,149.12836&interpolate=true&key=AIzaSyC9SzPSjzdJI1IFN6VgeOMHH_ay0ePBTqM')
    .then(res => {
      // console.log('variable Coordinates',Coordinates)
      // console.log('res', res.data.snappedPoints.length)
    for(let i = 0; i < res.data.snappedPoints.length; i++ ) {
    // console.log('snapped lat',res.data.snappedPoints[i].location.latitude)
    // console.log('snapped lng',res.data.snappedPoints[i].location.longitude)
    let Coordinate = {lat: null, lng: null}
    Coordinate.lat = res.data.snappedPoints[i].location.latitude
    Coordinate.lng = res.data.snappedPoints[i].location.longitude
    // console.log('Coordinate', Coordinate)
    Coordinates[i] = Coordinate
    // console.log('Var Coordinates',Coordinates[i])
   }  
    })
    .catch(err => {
      console.log(err)
    })

    console.log('Var Coordinates', Coordinates)

    var polyPath = new window.google.maps.Polyline({
      path: Coordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    console.log(polyPath)
    polyPath.setMap(map);
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
      <NavLink className="logout-btn" to="/auth">{localStorage.token ? `Log Out` : `Login / Signup`}</NavLink>
      
     
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