import React, { Component } from 'react';
import { api_base_url } from './Resource';
import { connect } from 'react-redux';
import {AiOutlineClose} from "react-icons/ai"

import { mapState2Props } from './Resource';
import { hideCreatingFormAction } from '../actions';

import "../styles/base.css"
import "../styles/memory.css"

class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state={
            title:"",
            descript:"",
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleChange(e){
        var edited = e.target.name
        if (edited === "content"){
            this.setState({
                ...this.state,
                content:e.target.value,
                
            })
        }else if (edited === "image"){
            console.log(e.target.files)
            this.setState({
                ...this.state,
                images:e.target.files
            })
        }
       
    }

    handleSubmit(e){
        e.preventDefault();
        const  csrftoken = this.getCookie("csrftoken")

        var formdata = new FormData()
        Array.from(this.state.images).forEach(file=>{formdata.append("image",file)}
        )
        formdata.append("content",this.state.content) 

        var request_headers = new Headers();
        request_headers.append("X-CSRFToken",csrftoken)

        var request_options = {
            method: "POST",
            headers:request_headers,
            body: formdata,
            redirect:"follow",
        }
        fetch(api_base_url+"/api/memories/", request_options)
            .then(response=>response.text())
            .then(result=>{
                console.log(result)
                this.setState({
                    ...this.state,
                    redirect:"",
                })
            })
            .catch(error=>console.log("error",error))
    }

    handleClick(e){
        if ("background"=== e.target.id){
            this.props.hideCreatingFormAction()
        }
    }
    
    render() { 
        var message = ""
        var {already_done} = this.props;
        console.log(already_done)
        var date_entry_content = <div>
            <input type="text"></input>
        </div>

        var date_entry = already_done ? date_entry_content:""

        return ( 
            <div name="background" id="background" onClick={this.handleClick} className="background-fill creating-background">
                <div name="bubble" id="bubble" className="bubble creating-bubble card-shadow">
                    <div className="bubble-header">
                    <AiOutlineClose className="bubble-close-btn" onClick={this.props.hideCreatingFormAction}/>

                    <h1 className="bubble-title">New Memory</h1>
                    </div>
                    <h3 className="bubble-message">{message}</h3>
                    <div className="bubble-data">
                        <div className="bubble-entry">
                            <label className="data-label"><h4>Give it a title:</h4></label>
                            <input onChange={this.handleChange} name="title" type="text"/>
                        </div>
                        <div className="bubble-entry">
                            <label className="data-label"><h4>Describe it:</h4></label>
                            <input onChange={this.handleChange} name="descript" type="text"/>
                        </div>
                        {date_entry}
                        
                    </div>
                    <button className="bubble-submit-button" onClick={this.handleSubmit}>Save</button>
                </div>
            </div>
        );
        
    }
}
 
export default connect(mapState2Props, {hideCreatingFormAction})(CreateForm);