import React, {Component} from 'react';
import usFlag from './us-flag.png';
import {blueLogo,whiteLogo,blueBird,whiteBird} from '../config';
import cookie from 'react-cookies';
import axios from 'axios';

class Navbar extends Component {
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
        let navLinks = null;
        let inbox=null;
        let profile_image=null;
        let type = localStorage.getItem("type");
        if(cookie.load('cookie')) {
            console.log("cookie",cookie.load('cookie'));
            let first_name = localStorage.getItem("first_name");
            let last_name = localStorage.getItem("last_name");
            //let {first_name,last_name} = name;
            inbox = (<li><a className = {this.props.navBlue? "nav-blue":"nav-link"} href='/inbox'><i class="far fa-envelope"></i></a></li>)
            profile_image = <li><img alt="avatar" className="avatar img-circle img-thumbnail" src={(localStorage.getItem("profile_image")!=null)? `${process.env.PUBLIC_URL}/images/${(localStorage.getItem("profile_image"))}` :"https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"} style={{width:'40px',height:'40px'}}></img></li>
            toggleLogin =
            (
            <li className="dropdown">
                <a className= {"dropdown-toggle".concat( this.props.navBlue? " nav-blue":" nav-link")} data-toggle="dropdown" href="#">{first_name} {last_name.substring(0,1)}. <i class="fas fa-caret-down"></i></a>
                <ul className="dropdown-menu">
                <li><a href='/inbox'>Inbox</a></li>
                <li><a href='/mytrip'>My Trips</a></li>
                <li><a href='/profile'>My Profile</a></li>
                <li><a href='/account' style = {{borderBottom: '1px solid #dbdbdb'}}>Account</a></li>
                <li><a href="/logout" onClick={this.logout} className="logout-btn">Logout</a></li>
                </ul>
             </li> 
            )
            }  else {
                toggleLogin = (
                    <li className="dropdown">
                    <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Login <i class="fas fa-caret-down"></i></a>
                    <ul className="dropdown-menu">
                    <li><a href='/travelerLogin'>Traveller Login</a></li>
                    <li><a href="/ownerlogin">Owner Login</a></li>
                    </ul>
             </li> 
                )
            }     
         navLinks = (this.props.logoFlag && !this.props.navBlue) ? 
            (
                <ul className="nav navbar-nav navbar-right" >  
                <a href='#'><img alt="" src = {this.props.logoFlag ? blueBird: whiteBird}/></a>
                </ul>
            )
                :
            (
                    <ul className="nav navbar-nav navbar-right">
                    <li><img src={usFlag} style={{width:'30px',height:'20px',marginTop:'15px'}} />
                    </li>
                     <li><a className = {this.props.navBlue? "nav-blue":"nav-link"} href="#">Trip Boards</a></li>
                     {profile_image}
                     {toggleLogin}
                     {inbox}
                     <li><a className = {this.props.navBlue? "nav-blue":"nav-link"} href="#">Help</a></li>
                     <button className="btn btn-default navbar-btn" style={{borderRadius:'100px',color:'#337ab7'}}>List Your Property</button>
                     <a href='#'><img alt="" src = {this.props.logoFlag ? blueBird: whiteBird}/></a>
                     </ul>
             );
             
        return (
            <div className='container-fluid'>
            <nav className="navbar" style={{marginTop:'25px'}}>
                <div className = "navbar-header">
                 <a href= '/' title = "HomeAway.com">
                     <img alt="Homeaway Logo" src = {this.props.logoFlag ? blueLogo: whiteLogo}></img>
                 </a>
                </div>
                {navLinks} 
                
            </nav>
            </div>
            
        )
    }
}
export default Navbar;