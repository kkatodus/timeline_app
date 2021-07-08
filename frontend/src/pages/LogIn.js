import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {BiUser} from "react-icons/bi"
import {RiLockPasswordFill} from "react-icons/ri"
import {FiLogIn} from "react-icons/fi"

import { mapState2Props } from './Resource';
import { api_base_url, unknown_error_alert} from './Resource';
import {loginAction} from "../actions";

import "../styles/login.css"
import "../styles/base.css"

class LogIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:"",
            failed:false,
            waiting:false,
        }
        this.sendAuthDetail = this.sendAuthDetail.bind(this) 
        this.handleChange = this.handleChange.bind(this) 
    }

    async sendAuthDetail(){
        var {username, password} = this.state;
        var formdata = new FormData();
        formdata.append("username",username);
        formdata.append("password",password);
        this.setState({...this.state, waiting:true})
        var request_options = {
            method:"POST",
            body:formdata,
            redirect:"follow"
        }
        var data = await fetch(api_base_url+"/api/auth/",request_options)
        var data_json = await data.json()
        if(!data_json.token){
            var logged = false;
            this.setState({
                ...this.state,
                waiting:false,
                failed:true
            })
        }else{
            var logged = true 
        }
        this.props.loginAction(logged, data_json.token)
          
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
        var message = this.state.failed ? ("Check your password and username"):""
        var message = this.state.waiting ? "Give us a second...":message
        return ( 
            <div className="background-fill login-background">
                <div className="bubble login-bubble card-shadow">
                    <h1 className="bubble-title">Login</h1>
                    <h3 className="bubble-message">{message}</h3>
                    <div className="bubble-data">
                        <div className="bubble-entry">
                            <label className="data-label" ><BiUser/></label>
                            <input onChange={this.handleChange} name="username" type="text"/>
                        </div>
                        <div className="bubble-entry">
                            <label className="data-label" ><RiLockPasswordFill/></label>
                            <input onChange={this.handleChange} name="password" type="password"/>
                        </div>
                    </div>
                    <button className="bubble-submit-button" onClick={this.sendAuthDetail}><FiLogIn/></button>

                </div>
            </div>
         );
    }
}

export default connect(mapState2Props,{loginAction})(LogIn);