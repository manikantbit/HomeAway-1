import React, {Component} from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class TravelerLogin extends Component {
    constructor(props){
        super(props)
        this.state= {
            email:'',
            password:'',
            errMsg: '',
            user_id:'',
            first_name:'',
            last_name:'',
            phone:'',
            type:'',
            profile_image:'',
            errors:[]
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.login=this.login.bind(this);
    }
    changeHandler(e){
        this.setState({[e.target.name] :e.target.value});
    }
    validate=()=>{
        let isError=false;
        let err= [];
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)?err.push("Please enter a valid email address"):null;
        this.state.password.length===0?err.push("Please enter your password"): null;
        if(err.length>0){
            this.setState({errors:[...err]});
            isError=true;
        } else {
            this.setState({...this.state,errors:[]})
        }
        return isError
    }

    login(e){
        e.preventDefault();
        let errors = this.validate();
        if(!errors){
        let data = {email:this.state.email,password:this.state.password, type: "user"}
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:7777/login',data)
        .then(response=>{
            console.log("Status code:", response.status,response.data);
            if(response.status === 200){
                this.setState({
                    authFlag:true,
                    first_name:response.data.first_name,
                    last_name:response.data.last_name,
                    type:response.data.type,
                    phone:response.data.phone,
                    user_id:response.data.user_id,
                    profile_image:response.data.profile_image
                })
            } else {
                this.setState({authFlag:false})
            }
        })
        .catch(err => {
            this.setState({errMsg:"Username/Password is not correct",authFlag:false})
        })
    }
    }
    render(){
	let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        let err = this.state.errors.map((error,i)=>{
            return (<div className="alert alert-danger fade in">
        			<a key = {i} href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {error}
    		</div>)
        })
        if(this.state.authFlag && cookie.load('cookie')){
            //var name = {"first_name":this.state.first_name,"last_name":this.state.last_name,"type":this.state.type}
            localStorage.setItem("user_id",this.state.user_id);
            localStorage.setItem("first_name",this.state.first_name);
            localStorage.setItem("last_name",this.state.last_name);
            localStorage.setItem("type",this.state.type);
            localStorage.setItem("phone",this.state.phone);
            localStorage.setItem("profile_image",this.state.profile_image);
            return (<Redirect to={{
             pathname: '/',
             state: { referrer: {first_name:this.state.first_name,last_name:this.state.last_name,type:this.state.type}}
         }} />)
        }
        return (
            <div className='container-fluid'>
	    {redirectVar}
            <Navbar logoFlag = {true}/>
            <div className="bg-secondary text-white">
              <div className="col-sm-offset-4 col-lg-4 col-sm-offset-4">
                  <div className="card-body text-center">
                <h2>Log in to HomeAway</h2>
                <h4>Need an account?<a href='/travelerSignup'>  Sign Up</a></h4>
            </div>
            <div className="login-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
            <form  action="">
            {err}
            {(this.state.errMsg!=="")?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.errMsg}
    		</div>:null}
                <h2 style={{color:'#666',fontSize:'22px',fontWeight:'300',borderBottom: '1px solid #dbdbdb'}}>Account Login</h2>
                <div className="form-group">
                <input type="email" onChange={this.changeHandler} name = "email" className="form-control input-lg" placeholder ="Email address" id="email"/>
                </div>
                <div className="form-group">
                <input type="password" onChange={this.changeHandler} className="form-control input-lg" name= "password" placeholder ="Password" id="pwd"/>
                </div>
                <div className="form-group">
                        <a href="#" id="forgotPasswordUrl" className="forgot-password">Forgot password?</a>
                </div> 
                <button onClick={this.login} className="btn btn-warning col-sm-12 input-lg">Log In</button>
                <div className='row'/>
                <div className="checkbox">
                <label><input type="checkbox"/> Keep me signed in</label>
                </div>
                </form>
                <div className="centered-hr text-center">
                    <span className="text-center"><em>or</em></span>
                </div>
                <div className='btn-toolbar'>
                <button className="btn btn-primary fab fa-facebook col-sm-12 input-lg" style={{fontSize:'16px',padding:'10px 10px'}}>
                  <span>  |  </span>Login with Facebook
                </button>
                <div style={{paddingBottom:'50px'}}></div>
                <button className="btn btn-default fab fa-google col-sm-12 input-lg" style={{fontSize:'16px',padding:'10px 10px'}}>
                <span>  |  </span>
                  Login with Google
                </button>
                </div>
                <p id="fb-p" class="facebook text-center traveler"><small>We don't post anything without your permission.</small></p>
            
            </div>
            </div>
            </div>
            <Footer/>
            </div>
        )
    }
}
export default TravelerLogin;
