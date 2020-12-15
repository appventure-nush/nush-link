import React from 'react'
import logo_g from './sprites/nushlink-logo_g.svg';
import './Loading.css';

function Loading() {
    return (
        <div className="Loading">

            <img src={logo_g}  className="Loading-logo_g" />
            
        </div>
    )
}

export default Loading
