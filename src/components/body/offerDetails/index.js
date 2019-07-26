
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
            ...this.props.location.state,
            offerKey: new URLSearchParams(this.props.location.search).get('id')
        }
    }

    componentWillMount(){
        if(!this.state.offerInfo) {
            this.main() 
        } else {
            this.getUserInfo(this.state.offerInfo.uid).then(userInfo => {
                this.setState({
                    userInfo:{...userInfo.userInfo},
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
        this.getOfferData(this.state.offerKey)

        .then(offerData=>{
            if(offerData){ 
                data.offerInfo = {...offerData};
                this.getUserInfo(offerData.uid)
                .then(userInfo => {
                    data.userInfo = {...userInfo.userInfo};
    
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
        
    }

    render() {
        return (
            <>
                {   
                    this.state.loaded&&this.getDetailPage(this.state.offerInfo.offer_type_1)
                }
                {this.state.error&&
                    <div className="center-align">
                        <h3><i className="far fa-sad-cry"></i> Обьявление не найдено <i className="far fa-sad-cry"></i></h3>
                        <Link to="/home"><button className="btn grey darken-3 white-text  " ><i className="fas fa-home"></i> На главную</button></Link>    
                    </div>
                    
                }
            </>
        )
    }
}
