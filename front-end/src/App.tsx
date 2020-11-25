import React from 'react';

import logo_w from './sprites/nushlink-logo_w.svg';
import logo_g from './sprites/nushlink-logo_g.svg';
import bg from './sprites/school-bg.png';
import './App.css';

const state = {
  url: '',
  link: ''
};

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <img src={logo_w} className="App-logo_w"/>
      </header>
      <div>
        <img src={bg} className="App-bg" alt="bg"/>
        <div className='bg-circle'>
          <img src={logo_g} className="App-logo_g" alt="logo" />
          <p className = 'App-circle_text'>an 
            <span className='App-Appventure'> AppVenture </span> 
            Project</p>
        </div>
      </div>
      <div className = 'App-bottom_bg'>
      </div>
    </div>
  );
}

export default App;
