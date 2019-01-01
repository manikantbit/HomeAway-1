import React, {Component} from 'react';
import usFlag from './us-flag.png';
import {blueLogo,whiteLogo,blueBird,whiteBird} from '../config';
import cookie from 'react-cookies';
import axios from 'axios';

class NavbarOwner extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        console.log("Logout")
        localStorage.clear();
        cookie.remove('cookie', { path: '/' })
        axios.post("http://localhost:7777/logout",function(response){
            window.location.href='/logout';
        })
    }
    render(){
        let toggleLogin = null;
        var navLinks = null;
        let type = localStorage.getItem("type");
        if(cookie.load('cookie')) {
            console.log("cookie",cookie.load('cookie'));
            let first_name = localStorage.getItem("first_name");
            let last_name = localStorage.getItem("last_name");
            navLinks = (
                <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">My Account <i className="fas fa-caret-down"></i></a>
                <ul className="dropdown-menu">
                <li><a href='#'>Account Settings</a></li>
                <li><a href="/ownerhome">Property Details</a></li>
                <li><a href="#">Property Archive</a></li>
                <li><a href="/addnewprop">Add New Property</a></li>
                <li><a href="/logout" onClick={this.logout} className="logout-btn">Sign out</a></li>
                </ul>
                </li>
                 <li><i className="far fa-bell fa-2x" style={{margin:'10px'}}></i></li>
                 <a href='#'><img alt="" src = {blueBird}/></a>
                 </ul>
            )
        }
        return (
            <div className="container-fluid" style={{borderBottom:'1px solid grey'}}>
            <nav className="navbar" style={{marginTop:'25px'}}>
                <div className = "navbar-header">
                <a href="#" style={{width:'20px',height:'30px', paddingRight:'20px'}}><i class="fas fa-bars fa-2x"></i></a>
                <a href= '/' title = "HomeAway.com">
                     <img alt="Homeaway Logo" src = {blueLogo}></img>
                 </a>
                 </div>
                 {navLinks}
            
            </nav>
            </div>
        )
    }
}
export default NavbarOwner;