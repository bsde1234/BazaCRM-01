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
      <div className="addOfferMainWrap">
        <div className="col s12 ">
          {!this.state.complete?
            <Preloader /> :
              <AddOfferMainForm user={this.props.auth} hidden={this.state.complete?true:false}/>
          }
        </div>
      </div>
    )
  }
}
