import React, { Component } from 'react'
import { getCollection } from '../../firebase/firestoreCRUD';

export default class RecentOffers extends Component {

    state = {
        offers: [],
        error: '',
        loaded: false
    }



    componentWillMount() {
        let offers = []
        getCollection('offers').then((querySnapshot) => {
            querySnapshot.forEach((offer) => {
                let data = offer.data()
                offers.push(data)
            })
        }).then(() => {
            this.setState({
                offers
            })
        })
    }

    render() {
        console.log( this.state.offers)
        const {offers} = this.state
        if (offers.length > 0) {
            return (
                <div>
                    <div className="center-align"><h5>Recent Offers</h5></div>
                    {offers.map((data, idx) => (
                        <div key={idx}>{data.title}</div>
                    ))}
                </div>
            )
        } else {
            return (
                <div><h5>No records found.</h5></div>
            )
        }
    }
}



