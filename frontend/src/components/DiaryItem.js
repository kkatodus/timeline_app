import React, { Component } from 'react';
import {Link} from "react-router-dom";

var api_base_url = "http://localhost:8000"

class DiaryItem extends Component {
    constructor(props){
        super(props)
    }
    
    render() { 
        var {photos, content} = this.props;
        return ( 
            <div>
                <div>
                    <h3>{content}</h3>
                    <Link to={"diary_detail/"+this.props.id}>
                        <h3>to diary</h3>
                    </Link>
                </div>
                <img src={api_base_url+photos[0]}></img>
            </div>         
         );
    }
}
 
export default DiaryItem;