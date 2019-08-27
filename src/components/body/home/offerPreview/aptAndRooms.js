import React from 'react'
import { Link } from 'react-router-dom';
import FavoriteOffers from '../../../system/favoriteOffers';
import { formatDate } from '../../../system/formatingData';

export const AptRoomsOfferPreview = (props) => {
    const { data, favOffers, uid } = props;




    return (
        <>
            <div className="row noMarginPadding">
                <div className="col s12 m4 offerImages noMarginPadding">
                    {data.images && <div className="image" style={{ backgroundImage: "url(" + data.images[0] + ")" }}></div>}
                    <div className=" photoCounter center-align white-text">Всего фото: {data.images.length} </div>
                </div>
                <div className="col s12 m8 offerText ">
                    <div className="col s11 noMarginPadding">
                        <Link to={{
                            pathname: `/details`,
                            search: `id=${data.id}`,
                            state: { offerInfo: data, favOffers: favOffers, url: window.location.href }
                        }}>
                            <h2>{data.title}</h2>
                        </Link>
                    </div>
                    <div className="col s1 offerPrice ">
                        <div className="addFav "><FavoriteOffers offersList={favOffers ? favOffers.offerID : ''} uid={uid ? uid : ''} offerId={data.id} /></div>
                    </div>
                    <div className="col s12 noMarginPadding">
                        <div className="col s9 noMarginPadding">
                            <ul>
                                <li>{data.offer_type_1} > {data.offer_type_2}</li>
                                <li>Общая площадь: {data.total_square} м<sub>2</sub></li>
                                <li>{data.location.strAddress.sublocality_level_1 ? data.location.strAddress.sublocality_level_1 : data.location.strAddress.route}, {data.location.strAddress.locality}</li>
                                <li>
                                    <i className="far fa-calendar-alt"></i> {formatDate(data.data_created.toDate())}
                                </li>
                            </ul>
                        </div>
                        <div className="col s3">
                            <div className="offerPrice">{data.price + " " + data.currency}</div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

