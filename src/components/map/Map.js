import React, { useState } from 'react';
import Nav from '../nav/Nav';
import ReactMapGl, { GeolocateControl } from 'react-map-gl';

function MapPage() {
  const [viewport, setViewport] = useState({
    latitude: 38.438332,
    longitude: -121.381943,
    width: '100vw',
    height: '100vh',
    zoom: 10
  });
  return (
    <div>
      <Nav />
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/kevinsims1/cjzof7xo12lyz1crr9igdtiib"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGl>
    </div>
  );
}

export default MapPage;
