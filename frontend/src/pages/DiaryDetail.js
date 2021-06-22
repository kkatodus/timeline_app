import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';

var api_base_url = "http://localhost:8000"

class DiaryDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            content:"",
            photos:[],
            created:"",
            id:""
        }

        this.fetchDiary = this.fetchDiary.bind(this)
        this.deleteDiary = this.deleteDiary.bind(this)
    }

    componentDidMount(){
        const {match : {params}} = this.props;
        this.fetchDiary(params.uuid)
    }
    fetchDiary(id){
        fetch(api_base_url+"/api/diary_detail/"+id)
            .then(data=>data.json())
            .then(data=>this.setState({
                ...data
            }))
    }

    deleteDiary(){
        var {id} = this.state
        var request_headers = new Headers();
        request_headers.append("","")
        
        var request_options = {
            method:"DELETE",
            headers:request_headers,
            redirect:"follow"
        };
        fetch(api_base_url+"/api/diary_detail/"+ id,request_options)
        .then(response=>response.text())
        .then(response=>console.log(response))
        .catch(error=>console.log("error",error))
    }   

    render() { 
        var {photos, id, content} = this.state;
        if (!photos[0]){
            return(
                <Fragment>
                    <h1>No photo</h1>
                </Fragment>
            )
        }else{
            return ( 
                <Fragment>
                    <h1>Diary detail</h1>
                    <h3>{content}</h3>
                    <Link to={"edit_diary/"+id}>
                        <h3>Edit diary</h3>
                    </Link>
                    <button onClick={this.deleteDiary}>Delete Diary</button>
                    <img src={api_base_url+photos[0].image}/>
                </Fragment>
                
            );
        }
    }
}
 
export default DiaryDetail;