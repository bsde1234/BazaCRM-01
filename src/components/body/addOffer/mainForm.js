import React, { Component } from 'react'
import M from "materialize-css";
import DragNdrop from '../../system/dragNdrop';
import { saveInFirestoreAutoKey, updateInFirestoreByKey } from '../../firebase/firestoreCRUD';
import { SaveInStorageByURL } from '../../firebase/filestorageCRUD';
import { Button,Modal } from 'react-materialize';


const INITIAL_STATE = {
    title: '',
    offer_type_1: '',
    price: '',
    currency: '',
    description: '',
    isInvalid: false,
    data_created: new Date(),
    approved: false,
    error: '',
    nameToSave: '',
    saving: false,
    system: {
        Globalerror: '',
        successSubmited: false,
        noImages: ''
    }

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
        this.numberValidate = this.numberValidate.bind(this);
        this.saveInStorage = this.saveInStorage.bind(this);
        this.submitToStorage = this.submitToStorage.bind(this);
        
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    numberValidate(event){
           this.setState({price: Number(event.target.value).toLocaleString()})
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.images) {
            this.submitToStorage('offers');
        } else {
            let system = Object.assign({}, this.state.system);    //creating copy of object
            system.noImages = 'someothername';                   //updating value
            this.setState({ system });
        }
    }
    saveInStorage(){
        if(this.state.nameToSave && this.state.saving){
            this.submitToStorage('savedOffers');
        } else {
            this.setState({
                saving: true
            })
        }

    }
    submitToStorage(path){
        saveInFirestoreAutoKey(`${path}/`, this.state)
        .then((docRef) => {
            if(this.images.length !== 0){
                SaveInStorageByURL(`${path}/${docRef.id}/`, this.state.uid, this.images, docRef.id).then(data => {
                    let json = { 'images': data }
                    updateInFirestoreByKey(`${path}/`, docRef.id, json)
                })
            }
        }).catch( (error)=> {
            this.setState({
                error: error.massage
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
        const { system,saving } = this.state
        return (
            <>
                <form onSubmit={this.handleSubmit} className="col s6 offset-s3 ">


                    <div className="input-field row withoutPadding">
                        <input type="text" required name="title" onChange={this.handleChange} minLength={10} maxLength="80"  className="validate col s12" />
                        <label htmlFor="last_name" tooltip="I am a tooltip"><Button tooltip="Мин. длинна: 10 символов.<br>Макс. длинна: 80 символов." className="btnTooltip" tooltipoptions={{ position: 'top' }}>?</Button>Заголовок<span className="red-text">*</span></label>
                    </div>

                    <div className="input-field row withoutPadding">
                        <select value={this.state.offer_type_1}  className=" validate col s12" id="offer_type_1" name="offer_type_1" onChange={this.handleChange} >
                            <option value="" disabled defaultValue  >Веберите</option>
                            <option value="Дом">Дом</option>
                            <option value="Участок">Участок</option>
                            <option value="Коммерческая недвижимость">Коммерческая недвижимость</option>
                        </select>
                        <label htmlFor="offer_type_1">Тип Недвижимости<span className="red-text">*</span></label>
                    </div>

                    <div className="row withoutPadding">

                    <div className="input-field col s10 noMarginPadding">
                        <input  className="validate" type="number" pattern="[0-9]*" inputMode="numeric"  required onChange={this.numberValidate}   />
                        <label htmlFor="price" >Цена<span className="red-text">*</span></label>
                    </div>

                    <div className=" input-field col s2 noMarginPadding currency">
                        <select id="currency"    className="validate col s1" name="currency" onChange={this.handleChange}  >
                        <option value="" disabled defaultValue  >Веберите</option>
                            <option value="$">$</option>
                            <option value="Грн">Грн</option>
                            <option value="€">€</option>
                        </select>
                        <label htmlFor="currency">Валюта<span className="red-text">*</span></label>
                    </div>
                </div>

                <div className="input-field row withoutPadding">
                        <textarea required onChange={this.handleChange} maxLength="800" id="textarea2" name="description" className="materialize-textarea validate  s12"></textarea>
                        <label htmlFor="textarea2">Описание<span className="red-text">*</span></label>
                        <span hidden={this.state.description.length !== 0?false:true} className="right">{this.state.description.length} / 800</span>
                </div>



                    <div>
                        <DragNdrop addImage={this.addImagesHandler} required={true} error={system.noImages} />

                    </div>
                    <button className="waves-effect waves-light btn-small modal-trigger" disabled={this.state.isInvalid} href="#modal1" type="button">
                        Сохранить
                    </button>
                        <button className="waves-effect waves-light btn-small " disabled={this.state.isInvalid} type="submit">
                            Опубликовать
                    </button>
                    <div className="test"></div>
             </form>
             <div className="col s6">
                <Modal id="modal1">
                <div className="input-field col s6 withoutPadding">
                        <input type="text" required name="nameToSave" onChange={this.handleChange} minLength={10} maxLength="80"  className="validate col s12" />
                        <label tooltip="I am a tooltip"><Button tooltip="Мин. длинна: 10 символов.<br>Макс. длинна: 80 символов." className="btnTooltip" tooltipoptions={{ position: 'top' }}>?</Button>Название формы<span className="red-text">*</span></label>
                        {this.state.nameToSave}
                    </div>
                </Modal>
             </div>


            </>
        );
    }
}