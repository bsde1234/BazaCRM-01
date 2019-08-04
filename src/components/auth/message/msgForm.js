import React, { Component } from 'react'
import { saveInFirestoreByKey } from '../../firebase/firestoreCRUD';


export default class MsgForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            uid: this.props.uid,
            file: '',
            recipient: this.props.recipient,
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
            saveInFirestoreByKey(`messages/${this.state.uid}/${this.state.recipient}`, this.state ).then(()=>{
                saveInFirestoreByKey(`messages/${this.state.recipient}/${this.state.uid}`, this.state ).then(()=>{
                    this.setState({
                        text: ''
                    })
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
                        <textarea required onChange={this.handleChange} maxLength="800" id="textarea2" name="text" className="materialize-textarea validate required s12"></textarea>
                        <label htmlFor="textarea2">Описание<span className="red-text">*</span></label>
                        
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
