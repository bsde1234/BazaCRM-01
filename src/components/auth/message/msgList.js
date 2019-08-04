import React from 'react';

export default function  MsgList (props) {


        return (

            <div className="row">
                            {console.log(props)}
                {props.msgList && props.msgList.length?props.msgList.map((data, idx)=>{
                    return (<div key={idx}>{data.text} </div>)
                }):"Нет сообщений"}
            </div>
        )
    
}
