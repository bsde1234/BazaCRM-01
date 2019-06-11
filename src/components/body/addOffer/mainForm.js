import React, { Component } from 'react'
import M from "materialize-css";
import DragNdrop from '../../system/dragNdrop';
import { saveInFirestoreAutoKey, updateInFirestoreByKey } from '../../firebase/firestoreCRUD';
import { SaveInStorageByURL } from '../../firebase/filestorageCRUD';
import { Button } from 'react-materialize';
import MapView from '../../system/MapView';


const INITIAL_STATE = {
    offerInfo: {
        title: '',
        offer_type_1: '',
        price: '',
        currency: '$',
        description: '',
        data_created: '',
        nameToSave: '',
        approved: false,
        uid:''
    },
    system: {
        finished: false,
        saving: false,
        isInvalid: false,
        Globalerror: '',
        successSubmited: false,
        noImages: '',
        error: ''
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
        let info = Object.assign({}, this.state.offerInfo);    //creating copy of object
        info[event.target.name] = event.target.value;                        //updating value
        this.setState({ offerInfo: info });
        console.log(this.state)
    }
    numberValidate(event) {
        let field = Object.assign({}, this.state.offerInfo);    //creating copy of object
        field[event.target.name] = Number(event.target.value).toLocaleString()                      //updating value
        this.setState({ offerInfo: field });

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
    saveInStorage(event) {
        this.setState({system:{saving:true}})
        if (this.state.offerInfo.title) {
            this.submitToStorage('savedOffers');
        } else {
            let t = document.getElementById('title');
           if(!t.checkValidity()){t.classList.add("invalid")}

        }

    }
    submitToStorage(path) {
        const data = this.state.offerInfo;
        data.data_created = new Date();
        data.uid = this.props.user.uid;
        saveInFirestoreAutoKey(`${path}/`, data)
            .then((docRef) => {
                if (this.images.length !== 0) {
                    SaveInStorageByURL(`${path}/${docRef.id}/`, this.state.uid, this.images, docRef.id).then(data => {
                        let json = { 'images': data }
                        updateInFirestoreByKey(`${path}/`, docRef.id, json)
                    }).then(() => {
                        this.setState({
                            system: { finished: true }
                        })
                    })
                } else {
                    this.setState({
                        system: { finished: true }
                    });
                }
            }).catch((error) => {
                this.setState({
                    error: error.massage
                })
            })
    }
    addImagesHandler(images) {
        this.images = images;

    }
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        const { system, offerInfo } = this.state
        return (
            <>
                {system.finished ?
                    <div className="center-align green-text">
                    <br/><br/>
                        <h5 >Ваше обьявление успешно отправленно на проверку. <i className="far fa-check-circle "></i></h5>
                    </div>
                    :   
                    
                    <form onSubmit={this.handleSubmit} >
                        <div className="center-align"><h5> Добавить новое обьявление.</h5></div>
                        <div className="input-field row withoutPadding">
                            <input type="text" id="title" required name="title" onChange={this.handleChange} minLength={10} maxLength="80" className="validate col s12" />
                            <label htmlFor="title"><Button tooltip="Мин. длинна: 10 символов.<br>Макс. длинна: 80 символов." className="btnTooltip" tooltipoptions={{ position: 'top' }}>?</Button>Заголовок<span className="red-text">*</span></label>
                        </div>

                        <div className="input-field row withoutPadding">
                            <select className=" validate col s12" id="offerType" name="offer_type_1" onChange={this.handleChange} >
                                <option value="" defaultValue  >Веберите</option>
                                <option value="Дом">Дом</option>
                                <option value="Участок">Участок</option>
                                <option value="Коммерческая недвижимость">Коммерческая недвижимость</option>
                            </select>
                            <label htmlFor="offerType">Тип Недвижимости<span className="red-text">*</span></label>
                        </div>

                        <div className="row withoutPadding">

                            <div className="input-field col s10 noMarginPadding">
                                <input className="validate" type="number" id="price" name="price" pattern="[0-9]*" inputMode="numeric" required onChange={this.numberValidate} />
                                <label htmlFor="price" >Цена<span className="red-text">*</span></label>
                            </div>

                            <div className=" input-field col s2 noMarginPadding currency">
                                <select id="currency" className="validate col s1" name="currency" onChange={this.handleChange}  >
                                    <option value="$" defaultValue>$</option>
                                    <option value="Грн">Грн</option>
                                    <option value="€">€</option>
                                </select>

                            </div>
                        </div>

                        <div className="input-field row withoutPadding">
                            <textarea required onChange={this.handleChange} maxLength="800" id="textarea2" name="description" className="materialize-textarea validate  s12"></textarea>
                            <label htmlFor="textarea2">Описание<span className="red-text">*</span></label>
                            <span hidden={offerInfo.description.length !== 0 ? false : true} className="right">{offerInfo.description.length} / 800</span>
                        </div>

                        <div>
                            <DragNdrop addImage={this.addImagesHandler} required={true} error={system.noImages} />

                        </div>
                        {system.saving && offerInfo.title.length<10?<div className="red-text center-align">Пожалуйста заполните поле "Заголовок".<br/><br/></div>:''}
                        <button className="waves-effect waves-light btn-small left" onClick={this.saveInStorage}  type="button">
                            Сохранить
                        </button>

                        <button className="waves-effect waves-light btn-small right" type="submit">
                            Опубликовать
                        </button>
                    <div>
                    <MapView
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVx04MozqTwq0ikjuernD5cuubbM6UQSM&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{width:`100%`, height: `100%` }} />}
                        containerElement={<div style={{width:`100%`, height: `400px` }} />}
                        mapElement={<div style={{width:`100%`, height: `100%` }} />}
                    />
                    </div>
                    </form>
                     
                    
                }
            </>
        );
    }
}