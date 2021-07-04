import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TodoItem extends Component {
    constructor(props){
        super(props)
    }
    
    render() { 
        var {title, descript, created, done, id} = this.props;
        return ( 
            <Link className="memory-item" to={"memory_detail/"+id}>
                <div className="memory-content card-shadow">
                    <h2 className="memory-title">{title}</h2>
                    <h3 className="memory-descript">{descript}</h3>
                </div>
            </Link>
            
            
         );
    }
}
 
export default TodoItem;