

import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Circle } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVx04MozqTwq0ikjuernD5cuubbM6UQSM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    center={{ lat: props.location.lat, lng: props.location.lng}}
    onTilesloaded={()=> alert("!")} 
  >
    {props.isMarkerShown?
        <Marker draggable={true} position={{ lat: props.location.lat, lng: props.location.lng}} onClick={props.onMarkerClick} />
    :
        <Circle  center={{ lat: props.location.lat, lng: props.location.lng}} draggable={true} radius={1000} editable={true} />
    }
    
  </GoogleMap>
)
export default MyMapComponent
