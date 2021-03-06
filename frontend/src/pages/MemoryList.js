import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapState2Props,api_base_url } from './Resource';

import {RiHeartAddFill} from "react-icons/ri"
import MemoryItem from '../components/MemoryItem';
import CreateForm from './CreateForm';
import { logoutAction } from '../actions';
import "../styles/memory.css"
import "../styles/base.css"


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
        this.setState({
            ...this.state,
            creating:false
        })
        this.fetchMemories()

    }
    render() {
        const {memories, creating} = this.state;
        console.log(memories)
        var create_form = creating ? <CreateForm onHide={()=>{this.handleModalHide()}} create_bubble_title="New Memory" already_done={1}/> : ""
        var loading_message = memories.length === 0 ?<h1>Loading...</h1>:""
     
        return ( 
            <div className="page-container">
                {create_form}
                <div className="add-button" onClick={()=>this.setState({...this.state, creating:true})}><RiHeartAddFill/></div>
                <h1 className="page-title">Memories</h1>
                <div className="page-content">
                {loading_message}
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
 
export default connect(mapState2Props, {logoutAction})(MemoryList);