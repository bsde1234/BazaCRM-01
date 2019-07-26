import React from 'react'
import { incrementCounter, createCounter, getDataByKey, counterStart } from '../firebase/firestoreCRUD';
import { Preloader } from 'react-materialize';








export default class OfferViews extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count: 'ошибка'
        }
        this.getViews(this.props.id, this.props.uid);

    }
    getViews=(id, uid)=>{ 
        counterStart(id, uid).then((counter)=>{
            if(counter){
                this.setState({
                    count: counter.count,
                    loaded: true
                })
            }
        }).catch((error)=>{
            console.log(error);
            this.setState({
                loaded: true
            })
        })
    } 
    
    render(){
        return (
            <>
                 {this.state.count && this.state.loaded?<>Просмотры:<b>{this.state.count}</b></> : <Preloader size="small" color="red" className="materializePreloader" /> }
            </>
            
        )
    }
}
