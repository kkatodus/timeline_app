import React, { Component } from 'react';
var api_base_url = "http://localhost:8000"
class DiaryItem extends Component {
    constructor(props){
        super(props)

        this.showDetailView = this.showDetailView.bind(this);
    }

    showDetailView(){
        var fetch_url = api_base_url+"/api/diary_detail/"+this.props.id
        console.log(fetch_url)
        fetch(fetch_url)
            .then(data=>data.json())
            .then(data=>console.log(data))
    }
    
    render() { 
        return ( 
            <div>
                <div>
                    <h3>{this.props.content}</h3>
                    <button type="button" onClick={this.showDetailView}>to this diary</button>
                </div>
                <img src={api_base_url+this.props.photos[0]}></img>
            </div>         
         );
    }
}
 
export default DiaryItem;