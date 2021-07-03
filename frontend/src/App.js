import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { connect } from 'react-redux';


import Nav from './components/Navbar';
import CreateForm from './pages/CreateForm';
import MemoryList from './pages/MemoryList';
import DiaryEditForm from './pages/EditForm';
import DiaryDetail from './pages/DiaryDetail';
import LogIn from './pages/LogIn';
import { mapState2Props } from './pages/Resource';
import "./styles/base.css"

class App extends Component {
  constructor(props){
    super(props)

  }

  render() { 
    if (!this.props.is_logged){
      return(
        <LogIn/>
      )
    }
    return ( 
      <Router>
        <div id="app">  
        <Nav />
        <Switch>
          <Route path="/" exact component={MemoryList}/>
          <Route path="/create_diary" exact component={CreateForm}/>
          <Route path="/diary_detail/:uuid" exact component={DiaryDetail}/>
          <Route path="/diary_detail/edit_diary/:uuid" exact component={DiaryEditForm}/>
        </Switch>
      </div>

      </Router>
     );
  }
}
 
export default connect(mapState2Props,{})(App);
