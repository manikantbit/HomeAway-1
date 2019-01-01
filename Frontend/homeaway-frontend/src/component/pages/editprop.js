import React,{Component} from 'react';
import NavbarOwner from '../layout/navbarOwner';
import PropertyForm from './propertyForm';
import Footer from '../layout/footer';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class EditProp extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }
        return (
            <div className="container-fluid">
                {redirectVar}
                <NavbarOwner/>
                <PropertyForm {...this.props} form="edit"/>
                <div style = {{margin:'100px',paddingTop:'50px'}}>
                <Footer/>
                </div>
            </div>
        )
    }
}
export default EditProp;