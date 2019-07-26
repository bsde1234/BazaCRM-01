import React from 'react';
import FavoriteOffers from '../../../system/favoriteOffers';
import { OfferDetails_UserInfo as UserInfo } from '../parts/userInfo';
import { OfferDetailsInfo } from '../parts/offerInfo';
import OfferViews  from '../../../system/offerViews';
import { CustomCarousel } from '../../../system/carousel';



export const AptRoomsOfferDetails = (props) => {

    const { offerInfo, favOffers, offerKey, uid, userInfo } = props;

    return (
        <>
            
            <div className="row">
                <div className="col m5 s12 right">
                    <div className="favoriteRow">
                        <span className="right">
                            {<FavoriteOffers offersList={favOffers ? favOffers.offerID : ''} uid={uid} offerId={offerKey} />}
                        </span>
                        <span className="left">
                            <span className="fw-100 "><OfferViews id={offerKey} uid={uid} /></span>
                        </span>
                    </div>

                    <div className="center-align offerTitle">
                        <h1>{offerInfo.title}</h1>
                        <h6 className="bold">{offerInfo.offer_type_2}</h6>
                    </div>
                    <div className="row">
                        <div className="col s6 center-align">
                            <span className="fw-100">Площадь</span>
                            <h5 className="noMarginPadding">{offerInfo.total_square} м<sub>2</sub></h5>
                        </div>
                        <div className="col s6 center-align">
                            <span className="fw-100">Цена</span>
                            <h5 className="noMarginPadding">{offerInfo.price} {offerInfo.currency}</h5>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="imagesWrap col s12 m7 left">
                    <div id="carouselWrap">
                        <div className="right"><i className="fas fa-expand-arrows-alt"></i></div>

                        <div><CustomCarousel images={offerInfo.images} /></div>
                        
                    </div>
                    <div className="col s12 noMarginPadding">
                        <OfferDetailsInfo {...offerInfo} />
                    </div>
                </div>


                <div className="col m5 s12 right">
                        {userInfo && props.loaded ?
                            // USER COMPONENT START
                            <UserInfo {...userInfo} />
                            : <div className="center-align red-text">
                                Данные владельца обьявления не найдены.
                                <br />Вероятней всего, данный пользователь удалил свой аккаунт.
                            </div>
                        }
                </div>
            </div>
        </>
    )
}
