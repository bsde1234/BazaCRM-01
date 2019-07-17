import React from 'react';
import { Carousel } from 'react-materialize';
import FavoriteOffers from '../../../system/favoriteOffers';


export const AptRoomsOfferDetails = (props) =>{
    const { offerInfo, uid, favOffers } = props;
    return (
    <>
        <div className="row">
            
            <div className="imagesWrap col s12 m7">
                <div id="carouselWrap">
                    <Carousel options={{ centerImages: true }} images={offerInfo.images} />
                </div>
            </div>
            <div className="col m5">
                <div className="center-align offerTitle">
                    <h1>{offerInfo.title}</h1>
                </div>
                <div className="col s6 center-align">
                    <p>Площадь</p>
                    <h4>{offerInfo.total_square} м<sub>2</sub></h4>
                </div>
                <div className="col s6 center-align">
                    <p>Цена</p>
                    <h4>{offerInfo.price} {offerInfo.currency}</h4>
                </div>

            </div>
        </div>


        <div className="addFav ">
            <FavoriteOffers uid={uid} offerId={offerInfo.id} offersList={favOffers} />
        </div>
    </>
    )
}
