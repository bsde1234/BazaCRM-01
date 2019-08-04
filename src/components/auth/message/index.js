import React, { Component } from 'react'
import { dataSnapshotCollection } from '../../firebase/firestoreCRUD';
import MsgForm from './msgForm';
import MsgList from './msgList';

import './message.css';





export default class MessageMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid : this.props.uid,
            userInfo: this.props.userInfo,
            recipient: this.props.recipient?this.props.recipient:null,
        }
    }

    componentWillMount(){
        if(this.state.recipient){
            dataSnapshotCollection(`/messages/${this.state.uid}/${this.state.recipient}/` )
            .onSnapshot((querySnapshot)=> {
                
                let messages = [];
                querySnapshot.forEach((doc)=> {
                    messages.push(doc.data());
                });
                this.setState({
                    msgList: messages
                }, ()=>{console.log(this.state)})
            
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.recipient?
                <>
                    <MsgList msgList={this.state.msgList} />
                    <MsgForm uid={this.state.uid} recipient={this.state.recipient} />
                </>
                : 'AAA'}

            </div>
        )
    }
}
