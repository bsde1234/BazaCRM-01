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
        if (this.state.offersList.includes(offerId)) {
            deleteFireStoreArrayVal(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                console.log("Removed");

            });
        } else {
            updateFireStoreArray(`favOffers/`, this.props.uid, 'offerID', offerId).then(() => {
                console.log("Updated");
            })
        }
    }

    render() {

        return (
            <div onClick={() => this.updateFavOffer(this.props.offerId)}>
                Add to Fav
            </div>
        )
    }
}
