import React, { Component } from 'react';


import { mapState2Props,api_base_url } from './Resource';
import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
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
        return ( 
            <div className="page-container">
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
 
 
export default connect(mapState2Props, {})(TodoList);