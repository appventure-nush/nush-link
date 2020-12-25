import React from 'react';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import { TextField } from '@material-ui/core';
import Loading from './Loading';
import Home from './Home';
import Success from './Success';

const state = {
  url: '',
  link: ''
};



function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/Loading" component={Loading} />
      <Route path="/Success" component={Success} />
      <Route path='/AppVenture' component={() => { 
        window.location.href = 'https://nush.app/'; 
        return null;
      }}/>
      </Router>
  );
}

export default App;
