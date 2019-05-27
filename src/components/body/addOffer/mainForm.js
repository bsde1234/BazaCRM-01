import React, { Component } from 'react'
import M from "materialize-css";
import DragNdrop from '../../system/dragNdrop';
import { saveInFirestoreAutoKey, updateInFirestoreByKey } from '../../firebase/firestoreCRUD';
import { SaveInStorageByURL } from '../../firebase/filestorageCRUD';


const INITIAL_STATE = {
    title: '',
    isInvalid: false,
    offer_type_1: '',
    data_created: new Date(),
    approved: false,
    successSubmited: false,
    error: ''

};

export default class AddOfferMainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            uid: this.props.user.uid
        };
        let images = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addImagesHandler = this.addImagesHandler.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        saveInFirestoreAutoKey('offers/', this.state)
            .then((docRef) => {
                if (this.images) {
                    SaveInStorageByURL(`offers/${docRef.id}/`, this.state.uid, this.images, docRef.id).then(data => { 
                        let json = {'images': data}
                        updateInFirestoreByKey(`offers/`,docRef.id, json)
                     })
                } else { this.setState({
                    successSubmited: true
                }) }
            })
            .catch(function (error) {
                this.setState({
                    error
                })
            });

    }

    addImagesHandler(images) {
        this.images = images;

    }
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }
    render() {

        return (
            <>
                <form onSubmit={this.handleSubmit} className="col s8 offset-s2 ">
                    <div className="input-field">
                        <label htmlFor="title">Заголовок</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field ">
                        <select name="offer_type_1" onChange={this.handleChange}>
                            <option value="" defaultValue >Веберите</option>
                            <option value="Дом">Дом</option>
                            <option value="Участок">Участок</option>
                            <option value="Коммерческая недвижимость">Коммерческая недвижимость</option>
                        </select>
                        <label>Тип Недвижимости</label>
                    </div>
                    <div>
                        <DragNdrop addImage={this.addImagesHandler} />
                    </div>
                    <button className="waves-effect waves-light btn-small " disabled={this.state.isInvalid} type="submit">
                        Сохранить
                </button>
                    <button className="waves-effect waves-light btn-small " disabled={this.state.isInvalid} type="submit">
                        Опубликовать
                </button>
                <div className="test"></div>
                </form>
               
            </>
        );
    }
}

