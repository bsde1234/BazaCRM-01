import React, { Component } from 'react'
import { getCollection } from '../../firebase/firestoreCRUD';
import { Preloader } from '../../system/preloader';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-materialize';

export default class RecentOffers extends Component {

    state = {
        offers: [],
        error: '',
        loaded: false
    }
    componentWillMount() {
        let offers = [];
        if (this.props.path) {
            getCollection(this.props.path).then((querySnapshot) => {
                querySnapshot.forEach((offer) => {

                    let data = offer.data()
                    data.id = offer.id
                    offers.push(data)
                })
            }).then(() => {
                this.setState({
                    offers,
                    loaded: false
                })
            }).catch(error=>{console.log(error);
            this.setState({
                loaded : true
            })})
        } 
    }
    render() {

        const { offers, loaded } = this.state
        if (offers.length > 0) {
            return (
                <div>

                    {offers.map((data, idx) => (
                        <div key={idx} className="col l12 m12 s12 offerCardWrap noMarginPadding">
                            <div>
                                <div className="col s4 offerImages noMarginPadding">
                                    {data.images.length <= 1 ? <img src={data.images[0]} alt='' /> : <Carousel images={data.images} options={{ fullWidth: true, dist: 15, indicators: true, noWrap: true, padding: 10 }} />}



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
                                <div className="col s2 offerPrice">
                                    Цена: {Number(data.price).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            )
        } else {
            return (
                <>
                    
                    {loaded?<div className="center-align red-text"><h5>No records found.</h5></div>:<Preloader  />}
                    
                </>
            )
        }
    }
}



