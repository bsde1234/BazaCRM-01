import React, { Component } from 'react'
import { updateFireStoreArray, deleteFireStoreArrayVal,createFireStoreArray } from '../firebase/firestoreCRUD';
import { Link } from 'react-router-dom';

export default class FavoriteOffers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            offersList: this.props.offersList
        };
    }

    updateFavOffer(offerId) {
        if(!this.props.uid){
            window.M.toast({html:"<a href='/authentication' style={color: #fff}>Пожалуйста выполните вход.</a>",classes:"toastChild"})
        } else {
            if (this.state.offersList && this.state.offersList.includes(offerId)) { 
                deleteFireStoreArrayVal(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                    window.M.toast({html:'Удаленно из Избранного.'})
                    var array = [...this.state.offersList]; // make a separate copy of the array
                    var index = array.indexOf(offerId)
                    if (index !== -1) {
                      array.splice(index, 1);
                      this.setState({offersList: array});
                    }
                });
            } else {
                if(this.state.offersList){
                    updateFireStoreArray(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                        window.M.toast({html:'Добавленно в Избранное.'})
                        let array = [...this.state.offersList]; // make a separate copy of the array
                        array.push(offerId)
                        this.setState({offersList: array});
                    })
                } else {
                    createFireStoreArray(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                        window.M.toast({html:'Добавленно в Избранное.'})
                        let array = [...this.state.offersList]; // make a separate copy of the array
                        array.push(offerId)
                        this.setState({offersList: array});
                    })
                }
            }
        }
    }

    render() {

        return (
            <>
                <div onClick={() => this.updateFavOffer(this.props.offerId)}>{this.state.offersList && this.state.offersList.includes(this.props.offerId)?<i className="far fa-star inherit amber-text" ></i>:<i className="fas fa-star inherit "></i>}</div>
            </>
        )
    }
}
