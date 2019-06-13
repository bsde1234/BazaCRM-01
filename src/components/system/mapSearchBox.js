import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs } from "react-google-maps";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const MapSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVx04MozqTwq0ikjuernD5cuubbM6UQSM&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    // CHECK IF UA
                    this.props.returnPlace(refs.searchBox.getPlaces());
                    this.setState({
                        places,
                    });
                },
                onChange: e=>{
                    this.setState({
                        searchVal: e.target.value
                    })
                }
            })
        },
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="">
            <h6 className="center-align">Местоположение обьекта</h6>
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <div className="input-field ">
                <i className="material-icons prefix fas fa-search-location " style={{fontSize:`23px`,textAlign: `center`}}></i>
                <input  placeholder="Поиск адресса" type="text" className="validate"/>
            </div>
        </StandaloneSearchBox>
    </div>
);

export default MapSearchBox;