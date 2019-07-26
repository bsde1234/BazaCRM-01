import React from 'react';
import { Carousel } from "react-materialize";
import M from "materialize-css";
export const CustomCarousel=(props)=>{
    let instance = getInstance()

    function getInstance(){
       return  M.Carousel.getInstance(document.getElementsByClassName('carouselClass'))
    }
    function next(){
        instance.next()
    }
    function prev(){
        instance.prev()
    }
    return (
        <>

            <div className="row noMarginPadding">
                
                <div className="col s10" ><Carousel options={{fullWidth: true, indicators: true}} images={props.images} className="carouselClass" /></div>
  
            </div>
        </>
    )
}