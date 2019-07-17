import React, { Component } from 'react'
import M from "materialize-css";
import DragNdrop from '../../system/dragNdrop';
import { saveInFirestoreAutoKey, updateInFirestoreByKey } from '../../firebase/firestoreCRUD';
import { SaveInStorageByURL } from '../../firebase/filestorageCRUD';
import { Button  } from 'react-materialize';
import MapAddOffer from '../../system/mapAddOffer';
import {AptAndRoomsForm} from './fieldsForm/Apt&Rooms';

const INITIAL_STATE = {
    offerInfo: {
        title: '',
        currency: '$',
        approved: false,
        description:'',
        uid: '',
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
        this.images = [];
    }

    handleChange = (event) => {
        
        let info = Object.assign({}, this.state.offerInfo);    //creating copy of object
        info[event.target.name] = event.target.value;                        //updating value
        this.setState({ offerInfo: info });

    }
    numberValidate = (event) => {
        let field = Object.assign({}, this.state.offerInfo);    //creating copy of object
        field[event.target.name] = Number(event.target.value).toLocaleString()                      //updating
        this.setState({ offerInfo: field });

    }
    handleSubmit = (event) => {
        event.preventDefault();
        formValidate(this.form).then((validateRes)=>{
            if (this.images && !this.state.error && !validateRes) { 
                this.submitToStorage('offers');
            } else {
                let system = Object.assign({}, this.state.system);    //creating copy of object
                system.noImages = 'someothername';                   //updating value
                this.setState({ system });
            }
        })
    }
    saveInStorage = () => {
        this.setState({ system: { saving: true } })
        if (this.state.offerInfo.title) {
            this.submitToStorage('savedOffers');  
        } else {
            let t = document.getElementById('title');
            if (!t.checkValidity()) { t.classList.add("invalid") }
            toastMsg('Пожалуйста заполните поле "Заголовок"');
        }

    }
    submitToStorage = (path) => {
        const data = this.state.offerInfo;
        data.uid = this.props.user.uid;
        if(data.savedID){
            updateInFirestoreByKey(`${path}/`, data.savedID, data)
            .then((docRef) => {
                this.afterSecondSaving(docRef,path, data);
            }).catch((error) => {
                this.setState({
                    error: error.massage
                })
            });
        } else {
            saveInFirestoreAutoKey(`${path}/`, data)
            .then((docRef) => {
                this.afterSubmission(docRef,path, data)
            }).catch((error) => {
                this.setState({
                    error: error.massage
                })
            });
        }
        
    }
    addImagesHandler = (images) => {
        this.images = images;
    }

    mapData =(data)=>{
        let offerInfo = Object.assign({}, this.state.offerInfo);    //creating copy of object
        offerInfo.location = data;                   //updating value
        this.setState({ offerInfo });
    }
    afterSubmission = (docRef,path, data) => {
        if (this.images.length !== 0) {
            SaveInStorageByURL(`${path}/${docRef.id}/`, this.state.uid, this.images, docRef.id).then(data => {
                let json = { 'images': data }
                updateInFirestoreByKey(`${path}/`, docRef.id, json)
            }).then(() => {
                this.setState({
                    system: { finished: true }
                });
            })
        } else {
            if(path === 'savedOffers'){
                toastMsg('Сохраненно.');
                data.savedID = docRef.id;
                this.setState({
                    offerInfo: data
                });
            } else {
                this.setState({
                    system: { finished: true }
                });
            }
        }
    }
    afterSecondSaving = (docRef,path, data)=>{
        if (this.images.length !== 0) {
            SaveInStorageByURL(`${path}/${docRef.id}/`, this.state.uid, this.images, docRef.id).then(data => {
                let json = { 'images': data }
                updateInFirestoreByKey(`${path}/`, docRef.id, json)
            }).then(() => {
                this.setState({
                    system: { finished: true }
                });
            })
        } else {
                toastMsg('Сохраненно.');
        }
    }

    componentDidMount = () => {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        const { system, offerInfo } = this.state
        return (
            <>
                {system.finished ?
                    <div className="col s12 m8 l6 offset-m2 offset-l3 ">
                        <div className="center-align green-text ">
                            <br /><br />
                            <h5 >Ваше обьявление успешно отправленно на проверку. <i className="far fa-check-circle "></i></h5>
                        </div>
                    </div>
                    :
                    <>
                        <form onSubmit={this.handleSubmit} noValidate ref={el =>(this.form = el)}>

                            <div className="col s12 m8 l6 offset-m2  offset-l3 ">
                                <div className="center-align"><h5> Добавить новое обьявление.</h5></div>
                                <div className="input-field row withoutPadding">
                                    <input type="text" id="title" required name="title" onChange={this.handleChange} minLength={10} maxLength="80" className="validate col s12 required" />
                                    <label htmlFor="title"><Button tooltip="Мин. длинна: 10 символов.<br>Макс. длинна: 80 символов." className="btnTooltip" tooltipoptions={{ position: 'top' }}>?</Button>Заголовок<span className="red-text">*</span></label>
                                </div>
                                <div className="input-field row ">
                                    <select className="validate col s12 required" id="offerType" name="offer_type_1" onChange={this.handleChange} >
                                        <option value="" defaultValue>Выберите</option>
                                        <option value="Дом">Дом</option>
                                        <option value="Участок">Участок</option>
                                        <option value="Коммерческая недвижимость">Коммерческая недвижимость</option>
                                    </select>
                                    <label htmlFor="offerType">Тип Недвижимости<span className="red-text">*</span></label>
                                </div>
                                <div className="row ">
                                    <div className="input-field col s10 noPadding">
                                        <input className="validate required" type="number" id="price" name="price" pattern="[0-9]*" inputMode="numeric" required onChange={this.numberValidate} />
                                        <label htmlFor="price" >Цена<span className="red-text">*</span></label>
                                    </div>
                                    <div className=" input-field col s2  currency noPadding">
                                        <select id="currency" className="validate col s1 required" name="currency" onChange={this.handleChange}  >
                                            <option value="$" defaultValue>$</option>
                                            <option value="Грн">Грн</option>
                                            <option value="€">€</option>
                                        </select>
                                    </div>
                                    <div className="col s12 m12 red-text noMarginPadding">
                                        {Math.sign(offerInfo.price) === -1 ?<li>Не должно быть отрицательным.</li>:''}
                                    </div>
                                </div>
                                {( ()=> {
                                    switch (offerInfo.offer_type_1 ) {
                                        case 'Дом':
                                            return <AptAndRoomsForm handleChange={this.handleChange} offerInfo={this.state.offerInfo} />;
                                        case 'warning':
                                            return <span>AAAA</span>;
                                        case 'error':
                                            return <span>BBBB</span>;
                                        default:
                                            return null;
                                    }
                                })()}
                                <div className="input-field row withoutPadding">
                                    <textarea required onChange={this.handleChange} maxLength="800" id="textarea2" name="description" className="materialize-textarea validate required s12"></textarea>
                                    <label htmlFor="textarea2">Описание<span className="red-text">*</span></label>
                                    <span hidden={offerInfo.description && offerInfo.description.length !== 0 ? false : true} className="right">{offerInfo.description ? offerInfo.description.length : 0} / 800</span>
                                </div>

                                <div>
                                <h6 className="center-align"><i className="fas fa-images"></i> Фотографии</h6>
                                    <DragNdrop addImage={this.addImagesHandler} required={true} error={system.noImages} />
                                </div>
                            </div>
                            <div id="mapWrap">
                                <MapAddOffer  returnToParent={this.mapData}/>
                            </div>
                            <div className="col s12 m8 l6 offset-m2  offset-l3 ">
                                <button className="waves-effect waves-light btn-small left" onClick={this.saveInStorage} type="button">
                                    Сохранить
                                </button>

                                <button className="waves-effect waves-light btn-small right" type="submit">
                                    Опубликовать
                                </button>
                            </div>
                        </form>

                    </>
                }
            </>
        );
    }
}

async function formValidate(dataForm){
        const form = dataForm.getElementsByClassName("required");
        let error = false;
        for (let field of form) {
            switch (field.type) {
                case 'text':
                case 'tel':
                case 'number':
                case 'textarea':
                    if (!field.value || field.value === "") { 
                        field.classList.add("invalid");
                        error = true;
                    };
                    break;
                case 'select-one':
                    const el = field.parentNode.firstChild
                    if (!el.value || el.value === "Выберите") {
                        el.classList.add("invalid");
                        error = true;
                    }
                    break;
                default:
                    break;
            }
        }
        return error;  
}
function toastMsg(text){
    window.M.toast({html:text}, 14000)
}