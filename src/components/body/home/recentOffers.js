import React, { Component } from 'react'
import { getOfferCollection, dataSnapshot } from '../../firebase/firestoreCRUD';
import { Preloader } from '../../system/preloader';
import {AptRoomsOfferPreview} from './offerPreview/aptAndRooms';

export default class RecentOffers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            error: '',
            loaded: false
        }

        this.getData();

    }

    getOfferCollection() {
        let offers = [];
        return new Promise(resolve => {
            getOfferCollection(this.props.path).then((querySnapshot) => {
                querySnapshot.forEach((offer) => {
                    let data = offer.data()
                    data.id = offer.id
                    offers.push(data)
                    resolve(offers);
                })
            })
        })
    }
    getFavItems() {
        return new Promise(resolve => {
            dataSnapshot(`favOffers`, this.props.auth.uid).onSnapshot((doc) => {
                resolve(doc.data());
            })
        })
    }

    async  getData() {
        const offers = await this.getOfferCollection();
        if (this.props.auth) {
            await this.getFavItems().then((favOffers) => {
                this.setState({
                    offers,
                    favOffers: favOffers ? favOffers["offerID"] : '',
                    loaded: true
                })
            })
        } else {
            this.setState({
                offers,
                loaded: true
            })
        }
    }

    render() {

        const { offers, loaded } = this.state;

        if (offers.length > 0) {
            return (
                <div>
                    {offers.map((data, idx) => (
                        <div key={idx} className="col l12 m12 s12 offerCardWrap ">
                             
                            {( ()=> {
                                
                                switch (data.offer_type_1) {
                                    case 'Дом':
                                        return <AptRoomsOfferPreview data={data} favOffers={this.state.favOffers} />;
                                    case 'warning':
                                        return <span>AAAA</span>;
                                    case 'error':
                                        return <span>BBBB</span>;
                                    default:
                                        return <AptRoomsOfferPreview data={data} favOffers={this.state.favOffers} />;
                                }
                            })()}
                            
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <>
                    {loaded ? <div className="center-align red-text"><h5>No records found.</h5></div> : <Preloader />}
                </>
            )
        }
    }
}



