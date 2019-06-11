import React, { Component } from 'react';
import MapComponent from './MapComponent';
class MapView extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false
    }
  }

  

  componentDidMount() {
    this.getGeoLocation()
      this.setState({ isMarkerShown: true })
  }

 

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    
                }));
                console.log(this.state)
            }
        )
    } else {
       // error => console.log(error)
    }
}

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLatLng}
      />
    )
  }
}

export default MapView;