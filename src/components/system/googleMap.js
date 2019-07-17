

import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Circle } from "react-google-maps"
import mapStyles from './mapStyles.json';
const MyMapComponent = compose(
  
  withProps({
    googleMapURL: "https://maps.googleapis.ru/maps/api/js?key=AIzaSyBVx04MozqTwq0ikjuernD5cuubbM6UQSM&v=3.exp&language=ru&region=RU",
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
    clickableIcons={false}
    defaultOptions={{styles: mapStyles}}
  >
    {props.isMarkerShown?
        <Marker draggable={true} position={{ lat: props.location.lat, lng: props.location.lng}} onDragEnd={(e)=>props.markerOnDrag(e)}  />
    :
        <Circle  center={{ lat: props.location.lat, lng: props.location.lng}} draggable={true} radius={1000} editable={true} onDragEnd={(e)=>props.markerOnDrag(e)} onRadiusChanged={props.setRedius} />
    }
    
  </GoogleMap>
)
export default MyMapComponent
