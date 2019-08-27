import React, { Component } from 'react'
import { saveInFirestoreByKey } from '../../firebase/firestoreCRUD';


export default class MsgForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            uid: this.props.uid,
            file: '',
            recipientInfo: this.props.recipientInfo,
            readed: false
        }
    }

    handleChange = (event)=>{
        let data = Object.assign({}, this.state);    //creating copy of object
        data[event.target.name] = event.target.value;                        //updating value
        this.setState({  ...data });
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.state.text){
            saveInFirestoreByKey(`messages/${this.state.uid}/${this.state.recipientInfo.uid}`, this.state ).then(()=>{
                saveInFirestoreByKey(`messages/${this.state.recipientInfo.uid}/${this.state.uid}`, this.state ).then(()=>{
                    this.props.increaseMsgLimit(1);
                    this.setState({
                        text: ''
                    });
                }).catch(error=>{
                    console.log("ERROR", error);
                })
            });
        }
    }


    render() {
        return (
            <div >
                <form onSubmit={this.handleSubmit}  ref={el => (this.form = el)}>
                    <div className="row msgForm">
                        <div className="input-field  col s11 noMarginPadding">
                            <textarea value={this.state.text} required onChange={this.handleChange} maxLength="800" id="textarea2" name="text" className="materialize-textarea validate required"></textarea>
                            <label htmlFor="textarea2">Текст сообщения<span className="red-text">*</span></label>
                        </div>

                        <div className="input-field col s1 noMarginPadding sbtBtn">
                            <button className=" btn-flat" type="submit"><i className="far fa-paper-plane"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
