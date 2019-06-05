import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import MainUserInfo from './mainUserInfo';
import { getDataByKey } from './../../firebase/firestoreCRUD/';
import './profile.css';
import { Collapsible, CollapsibleItem, Preloader } from 'react-materialize';
import SavedOffers from './savedOffers';



export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };

  }

  componentDidMount() {
    const uid = this.props.auth.uid;
    getDataByKey('users/', uid).then((userInfo) => {
      userInfo.uid = uid
      this.setState({
        userInfo,
        complete: true
      })
    }).then(()=>{
    }).catch(error=>{console.log("ERROR", error)})
  }
  render() {
    const  userInfo  = this.state;
    return (
      <div className="row">
        <div className="col s12 m6 l6 left">
          <div className="center-align"><h5><i className="far fa-address-card"></i> Информация о пользователе</h5></div>

          {!this.state.complete ?
            <div className="center-align">
              <Preloader size="big" />
            </div>
            :
            <MainUserInfo user={userInfo.userInfo} hidden={this.state.complete ? true : true} />
          }
        </div>
        <div className="col s12 m6 l6 right">
          <div className="center-align"><h5><i className="far fa-address-card"></i> Допольнительная информация</h5></div>

          <Collapsible >
            <div className="collapsible-item"><Link to="/myoffers" id="myOffers">Мои обьявления</Link></div>
            <div className="collapsible-item"><Link to="/favAd" id="favOffers">Избранные обьявления</Link> </div>
            <CollapsibleItem header="Cохраненные обьявления" >
            <SavedOffers uid={this.props.auth.uid}></SavedOffers>
            </CollapsibleItem>
          </Collapsible>

        </div>
      </div>
    )
  }
}
