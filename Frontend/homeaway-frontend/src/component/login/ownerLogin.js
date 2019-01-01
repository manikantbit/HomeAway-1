import React, {Component} from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class OwnerLogin extends Component {
    constructor(props){
        super(props)
        this.state= {
            email:'',
            password:'',
            errMsg: '',
            id:'',
            first_name:'',
            last_name:'',
            type:'',
            errors:[]
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.login=this.login.bind(this);
        this.validate= this.validate.bind(this);
    }
    changeHandler(e){
        this.setState({[e.target.name] :e.target.value});
    }
    validate(){
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
        console.log("In Login") 
        let data = {email:this.state.email,password:this.state.password, type: "owner"}
        let errors = this.validate();
        if(!errors){
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:7777/login',data)
        .then(response=>{
            console.log("Status code:", response.status);
            if(response.status === 200){
                this.setState({
                    authFlag:true,
                    first_name:response.data.first_name,
                    last_name:response.data.last_name,
                    type:response.data.type,
                    id:response.data.user_id
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
            var name = {"first_name":this.state.first_name,"last_name":this.state.last_name,"type":this.state.type}
            localStorage.setItem("first_name",this.state.first_name);
            localStorage.setItem("last_name",this.state.last_name);
            localStorage.setItem("type",this.state.type);
            localStorage.setItem("id",this.state.id)
            if(this.state.type==="user"){
            return (<Redirect to={{
             pathname: '/',
             state: { referrer: {first_name:this.state.first_name,last_name:this.state.last_name,type:this.state.type}}
         }} />)
            } else {
                return (<Redirect to={{
                    pathname: '/ownerhome',
                    state: { referrer: {first_name:this.state.first_name,last_name:this.state.last_name,type:this.state.type}}
                }} />)
            }
        }
        return (
            <div className='container-fluid'>
	    {redirectVar}
            <Navbar logoFlag={true}/>
            <div className="col-md-6 col-sm-6" style={{marginTop:'20px'}}>
            <a id="personyzeContent" style={{background: "url('//csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png') no-repeat top right", outline:'none'}}></a>
            </div>
            <div className="col-offset-sm-6 col-sm-4" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
            <form  action="">
                {err}
                {(this.state.errMsg!=="")?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.errMsg}
    		</div>:null}
                <h2 style={{color:'#666',fontSize:'22px',fontWeight:'300',borderBottom: '1px solid #dbdbdb'}}>Owner Login</h2>
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
                <h4>Need an owner account?<a href='/ownersignup'>  Sign Up</a></h4>
                </form>
            </div>
            <Footer/>
            </div>
        )
    }
}
export default OwnerLogin;
