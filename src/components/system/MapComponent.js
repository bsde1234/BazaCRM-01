import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
const google = window.google;
const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVx04MozqTwq0ikjuernD5cuubbM6UQSM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{width:`100%`, height: `100%` }} />,
    containerElement: <div style={{width:`100%`, height: `400px` }} />,
    mapElement: <div style={{width:`100%`, height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
  >

<SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>

    {props.isMarkerShown && <Marker draggable={true} position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

export default MapComponent