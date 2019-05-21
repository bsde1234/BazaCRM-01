import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation';
import Home from './components/body/home';
import SignUpForm from './components/auth/signUp';
import SignInForm from './components/auth/signIn';
import firebase from './components/system/fireConfig'
import { AuthUserContext } from './components/auth/session';
import PasswordForgetForm from './components/auth/forgetPassword';
import { PrivateRoute } from './components/navigation/privateRoute';
import Profile from './components/body/profile';
import PageNotFound from './components/navigation/404'
import { AuthProtectedRoute } from './components/navigation/authProtectedRoute';
import { Preloader } from './components/system/preloader';
import AddOfferIndex from './components/body/addOffer';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      complete:false
    };
    
    this.listener = firebase.auth().onAuthStateChanged(
      authUser => {
          authUser && authUser.emailVerified
            ? this.setState({ authUser, complete:true })
            : this.setState({ authUser: null,complete:true })
      },error=>alert("error", error), complete=>console.log('complete',complete)
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
                <Route exact path='/' component={Home} />
                <PrivateRoute path='/addoffer' auth={this.state.authUser} component={AddOfferIndex} />
                <AuthProtectedRoute path='/signUp' auth={this.state.authUser} component={SignUpForm} />
                <AuthProtectedRoute path='/signIn' auth={this.state.authUser} component={SignInForm} />
                <Route path='/forgetPassword' component={PasswordForgetForm} />
                <PrivateRoute path="/profile" auth={this.state.authUser}  component={Profile} />
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





