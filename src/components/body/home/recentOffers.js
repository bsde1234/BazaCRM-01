import React, { Component } from 'react'
import { getOfferCollection, dataSnapshot } from '../../firebase/firestoreCRUD';
import { Preloader } from '../../system/preloader';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-materialize';
import FavoriteOffers from '../../system/favoriteOffers';

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
            dataSnapshot(`favOffers`, this.props.auth.uid).onSnapshot((doc)=> {
                resolve(doc.data());
           })
        })
    }
    async  getData() {
        const offers = await this.getOfferCollection();
        if(this.props.auth){
            const favOffers = await this.getFavItems();
            this.setState({
                offers,
                favOffers: favOffers["offerID"]
            })
        } else {
            this.setState({
                offers
            })
        }


    }

    render() {

        const { offers, loaded } = this.state;
        if (offers.length > 0) {
            return (
                <div>
                    {offers.map((data, idx) => (
                        <div key={idx} className="col l12 m12 s12 offerCardWrap noMarginPadding">
                            <div>
                                <div className="col s4 offerImages noMarginPadding">
                                    {data.images && data.images.length <= 1 ? <img src={data.images[0]} alt='' /> : <Carousel images={data.images.length >=2?data.images.slice(0, 3):data.images} options={{ fullWidth: true, dist: 15, indicators: true, noWrap: true, padding: 10 }} />}
                                </div>
                                <div className="col s6 offerText">
                                    <Link to={{
                                        pathname: `/offerDetails/${data.id}`,
                                        search: '?sort=name',
                                        hash: '#the-hash',
                                    }}>
                                        <h2>{data.title}</h2>
                                    </Link>
                                    <ul>
                                        <li>{data.offer_type_1}</li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                                <div className="col s2 offerPrice center-align">
                                    <div className="addFav "><FavoriteOffers  uid={this.props.auth?this.props.auth.uid: null} offerId={data.id} offersList={this.state.favOffers}/></div>
                                    <div className="offerPrice">{data.price + " " + data.currency}</div>
                                </div>
                            </div>
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



