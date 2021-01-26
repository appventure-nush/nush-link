import React, {useState}  from 'react';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import { TextField } from '@material-ui/core';
import Loading from './Loading';
import Home from './Home';
import Success from './Success';
import { setConstantValue } from 'typescript';


function App() {
  const [aliaslink, setAlias] = useState("");
  return (
    <Router>
      <Route path="/" exact 
        render={(props) => (
        <Home {...props} setAlias_h={(link : string) => setAlias(link)} alias={aliaslink}/>
      )}/>
      <Route path="/Loading" component={Loading} />
      <Route path="/Success" 
        render={(props) => (
        <Success {...props} alias={aliaslink}/>
      )}/> 
      <Route path='/AppVenture' component={() => { 
        window.location.href = 'https://nush.app/'; 
        return null;
      }}/>
      </Router>
  );
}

export default App;
