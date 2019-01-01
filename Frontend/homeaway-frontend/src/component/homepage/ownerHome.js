import React,{Component} from 'react';
import Navbar from '../layout/navbar';
import NavbarOwner from '../layout/navbarOwner';
import Dashboard from '../layout/dashboard';

class OwnerHome extends Component {
    render(){
        return (
            <div className="container-fluid">
                <NavbarOwner/>
                <Dashboard/>
            </div>
        )
    }
}
export default OwnerHome;