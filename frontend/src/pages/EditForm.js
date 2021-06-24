import React, { Component, Fragment} from 'react';
import { Redirect } from 'react-router';
import { api_base_url } from './Resource';

class DiaryEditForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            content:"",
            photos:[],
            id:"",
            deleted_photo_ids:[],
            new_photos:null,
            redirect:null,
        }
        this.fetchDiary = this.fetchDiary.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemovePhoto = this.handleRemovePhoto.bind(this)
        this.getCookie = this.getCookie.bind(this)
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    componentDidMount(){
        const {match: {params}} = this.props;
        this.fetchDiary(params.uuid)
    }

    fetchDiary(id){
        fetch(api_base_url+"/api/diary_detail/"+id)
            .then(data=>data.json())
            .then(data=>this.setState({...data}))
    }

    handleChange(e){
        var target_name = e.target.name;
        if (target_name === "content"){
            var value = e.target.value;
            this.setState({
                ...this.state,
                content:value
            })
        }else if(target_name === "new_photos"){
            this.setState({
                ...this.state,
                new_photos:e.target.files
            })
        }
    }

    handleRemovePhoto(e){
        var photo_id = e.target.id;
        var removed_photo_ids = [...this.state.deleted_photo_ids]
        if (removed_photo_ids.includes(photo_id)){
            var idx = removed_photo_ids.indexOf(photo_id)
            removed_photo_ids.splice(idx,1)
            this.setState({
                ...this.state,
                deleted_photo_ids:removed_photo_ids,
            })
        }else{
            removed_photo_ids.push(photo_id)
            this.setState({
                ...this.state,
                deleted_photo_ids:removed_photo_ids
            })
        }
     
    }

    handleSubmit(e){
        e.preventDefault();
        const csrftoken = this.getCookie("csrftoken")
    
        var formdata = new FormData();
        if(this.state.new_photos){
            Array.from(this.state.new_photos).forEach(file=>{
               formdata.append("new_photos",file)
            })
        }
        Array.from(this.state.deleted_photo_ids).forEach(removed_id=>{
            formdata.append("deleted_photo_ids",removed_id)
        })
        formdata.append("content",this.state.content);

        var request_headers = new Headers();
        request_headers.append("X-CSRFToken",csrftoken);
        
        var request_options = {
            method:"POST",
            headers:request_headers,
            body:formdata,
            redirect:"follow"
        }
        fetch(api_base_url+"/api/diary_detail/"+this.state.id,request_options)
        .then(response=>response.text())
        .then(result=>{
            console.log(result)
            this.setState({
                ...this.state,
                redirect:"",
            })
           
        })
        .catch(error=>console.log("error",error))

    }


    render() { 
        var {content, photos, new_photos,redirect} = this.state
        if (redirect !== null){
            return <Redirect to={redirect} />
        }else{
            return ( 
                <Fragment>
                    <h1>Diary edit</h1>
                    <div>
                        <input type="text" name="content" value={content} onChange={this.handleChange}/>
                        <input name="new_photos" onChange={this.handleChange} type="file" multiple={true}/>
                        <button type="button" onClick={this.handleSubmit}>Save Changes</button>
                    </div>
                    {this.state.photos.map(photo=>{
                        return(
                            <img key={photo.id} src={api_base_url+photo.image} id={photo.id} onClick={this.handleRemovePhoto}/>
                        )
                    })}
                </Fragment>
            );
        }
    }
}
 
export default DiaryEditForm;