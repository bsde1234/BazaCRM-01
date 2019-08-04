import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../system/formatingData';
import { Modal } from 'react-materialize';
import MessageMain from '../../../auth/message';



export const OfferDetails_UserInfo = (props) => {

    const {userInfo, uid} = props;

    return (
    <>
        <div className="col s12 center-align">
            <span className="fw-100">Автор</span>
            <div className="userPic">
            <img height="100px" alt="Изображение пользователя" src={
                userInfo.userPic.filePath? userInfo.userPic.filePath
                :'https://firebasestorage.googleapis.com/v0/b/baza-001.appspot.com/o/system%2Foffer%2FnoUserPic.png?alt=media&token=c7a61d94-82d6-48ce-ac9a-743170ca7426'
            } />
            </div>
            <h5 className="noMarginPadding">{userInfo.name} {userInfo.lastName}</h5> 
                {userInfo.userType?<span>{userInfo.userType}<br/></span>:''}
                <br/>

            <div className="col s12">
                <button title="Написать Сообщение" className="btn grey darken-3  col s3 offset-s2" type="button" > <i className="far fa-paper-plane"></i> </button>
                <button title="Позвонить" className="btn grey darken-3 col s3 offset-s2" type="button" > <i className="fas fa-phone"></i> </button>
            </div>
                <br/><br/>
                {userInfo.date_of_creation?<div className="col s12"><span className="fw-100">Дата регистрации:</span> {formatDate(userInfo.date_of_creation.toDate(), 'noTime')}</div>:null}

            <Link to="#" className="link"><b>Все обьявления автора.</b></Link>
        </div>


        <Modal header="Modal Header" trigger={<button>AAAA</button>}>
            <MessageMain recipient={userInfo.uid} uid={uid} userInfo={userInfo} />
        </Modal>
    </>

    )
}