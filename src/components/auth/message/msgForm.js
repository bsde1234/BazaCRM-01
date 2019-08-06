import React, { Component } from 'react'
import { saveInFirestoreByKey } from '../../firebase/firestoreCRUD';


export default class MsgForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            uid: this.props.uid,
            file: '',
            recipient: this.props.recipientInfo,
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
            <div>
                <form onSubmit={this.handleSubmit} noValidate ref={el => (this.form = el)}>

                    <div className="input-field row withoutPadding">
                        <textarea value={this.state.text} required onChange={this.handleChange} maxLength="800" id="textarea2" name="text" className="materialize-textarea validate required s12"></textarea>
                        <label htmlFor="textarea2">Текст сообщения<span className="red-text">*</span></label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
