import React, { Component } from 'react'
import { dataSnapshotCollection } from '../../firebase/firestoreCRUD';
import MsgForm from './msgForm';
import MsgList from './msgList';

import './message.css';





export default class MessageMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...this.props, 
            limit: 11
        }
        
    }
    
    componentWillMount(){
        this.getMessagesSnapshot(this.state.limit)
    }
    getMessagesSnapshot(limit){
        if(this.state.recipientInfo && this.state.uid){
            dataSnapshotCollection(`messages/${this.state.uid}/${this.state.recipientInfo.uid}`, limit )
            .onSnapshot((querySnapshot)=> {
                
                let messages = [];
                querySnapshot.forEach((doc)=> {
                    messages.unshift(doc.data());
                });
                
                this.setState({
                    msgList: messages,
                    finish: messages.length < limit?true:false
                })
            
            })
        } 
    }
    increaseMsgLimit=(number)=>{
        this.setState({
            limit: this.state.limit + Number(number)
        }, ()=> {
            this.getMessagesSnapshot(this.state.limit)
        })

    }

    render() {
        return (
            <div>
                {this.state.recipientInfo?
                <>
                    <MsgList {...this.state} increaseMsgLimit={this.increaseMsgLimit} />
                    <MsgForm {...this.state} increaseMsgLimit={this.increaseMsgLimit} />
                </>
                : 'AAA'}
    <h1>{this.msgLimit}</h1>
            </div>
        )
    }
}
