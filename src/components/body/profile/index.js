import React, { Component } from 'react'
import { Link} from 'react-router-dom';
import MainUserInfo from './mainUserInfo';


export default class Profile extends Component {

  render() {
    return (
      <div className="row">

        <div className="col s6 left">
          <div className="center-align"><h5>Информация о пользователе</h5><br/></div>
            <MainUserInfo user={this.props}/>
        </div>
        <div className="col s4 right">
          <ul className="collection">
            <li className="collection-item"><Link to="/favAd">Избранные обьявления</Link></li>
            <li className="collection-item">Alvin</li>
            <li className="collection-item">Alvin</li>
            <li className="collection-item">Alvin</li>
          </ul>
        </div>
      </div>
    )
  }
}
