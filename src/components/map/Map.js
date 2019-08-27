import React, { useState } from 'react';
import Nav from '../nav/Nav';

class MapPage extends React.Component {
  

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCntOT_h7ofl_l1NqJEnTt8az4eUdxPP0E&callback=initMap")
    window.initMap = this.initMap
  }
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
  render(){
  return (
    <div>
      <Nav />
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
