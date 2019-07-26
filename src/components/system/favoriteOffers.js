import React, { Component } from 'react'
import { updateFireStoreArray, deleteFireStoreArrayVal,createFireStoreArray } from '../firebase/firestoreCRUD';

export default class FavoriteOffers extends Component {


    updateFavOffer(offerId) {
        if(!this.props.uid){
            this.showToast("<a href='/authentication' style={color: #fff}>Пожалуйста выполните вход.</a>", "toastChild")
        } else {
            if (this.props.offersList && this.props.offersList.includes(offerId)) { 
                deleteFireStoreArrayVal(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                    this.showToast('Удаленно из Избранного.')
                })
                .catch('');
            } else {
                if(this.props.offersList){
                    updateFireStoreArray(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                        this.showToast('Добавленно в Избранное.')
                    })
                } else {
                    createFireStoreArray(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                        this.showToast('Добавленно в Избранное.')
                    })
                }
            }
        }
    }
    showToast=(text, className)=>{
        window.M.toast({html: `${text}`, classes: `${className}`})
    }
    render() {

        return (
            <>
                <div title="Добавить обьявление в избранные." onClick={() => this.updateFavOffer(this.props.offerId)}>{this.props.offersList && this.props.offersList.includes(this.props.offerId)?<i className="far fa-star inherit amber-text" ></i>:<i className="fas fa-star inherit "></i>}</div>
            </>
        )
    }
}
