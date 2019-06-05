import React, { Component } from 'react'
import { getSavedOffers, deleteInFirestoreByKey } from '../../firebase/firestoreCRUD';
import { Link } from 'react-router-dom';
export default class SavedOffers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            savedOffers: []
        };

    }

    componentDidMount() {
        let savedOffers = [];
        getSavedOffers(this.props.uid).then(dataSnapshot => {
            dataSnapshot.forEach(offer => {
                let data = offer.data()
                data.id = offer.id
                savedOffers.push(data);

            })
        }).catch(error => { console.log(error) })
            .finally(() => {
                this.setState({
                    savedOffers: savedOffers
                });
            })
    }
    delete(event){
        let key = event.target.getAttribute("data")
        let parent = event.currentTarget.parentNode;

        deleteInFirestoreByKey('savedOffers',key).then(()=>{
            parent.innerHTML = "Удалено";
        });
    }
    render() {
        return (
            <ul id="recentOffersList">
                {this.state.savedOffers.length !== 0? this.state.savedOffers.map((offer, idx) => (
                    <li key={idx}>
                        <Link to={{
                            pathname: `/offerDetails/${offer.id}`,
                            search: '?sort=name',
                            hash: '#the-hash',
                        }}>
                            <i className="fas fa-edit left" title="Редактировать"></i>
                            {offer.title}
                        </Link>
                        <i className="fas fa-trash-alt right" title="Удалить" data={offer.id}  onClick={this.delete}></i>
                    </li>
                )
                ) : <li className="center-align">Нет сохраненных форм.</li>
                }
            </ul>
        )
    }
}
