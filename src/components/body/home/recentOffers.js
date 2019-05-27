import React, { Component } from 'react'
import { getCollection } from '../../firebase/firestoreCRUD';
import { Preloader } from '../../system/preloader';
import { Link } from 'react-router-dom'

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
                data.id = offer.id
                offers.push(data)
            })
        }).then(() => {
            this.setState({
                offers,
                loaded: false
            })
        })
    }

    render() {
        console.log(this.state.offers)
        const {offers,loaded} = this.state
        if (offers.length > 0) {
            return (
                <div>
                    {offers.map((data, idx) => (
                        <div key={idx} className="col l4 m6 s12 offerCardWrap">
                        <Link to={{
                            pathname: `/offerDetails/${data.id}`,
                            search: '?sort=name',
                            hash: '#the-hash',
 
                        }}> 
                        <div className="offerContainer">
                        <img src={data.images} className="responsive-img" width="100%" alt=""/>
                            <p className="center-align">{data.title}</p> 
                        </div>
                        </Link>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <>
                <div hidden={loaded?false:true}><h5>No records found.</h5></div>
                <br/>
                <Preloader hidden={!loaded?false:true}/>
                </>
            )
        }
    }
}



