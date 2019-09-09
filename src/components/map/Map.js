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
    formData.append('token', 'nXnjlMWTjdn6zaAf9z5iFp1VWuoHK80UW4cbD15NWnW9KL9xP5jR5W9Pgu9GIMJx4zAbIas7-Jjc-Z1SY79pJC-w5cSnIVl_wHp5nTFQXz651Us_b95SiePEmtTH6DVgkYPF5lyEBSndBlU-l8D-iOkSCLB-a99InrEIlmWcxzuc-wfQxMjQdVsRw8_LdrxkJn3tOdC1bDngM2_3vqWoabwmde5JZk-s8CiHsOQKTE8.'); 
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
      {"features":[{"geometry":{"rings":[[[-96.382,42.49],
      [-96.391,42.471],
      [-96.414,42.475],
      [-96.421,42.491],
      [-96.401,42.505],
      [-96.382,42.49]]]},
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
 
    axios.post("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve", formData, config)
      .then(res => {
        console.log("arc res", res.data.routes.features[0].geometry.paths[0])
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
          console.log("lat var", lat);
          console.log("lng var", lng);

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
    

  // return axios.get(`https://roads.googleapis.com/v1/snapToRoads?path=34.05390,-118.24355|34.05382,-118.24362|34.05365,-118.24378|34.05355,-118.24388|34.05294,-118.24447|34.05334,-118.24509|34.05364,-118.24555|34.05403,-118.24519|34.05518,-118.24412|34.05576,-118.24359|34.05608,-118.24398|34.05649,-118.24449|34.05677,-118.24409|34.05691,-118.24385|34.05722,-118.24330|34.05741,-118.24295|34.05765,-118.24251|34.05802,-118.24204|34.05867,-118.24146|34.05905,-118.24116|34.06074,-118.24049|34.06116,-118.24033|34.06232,-118.23979|34.06301,-118.23944|34.06349,-118.23918|34.06635,-118.23775|34.06665,-118.23761|34.06723,-118.23732|34.06728,-118.23729|34.06740,-118.23722|34.06840,-118.23665|34.06920,-118.23597|34.06941,-118.23577|34.07000,-118.23540|34.07053,-118.23524|34.07121,-118.23508|34.07208,-118.23476|34.07236,-118.23462|34.07306,-118.23406|34.07331,-118.23381|34.07435,-118.23279|34.07469,-118.23245|34.07481,-118.23233|34.07572,-118.23138|34.07613,-118.23091|34.07617,-118.23087|34.07665,-118.23032|34.07716,-118.22970|34.07741,-118.22940|34.07786,-118.22885|34.07814,-118.22853|34.07845,-118.22812|34.07893,-118.22752|34.07921,-118.22727|34.07950,-118.22715|34.08028,-118.22738|34.08139,-118.22803|34.08221,-118.22818|34.08303,-118.22832|34.08322,-118.22836|34.08348,-118.22844|34.08435,-118.22908|34.08473,-118.22935|34.08502,-118.22910|34.08509,-118.22919|34.08530,-118.22961|34.08540,-118.22987|34.08560,-118.23042|34.08587,-118.23099|34.08607,-118.23135|34.08617,-118.23152|34.08632,-118.23178|34.08658,-118.23225|34.08682,-118.23269|34.08705,-118.23312|34.08753,-118.23397|34.08794,-118.23471|34.08924,-118.23683|34.09005,-118.23787|34.09081,-118.23870|34.09121,-118.23909|34.09163,-118.23945|34.09221,-118.23995|34.09287,-118.24047|34.09339,-118.24083|34.09356,-118.24094|34.09384,-118.24114|34.09374,-118.24148|34.09386,-118.24171|34.09420,-118.24209|34.09558,-118.24377|34.09720,-118.24533|34.09830,-118.24639|34.09920,-118.24726|34.09955,-118.24750&interpolate=true&key=AIzaSyC9SzPSjzdJI1IFN6VgeOMHH_ay0ePBTqM`)
  //   .then(res => {
  //     console.log("google res", res)
  //   for(let i = 0; i < res.data.snappedPoints.length; i++ ) {
  //   console.log('snapped lat',res.data.snappedPoints[i].location.latitude)
  //   console.log('snapped lng',res.data.snappedPoints[i].location.longitude)
  //   let Coordinate = {lat: null, lng: null}
  //   Coordinate.lat = res.data.snappedPoints[i].location.latitude
  //   Coordinate.lng = res.data.snappedPoints[i].location.longitude
  //   this.state.Coordinates[i] = Coordinate
  //   } 
  //  var polyPath = new window.google.maps.Polyline({
  //     path: this.state.Coordinates,
  //     geodesic: true,
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 4
  //   });
   
  //   polyPath.setMap(map); 
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  
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