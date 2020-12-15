import React from 'react';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import { TextField } from '@material-ui/core';
import Loading from './Loading';
import Home from './Home';

const state = {
  url: '',
  link: ''
};



function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/Loading" component={Loading} />
      
    </Router>
  );
}

export default App;
