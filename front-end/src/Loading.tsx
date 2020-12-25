import React from 'react'
import logo_g from './sprites/nushlink-logo_g.svg';
import potato from './sprites/potato.svg';
import './scss/Loading.css';

import {Link} from "react-router-dom";

import {  Button } from '@material-ui/core';

function Loading() {
    return (
        <div className="Loading">
            <div className="Loading-bg">            
                <img src={logo_g}  className="Loading-logo_g" alt=""/>
                <h2 className="Loading-headline">Baking your custom URL, please wait a while...</h2>
                <img src={potato}  className="Loading-potato" alt=""/>
                
                <Button className="Loading-btn_cancel" style={{marginTop: '3em', fontSize: '2em', borderRadius: '20px'}} component={Link} to="/Success">
                    CANCEL
                </Button>
            </div>
        </div>
    )
}

export default Loading
