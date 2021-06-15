import React, { Component } from 'react';

class DiaryItem extends Component {
    constructor(props){
        super(props)
    }
    
    render() { 
        return ( 
            <div>
                <h4>{this.props.content}</h4>
                <img src={"http://localhost:8000"+this.props.photos[0]}></img>
            </div>         
         );
    }
}
 
export default DiaryItem;