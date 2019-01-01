import React,{Component} from 'react';
import Navbar from '../layout/navbar';

class UserTab extends Component {
    component(props) {
        super(props)
    }
    render() {
        return (
            <div className='container-fluid'>
            <Navbar logoFlag={true}/>
            <ul className="nav nav-pills">
            <li className={ (this.props.path === '/inbox') ? 'tab' : '' }><a href="/inbox">Inbox</a></li>
            <li className={ (this.props.path === '/mytrip') ? 'tab' : '' }><a href="/mytrip">My trips</a></li>
            <li className={ (this.props.path === '/profile') ? 'tab' : '' }><a href="/profile">Profile</a></li>
            <li className={ (this.props.path === '/account') ? 'tab' : '' }><a href="#">Account</a></li>
            </ul>
            </div>
        )

    }
}
