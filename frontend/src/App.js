import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { connect } from 'react-redux';


import Nav from './components/Navbar';
import CreateForm from './pages/CreateForm';
import DiaryList from './pages/DiaryList';
import DiaryEditForm from './pages/EditForm';
import DiaryDetail from './pages/DiaryDetail';
import LogIn from './pages/LogIn';
import { logoutAction } from './actions';

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
const mapState2Props = state =>({
  login_token:state.auth.token,
  is_logged:state.auth.logged
})
 
export default connect(mapState2Props,{logoutAction})(App);
