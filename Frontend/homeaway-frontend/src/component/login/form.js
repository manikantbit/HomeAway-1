import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            id:'',
            errMsg:'',
            authFlag:false,
            errors:[]
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.createUser=this.createUser.bind(this);
        this.validate=this.validate.bind(this);
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    changeHandler(e) {
        console.log(e.target.value);
        this.setState({[e.target.name] :e.target.value});
    }
    validate(){
        let isError=false;
        let err= [];
        this.state.first_name.length===0?err.push("Please enter your first name"):null;
        this.state.last_name.length===0?err.push("Please enter your last name"): null;
        this.state.password.length===0?err.push("Please enter your password"): null;
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)?err.push("Please enter a valid email address"):null;
        console.log(err)
        if(err.length>0){
            this.setState({errors:[...err]});
            isError=true;
        } else {
            this.setState({...this.state,errors:[]})
        }
        return isError
    }
    createUser(e){
        e.preventDefault();
        //var headers = new Headers();
        let errors = this.validate();
        if(!errors){
        let data = {
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            password: this.state.password,
            type: this.props.type,
        };
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:7777/signup',data)
        .then(response=>{
            console.log("Status code:", response.status,response.cookie);
            if(response.status === 200){
                this.setState({authFlag:true,id:response.data.user_id})
            } else {
                this.setState({authFlag:false})
            }
        })
        .catch(err => {
            this.setState({errMsg:"Email ID Already Exists. Please login.",authFlag:false})
        })
    }
    }
    render() {
        let msg=null;
        let err = this.state.errors.map((error,i)=>{
            return (<div className="alert alert-danger fade in">
        			<a key = {i} href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {error}
    		</div>)
        })
        console.log(err)
        if(this.state.authFlag && cookie.load('cookie')){
            let first_name = this.state.first_name;
            let last_name = this.state.last_name;
            localStorage.setItem("first_name",first_name);
            localStorage.setItem("last_name", last_name);
            localStorage.setItem("type",this.props.type);
            localStorage.setItem("user_id",this.state.id);
            if(this.props.type ==='user') {
           return (<Redirect to={{ 
            pathname: '/signuphome',
            state: { referrer: {first_name:this.state.first_name,last_name:this.state.last_name} }
        }} />)
            } else {
                return (<Redirect to={{ 
                    pathname: '/ownerhome',
                    state: { referrer: {first_name:this.state.first_name,last_name:this.state.last_name} }
                }} />)
        }
    }
        return (
            <form action="">
                {err}
                {this.state.errMsg ?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.errMsg}
    			</div> :null}
                <div className="form-group row">
                <div className='col-xs-6'>
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="First Name" id="fname" name="first_name" required={true}/> 
                </div>
                <div className='col-xs-6'>
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Last Name" id="lname" name="last_name" />
                </div>
                </div>
                <div className="form-group">
                <input type="email" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Email address" id="email" name="email"/>
                </div>
                <div className="form-group">
                <input type="password" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Password" id="pwd" name="password"/>
                </div>
                <button onClick={this.createUser} className="btn btn-warning col-sm-offset-2 col-sm-8 input-lg">Sign Me Up</button>
                <div className='row'/>
                </form>
        )
    }
}
export default Form;