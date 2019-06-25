import React from 'react';
import MapSearchBox from './mapSearchBox';
import MyMapComponent from './googleMap';
import { MapPointerSwitcher } from './mapPointerSwitcher';

export default class MapAddOffer extends React.PureComponent {
  state = {
    isMarkerShown:true,
    location:{
      lat:48.4,
      lng:35
    },
    successSearch: false
  }

  getPlace = (place) => {
    this.setState({
      location:{
        lat: place["0"].geometry.location.lat(),
        lng: place["0"].geometry.location.lng()
      },
      successSearch: true
    });
    
  }
  switchMapPointer =()=>{
    this.setState(prevState => ({
      isMarkerShown: !prevState.isMarkerShown
    }));
  }
  markerOnDrag =(e)=>{
    console.log(e)
    this.setState({
      location:{
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    });
  }
  render() {
    return (
      <>
        <div className="col l6 m6 s12 offset-l3 offset-m3 center-align">
          <MapSearchBox returnPlace={this.getPlace} />
          {this.state.successSearch?<MapPointerSwitcher value="1"  onChange={this.switchMapPointer} options={[{label: 'Точное',value: '1'},{label: 'Приблезительное',value: '2'}]} />:''}
        </div>
        {this.state.successSearch?
                  <div className="col s12">
                  <MyMapComponent
                    markerOnDrag={this.markerOnDrag}
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    location={this.state.location}
                  />
                </div>: null
        }


      </>
    )
  }
}