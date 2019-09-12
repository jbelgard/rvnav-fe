import React, { Component } from 'react';
import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import RoutingForm from './routingForm';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { getVehicles } from "../../store/actions";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import "./Map.css"
class MapPage extends Component {
  constructor() {
    super()
    this.state = {
      start: '',
      end: '',
      sidebarOpen: false,
      directionsService: {},
      directionsDisplay: {},
      Coordinates: [],
      polygonsArray: [],
      startCoord: null,
      endCoord: null
    }
  }
  
  componentDidMount() {
    // console.log("local storage token", localStorage);
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
    this.renderMap()
    this.props.getVehicles()
  }

  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP}&callback=initMap`)
    window.initMap = this.initMap
  }

  initMap = (mart) => {
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
   
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.0522, lng: -118.2437},
      zoom: 8
    });
    
 
    this.setState({
      directionsService,
      directionsDisplay
    })
    directionsDisplay.setMap(map)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //marker for users location
        new window.google.maps.Marker({ map: map, position: pos });
        //new window.google.maps.Marker({map:map, position: mart});
        map.setCenter(pos);
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Error finding location")
    }
    // this.onChangeHandler(e);
    document.querySelector('form').addEventListener('submit', this.onChangeHandler)
   
  }

  initRoute = () => {
    let barriersArray = this.state.polygonsArray
    console.log('barriers array',barriersArray)
    let formData = new FormData();
    formData.append('f', 'json');
    formData.append('token', process.env.REACT_APP_ARC_KEY);
    formData.append('stops',
      JSON.stringify({
        "type": "features",
        "features": [
          this.state.startCoord,
          this.state.endCoord
        ]
      }));
    formData.append("polygonBarriers", JSON.stringify(
      {
        "features": [{
          "geometry": {
            "rings": barriersArray
          },
          "attributes": {
            "Name": "Bridge",
            "BarrierType": 0
          }
        }
        ]
      }
    ))
    formData.append('findBestSequence', true);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    console.log('HEIGHT',this.props.vehicles.vehicles[0].height)
    let bridgePost = { //sends low bridges a long a route
      "height": this.props.vehicles.vehicles[0].height,
      "start_lon": parseFloat(this.state.startCoord.geometry.x.toFixed(4)),
      "start_lat": parseFloat(this.state.startCoord.geometry.y.toFixed(4)),
      "end_lon": parseFloat(this.state.endCoord.geometry.x.toFixed(4)),
      "end_lat": parseFloat(this.state.endCoord.geometry.y.toFixed(4))
    }
    let placesSend = { //send places of interest for a point
      "latitude": 35.2271,
      "longitude": -80.8431,
      "distance": 5 //miles
    }
    
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: parseFloat(this.state.startCoord.geometry.y.toFixed(4)), lng: parseFloat(this.state.startCoord.geometry.x.toFixed(4)) },
      zoom: 5
    });

      let makePolygon = (latitude, longitude) => {
      //create and display the point we are recieving from data low clearance api
      let midPoint = {lat: latitude, lng: longitude}
      new window.google.maps.Marker({
        map: map,
        label: 'm', //labeled m for midpoint
        position: midPoint
      })   

      //create and display polygon we will block driver from passing through
      let displayPoly = [];
      displayPoly[0] = {lat: latitude + .0002, lng: longitude};
      displayPoly[1] = {lat: latitude - .0002, lng: longitude};
      displayPoly[2] = {lat: latitude, lng: longitude + .0002};
        for(let i = 0; i < 3; i++){
          new window.google.maps.Marker({
            map: map,
            label: 'p', //labeled p for point
            position: displayPoly[i]
            
        })
      }
      //create polygon to send to routing API, is different from display poly due to formatting differences in google and ARc apis
      let polygon = []
      polygon[0] = [longitude, latitude + .0002]
      polygon[1] = [longitude,latitude - .0002];
      polygon[2] = [longitude + .0002, latitude];
      return polygon;
    }

    axios.post("https://rv-nav-clearance.com/fetch_low_clearance", bridgePost)
      .then(res => {
        navigator.geolocation.getCurrentPosition( (position)  => {
          
         
          console.log("res clearance", res.data)
         
          
          for(let j = 0; j < res.data.length; j++){
            this.state.polygonsArray[j] = makePolygon(res.data[j].latitude, res.data[j].longitude);
          }
            console.log('POLY array',this.state.polygonsArray)
         
        });
      })
      .catch(err => {
        console.log(err);
      })
    axios.post("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve", formData, config)
      .then(res => {
        console.log("arc res", res.data)
        var hereCoord = "";  
        console.log('res data features',res.data.routes.features[0].geometry.paths[0][0][0])
        for (let i = 0; i < res.data.routes.features[0].geometry.paths[0].length; i++) {
          var lng = res.data.routes.features[0].geometry.paths[0][i][0];
          var lat = res.data.routes.features[0].geometry.paths[0][i][1];
          parseFloat(lat);
          parseFloat(lng);
          let Coordinate = { lat: null, lng: null }
          Coordinate.lat = lat;
          Coordinate.lng = lng;
          this.state.Coordinates[i] = Coordinate;
        }
        console.log("coords array after loop", this.state.Coordinates);
      
       
        var polyPath = new window.google.maps.Polyline({
          path: this.state.Coordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 4
        });
        polyPath.setMap(map);
      })
      .catch(err => {
        console.log(err);
      })


  }


  routeChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeHandler = (e) => { 
    // e.preventDefault()
    axios
    .get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${this.state.start}&outFields=Match_addr,Addr_type`)
    .then(res => {
      console.log('RES',res)
      this.state.startCoord = {
        "geometry": {
        "x": res.data.candidates[0].location.x,
        "y": res.data.candidates[0].location.y,
        "spatialReference": {
          "wkid": res.data.spatialReference.wkid
        }
      },
      "attributes": {
        "Name": res.data.candidates[0].address
      }
    }
    this.initRoute()
    })
    .catch(err => {
      console.log(err)
    })

    axios
    .get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${this.state.end}&outFields=Match_addr,Addr_type`)
    .then(res => {
      console.log('RES GEOCODE END',res)
      this.state.endCoord = {
        "geometry": {
        "x": res.data.candidates[0].location.x,
        "y": res.data.candidates[0].location.y,
        "spatialReference": {
          "wkid": res.data.spatialReference.wkid
        }
      },
      "attributes": {
        "Name": res.data.candidates[0].address
      }
    }
    this.initRoute()
    })
    .catch(err => {
      console.log(err)
    })
   
    // if (this.state.start.length > 0) {
    //   this.calculateAndDisplayRoute(this.state.directionsService, this.state.directionsDisplay)
    // }
  }

  render() {
    return (
      <div>
        {/* <Nav /> */}
        <div className="open-button-wrap">
          <i className="fas fa-arrow-circle-right" onClick={this.toggleSidebar}   ></i>
          <NavLink className="logout-btn" to="/">{localStorage.token ? `Log Out` : `Login / Signup`}</NavLink>
        </div>
        <Sidebar
          routeChangeHandler={this.routeChangeHandler}
          onChangeHandler={this.onChangeHandler}
          initMap={this.initMap}
          start={this.state.start}
          end={this.state.end}
          initRoute={this.initRoute}
          toggleSidebar={this.toggleSidebar} sidebarOpen={this.state.sidebarOpen} />
        <div id="map" ></div>
      </div>
    );
  }
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}
const mapStateToProps = state => ({
  vehicles: state.vehicles
})

export default withRouter(connect(
  mapStateToProps, { getVehicles }
)(MapPage))

