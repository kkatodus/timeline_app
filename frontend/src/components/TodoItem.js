import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {AiFillDelete} from "react-icons/ai"
import "../styles/base.css"
import "../styles/memory.css"
import { api_base_url } from '../pages/Resource';
import { mapState2Props } from '../pages/Resource';

class TodoItem extends Component {
    constructor(props){
        super(props)
        var request_headers = new Headers();
        var request_token = this.props.login_token;
        request_headers.append("Authorization","Token "+request_token)
        this.state = {
            redirect:"",
            request_header:request_headers
        }
        
        this.deleteMemoryItem = this.deleteMemoryItem.bind(this)
        
    }
    
    deleteMemoryItem(e){
        e.stopPropagation()
        var request_options = {
            method:"DELETE",
            headers:this.state.request_header,
            redirect:"follow"
        }
        var {id} = this.props;
        fetch(api_base_url+"/api/memory_detail/"+id,request_options)
        .then(response => response.text())
        .then(response => this.props.onDelete())
        .catch(error => console.log("error",error))
        

    }
    

    render() { 
        var {title, descript, id} = this.props;
        var {redirect} = this.state;
        var title_dots = title.length > 40 ? "...":""
        var descript_dots = descript.length > 120 ? "...":"" 
        var redirect_element = redirect !== "" ? <Redirect to={this.state.redirect}/> :""

        return (
            <div className="memory-item">
                {redirect_element}  

                <div onClick={()=>this.setState({redirect:"memory_detail/"+id})}className="memory-content card-shadow todo-content">
                    <h2 className="memory-title">{title.slice(0,40)}{title_dots}</h2>
                    <h3 className="memory-descript">{descript.slice(0,120)}{descript_dots}</h3>
                </div>
                <button onClick={this.deleteMemoryItem} className="delete-button" ><AiFillDelete/></button>
            </div>       
         );
    }
}
 
export default connect(mapState2Props, {})(TodoItem);