import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import Form from './form';
import SocialButton from '../layout/socialBut';


class TravelerSign extends Component {
    constructor(props){
        super(props);
        this.state={showForm:false, signButton:true};
    }
    getSignForm(){
        this.setState({showForm:true, signButton:false});  
    }
    render(){
	let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        let signForm = this.state.showForm? <Form type="user"/>: null;
        let signButton = this.state.signButton ? 
        (<button type="submit" onClick={()=>this.getSignForm()} className="btn btn-warning col-sm-offset-2 col-sm-8 input-lg">Sign up with Email</button>) : null;
        return (
            <div className='container-fluid'>
	    {redirectVar}
            <Navbar logoFlag= {true}/>
            <div className="bg-secondary text-center text-white">
              <div className="col-sm-offset-3 col-lg-6 col-sm-offset-3">
                <div className="card-body text-center">
                <h1 style={{fontWeight:'300',marginTop:'20px',marginBottom: '10px'}}>Sign up for HomeAway</h1>
                <h4>Already have an account?<a href='/travelerLogin'>  Login</a></h4>
            </div>
            <div className="login-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
                {signForm}
                {signButton}
                <div className='row' />
                <div className="centered-hr text-center">
                    <span className="text-center"><em>or</em></span>
                </div>
                <SocialButton/>               
                <label style={{fontSize: '11px', fontWeight:'normal'}}>
                    By creating an account you are accepting our 
                <a href="#"> Terms and Conditions</a> and 
                <a href="#"> Privacy Policy</a>.
                </label>
            </div>
            </div>
            </div>
            <Footer />
            
            </div>
        )
    }
}
export default TravelerSign;
