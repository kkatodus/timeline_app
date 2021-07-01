import React, { Component, Fragment } from 'react';
import { api_base_url } from './Resource';

class LogIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:""
        }

        this.sendAuthDetail = this.sendAuthDetail.bind(this) 
        this.handleChange = this.handleChange.bind(this) 
    }

    sendAuthDetail(){
        var {username, password} = this.state;
        var formdata = new FormData();
        formdata.append("username",username);
        formdata.append("password",password);
        
        var request_options = {
            method:"POST",
            body:formdata,
            redirect:"follow"
        }
        fetch(api_base_url+"/api/auth/",request_options)
        .then(response=>response.text())
        .then(result=>console.log(result))
        .catch(error=>console.log("error", error))

    }
    handleChange(e){
        var target_name = e.target.name;
        var target_value = e.target.value;
        if(target_name === "username"){
            this.setState({
                ...this.state, 
                username:target_value
            })

        }else{
            this.setState({
                ...this.state, password:target_value
            })
        }

    }
    render() { 
        return ( 
            <Fragment>
                <h1>Login</h1>
                <input onChange={this.handleChange} name="username" type="text"/>
                <input onChange={this.handleChange} name="password" type="password"/>
                <button onClick={this.sendAuthDetail}>Login</button>
                
            </Fragment>
         );
    }
}
 
export default LogIn;