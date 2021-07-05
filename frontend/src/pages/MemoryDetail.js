import React, { Component,Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { api_base_url } from './Resource';

import { connect } from 'react-redux';
import { mapState2Props } from './Resource';
import "../styles/base.css"

class MemoryDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            title:"",
            descript:"",
            created:"",
            id:"",

            redirect:null,
        }

        this.fetchDiary = this.fetchDiary.bind(this)
        this.deleteDiary = this.deleteDiary.bind(this)
    }

    componentDidMount(){
        const {match : {params}} = this.props;
        this.fetchDiary(params.uuid)
    }
    fetchDiary(id){
        var request_headers = new Headers();
        var request_token = this.props.login_token;
        request_headers.append("Authorization","Token "+request_token)
        var request_options = {
            method:"GET",
            headers:request_headers,
            redirect:"follow"
        }
        fetch(api_base_url+"/api/memory_detail/"+id, request_options)
            .then(data=>data.json())
            .then(data=>this.setState({
                ...data
            }))
    }

    deleteDiary(){
        var {id} = this.state
        var request_headers = new Headers();
       
        
        var request_options = {
            method:"DELETE",
            headers:request_headers,
            redirect:"follow"
        };
        fetch(api_base_url+"/api/memory_detail/"+ id,request_options)
        .then(response=>response.text())
        .then(response=>{
            console.log(response)
            this.setState({
                ...this.state,
                redirect:"",
            })
            
            
        })
        .catch(error=>console.log("error",error))
    }   

    render() { 
        var {photos, id, content,redirect} = this.state;
        if(redirect !== null){
            return(
                <Redirect to={redirect}/>
            )
        }else{
            return ( 
                <div className="page-container">
                    <h1 className="page-title">Memory detail</h1>
                    <h3>{content}</h3>
                    <div>
                    <Link to={"edit_diary/"+id}>
                        <h3>Edit diary</h3>
                    </Link>
                    <button onClick={this.deleteDiary}>Delete Diary</button>
                    </div>
                </div >
                
            );
        }
    }
}
 
export default connect(mapState2Props, {})(MemoryDetail);