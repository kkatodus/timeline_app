import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";

import Nav from './components/Navbar';
import CreateForm from './pages/CreateForm';
import DiaryList from './pages/DiaryList';



class App extends Component {

  render() { 
    return ( 
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={DiaryList}/>
          <Route path="/create_diary" exact component={CreateForm}/>
        </Switch>
      </Router>
     );
  }
}
 
export default App;
