import React from 'react'
import { Modal } from 'react-materialize';

export const  CustomModal = ({ component: Component, ...rest }) => { 
   


    return (
            <Modal {...rest} >
                <Component />
            </Modal>
          
    );
  }