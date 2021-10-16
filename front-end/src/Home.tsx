import React, {useState} from 'react'
import { History } from 'history';
import logo_w from './sprites/nushlink-logo_w.svg';
import logo_g from './sprites/nushlink-logo_g.svg';
import abt from './sprites/about.svg';
import link from './sprites/chain.svg';
import logo_nush from './sprites/nushigh_logo.svg';
import app_btn from './sprites/appventure_btn.svg';
import './scss/Home.css';

import Appventure_Icon from './Appventure_Icon';
import {Link} from "react-router-dom";
import { TextField, Button, IconButton } from '@material-ui/core';

  interface aliasProps {
      history: any;
      alias: string;
      setAlias_h(alais_link:string): any;
  }

function Home(props : aliasProps) {
    const [original, setOriginal] = useState("");
    //const [alias, setAlias] = useState("")
    const [errorVisibility, setErrVisibility] = useState(false);
    const [errorMsg, setErrMsg] = useState("");

    const getOriLink=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setOriginal(e.target.value);
        setErrMsg("");
        setErrVisibility(false);
    }

    const getAliasLink=(e: React.ChangeEvent<HTMLInputElement>)=>{
        //setAlias(e.target.value);
        props.setAlias_h(e.target.value);
        setErrMsg("Unknown Error");
        setErrVisibility(false);
    }

    function CheckError(response : Response) {
        if (response.status >= 200 && response.status <= 299) {
            console.log("Test");
            setErrMsg("Unknown Error");
            setErrVisibility(true);
        } else {
          //throw Error(response.statusText);
          console.log("Hello");
          //setError(true);
          //setErrormsg("Invalid!")
        }
      }

    function add_link() {

        fetch(`/create`, {
            method: "POST",

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                alias: props.alias,
                original: original,
            })
        })

        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                console.log("Success!")
                props.history.push('/Success')
            } else {
                if (typeof data.message !== 'undefined') {
                    console.log(data.message);
                    setErrMsg(data.message);
                    setErrVisibility(true);
                }
            }
        })
    }


    return (
        <div className="Home">

            {/* Header */}
            <div className="Home-header">
                <img src={logo_w} className="Home-logo_w" alt=""/>
            </div>

            {/* Middle */}
            <div className="Home-imagebg">
                <div className="Home-bg-circle">
                    <img src={logo_g} className="Home-logo_g" alt="logo" />
                    <p className = "Home-circle_text">an
                        <span className="Home-Appventure"> AppVenture </span>
                        Project</p>
                </div>

                <a href="https://nush.app/" target="_blank" rel="noopener noreferrer" >
                    <img src={app_btn} className="Home-app-btn" alt=""/>
                </a>

            </div>

            {/* Bottom portion */}
            <div className = "Home-bottom_bg">
                <img src={abt} className="Home-info_icon" alt=""/>

                <h1>About</h1>

                <p className="Home-about_para">Nush.link is an url shortener application, designed by Nushies, for Nushies! With it you can shorten
        and customise URL links, allowing for nicer formatting and readability when sending out URLs.</p>

                <h1>Create your custom URL now!</h1>
                <div className="Home-row_element">
                    <div className="Home-col">
                        <h2>Enter Original URL:</h2>
                        <TextField id="standard-basic"
                        label="Original URL"
                        inputProps={{style: {fontSize: '2em'}}}
                        InputLabelProps={{style: {fontSize: '2em'}}}
                        onChange={getOriLink}
                        error={errorVisibility}
                        helperText={errorMsg}
                        />
                    </div>
                    <img src={link} className="Home-link_image" alt=""/>
                    <div className="Home-col">
                        <h2>Enter customised URL:</h2>
                        <div className="Home-row_nushlink">
                            <p className="Home-link">https://nush.link/</p>
                            <TextField id="standard-basic"
                            inputProps={{style: {fontSize: '2em'}}}
                            onChange={getAliasLink}
                            />
                        </div>
                    </div>
                </div>
                <Button className="Home-btn_create_url" style={{marginTop: '2em', fontSize: '2em', borderRadius: '20px'}} onClick={() => { add_link() }}>
                Create URL!
                </Button>
            </div>
            <div className= "Home-footer">
                <a href="https://www.nushigh.edu.sg/" target="_blank" rel="noopener noreferrer">
                <img src={logo_nush} className="Home-nush_logo"/>
                </a>
                <div className= "Home-credits">
                    <p>Developed by:  David Goh Zhe Kai</p>
                    <p>James Chin Jia Jun</p>
                </div>
            </div>
         </div>
    )
}

export default Home
