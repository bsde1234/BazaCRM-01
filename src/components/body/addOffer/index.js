import React, { Component } from 'react'
import { Preloader } from '../../system/preloader';
import AddOfferMainForm from './mainForm';
import './addOffer.css'


export default class AddOfferIndex extends Component {

  constructor(props){
    super(props);
    this.state ={
        complete: false
    };
  }
  componentDidMount(){
    if(this.props.auth.uid){
        this.setState({
            complete:true
        })
    }
  }
  render() {
    return (
      <div className="">
        <div className="col s12 ">
          <div className="center-align"><h5> Добавить новое обьявление.</h5></div>
          <br/>
          {!this.state.complete?
            <Preloader /> :
            <AddOfferMainForm user={this.props.auth} hidden={this.state.complete?true:true}/>
          }
        </div>
      </div>
    )
  }
}
