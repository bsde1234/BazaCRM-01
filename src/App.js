import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation';
import {Home} from './components/body/home';
import firebase from './components/system/fireConfig'
import { AuthUserContext } from './components/auth/session';
import PasswordForgetForm from './components/auth/forgetPassword';
import { PrivateRoute } from './components/navigation/privateRoute';
import Profile from './components/body/profile';
import PageNotFound from './components/navigation/404'
import { AuthProtectedRoute } from './components/navigation/authProtectedRoute';
import { Preloader } from './components/system/preloader';
import AddOfferIndex from './components/body/addOffer';
import MessageMain from './components/auth/message';
import OfferDetails from './components/body/offerDetails';
import { PublicRoute } from './components/navigation/publicRoute';
import Authentication from './components/auth/authentication';
import { getDataByKey } from './components/firebase/firestoreCRUD';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      complete:false
    };
    
    this.listener = firebase.auth().onAuthStateChanged(
      authUser => {

          if(authUser && authUser.emailVerified){
            getDataByKey('users', authUser.uid).then((userInfo)=>{
              this.setState({ authUser, ...userInfo, complete:true })
            })
              
          }
          else {
            this.setState({ authUser: null,complete:true });
          }
      },error=>console.log("ERROR: ", error), complete=>console.log('complete',complete)
    )
  }

  componentWillUnmount() {
    this.listener();
  }
  render() {

    if(this.state.complete){
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <BrowserRouter>
          <div className="row">
            <Navbar />
            <div className="container">
              <Switch>
                <PublicRoute key="home1" exact path="/"  auth={this.state.authUser?this.state.authUser.uid:''} component={Home} />
                <PublicRoute key="home2" exact path="/home" auth={this.state.authUser?this.state.authUser.uid:''} component={Home} />
                <PublicRoute exact path='/details' userInfo={this.state.userInfo}  auth={this.state.authUser} component={OfferDetails} />
                <PrivateRoute path='/addoffer' auth={this.state.authUser} component={AddOfferIndex} />
                <PrivateRoute path='/message' userInfo={this.state.userInfo} auth={this.state.authUser}  component={MessageMain} />
                <AuthProtectedRoute path='/authentication' auth={this.state.authUser} component={Authentication} />
                <AuthProtectedRoute path='/forgetPassword' component={PasswordForgetForm} />
                <PrivateRoute path="/profile" userInfo={this.state.userInfo} auth={this.state.authUser}  component={Profile} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
        
      </AuthUserContext.Provider>
    );
  }else return (
    <Preloader/>
  )
} 
}

export default App;





