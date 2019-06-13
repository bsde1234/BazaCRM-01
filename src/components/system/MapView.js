import React from 'react';
import MapSearchBox from './mapSearchBox';
import MyMapComponent from './googleMap';
import { MapPointerSwitcher } from './mapPointerSwitcher';

export default class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    location:{
      lat:48.4,
      lng:35
    },
    successSearch: false
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
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
  render() {
    const {location, successSearch} = this.state;
    return (
      <>
        <div className="col s6 offset-s3 center-align">
          <MapSearchBox returnPlace={this.getPlace} />
          {successSearch?<MapPointerSwitcher value="1" withGap onChange={this.switchMapPointer} options={[{label: 'Точное',value: '1'},{label: 'Приблезительное',value: '2'}]} />:''}
        </div>
        {successSearch?
                  <div className="col s12">
                  <MyMapComponent
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