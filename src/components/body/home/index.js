import React from 'react'
import RecentOffers from './recentOffers';

export default class Home extends React.Component {


    
  render() {
    return (
      <div>
        <h1>HOME</h1>
        <div>
          <RecentOffers user={this.props.auth}  />
        </div>
      </div>
    )
  }
}
