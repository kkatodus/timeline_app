import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {ImBook} from "react-icons/im"
import BaseStyles from "../styles/base_styles.module.css"
import { connect } from 'react-redux';
import { logoutAction } from '../actions';
import { mapState2Props } from "../pages/Resource"

class Nav extends Component {
    
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
                <li>
                    <button onClick={this.props.logoutAction}>Logout</button>
                </li>
            
            </ul> 
            
         );
    }
}

 
export default connect(mapState2Props,{logoutAction})(Nav);