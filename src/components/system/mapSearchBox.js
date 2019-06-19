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
                    let idx = 0;
                    const places = refs.searchBox.getPlaces();
                    for(let el of places["0"].address_components){
                        let type = el.types["0"];
                        if( type=== "sublocality_level_1" || type === "route"){ 
                            this.props.returnPlace(refs.searchBox.getPlaces());
                            this.setState({
                                places,
                                error: false,
                                success: true
                            });
                            break;
                        } else { 
                            idx++;
                            if(idx === places["0"].address_components.length){
                                this.setState({
                                    error: true
                                })
                            }
                        }
                    }
                },
            })
        },
    }),
    withScriptjs
)(props =>
    <div >
        
        <h6 className="center-align"><i className="fas fa-search-location"></i> Местоположение обьекта</h6>
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <div className="input-field ">
                <input placeholder="Выберите вариант из выпадающего списка" className={`${props.error&&"invalid"} ${props.success&&'valid'}`} id="mapSearchInput" name="mapSearchInput" />
                <label htmlFor="mapSearchInput" className="active">Адресс обьекта<span className="red-text">*</span></label>
                {props.error?<div className={`center-align red-text ${props.error&&"invalid"}`}>Укажите более точный адресс.</div>:''}
            </div>

        </StandaloneSearchBox>
    </div>
);

export default MapSearchBox;