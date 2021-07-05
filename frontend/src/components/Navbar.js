import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {CgLogOut} from "react-icons/cg"

import { logoutAction } from '../actions';
import { mapState2Props } from "../pages/Resource"
import { sideNavData } from '../pages/Resource';
import "../styles/navbar.css"
import "../styles/base.css"

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            active:false
        }

    }
    
    render() { 
        return (           
            <nav className="nav-bar card-shadow">
                <h1 className="page-name">FOR MANAMI</h1>
                <ul className="nav-items">
                    {sideNavData.map(item=>{
                        return(
                            <li key={item.title} className="nav-item">
                                <Link to={item.link}>
                                    {item.icon}
                                    <span className="nav-item-title">{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
    
                    <li className="nav-item logout-button" onClick={this.props.logoutAction}>
                        <CgLogOut/>
                        
                    </li>
                
                </ul>
            </nav> 
         );
    }
}

 
export default connect(mapState2Props,{logoutAction})(Nav);