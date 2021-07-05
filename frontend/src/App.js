import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { connect } from 'react-redux';


import Nav from './components/Navbar';
import CreateForm from './pages/CreateForm';
import MemoryList from './pages/MemoryList';
import DiaryEditForm from './pages/EditForm';
import MemoryDetail from './pages/MemoryDetail';
import LetterPage from './pages/LetterPage';
import TodoList from './pages/TodoList';
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
          <Route path="/todo" exact component={TodoList}/>
          <Route path="/letter" exact component={LetterPage}/>
          <Route path="/create_diary" exact component={CreateForm}/>
          <Route path="/memory_detail/:uuid" exact component={MemoryDetail}/>
          <Route path="/diary_detail/edit_diary/:uuid" exact component={DiaryEditForm}/>
        </Switch>
      </div>

      </Router>
     );
  }
}
 
export default connect(mapState2Props,{})(App);
