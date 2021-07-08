import React, { Component } from 'react';


import { mapState2Props,api_base_url } from './Resource';
import { connect } from 'react-redux';
import {RiMenuAddFill} from "react-icons/ri"

import TodoItem from '../components/TodoItem';
import CreateForm from './CreateForm';
class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            memories:[],
            creating:false
        }
        this.fetchMemories = this.fetchMemories.bind(this)
        this.handleModalHide = this.handleModalHide.bind(this)
    }

    componentDidMount(){
        this.fetchMemories()
    }

    async fetchMemories(){
        var fetch_url = api_base_url+"/api/memories/"
        var request_token = this.props.login_token;
        
        var request_headers = new Headers();
        request_headers.append("Authorization","Token "+request_token)

        var request_options = {
            method:"GET",
            headers:request_headers,
            redirect:"follow"
        }
        var data = await fetch(fetch_url, request_options)
        var data_json = await data.json()
        this.setState({
            memories:data_json
        })       
    }
    handleModalHide(){
        console.log("hiding modal")
        this.setState({
            ...this.state,
            creating:false
        })
        this.fetchMemories()

    }

    render() { 
        var {memories, creating} = this.state;
        var create_form = creating ? <CreateForm onHide={()=>this.handleModalHide()} create_bubble_title="New Plan" already_done={0}/> : ""
        var loading_message = memories.length === 0 ?<h1>Loading...</h1>:""
     
        return ( 
            <div className="page-container">
                {create_form}
                <div className="add-button" onClick={()=>this.setState({...this.state, creating:true})}><RiMenuAddFill/></div>
                <h1 className="page-title">Todo</h1>
                <div className="page-content">
                    {loading_message}
                {memories.map(memory_item=>{
                    if (!memory_item.done){
                        return(
                            <TodoItem key={memory_item.id} {...memory_item} onDelete={()=>this.fetchMemories()}/>                
                        )
                    }
                })}
                </div>
            </div>
         );
    }
}
 
 
export default connect(mapState2Props, {})(TodoList);