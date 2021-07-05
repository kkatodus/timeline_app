import React, { Component } from 'react';


import { mapState2Props,api_base_url } from './Resource';
import { connect } from 'react-redux';
import {RiMenuAddFill} from "react-icons/ri"

import TodoItem from '../components/TodoItem';
import { showCreatingFormAction } from '../actions';
import CreateForm from './CreateForm';
class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            memories:[]
        }
        this.fetchMemories = this.fetchMemories.bind(this)
    }

    componentDidMount(){
        this.fetchMemories()
    }

    fetchMemories(){
        var fetch_url = api_base_url+"/api/memories/"
        var request_token = this.props.login_token;
        

        var request_headers = new Headers();
        request_headers.append("Authorization","Token "+request_token)

        var request_options = {
            method:"GET",
            headers:request_headers,
            redirect:"follow"
        }
        fetch(fetch_url, request_options)
        .then(data=>data.json())
        .then(data=>this.setState({memories:data}))        
    }
    render() { 
        var {memories} = this.state;
        var {creating} = this.props;
        var create_form = creating ? <CreateForm already_done={false}/> : ""
        return ( 
            <div className="page-container">
                {create_form}
                <div className="add-button" onClick={this.props.showCreatingFormAction}><RiMenuAddFill/></div>
                <h1 className="page-title">Todo</h1>
                <div className="page-content">
                {memories.map(memory_item=>{
                    if (!memory_item.done){
                        return(
                            <TodoItem key={memory_item.id} {...memory_item}/>                
                        )
                    }
                })}
                </div>
            </div>
         );
    }
}
 
 
export default connect(mapState2Props, {showCreatingFormAction})(TodoList);