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
            loaded: false,
            uid: this.props.auth?this.props.auth:''
        }
    }


    componentWillMount(){
        
        if(this.state.uid){ this.getFavItems(this.state.uid); } 

        let offers = [];
        getOfferCollection(this.props.path).then((querySnapshot) => {
            querySnapshot.forEach((offer) => {
                let data = offer.data()
                data.id = offer.id
                offers.push(data)
            })
        }).then( ()=>{
            this.setState({
                offers,
                loaded:true
            },()=>{
                  
                
            })
        })
    }
    getFavItems=(uid)=> {
            dataSnapshot(`favOffers`, uid).onSnapshot((doc)=> {
                this.setState({
                    favOffers: doc.data() ? {...doc.data()} : ''
            })
        })
    }

    componentDidMount(){
      
    }

    render() {

        const { offers, loaded, uid } = this.state;
        
        if (loaded && offers.length > 0 ) {
            return (
                <div>
                    {offers.map((data, idx) => (
                        <div key={idx} className="col l12 m12 s12 offerCardWrap ">
                             
                            {( ()=> {
                                
                                switch (data.offer_type_1) {
                                    case 'Дом':
                                        return <AptRoomsOfferPreview data={data} uid={uid} favOffers={this.state.favOffers} />;
                                    case 'warning':
                                        return <span>AAAA</span>;
                                    case 'error':
                                        return <span>BBBB</span>;
                                    default:
                                        return "NEW";
                                }
                            })()}
                            
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <>
                    {loaded ? <div className="center-align red-text"><h5>Обьявлений не найдено.</h5></div> : <Preloader />}
                </>
            )
        }
    }
}



