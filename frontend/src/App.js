import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount(){
    fetch("http://localhost:8000/diaries")
    .then(data=>data.json())
    .then(data=>console.log(data))
      
  }
  render() { 
    return ( 
      <h1>Hi this is something</h1>
     );
  }
}
 
export default App;