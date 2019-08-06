import React, { useState, useEffect } from 'react';
import { formatDate, formatTime } from '../../system/formatingData';

export default function  MsgList (props) {

    const {msgList, userInfo, recipientInfo, uid} = props;

    
    console.log(props)
  
    return (

        <div className="row">
            {
                <div className="center-align "><h5 className="noMarginPadding">{recipientInfo.name + " " + recipientInfo.lastName}</h5></div>
            
            }<div onClick={()=>props.increaseMsgLimit(10)} className="center-align"><i className="fas fa-sync-alt"></i> Загрузить еще</div>
            <ul className="msgList" >
                {msgList && msgList.length?msgList.map((data, idx)=>{

                    return (
                        <li key={idx} className={data.uid===uid?"right": "left"}>
                            {msgList[idx-1] && msgList[idx-1].uid === msgList[idx].uid?
                                ''
                            :
                            <span>
                                {data.uid===uid?
                                    <div><hr/>{userInfo.name + " " + userInfo.lastName}</div> 
                                    :
                                    <div><hr/>{recipientInfo.name + " " + recipientInfo.lastName}</div>
                                } 
                            </span>
                    }

                            {data.text}
                            <div className="fw-100 msgTime">
                                {  data.date_created ?
                                    formatDate(data.date_created.toDate(), true)===formatDate(new Date(), true)
                                    ?formatTime(data.date_created.toDate()) : formatDate(data.date_created.toDate(), false)
                                    :''
                                    }
                            </div>
                        </li>
                    )
                }):"Нет сообщений"}
            </ul>
        </div>
    )
    
}
