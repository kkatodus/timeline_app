import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapState2Props } from './Resource';

import {RiHeartAddFill} from "react-icons/ri"
import MemoryItem from '../components/MemoryItem';
import CreateForm from './CreateForm';
import { showCreatingFormAction } from '../actions';
import "../styles/memory.css"
import "../styles/base.css"

var api_base_url = "http://localhost:8000/"

class MemoryList extends Component {
    constructor(props){
        super(props)
        this.state = {
            memories:[],
            creating:false,
        }

        this.fetchMemories = this.fetchMemories.bind(this)
        this.handleModalHide = this.handleModalHide.bind(this)
       
    }
    componentDidMount(){
        this.fetchMemories()
    }

    fetchMemories(){
        var fetch_url = api_base_url+"api/memories/"
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

    handleModalHide(){
        this.setState({
            ...this.state,
            creating:false
        })
        this.fetchMemories()

    }
    render() {
        const {memories, creating} = this.state;
        var create_form = creating ? <CreateForm onHide={()=>{this.handleModalHide()}} create_bubble_title="New Memory" already_done={1}/> : ""
        return ( 
            <div className="page-container">
                {create_form}
                <div className="add-button" onClick={()=>this.setState({...this.state, creating:true})}><RiHeartAddFill/></div>
                <h1 className="page-title">Memories</h1>
                <div className="page-content">
                {memories.map(memory_item=>{
                    if (memory_item.done){
                        return(
                            <MemoryItem key={memory_item.id} {...memory_item} onDelete={()=>this.fetchMemories()}/>                
                        )
                    }
                })}
                </div>
            </div>
         );
    }
}
 
export default connect(mapState2Props, {})(MemoryList);