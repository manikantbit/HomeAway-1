import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavbarOwner from '../layout/navbarOwner';
import PropertyPage from '../layout/property';
import Footer from '../layout/footer';
import Navbar from '../layout/navbar';

class PropertyDetail extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/travelerLogin"/>
        }
        return (
            <div className="container-fluid">
            {redirectVar}
             {localStorage.getItem("type") ==="owner" ? <NavbarOwner/>: <Navbar logoFlag={true} navBlue={true} />}
                
                <PropertyPage {...this.props} propid = {this.props.match.params.propid} type={localStorage.getItem("type")}/>
                <Footer/>
            </div>
        )
    }
}
export default PropertyDetail;