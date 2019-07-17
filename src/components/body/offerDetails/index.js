
import React, { Component } from 'react'
import { AptRoomsOfferDetails } from './offerTypes/AptAndRooms';
import './offerDetails.css';
import { getDataByKey } from '../../firebase/firestoreCRUD';
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

    getDetailPage = (type) => {
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
        getDataByKey('offers', key)
            .then(data=>{
                if(data)
                this.setState({
                    offerInfo: {...data}
                }, ()=>{this.getDetailPage(data.offer_type_1)})
                else 
                this.setState({
                    error: true
                })
            })
            .catch(error=>{console.log(error)})
    } 

    render() {
        const {offerInfo, uid , favOffers} = this.state;
        return (
            <>
                {offerInfo && offerInfo.offer_type_1?this.getDetailPage(offerInfo.offer_type_1):this.getOfferData(this.state.offerKey)}
                {this.state.error&&
                    <div className="center-align">
                        <h3><i className="far fa-sad-cry"></i> Обьявление не найдено <i className="far fa-sad-cry"></i></h3>
                        <Link to="/home"><button className="btn grey darken-3 white-text  " ><i class="fas fa-home"></i> На главную</button></Link>    
                    </div>
                    
                }
            </>
        )
    }
}
