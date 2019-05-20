import React, { Component } from 'react'
import { Link} from 'react-router-dom';
import MainUserInfo from './mainUserInfo';
import {  dataSnapshot } from './../../firebase/firestoreCRUD/';
import { Preloader } from '../../system/preloader';


export default class Profile extends Component {

  constructor(props){
    super(props);
    this.state ={
      uid: this.props.auth.uid,
      complete: false
    };

    dataSnapshot('users/', this.props.auth.uid).onSnapshot(data => {
      this.setState({
        ...data.data(),
        complete: true
      })
    });
    
  }
  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l8 left">
          <div className="center-align"><h5><i className="far fa-address-card"></i> Информация о пользователе</h5></div>
          <br/>
          {!this.state.complete?
            <Preloader /> :
            <MainUserInfo user={this.state} hidden={this.state.complete?true:true}/>
          }
        </div>
        
        <div className="col s12 m4 l4 right">
        <div className="center-align"><h5><i className="far fa-address-card"></i> Допольнительные функции</h5></div>
          <br/>
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
