import React, { Component } from 'react';
import { Redirect } from 'react-router';


var api_base_url = "http://localhost:8000/"

class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state={
            images:null,
            content:"",
            redirect:null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCookie = this.getCookie.bind(this);
        
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
        fetch(api_base_url+"api/diary_list/", request_options)
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

    render() { 
        var {redirect} = this.state;
        if(redirect!== null){
            return(
                <Redirect to={redirect}/>
            )
        }else{
            return ( 
                <div>
                    <form onSubmit={this.handleSubmit} action="http://localhost:8000/diaries" method="post" type="multipart/form-data">
                        <input onChange={this.handleChange} name="content" type="text"/>
                        <input onChange={this.handleChange} name="image" type="file" multiple={true}/>
                        <button>Save</button>
                    </form>
                
                </div>
            );
        }
    }
}
 
export default CreateForm;