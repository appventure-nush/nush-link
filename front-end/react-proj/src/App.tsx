import React from 'react';
import logo from './sprites/nushlink-logo.svg'
import bg from './sprites/school-bg.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <img src={bg} className="App-bg" alt="bg" />
      </div>
    </div>
  );
}

export default App;
