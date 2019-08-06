
import React, { Component } from 'react'
import { AptRoomsOfferDetails } from './offerTypes/AptAndRooms';
import './offerDetails.css';
import { getDataByKey, dataSnapshot } from '../../firebase/firestoreCRUD';
import { Link } from 'react-router-dom';

export default class OfferDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.auth?this.props.auth.uid:'',
            userInfo: this.props.userInfo?this.props.userInfo:'',
            ...this.props.location.state,
            offerKey: new URLSearchParams(this.props.location.search).get('id')
        }
    }

    componentWillMount(){ 
        if(!this.state.offerInfo) {
            this.main();
        } else {
            this.getUserInfo(this.state.offerInfo.uid).then(recipientInfo => {
                let data = {...recipientInfo.userInfo};
                data.uid = this.state.offerInfo.uid;
                this.setState({
                    recipientInfo:{...data},
                    loaded:true
                })
            });
        }
    }
    getDetailPage(type){ 
        switch (type) {
            case 'Дом':
                return <AptRoomsOfferDetails {...this.state} />;
            case 'warning':
                return <span>AAAA</span>;
            case 'error':
                return <span>BBBB</span>;
            default:
                return "Ошибка";
        }
    }

    getOfferData =(key)=>{
        if(key){ 
        return getDataByKey('offers', key)
            .then(data=>{
                if(data){           
                    return data;
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
            .catch(error=>{console.log(error)})
        } 
    }

    getFavItems=(uid)=> {
        dataSnapshot(`favOffers`, uid).onSnapshot((doc)=> {
            this.setState({
                favOffers: {...doc.data()},
            });
        })
    }

    getUserInfo(uid){
        return getDataByKey('users', uid)
    }

    main=()=>{ 
        let data = {};
        if(this.state.offerKey)
        
        this.getOfferData(this.state.offerKey).then(offerData=>{
            if(offerData){ 
                data.offerInfo = {...offerData};
                this.getUserInfo(offerData.uid)
                .then(recipientInfo => {
                    data.recipientInfo = {...recipientInfo.userInfo};
                    data.recipientInfo.uid = offerData.uid;
                    
                    if(this.state.uid){
                        this.getFavItems(this.state.uid);
                    } 
                    this.setState({
                        ...data,
                        loaded:true
                    }, ()=>{this.getDetailPage(offerData.offer_type_1)})
    
    
                }).then(()=>{
                    }).catch(error => {
                    this.setState({
                        userErrorMsg: "Данные владельца обьявления не найдены."
                    })
                })
            }
        });
        else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        return (
            <>
            
            <br/>
                <div className="row ">
                    <div className="col s12 ">
                        <div className="col s6 backBtn noMarginPadding">
                            {this.state.url?<div className="btn grey darken-3  btn-small" onClick={(e)=>{this.props.goBack()}}><i className="fas fa-chevron-left"></i> Назад</div> : <Link to="/"><div className="btn grey darken-3  btn-small"><i className="fas fa-home"></i> На главную</div></Link> }
                        </div>
                    </div>
                </div>
                {   
                    this.state.loaded&&this.getDetailPage(this.state.offerInfo.offer_type_1)
                }
                {this.state.error&&
                    <div className="center-align">
                        <h3><i className="far fa-sad-cry"></i> Обьявление не найдено <i className="far fa-sad-cry"></i></h3>
                    </div>
                    
                }
            </>
        )
    }
}
