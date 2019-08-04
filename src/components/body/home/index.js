import React from 'react'
import RecentOffers from './recentOffers';
import './recentOffers.css';


export const Home = (props) =>  {

    return (
      <div>
        <h1>HOME</h1>
        <div id="recentOfferWrap">
          <div className="center-align "><h5>Новые обьявления</h5></div>
          <RecentOffers auth={props.auth} path="offers"  />
        </div>
      </div>
    )
  }

