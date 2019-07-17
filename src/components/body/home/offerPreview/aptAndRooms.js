import React from 'react'
import { Link } from 'react-router-dom';
import FavoriteOffers from '../../../system/favoriteOffers';
import { formatDate } from '../../../system/formatingData';

export const AptRoomsOfferPreview = (props) => {
    const { data, favOffers, auth } = props;
    return (
        <>
            
            <div className="col s12 m4 offerImages noMarginPadding">
                {data.images && <div className="image" style={{ backgroundImage: "url(" + data.images[0] + ")" }}></div>}
                <div className="center-align grey darken-3  white-text">Всего фото: {data.images.length} </div>
            </div>
            <div className="col s6 offerText">
            
                <Link to={{
                    pathname: `/details`,
                    search: `id=${data.id}`,
                    state: { offerInfo: data, favOffers: favOffers} 
                }}>
                    <h2>{data.title}</h2>
                </Link>
                <ul>
                    <li>{data.offer_type_1} > {data.offer_type_2}</li>
                    <li>{data.location.strAddress.sublocality_level_1 ? data.location.strAddress.sublocality_level_1 : data.location.strAddress.route}, {data.location.strAddress.locality}</li>
                    <li>
                        <i className="far fa-calendar-alt"></i> {formatDate(data.data_created.toDate())}
                    </li>
                </ul>
            </div>
            <div className="col s2 offerPrice center-align">
                <div className="addFav "><FavoriteOffers uid={auth ? auth.uid : null} offerId={data.id} offersList={favOffers} /></div>
                <div className="offerPrice">{data.price + " " + data.currency}</div>
            </div>
        </>
    )
}

