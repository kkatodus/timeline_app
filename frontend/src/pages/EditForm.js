import React, { Component } from 'react';

var api_base_url = "http://localhost:8000"

class DiaryEditForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            content:"",
            photos:[],
            id:"",
            deleted_photo_idxs:[],
            new_photos:[]
        }
        this.fetchDiary = this.fetchDiary.bind(this)
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


    render() { 
        return ( 
            <h1>Diary edit</h1>
        );
    }
}
 
export default DiaryEditForm;