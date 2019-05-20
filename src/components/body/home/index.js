import React, { Component } from 'react'
import { getCollection } from '../../firebase/firestoreCRUD';

export default class Home extends Component {
  constructor(){
    super();
    getCollection('users').catch((error)=>{
      console.log(error)
    })
  }
  render() {
    return (
      <div>
        <h1>HOME</h1>
      </div>
    )
  }
}
