import React from 'react';

import logo_w from './sprites/nushlink-logo_w.svg';
import logo_g from './sprites/nushlink-logo_g.svg';
import bg from './sprites/school-bg.png';
import abt from './sprites/about.svg';
import link from './sprites/chain.svg';
import btn from './sprites/button_url.svg';
import logo_nush from './sprites/nushigh_logo.svg';
import './App.css';
import { TextField } from '@material-ui/core';

const state = {
  url: '',
  link: ''
};

function myfunction() {
  console.log("CLICKED");
}

function App() {
  return (
    <div className="App">
      
      {/* Header */}
      <header className="App-header">
        <img src={logo_w} className="App-logo_w" alt=""/>
      </header>
      
      {/* Image and Circle */}
      <div>
        <img src={bg} className="App-bg" alt="bg"/>
        <div className="bg-circle">
          <img src={logo_g} className="App-logo_g" alt="logo" />
          <p className = "App-circle_text">an 
            <span className="App-Appventure"> AppVenture </span> 
            Project</p>
        </div>
      </div>

      {/* Bottom portion */}
      <div className = "App-bottom_bg">
        <img src={abt} className="App-info_icon" alt=""/>
        <h1 className="App-about_text">About</h1>
        <p className="App-about_para">Nush.link is an url shortener application, designed by Nushies, for Nushies! With it you can shorten
and customise URL links, allowing for nicer formatting and readability when sending out URLs.</p> 
        <h1 className="App-custom_url">Create your custom URL now!</h1>
        <div className="App-row_element">
          <div className="App-col">
            <h2>Enter Original URL:</h2>
            <TextField id="standard-basic" 
            label="Original URL"
            inputProps={{style: {fontSize: '2.5em'}}}
            InputLabelProps={{style: {fontSize: '2.5em'}}}
            />
          </div>
          <img src={link} className="App-link_image" alt=""/>
          <div className="App-col">
            <h2>Enter customised URL:</h2>
              <div className="App-row_nushlink">
                <p className="App-link">https://nush.link/</p>
                <TextField id="standard-basic"
                inputProps={{style: {fontSize: '2.5em'}}}
                />
              </div>     
          </div>
        </div>
        <button className="App-btn_create_url" onClick={myfunction}>
          Create URL!
        </button>
      </div>
      <div className= "App-footer">
          <img src={logo_nush} className="App-nush_logo"/>
          <div className= "App-credits">
            <p>Developed by:  David Goh Zhe Kai</p>
            <p>James Chin Jia Jun</p>
          </div>
      </div>
    </div>
  );
}

export default App;
