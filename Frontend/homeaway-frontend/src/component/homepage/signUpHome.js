import React, {Component} from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class SignUpHome extends Component {
    constructor(props){
        super(props);
        this.state={cont: false, prof:false}
        this.continue=this.continue.bind(this);
        this.profile=this.profile.bind(this);
    }
    componentWillMount(){
        this.setState({cont:false,prof:false})
    }
    continue(){
        this.setState({cont:true})
    }
    profile(){
        this.setState({prof:true})
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/travelerSignup"/>
        }
        let first_name= localStorage.getItem("first_name");
        let last_name= localStorage.getItem("last_name");
        if (this.state.cont) {
            return (<Redirect to={{
                pathname: '/',
                state: { referrer: this.props.location.state.referrer }
            }} />)
        }
        if(this.state.prof) {
            return (<Redirect to={{
                pathname: '/profile',
                state: { referrer: this.props.location.state.referrer }
            }} />)   
        }
        return (
            <div className='container-fluid'>
            {redirectVar}
            <Navbar logoFlag= {true}/>
            <div className="bg-secondary text-center text-white">
              <div className="col-sm-offset-3 col-lg-6 col-sm-offset-3">
                <div className="card-body text-center">
                <h1 style={{fontWeight:'300',marginTop:'20px',marginBottom: '10px'}}>Thank you for creating an Account</h1>
            </div>
            <div className="profile-update" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
            <h3>Welcome<strong> {`${first_name} ${last_name}`}</strong> </h3>
            <div className='row' /> 
            <div className="centered-hr text-center">
            </div>
            <p>
            <img src="//resources.homeaway.com/resources/29f5da4c/images/anonymous.png"/>
            </p>
            <p>
               Please take a few moments to 
               <a href="/updateprofile"> update your profile </a>
                with a picture and a few details about yourself. Property owners are more likely to respond more quickly to travelers with profiles.
            </p>
            <div className="centered-hr text-center" style={{paddingTop:'4  0px'}}>
            </div>
            <div className="row" style={{paddingTop:'20px',fontSize:'20px'}}>
                    <div className="col-xs-6" >
                    <button onClick={this.continue} className="btn btn-link btn-md center-block input-lg">Continue</button>
                    </div>
                    <div className="col-xs-6">
                    <button onClick={this.profile}className="btn btn-primary btn-md center-block input-lg" >Update Your Profile</button>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Footer />
            
            </div>
        )
    }
}
export default SignUpHome;