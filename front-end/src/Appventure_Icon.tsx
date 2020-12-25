import React from 'react'
import { Icon } from '@material-ui/core';
import AppLogo from './sprites/appventure-logo.svg'


function Appventure_Icon() {
    return (
    <Icon>
        <img src={AppLogo} height={25} width={25}/>
    </Icon>
    )
}

export default Appventure_Icon
