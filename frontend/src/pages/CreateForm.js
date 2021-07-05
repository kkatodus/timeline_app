import React, { Component } from 'react';
import { api_base_url } from './Resource';
import { connect } from 'react-redux';
import {AiOutlineClose} from "react-icons/ai"
import {BsCalendarFill} from "react-icons/bs"

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
            time:"",
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
        if (edited === "title"){
            this.setState({
                ...this.state,
                title:e.target.value,
            })
        }else if (edited === "descript"){
            this.setState({
                ...this.state,
                descript:e.target.value
            })
        }else if (edited === "time"){
            this.setState({
                ...this.state,
                time:e.target.value
            })
        }
       
    }

    handleSubmit(e){
        e.preventDefault();
        const  csrftoken = this.getCookie("csrftoken")

        var formdata = new FormData()
        var {title, descript, time} = this.state;
        
        formdata.append("title",title);
        formdata.append("descript",descript)
        formdata.append("time",time) 
        formdata.append("done",this.props.already_done)

        var request_headers = new Headers();
        request_headers.append("X-CSRFToken",csrftoken)
        request_headers.append("Authorization", "Token "+this.props.login_token)

        var request_options = {
            method: "POST",
            headers:request_headers,
            body: formdata,
            redirect:"follow",
        }
        fetch(api_base_url+"/api/memories/", request_options)
            .then(response=>response.text())
            .then(result=>{
                this.props.onHide()
            })
            .catch(error=>console.log("error",error))
    }

    handleClick(e){
        if ("background"=== e.target.id){
            this.props.onHide()
        }
    }
    
    render() { 
        var message = ""
        var {already_done} = this.props;
        var date_entry_content = <div className="bubble-entry datetime-entry">
            <label className="data-label bubble-icon"><BsCalendarFill/></label>
            <input onChange={this.handleChange} name="time" type="date"></input>
        </div>

        var date_entry = already_done ? date_entry_content:""

        return ( 
            <div name="background" id="background" onClick={this.handleClick} className="background-fill creating-background">
                <div name="bubble" id="bubble" className="bubble creating-bubble card-shadow">
                    <div className="bubble-header">
                    <AiOutlineClose className="bubble-close-btn" onClick={()=>this.props.onHide()}/>

                    <h1 className="bubble-title">{this.props.create_bubble_title}</h1>
                    </div>
                    <h3 className="bubble-message">{message}</h3>
                    <div className="bubble-data">
                        <div className="bubble-entry">
                            <label className="data-label"><h4>Give it a title:</h4></label>
                            <input onChange={this.handleChange} name="title" type="text"/>
                        </div>
                        <div className="bubble-entry">
                            <label className="data-label"><h4>Describe it:</h4></label>
                            <textarea onChange={this.handleChange} name="descript" rows="5" cols="100"/>
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