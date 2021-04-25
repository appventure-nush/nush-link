import React from 'react'
import logo_g from './sprites/nushlink-logo_g.svg';
import accepted from './sprites/accepted.svg';
import copy from './sprites/Copy_to_Clipboard.svg';
import app_logo from './sprites/appventure-logo.svg';
import again from './sprites/shorten_another.svg';
import './scss/Success.css';

import Appventure_Icon from './Appventure_Icon';
import {Link} from "react-router-dom";
import { IconButton } from '@material-ui/core';


interface AliasProps{
    alias : string;
}



function Success(props : AliasProps) {
    return (
        <div className="Success">
            <div className="Success-bg">            
                <img src={logo_g}  className="Success-logo_g" alt=""/>
                <img src={accepted}  className="Success-accepted" alt=""/>
                <h1 className="Success-headline">Huzzah! We've successfully created your custom link!!</h1>
                <div className="Success-row">
                    <a href={`http://localhost:5000/${props.alias}`} target="_blank" rel="noopener noreferrer" >
                        <p className="Success-link">{`https://nush.link/${props.alias}`}</p>
                    </a>
                    <img src={copy}  className="Success-Copy" alt=""/>
                </div>
                <h3 className="Success-thank">Thank you for using Nush.link!</h3>
                <div className="test">
                    <div className="Success-row2">
                    <a href="https://nush.app/" target="_blank" rel="noopener noreferrer">
                        <img src={app_logo} className="Success-app_logo"/>
                    </a>
                        <div className="Success-left_text">
                            <p>Check out more projects from AppVenture!</p>
                        </div>
                    </div>

                    <div className="Success-row3">
                        <a href="/"  rel="noopener noreferrer">
                            <img src={again} className="Success-again"/>
                        </a>
                        <div className="Success-right_text">
                            <p>Shorten another URL</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
