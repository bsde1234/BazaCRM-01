import React from 'react';
import { Carousel } from 'react-materialize';
import FavoriteOffers from '../../../system/favoriteOffers';
import { formatDate } from '../../../system/formatingData';


export const AptRoomsOfferDetails = (props) =>{

    const { offerInfo,favOffers, offerKey, uid, userInfo } = props;
    return (
    <>
    {console.log(userInfo)}
        <div className="row">
            <div className="imagesWrap col s12 m7">
                <div id="carouselWrap">
                    <div className="right"><i className="fas fa-expand-arrows-alt"></i></div>
                    <Carousel options={{ centerImages: true }} images={offerInfo.images} />
                </div>
                <div className="col s12">
                    <p>{offerInfo.description}</p>
                </div>
            </div>
        {
            // USER COMPONENT START
        }
            <div className="col m5 s12">
                    <div className="right">
                        { <FavoriteOffers offersList={favOffers?favOffers.offerID:''} uid={uid}  offerId={offerKey} /> }
                    </div>
                <div className="center-align offerTitle">
                    <h1>{offerInfo.title}</h1>
                </div>
                <div className="row">
                    <div className="col s6 center-align">
                        <span  className="fw-100">Площадь</span>
                        <h4 className="noMarginPadding">{offerInfo.total_square} м<sub>2</sub></h4>
                    </div>
                    <div className="col s6 center-align">
                        <span className="fw-100">Цена</span>
                        <h4 className="noMarginPadding">{offerInfo.price} {offerInfo.currency}</h4>
                    </div>

                </div>

                {userInfo&& props.loaded?
                    <>
                        <div className="col s12 center-align">
                        <hr/>
                            <span className="fw-100">Автор:</span>
                            <div className="userPic">
                            <img height="100px" alt="Изображение пользователя" src={
                                userInfo.userPic.filePath? userInfo.userPic.filePath
                                :'https://firebasestorage.googleapis.com/v0/b/baza-001.appspot.com/o/system%2Foffer%2FnoUserPic.png?alt=media&token=c7a61d94-82d6-48ce-ac9a-743170ca7426'
                            } />
                            </div>
                            <h5 className="noMarginPadding">{userInfo.name} {userInfo.lastName}</h5> 
                                <span>{userInfo.userType}</span>
                                <br/><br/>
                            <div className="col s12">
                                <button title="Написать Сообщение" className="btn grey darken-3  col s3 offset-s2" type="button" > <i className="far fa-paper-plane"></i> </button>
                                <button title="Позвонить" className="btn grey darken-3 col s3 offset-s2" type="button" > <i className="fas fa-phone"></i> </button>
                            </div>
                                <br/><br/>
                                {userInfo.date_of_creation?<div className="col s12"><span className="fw-100">Дата регистрации:</span> {formatDate(userInfo.date_of_creation.toDate(), 'noTime')}</div>:null}

                            <a href="#">Все обьявления автора.</a>
                        </div>
                        {
                            // USER COMPONENT END
                        }
                    </>
                :<div className="center-align red-text">
                    Данные владельца обьявления не найдены.
                    <br/>Вероятней всего, данный пользователь удалил свой аккаунт.
                </div>}
            </div>
        </div>



    </>
    )
}
