import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
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
      sidebarOpen: true,
      directionsService: {},
      directionsDisplay: {},
      Coordinates: [],
      polygonsArray: [],
      startCoord: "",
      endCoord: "",
      map: null,
      loading: ""
    }
  }
  
  componentDidMount() {
    // console.log("local storage token", localStorage);
    //this.setState({ sidebarOpen: !this.state.sidebarOpen })
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

  initMap = () => {
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
   
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.0522, lng: -118.2437},
      zoom: 12
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
    this.setMapToState();
    this.setState({loading: "routing"})
    console.log("lenght for markers loop", this.state.polygonsArray.length);


    console.log("start COORD", this.state.startCoord);
    console.log("end COORD", this.state.endCoord);
    var formData = new FormData();
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

      console.log()
   // let barriers = JSON.stringify(this.state.polygonsArray);
  // debugger;
    formData.append("polygonBarriers", JSON.stringify(
      {
        "features": [{
          "geometry": {
            "rings": this.state.polygonsArray
          },
          "attributes": {
            "Name": "Bridge",
            "BarrierType": 0
          }
        }
        ]
      }
    ))
    formData.append('findBestSequence', false);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve", formData, config)
      .then(res => {
        console.log("arc res last", res.data)
        this.setState({Coordinates: []})
        console.log('res data features',res.data.routes.features[0].geometry.paths[0][0][0])
        console.log("res length", res.data.routes.features[0].geometry.paths[0].length)
       for (let i = 0; i < res.data.routes.features[0].geometry.paths[0].length; i++) {
          let lng = res.data.routes.features[0].geometry.paths[0][i][0];
          let lat = res.data.routes.features[0].geometry.paths[0][i][1];
          parseFloat(lat);
          parseFloat(lng);
          let Coordinate = { lat: null, lng: null }
          Coordinate.lat = lat;
          Coordinate.lng = lng;
          this.setState({
            Coordinates: [...this.state.Coordinates, Coordinate]
          }) 
          
          //this.state.Coordinates[i] = Coordinate;
        }
        console.log("coords array after loop (w/barriers)", this.state.Coordinates);

        for(let i = 0; i < this.state.polygonsArray.length; i++){
          console.log("markers i", i);
          
          let displayPoly = [];
        //   let mid = displayPoly[0] = {lat: this.state.polygonsArray[i][j][1], lng: this.state.polygonsArray[i][j][0]};
        //   new window.google.maps.Marker({
        //     map: this.state.map,
        //     label: `${j}`,
        //     position: mid      
        // })

        
          for(let j = 0; j < 3; j++){
            console.log("markers point j", j);
            console.log("lat for markers", this.state.polygonsArray[i][j][1]);
            console.log("lng for markers", this.state.polygonsArray[i][j][0]);
            displayPoly[0] = {lat: this.state.polygonsArray[i][j][1] , lng: this.state.polygonsArray[i][j][0]};
            // displayPoly[1] = {lat: this.state.polygonsArray[i][j][1], lng:  this.state.polygonsArray[i][j][0]};
            // displayPoly[2] = {lat: this.state.polygonsArray[i][j][1], lng: this.state.polygonsArray[i][j][0] };
            console.log(`markers poly ${j}`, displayPoly);
              new window.google.maps.Marker({
                map: this.state.map,
                label: `${j}`,
                position: displayPoly[j]      
            })
          }
        }
    
        var polyPath = new window.google.maps.Polyline({
          path: this.state.Coordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 4
        });

        polyPath.setMap(this.state.map);

        this.setState({loading: false})
        //this.setState({polygonsArray: []})
      })
      .catch(err => {
        console.log("arc route err:", err);
      })

      
  }


  routeChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeHandler = (e) => { 
    this.setState({loading: "searching addresses"})
    // e.preventDefault()
    //this.setState({polygonsArray: []})
    this.geocode(this.state.start, "startCoord");
    this.geocode(this.state.end, "endCoord");
  }

  geocode = (address, coordinate) => {
    axios
    .get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${address}&outFields=Match_addr,Addr_type`)
    .then(res => {
      if(res){
      this.setState({[coordinate]: {
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
  })
    if(coordinate === "endCoord"){
    this.setState({loading: "checking clearance"})
      console.log("fn:1 going to prebarrier Route!")
      this.routeBeforeBarriers();
    }
  }
    })
    .catch(err => {
      console.log("gecode err", err)
    })

  }

  clearanceAPI = (start, end, polygonArray, i, lastStartPoint) => {
    console.log("START CLEARNCE", start);
    console.log("end CLEARNCE", end);
    //console.log('HEIGHT',this.props.vehicles.vehicles[0].height)
    let heightOfSelectedVehicle = 0;
    if(this.props.vehicles.vehicles){
      this.props.vehicles.vehicles.map( e => {
        if(e.id === this.props.selected_id){
            heightOfSelectedVehicle = e.height;
        }
      })
    }
    let bridgePost = { //sends low bridges a long a route
      "height": heightOfSelectedVehicle,
      "start_lon": parseFloat(start.lng.toFixed(4)),
      "start_lat": parseFloat(start.lat.toFixed(4)),
      "end_lon": parseFloat(end.lng.toFixed(4)),
      "end_lat": parseFloat(end.lat.toFixed(4))
    }

      let makePolygon = (latitude, longitude) => {
      
      //this code used to display the point sent from the datascience api, it stopped working for some reason and we don't necessarily need to see that point
      //so it has been commented out for now, in the future if we put those midpoints in state and call this loop using state it will probably work, but for 
      //now i am leaving it
      // let midPoint = {lat: latitude, lng: longitude}
      // new window.google.maps.Marker({
      //   map: this.state.map,
      //   label: 'm', //labeled m for midpoint, this point is displayed for our purposes only, it is used to generate a polygn to send to arc, is not sent to the arc api
      //   position: midPoint
      // })   

      //create and display polygon we will block driver from passing through
 
      //create polygon to send to routing API, is different from displayPoly due to formatting differences in google and ARC apis
      let polygon = [];
      polygon[0] = [longitude, latitude + .00007]
      polygon[1] = [longitude - .0001 ,latitude - .0002];
      polygon[2] = [longitude + .0001, latitude - .0001];
      return polygon;
    }
   
    // let makemarkers = (latitude, longitude) => {
      

    // }
    axios.post("https://rv-nav-clearance.com/fetch_low_clearance", bridgePost)
      .then(res => {
          if(res){
          
          for(let j = 0; j < res.data.length; j++){
           // makemarkers(res.data[j].latitude, res.data[j].longitude)
             polygonArray.push(makePolygon(res.data[j].latitude, res.data[j].longitude));
          }
          console.log("clearance poly", polygonArray.length)

          if(i === lastStartPoint){
            console.log("init conditional")
            this.setState(
              {
                ...this.state.polygonsArray,
                polygonsArray: polygonArray
              },
              () => this.initRoute()
            );
          }

         //return polygonArray;
        //});
        }
      })
      .catch(err => {
        console.log("clearance error:", err);
      })
  }

  setMapToState = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: parseFloat(this.state.startCoord && this.state.startCoord.geometry.y.toFixed(4)), lng: parseFloat(this.state.startCoord && this.state.startCoord.geometry.x.toFixed(4)) },
      zoom: 10
    });
    this.setState({
      map: map
    })
  }

  routeBeforeBarriers= () => {
    var formData = new FormData();
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
    formData.append('findBestSequence', false);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve", formData, config)
      .then(res => {
        if(res){
        console.log("arc UNOBSTRUCTED res", res.data)
        //console.log('res data features',res.data.routes.features[0].geometry.paths[0][0][0])
        let resLength = res.data.routes.features[0].geometry.paths[0].length;
        let pbCoordinate = { lat: null, lng: null }
        let pblng = null;
        let pblat = null;
        let endLat;
        let endLng;
        let increment = 500;
        let polyArrayLocal = [];
        let lastStartPoint = resLength - (resLength % increment);
        for (let i = 0; i < resLength; i=i+increment) {
          pblng = res.data.routes.features[0].geometry.paths[0][i][0];
          pblat = res.data.routes.features[0].geometry.paths[0][i][1];
          parseFloat(pblat);
          parseFloat(pblng);
          pbCoordinate = { lat: pblat, lng: pblng }
          if(i === lastStartPoint){
            endLat = res.data.routes.features[0].geometry.paths[0][resLength-1][1]
            endLng  = res.data.routes.features[0].geometry.paths[0][resLength-1][0]
          } else {
            endLat = res.data.routes.features[0].geometry.paths[0][i + increment][1]
            endLng  = res.data.routes.features[0].geometry.paths[0][i + increment][0]
          }
          console.log("fn:2 going to clearance api")
          this.clearanceAPI(pbCoordinate, {lat: endLat, lng: endLng}, polyArrayLocal, i, lastStartPoint);
          console.log("i: ", i)
          
        }
        
        console.log('POLY array state',this.state.polygonsArray)
        console.log("fn:3 going to route with barriers")
      }
      })
      .catch(err => {
        console.log("arc route err:", err);
      })

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
          loading={this.state.loading}
          routeChangeHandler={this.routeChangeHandler}
          onChangeHandler={this.onChangeHandler}
          start={this.state.start}
          end={this.state.end}
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
  vehicles: state.vehicles,
  selected_id: state.selected_id
})

export default withRouter(connect(
  mapStateToProps, { getVehicles }
)(MapPage))
