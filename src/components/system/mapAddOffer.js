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
    // REMADE USING  .FILTER 
    let strAddress = {};
    place["0"].address_components.map((val, idx)=>{
      const addType = val.types["0"];
      if(addType === "street_number" || addType === "route"|| addType  === "locality" || addType === "sublocality_level_1" || addType === "route" || addType === "administrative_area_level_1" || addType  === "country"){
        strAddress[addType] = val.long_name;
      }
      if(idx === place["0"].address_components.length -1){
        this.setState({
          location:{
            lat: place["0"].geometry.location.lat(),
            lng: place["0"].geometry.location.lng(),
          },
          strAddress: strAddress,
          successSearch: true
        }, ()=>{this.props.returnToParent(this.state)});
      }
    });
  }
  setRedius=(data)=>{
    console.log(data)
  }
  switchMapPointer =()=>{
    this.setState(prevState => ({
      isMarkerShown: !prevState.isMarkerShown
    }));
    this.props.returnToParent(this.state);
  }
  markerOnDrag =(e)=>{
    this.setState({
      location:{
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    }, ()=>{this.props.returnToParent(this.state)});
  }
  render() {
    return (
      <>
        <div className="col l6 m6 s12 offset-l3 offset-m3 center-align">
          <MapSearchBox returnPlace={this.getPlace} />
        </div>
        {this.state.successSearch?
                  <div className="col s12 center-align">
                    {this.state.successSearch?<><div><h6 className="center-align">Укажите точное или приблезительное местоположение обьекта.</h6></div><MapPointerSwitcher value="1"  onChange={this.switchMapPointer} options={[{label: 'Точное',value: '1'},{label: 'Приблезительное',value: '2'}]} /></>:''}
                  <MyMapComponent
                    markerOnDrag={this.markerOnDrag}
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    location={this.state.location}
                    setRedius={this.setRedius}
                  />
                  <br/>
                </div>: null
        }
      </>
    )
  }
}