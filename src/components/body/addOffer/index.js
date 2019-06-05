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
          {!this.state.complete?
            <Preloader /> :
            <div className="col s12 m8 l6 offset-m2  offset-l3 ">
              <AddOfferMainForm user={this.props.auth} hidden={this.state.complete?true:true}/>
            </div>

          }
        </div>
      </div>
    )
  }
}
