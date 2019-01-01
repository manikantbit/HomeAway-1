import React,{Component} from 'react';
import Navbar from '../layout/navbar';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Inbox extends Component {
    constructor(props){
        super(props)
        this.navigate = this.navigate.bind(this);
    }
    navigate(){
        this.props.history.push("/usersearch");
    }
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        let name = localStorage.getItem("name");
        console.log(name)
        return (
            <div className = "container-fluid">
            {redirectVar}
                <Navbar logoFlag={true} navBlue={true}/>
                <ul className="nav nav-pills" style = {{borderBottom:'1px solid #dfdfdf',marginBottom:'40px'}}>
                <li className='tab'><a href="/inbox">Inbox</a></li>
                <li ><a href="#">My trips</a></li>
                <li ><a href="/profile">Profile</a></li>
                <li ><a href="#">Account</a></li>
                </ul>
                <div className="text-center">
                    <i class="fas fa-suitcase"></i>
                    <h4>No messages</h4>
                    <button onClick= {this.navigate} className="btn btn-primary">Start your search</button>
                </div>
            </div>
        )
    }
}
export default Inbox;