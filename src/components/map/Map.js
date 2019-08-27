import React, { Component } from 'react';
import Nav from '../nav/Nav';


class MapPage extends Component {
  constructor(){
    super()
    this.state = {
      start: '',
      end: ''
    }
  }

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP}&callback=initMap`)
    window.initMap = this.initMap
  }
  calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
         directionsService.route({
           origin: this.state.start,
           destination: this.state.end,
           travelMode: 'DRIVING'
         }, function(response, status) {
           if(status === 'OK') {
             directionsDisplay.setDirections(response)
           } else {
             window.alert('Directions request failed due to' + status)
           }
         })
       }
  initMap = () => {
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    directionsDisplay.setMap(map)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //marker for users location
        new window.google.maps.Marker({map:map, position: pos});
        map.setCenter(pos);
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Error finding location")
    }
     var onChangeHandler = (e) => {
      e.preventDefault()
      this.calculateAndDisplayRoute(directionsService, directionsDisplay)
    }
    document.querySelector('form').addEventListener('submit', onChangeHandler)
  }
  routeChangeHandler = (e) => {
   this.setState({
     [e.target.name]: e.target.value
    })
  }

  render(){
  return (
    <div>
      <Nav />
      <div className="floatingPanel" 
      style={{
        position: 'absolute',
        top: '10px',
        left: '25%',
        zIndex: '5',
        backgroundColor: '#fff',
        paddinf: '1rem',
        border: '1px solid #999',
        textAlign: 'center',
        lineHeight: '2rem',
        paddingLeft: '10px'
      }}>
        <form ref={this.formRef}>
        <input id="start" type="text" placeholder="Start" name="start" value={this.state.start} onChange={this.routeChangeHandler}/> 
        <input id="end" type="text" placeholder="end" name="end" value={this.state.end} onChange={this.routeChangeHandler}/> 
        <button type="submit"> Plot Course</button>
        </form>
      </div>
      <div id="map" style={{height: "100vh"}}></div>
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