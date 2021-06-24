import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {ImBook} from "react-icons/im"
import BaseStyles from "../styles/base_styles.module.css"

class Nav extends Component {
    state = {  }
    render() { 
        return (
            <ul className={BaseStyles.nav_container}>
                <li className={BaseStyles.nav_item}>
                    <Link to="/">
                        <ImBook className={BaseStyles.nav_icon}/>
                    </Link>
                </li>
                <li className={BaseStyles.nav_item}>
                    <Link to="/">
                        <h3>Diary</h3>
                    </Link>
                </li>
                <li className={BaseStyles.nav_item}>                
                    <Link to="/create_diary">
                        <h3 className={BaseStyles.nav_item_text}>Write</h3>
                    </Link>
                </li>
            
            </ul> 
            
         );
    }
}
 
export default Nav;