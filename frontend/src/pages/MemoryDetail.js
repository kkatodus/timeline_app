import React, { Component,Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {AiOutlineEdit} from "react-icons/ai"
import {FiSave} from "react-icons/fi"
import { api_base_url } from './Resource';
import { connect } from 'react-redux';
import { mapState2Props } from './Resource';
import "../styles/base.css"
import "../styles/detail.css"

class MemoryDetail extends Component {
    constructor(props){
        super(props)
        var request_headers = new Headers();
        var request_token = this.props.login_token;
        request_headers.append("Authorization","Token "+request_token)
        this.state = {
            title:"",
            descript:"",
            date:"",
            id:"",
            done:"",
            editing:false,
            change_detected:false,
            request_header:request_headers,
            redirect:null,
        }

        this.fetchDiary = this.fetchDiary.bind(this)
        this.deleteDiary = this.deleteDiary.bind(this)
        this.saveMemoryChange = this.saveMemoryChange.bind(this)
        this.handleMemoryChange = this.handleMemoryChange.bind(this)

    }

    componentDidMount(){
        const {match : {params}} = this.props;
        this.fetchDiary(params.uuid)
    }

    fetchDiary(id){
        var request_options = {
            method:"GET",
            headers:this.state.request_header,
            redirect:"follow"
        }
        fetch(api_base_url+"/api/memory_detail/"+id, request_options)
            .then(data=>data.json())
            .then(data=>{
                data.created ? this.setState({...data, date:data.created.slice(0,10)}):this.setState({...data})
            })
    }
    saveMemoryChange(){
        var formdata = new FormData();
        formdata.append("title",this.state.title)
        formdata.append("descript", this.state.descript)
        formdata.append("created",this.state.date)
        var request_options = {
            method:"POST",
            headers:this.state.request_header,
            body:formdata,
            redirect:"follow"
        }
        var {id} = this.state;
        fetch(api_base_url+"/api/memory_detail/"+id,request_options)
            .then(response=>console.log(response.text()))
            .then(this.setState({
                ...this.state,
                editing:false
            }))
            .catch(error=>console.log("error",error))
        
    }

    handleMemoryChange(e){
        var target_name = e.target.name;
        var target_value = e.target.value;
        switch(target_name){
            case "title":
                this.setState({
                    ...this.state,
                    title:target_value,
                    change_detected:true
                })
                break;
            case "descript":
                this.setState({
                    ...this.state,
                    descript:target_value,
                    change_detected:true
                })
                break;
            case "date":
                this.setState({
                    ...this.state,
                    date:target_value,
                    done:true,
                    change_detected:true
                })
        }
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
        var {title,descript,done,id,redirect,date,editing,change_detected} = this.state;
        if(id ===""){
            return (
                <div className="page-container detail-container">
                    <h1 className="page-title">Loading Memory...</h1>
                </div>
            )
        }
        var background_cl = done ? "done-memory":"not-done-memory"
        var date_show = done ?  <h3 className="detail-date">{date}</h3> :""

        if(editing){
            var save_button = change_detected ? <button className="edit-button" onClick={this.saveMemoryChange}><FiSave/> Save</button> : ""
            // var date_edit = done ? <input className="detail-footer" type="date" value={date} name="date" onChange={this.handleMemoryChange}/>:""
            var date_edit = <input className="detail-footer" type="date" value={date} name="date" onChange={this.handleMemoryChange}/>
            return(
                <div className="page-container detail-container">
                    <div className={"detail-page-content card-shadow "+background_cl}>
                        <input type="text" name="title" value={title}className="detail-title detail-title-edit" onChange={this.handleMemoryChange}/>
                        <textarea className="detail-descript" value={descript} name="descript" onChange={this.handleMemoryChange}/>
                        {date_edit}
                        
                    </div>
                    {save_button}
                </div >  
            )
        }

        return ( 
            <div className="page-container detail-container">
                <div className={"detail-page-content card-shadow "+background_cl}>
                    <h1 className="detail-title">{title}</h1>
                    <h3 className="detail-descript">{descript}</h3>
                    <div className="detail-footer">
                        {date_show}   
                    </div>
                </div>
                <button className="edit-button" onClick={()=>this.setState({...this.state, editing:true})}><AiOutlineEdit/> Edit</button>
            </div >  
        );
    }
}
 
export default connect(mapState2Props, {})(MemoryDetail);