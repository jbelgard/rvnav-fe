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
      directionsDisplay: {},
      Coordinates: []
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
    
    let formData = new FormData();
    formData.append('f', 'json'); 
    formData.append('token', process.env.REACT_APP_ARC_KEY); 
    formData.append('stops', 
      JSON.stringify({
      "type":"features",
      "features":  [
          {
          "geometry": {
            "x": -118.24352998832939,
            "y": 34.05387999582952,
            "spatialReference": {
              "wkid": "4326"
            }
          },
          "attributes": {
            "Name": "Los Angeles City Hall"
          }
        },

        {
          "geometry": {
            "x": -118.2739399630416,
            "y": 34.12348000035614,
            "spatialReference": {
              "wkid": "4326"
            }
          },
          "attributes": {
            "Name": "Griffith Park"
          }
        }
    
      ]
    })); 
    formData.append("polygonBarriers", JSON.stringify(
      {"features":[{"geometry":{"rings":[[
        [-96.382,42.49],
        [-96.391,42.471],
        [-96.414,42.475],
        [-96.421,42.491],
        [-96.401,42.505],
        [-96.382,42.49]
      ]]},
      "attributes":{
        "Name":"Bridge",
        "BarrierType":0
      }}
    ]}
    ))
    formData.append('findBestSequence', true); 

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
   }
   let bridgePost = { //sends low bridges a long a route
    "height": 13,
    "start_lon": -80.8431,
    "start_lat": 35.2271,
    "end_lon": -84.3880,
    "end_lat": 33.7490
}
let placesSend = { //send places of interest for a point
    "latitude":  35.2271,
    "longitude": -80.8431,
    "distance": 5 //miles
}

axios.post("https://rv-nav-clearance.com/fetch_low_clearance", bridgePost)
.then(res => {
  // console.log("bridge res", res.data[0].latitude)
  // console.log("bridge res", res.data[0].longitude)
  navigator.geolocation.getCurrentPosition(function(position){
    let exclusion = {lat: null, lng: null}
    exclusion.lat = res.data[0].latitude;
    exclusion.lng = res.data[0].longitude;
    console.log("exclusioon point", exclusion)
    new window.google.maps.Marker({
      map: map,
    position: exclusion
  })
  });

})
.catch(err => {
  console.log(err);
})
 
    axios.post("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve", formData, config)
      .then(res => {
        console.log("arc res", res.data)
        var hereCoord = "";
        console.log("length 139", res.data.routes.features[0].geometry.paths[0].length);
        console.log("length 2", res.data.routes.features[0].geometry.paths[0][0].length);
//res.data.routes.features[0].geometry.paths[0].length
        for(let i = 0; i < 95; i++){
          // console.log("at i", res.data.routes.features[0].geometry.paths[0][i]);
          var lng = res.data.routes.features[0].geometry.paths[0][i][0];
          var lat = res.data.routes.features[0].geometry.paths[0][i][1];

          parseFloat(lat);
          parseFloat(lng);
          // console.log("lat var", lat);
          // console.log("lng var", lng);

          // lat.toString();
          // lng.toString();
          // hereCoord =  hereCoord + lat + "," + lng + "|"

          let Coordinate = {lat: null, lng: null}
          Coordinate.lat = lat;
          Coordinate.lng = lng;
          // console.log("coord obj", Coordinate);
          this.state.Coordinates[i] = Coordinate;
          // console.log("coords array", this.state.Coordinates);


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


        // hereCoord = hereCoord.substring(0, hereCoord.length-1);
        // console.log("q string", hereCoord)
      })
      .catch(err => {
        console.log(err);
      })
    

  
}
  //Hello 

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