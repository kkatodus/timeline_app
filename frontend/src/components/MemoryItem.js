import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "../styles/base.css"
import "../styles/memory.css"
var api_base_url = "http://localhost:8000"

class MemoryItem extends Component {
    constructor(props){
        super(props)
    }
    
    render() { 
        var {title, descript, created, done, id} = this.props;
        return ( 
            <Link className="memory-item" to={"memory_detail/"+id}>
                <div className="memory-date">
                    <h3>{created}</h3>
                </div>
                <div className="memory-content">
                    <h2 className="memory-title">{title}</h2>
                    <h3 className="memory-descript">{descript}</h3>
                </div>
            </Link>
            
            
         );
    }
}
 
export default MemoryItem;