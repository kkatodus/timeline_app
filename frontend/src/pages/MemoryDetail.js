import React, { Component,Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { api_base_url } from './Resource';

import { connect } from 'react-redux';
import { mapState2Props } from './Resource';
import "../styles/base.css"
import "../styles/detail.css"

class MemoryDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            title:"",
            descript:"",
            created:"",
            id:"",
            done:"",
            editing:false,
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
        var {title,descript,done,id,redirect,created} = this.state;
        if(title ===""){
            return (
                <div className="page-container detail-container">
                    <h1 className="page-title">Loading Memory...</h1>
                </div>
            )
        }
        var background_cl = done ? "done-memory":"not-done-memory"
        var date = done ?  <h3 className="detail-date">{created.slice(0,10)}</h3> :""
        return ( 
            <div className="page-container detail-container">
                <h1 className="page-title"></h1>
                <div className={"detail-page-content card-shadow "+background_cl}>
                    <h1 className="detail-title">{title}</h1>
                    <h3 className="detail-descript">{descript}</h3>
                    {date}
                </div>
            </div >  
        );
    }
}
 
export default connect(mapState2Props, {})(MemoryDetail);