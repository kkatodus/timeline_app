import React, { Component,Fragment } from 'react';

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
    render() { 
        console.log("state",this.state)
        var {photos} = this.state;
        if(typeof(photos) === "string"){photos = [photos]}
        return ( 

            <Fragment>
                <h1>Diary detail</h1>
                <img src={api_base_url+photos[0]}/>
            </Fragment>
            
        );
    }
}
 
export default DiaryDetail;