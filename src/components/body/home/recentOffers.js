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
                        <div key={idx} className="col l12 m12 s12 offerCardWrap">
                            <div>
                                <div className="col s4 offerImages">
                                    <Link to={{
                                        pathname: `/offerDetails/${data.id}`,
                                        search: '?sort=name',
                                        hash: '#the-hash',
                                    }}> 

{ data.images
? <>{data.images.map((image,idx) => <img src={image} key={idx}  className="responsive-img" />)}</>
: <img src="https://firebasestorage.googleapis.com/v0/b/baza-001.appspot.com/o/system%2Foffer%2Fno_img.jpg?alt=media&token=858085c4-4e36-42d5-b909-cca5a4966ff0"  className="responsive-img" />

}


                                    </Link>
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
                                <div className="col s2 offerPrice">Price</div>
                            </div>
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



