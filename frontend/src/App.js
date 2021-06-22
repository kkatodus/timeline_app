import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";

import Nav from './components/Navbar';
import CreateForm from './pages/CreateForm';
import DiaryList from './pages/DiaryList';
import DiaryEditForm from './pages/EditForm';
import DiaryDetail from './pages/DiaryDetail';

class App extends Component {

  render() { 
    return ( 
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={DiaryList}/>
          <Route path="/create_diary" exact component={CreateForm}/>
          <Route path="/diary_detail/:uuid" exact component={DiaryDetail}/>
          <Route path="/diary_detail/edit_diary/:uuid" exact component={DiaryEditForm}/>
        </Switch>
      </Router>
     );
  }
}
 
export default App;
