import React from 'react';
import Nav from '../nav/Nav';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia2V2aW5zaW1zMSIsImEiOiJjanpvYWU2cXMwY3YyM25tbW50OXI4ODNjIn0.ku-5j7VMYr1LTh4G_X2-Bw"
});

function MapPage() {
  return (
    <>
      <Nav />
      <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
        </Layer>
    </Map>
    </>
  );
}

export default MapPage;
