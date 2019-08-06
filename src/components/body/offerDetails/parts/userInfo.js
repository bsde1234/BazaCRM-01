import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../system/formatingData';
import { Modal } from 'react-materialize';
import MessageMain from '../../../auth/message';



export const OfferDetails_UserInfo = (props) => {

    const {recipientInfo} = props;

    const showToast=(text, className)=>{
        window.M.toast({html: `${text}`, classes: `${className}`})
    }
    return (
    <>
        <div className="col s12 center-align">
            <span className="fw-100">Автор</span>
            <div className="userPic">
            <img height="100px" alt="Изображение пользователя" src={
                recipientInfo.userPic.filePath? recipientInfo.userPic.filePath
                :'https://firebasestorage.googleapis.com/v0/b/baza-001.appspot.com/o/system%2Foffer%2FnoUserPic.png?alt=media&token=c7a61d94-82d6-48ce-ac9a-743170ca7426'
            } />
            </div>
            <h5 className="noMarginPadding">{recipientInfo.name} {recipientInfo.lastName}</h5> 
                {recipientInfo.userType?<span>{recipientInfo.userType}<br/></span>:''}
                <br/>

            <div className="col s12">
                <button title="Написать Сообщение" className="btn grey darken-3  col s3 offset-s2 modal-trigger" onClick={()=>!props.uid?showToast("<a href='/authentication' style={color: #fff}>Пожалуйста выполните вход.</a>", "toastChild"):null} type="button" href="#modal1" > <i className="far fa-paper-plane"></i> </button>
                <button title="Позвонить" className="btn grey darken-3 col s3 offset-s2" type="button" > <i className="fas fa-phone"></i> </button>
            </div>
                <br/><br/>
                {recipientInfo.date_of_creation?<div className="col s12"><span className="fw-100">Дата регистрации:</span> {formatDate(recipientInfo.date_of_creation.toDate(), 'noTime')}</div>:null}

            <Link to="#" className="link"><b>Все обьявления автора.</b></Link>
        </div>


    {props.uid?
        <Modal id="modal1" >
            <MessageMain {...props}  />
        </Modal>
    :null}
        
            
        
    </>

    )
}