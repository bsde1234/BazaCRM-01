import React from 'react'
import RecentOffers from './recentOffers';
import './recentOffers.css';


export default class Home extends React.Component {

 
  render() {
    return (
      <div>
        <h1>HOME</h1>
        <div id="recentOfferWrap">

          <div className="center-align "><h5>Новые обьявления</h5></div>
          <RecentOffers auth={this.props.auth} path="offers"  />
        </div>
      </div>
    )
  }
}
