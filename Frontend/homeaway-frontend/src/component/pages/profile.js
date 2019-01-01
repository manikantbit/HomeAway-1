import React,{Component} from 'react';
import Navbar from '../layout/navbar';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import Footer from '../layout/footer';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state= {
            errMsg:'',
            first_name:'',
            last_name:'',
            profile_image:'',
            about:'',
            city:'',
            hometown:'',
            company:'',
            school:'',
            languages:'',
            gender:'',
            phone:'',
            changeMsg:""
        }
        this.updateUser=this.updateUser.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
        this.selecter=this.selecter.bind(this);
    }
    componentDidMount(){
        let data = {"email":cookie.load('cookie')}
        console.log(data)
        axios.get('http://localhost:7777/getprofile',{params:data})
        .then(response=>{
            console.log(response.data);
            this.setState({
                first_name:response.data.first_name,
                last_name: response.data.last_name,
                profile_image: response.data.profile_image,
                about: response.data.about,
                city: response.data.city,
                hometown:response.data.hometown,    
                company:response.data.company,
                school:response.data.school,
                languages:response.data.languages,
                gender:response.data.gender,
                phone:response.data.phone
            })

        })
        .catch(err=> this.setState({errMsg:"Profile not updated. Please retry."})
            )
    }
    changeHandler(e){
        console.log(e.target.name);
        switch (e.target.name) {
            case 'profile_image':
              this.setState({ profile_image: e.target.files[0]},()=>{
              let formData = new FormData();
              formData.append('profile_image',this.state.profile_image);
              formData.append('email',cookie.load('cookie'))
              axios.post("http://localhost:7777/profileimage",formData)
                .then(response=>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({profile_image:response.data.data,changeMsg:"Profile photo is uploaded successfully."})
                    localStorage.setItem("profile_image",response.data.data)
                }
                }).catch(err=>{
                    console.log(err)
                    this.setState({errMsg:"Images are not uploaded successfully. Please try again."})
                })
            })
              break;
            default:
                this.setState({[e.target.name] :e.target.value});
        }
    }
    updateUser(){
        let data = {
                first_name:this.state.first_name,
                last_name: this.state.last_name,
                profile_image: this.state.profile_image,
                about: this.state.about,
                city: this.state.city,
                hometown:this.state.hometown,    
                company:this.state.company,
                school:this.state.school,
                languages:this.state.languages,
                gender:this.state.gender,
                phone:this.state.phone,
                email:cookie.load('cookie')
        }
        axios.post('http://localhost:7777/profile',data)
        .then(response=>{
            console.log("response", response.status)
            if(response.status===200){
                this.setState({changeMsg:"Success! Your profile has been updated."})
                localStorage.setItem("phone",this.state.phone);
            }
        })
    }
    openDialog =() =>{
        document.getElementById('fileid').click();
     }
    selecter(){
        document.getElementById('js-edit-photo').addEventListener('click',this.openDialog);
    }
    
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        return (
            <div className ="container-fluid">
            {redirectVar}
            <Navbar logoFlag={true} navBlue={true}/>
            <ul className="nav nav-pills" style = {{borderBottom:'1px solid #dfdfdf',marginBottom:'40px'}}>
                <li><a href="/inbox">Inbox</a></li>
                <li><a href="/mytrip">My trips</a></li>
                <li className='tab'><a href="/profile">Profile</a></li>
                <li><a href="/account">Account</a></li>
            </ul>
            <div className="text-success text-center">
            {this.state.changeMsg}
            </div>
            <div className="text-danger text-center" style={{marginBottom:'20px'}}>{this.state.errMsg}
                </div>
            <div className="text-center">
                <form id='formid' action="" method="POST" enctype="multipart/form-data"> 
                 <img src={(this.state.profile_image!= null) ? "images/"+this.state.profile_image:'https://odis.homeaway.com/mda01/7f257b13-2434-404e-b967-285a6b7eca02.2.2'} className="avatar img-circle img-thumbnail" alt="avatar" style={{width:'100px',height:'100px'}}/>
                 <input id='fileid' type='file' name='profile_image' onChange={this.changeHandler} hidden ={true} style={{display:'none'}}/>
                 <button id="js-edit-photo" onClick={this.selecter} className="btn btn-default btn-profile" title="Add photo" type="button">
                 <i className="fas fa-pencil-alt"></i>
                </button> 
                </form>
                    <h2>{this.state.first_name} {this.state.last_name}</h2>
                    <h5>Member since 2018</h5>
            </div>
            
            <div className="col-sm-8 login-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
            <form action="">
                <h2>Profile Information</h2>
                
                <div className='col-sm-6 form-group'style={{marginTop:'10px'}} >
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="First Name" id="fname" name="first_name" defaultValue={this.state.first_name}/> 
                </div>
                <div className='col-sm-6 form-group' style={{marginTop:'10px'}}>
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Last Name" id="lname" name="last_name" defaultValue = {this.state.last_name}/>
                </div>
                
                <div className="col-sm-12 form-group" style={{marginTop:'10px'}}>
                    <textarea className="form-control" rows="5" onChange={this.changeHandler} placeHolder="About me" name = "about" id="about1" value={this.state.about}></textarea>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="My city, country" id="city" name="city" defaultValue={this.state.city}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Company"  name="company" defaultValue={this.state.company}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="School" name="school" defaultValue={this.state.school}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Hometown" name="hometown" defaultValue={this.state.hometown}/>
                </div>
                <div className="col-sm-8 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Languages" name="languages" defaultValue={this.state.languages}/>
                </div>
                <div className="col-sm-8 form-group">
                    <select onChange={this.changeHandler} className="form-control input-lg" placeholder="Gender" name="gender" value={this.state.gender} >
                    <option value='' selected disabled>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                    </select>           
                </div>
                <div className="col-sm-8">
                <h6><i className="fas fa-lock"></i> This is never shared</h6>
                </div>
                <div className="col-md-10">
                <div className="col-md-2">
                <label className="switch">
                    <input type="checkbox" checked/>
                    <span className="slider round"></span>
                </label>
                </div>
                <div className="col-md-7">
                    <span>Send me texts about my bookings.</span>
                    <span className="sms-pref-info">Only available for mobile phones in select countries. Standard messaging rates apply. See 
                    <a href="#"> terms and conditions</a> and <a href="#"> privacy policy.</a></span>
                </div>
                </div>
                <div className="col-sm-8 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Phone No" name="phone" defaultValue={this.state.phone}/>
                </div>
            </form>
            </div>   
            <div className='col-lg-8'>
            <button onClick={this.updateUser} className="btn btn-primary col-sm-offset-1 col-lg-4 input-lg" style={{marginTop:'10px',paddingLeft:'30px'}}>Save Changes</button>    
            </div>
            <div style = {{margin:'100px',paddingTop:'50px'}}>
                <Footer/>   
            </div>
            </div>

        )
    }
}
export default Profile;
