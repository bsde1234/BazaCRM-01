import React, { Component } from 'react'
import { updateFireStoreArray, deleteFireStoreArrayVal } from '../firebase/firestoreCRUD';


export default class FavoriteOffers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            offersList: this.props.offersList
        };
        
    }

    updateFavOffer(offerId) {
        if(!this.props.uid){
            window.M.toast({html:'Пожалуйста выполните вход.'}, 14000)
        } else {
            if (this.state.offersList.includes(offerId)) {
                deleteFireStoreArrayVal(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                    window.M.toast({html:'Удаленно из Избранного.'}, 14000)
                    var array = [...this.state.offersList]; // make a separate copy of the array
                    var index = array.indexOf(offerId)
                    if (index !== -1) {
                      array.splice(index, 1);
                      this.setState({offersList: array});
                    }
                });
            } else {
                updateFireStoreArray(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                    window.M.toast({html:'Добавленно в Избранное.'}, 14000)
                    let array = [...this.state.offersList]; // make a separate copy of the array
                    array.push(offerId)
                    this.setState({offersList: array});
                    
                })
            }
        }
    }

    render() {

        return (
            <>
                <div onClick={() => this.updateFavOffer(this.props.offerId)}>{this.state.offersList && this.state.offersList.includes(this.props.offerId)?<i className="far fa-star inherit" ></i>:<i className="fas fa-star inherit"></i>}</div>
            </>
        )
    }
}
