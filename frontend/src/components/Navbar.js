import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Nav extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Link to="/">
                    <h3>Diaries</h3>
                </Link>
                <Link to="/create_diary">
                    <h3>Write</h3>
                </Link>
            </div> 
            
         );
    }
}
 
export default Nav;