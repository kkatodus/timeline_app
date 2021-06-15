import React, { Component } from 'react';
import DiaryItem from '../components/DiaryItem';

class DiaryList extends Component {
    constructor(props){
        super(props)
        this.state = {diaries:[]}
    }
    componentDidMount(){
        fetch("http://localhost:8000/diaries")
        .then(data=>data.json())
        .then(data=>this.setState({diaries:data}))
          
    }
    render() {
        const {diaries} = this.state;
        console.log(diaries)
        return ( 
            <div>
                <h1>Diary List</h1>
                {diaries.map(item=>{
                    return(
                        <DiaryItem key={item.id} content={item.content} created={item.created} photos={item.photos}/>                        
                    )
                })}
            </div>
            
         );
    }
}
 
export default DiaryList;