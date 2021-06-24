import React, { Component } from 'react';
import {Link} from "react-router-dom";

import BaseStyles from "../styles/base_styles.module.css"

class Nav extends Component {
    state = {  }
    render() { 
        return (
            <div className={BaseStyles.nav_container}>
                <div className={BaseStyles.nav_item}>
                    <Link to="/">
                        <h3>Diaries</h3>
                    </Link>
                </div>
                <div className={BaseStyles.nav_item}>                
                    <Link to="/create_diary">
                        <h3>Write</h3>
                    </Link>
                </div>

            </div> 
            
         );
    }
}
 
export default Nav;