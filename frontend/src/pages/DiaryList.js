import React, { Component } from 'react';
import DiaryItem from '../components/DiaryItem';

var api_base_url = "http://localhost:8000/"

class DiaryList extends Component {
    constructor(props){
        super(props)
        this.state = {diaries:[]}

        this.fetchDiaries = this.fetchDiaries.bind(this)
    }
    componentDidMount(){
        this.fetchDiaries()
    }

    fetchDiaries(){
        var fetch_url = api_base_url+"api/diary_list/"

        fetch(fetch_url)
        .then(data=>data.json())
        .then(data=>this.setState({diaries:data}))        
    }
    render() {
        const {diaries} = this.state;
        return ( 
            <div>
                <h1>Diary List</h1>
                {diaries.map(item=>{
                    return(
                        //<DiaryItem key={item.id} content={item.content} created={item.created} photos={item.photos}/>                        
                        <DiaryItem key={item.id} {...item}/>
                    )
                })}
            </div>
            
         );
    }
}
 
export default DiaryList;