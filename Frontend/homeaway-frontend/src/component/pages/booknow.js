import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer'; 
import {Redirect} from 'react-router'; 
import moment from 'moment';
import DatePicker from 'react-datepicker';


class Book extends Component{
    constructor(props){
        super(props);
        this.state={
            first_name:localStorage.getItem("first_name"),
            last_name:localStorage.getItem("last_name"),
            phone:localStorage.getItem("phone"),
            description:"",
            price:this.total(),
            bookedFrom:(this.props.location.data !== undefined)?moment(this.props.location.data.availFrom):'',
            bookedTo:(this.props.location.data !== undefined)? moment(this.props.location.data.availTo):'',
            nights:this.calcNights(),
            allowedGuest:(this.props.location.data !== undefined)?this.props.location.data.allowedGuest:'',
            msg:"",
            errMsg:""
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.bookNow=this.bookNow.bind(this);
    }
    calcNights=()=>{
        console.log("calNights");
        let nights = 0;
        if(this.state!== undefined){
            var endDate = new Date(this.state.bookedTo);
            var startDate = new Date(this.state.bookedFrom);
            nights = (endDate.getTime()-startDate.getTime())/(1000*3600*24);
        } else if (this.props.location.data!=undefined){
            var endDate = new Date(this.props.location.data.availTo);
            var startDate = new Date(this.props.location.data.availFrom);
            nights = (endDate.getTime()-startDate.getTime())/(1000*3600*24);
        }
        this.setState({nights});
        return nights
    }
    total=()=>{
        if(this.props.location.state!=undefined){
            let nights = this.calcNights();
            let total = parseFloat(this.props.location.state.price) * nights
            this.setState({price:total})
            return total
        }
        return 0
    }
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleChangeEnd=(date)=>{
        this.setState({bookedTo:date},()=>{
            this.total();
        })
        this.toggleCalendar();
    }
    
    handleChangeStart=(date)=>{
        this.setState({bookedFrom:date},()=>{
            this.total();
        })
        this.toggleCalendar();
    }
    toggleCalendar= (e)=> {
        e && e.preventDefault()
        this.setState({isOpen: !this.state.isOpen})
      }
    bookNow(e){
        e.preventDefault();
        let obj = this;
        console.log(obj.props)
        let data ={
            user_id: localStorage.getItem("user_id"),
            prop_id: obj.props.match.params.propid ,
            first_name:obj.state.first_name,
            last_name:obj.state.last_name,
            phone:obj.state.phone,
            description:obj.state.description,
            price:obj.state.price,
            bookedFrom:obj.state.bookedFrom,
            bookedTo:obj.state.bookedTo,
            nights:obj.state.nights,
        }
        axios.post("http://localhost:7777/orders",data)
        .then(response=>{
            console.log(response.data)
            if(response.status===200){
                obj.setState({msg: `Your booking is successful. The order no is ${response.data.id}`,errMsg:""})
            }
            else{
                obj.setState({errMsg: "There was an issue in booking the order. Please try again.",msg:""})
            }
        })
    }
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/travelerLogin"/>
        }
        let nights = 0;
        let success = (this.state.msg!=="") ? (
            <div className="alert alert-success fade in">
                {this.state.msg}  
          </div>
        ):null;
        let error = (this.state.errMsg!=="")? (
            <div className="alert alert-error fade in">
                      {this.state.errMsg}  
            </div>
        ):null
        return (
            <div className="container-fluid">
                {redirectVar}
                <Navbar logoFlag={true} navBlue={true} />
                <div className="headline text-center">
                    <h3><bold>Book with confidence. Guaranteed.</bold></h3>
                    <h4>You’re covered when you book and pay on HomeAway.<a href="#">Learn more</a></h4>
                </div>
                <div className="col-md-12 margin-bottom-md text-center">
                    <div className="alert alert-info fade in">
                        <span><i className="fas fa-stopwatch"></i><strong> Act Fast!</strong> Price and availability may change.</span>
                        <span style={{paddingLeft:'50px'}}><i className="fas fa-check"></i><strong> Free Cancellation</strong> until {(this.props.location.data!=undefined) ? (this.props.location.data.availFrom).subtract(1,"days").format('MM/DD/YYYY'): moment().format('MM/DD/YYYY')} (including the Service Fee)</span>
                    </div>
                   {success}
                    {error}
                </div>  
                
                <div className="col-md-6" style={{backgroundColor:'white'}}>
                <form action="">
                    <h2>1. Begin your booking</h2>
                    <div style={{paddingLeft:'20px',marginTop:'30px'}}>
                    <h4>Welcome back <strong>{localStorage.getItem("first_name")}!</strong></h4>
                    <h4>Signed in as: <strong>{cookie.load('cookie')}</strong></h4>
                    </div>
                <div className='col-sm-6 form-group'style={{marginTop:'10px'}} >
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="First Name" id="fname" name="first_name" defaultValue={localStorage.getItem("first_name")}/> 
                </div>
                <div className='col-sm-6 form-group' style={{marginTop:'10px'}}>
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Last Name" id="lname" name="last_name" defaultValue = {localStorage.getItem("last_name")}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Phone" id="phone" name="phone" defaultValue={localStorage.getItem("phone")}/>
                </div>
                <div className="col-sm-12 text">
                    <h4><strong>Send the Owner a message</strong></h4>
                    <i className="fas fa-check" style={{color:'#21c44a'}}></i><span> What brings you to the area? </span>
                    <i className="fas fa-check" style={{color:'#21c44a'}}></i><span> Who are you travelling with? </span>
                </div>
                <div className="col-sm-12 form-group" style={{marginTop:'10px'}}>
                    <textarea className="form-control" rows="5" onChange={this.changeHandler} placeHolder="Your message...(optional)" name = "description" id="description"></textarea>
                </div>
                <div className="col-sm-12">
                <h4>By clicking 'Book Now' you are agreeing to our <a href='#'>Terms and Conditions</a>,</h4>
                <h4> <a href='#'>Privacy Policy</a>, and to receive booking-related texts. Standard messaging</h4>
                <h4> rates may apply.</h4> 
                </div>
                <div className="col-sm-offset-7 col-sm-5 pull-right" style={{marginBottom:"40px",marginLeft:"20px"}}>
                <button onClick={this.bookNow} className="btn btn-primary allow-wrap btn-panel pull-right btn-lg btn-rounded">Book Now</button>
                </div>
                </form>
                </div>
                <div className="col-md-5" style={{backgroundColor:'white',marginLeft:"4%",border:"1px solid lightgrey"}}>
                    <div className="col-sm-1" style={{bottom:"-20px"}}>
                    <i className="fas fa-phone fa-2x" ></i>
                    </div>
                    <div className="col-sm-11">
                    <h4>For booking assistance, call <strong>(888)640-6970</strong></h4>
                    <h4>Rental Number: <strong></strong></h4>
                    </div>
                </div>
                <div className="col-md-5"style={{backgroundColor:'white',marginLeft:"4%",border:"1px solid lightgrey", marginTop:"20px"}}>
                    {(this.props.location!= undefined && this.props.location.state !=undefined && this.props.location.state.image1!=null)?
                    <div className="col-sm-4">
                        <img className="image" src={`${process.env.PUBLIC_URL}/images/${this.props.location.state.image1}`} alt="image1" style={{width: '100%',height: '100%',objectFit: 'contain'}}/>
                    </div> :null}
                    {(this.props.location!= undefined && this.props.location.state !=undefined && this.props.location.state.image2!=null)?
                    <div className="col-sm-4">
                    <img src={`${process.env.PUBLIC_URL}/images/${this.props.location.state.image2}`} alt="image2" style={{width: '100%',height: '100%',objectFit: 'contain'}}/>
                    </div>:null}
                    {(this.props.location!= undefined && this.props.location.state !=undefined && this.props.location.state.image3!=null)?
                    <div className="col-sm-4">
                    <img src={`${process.env.PUBLIC_URL}/images/${this.props.location.state.image3}`} alt="image3" style={{width: '100%',height: '100%',objectFit: 'contain'}}/>
                    </div>:null}
                    {this.props.location.state !=undefined ?
                    (<div>
                    <div className="col-sm-12">
                    <h3><strong>{this.props.location.state.headline.substring(0,50)}...</strong></h3>
                    <h4><i className="fas fa-map-marker-alt"></i> {this.props.location.state.location}</h4>
                    </div>
                    <div className="col-sm-12 rating">
                        <span style = {{backgroundColor:"green", color:"white"}}><strong>5</strong>/5</span>
                        <span><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i> (6)</span>
                    </div>
                    </div>):null}
                    <div className="col-sm-12" style={{marginTop:"30px",marginBottom:"30px"}}>
                    <form>
                        <table style={{width:'100%'}}>
                            <tbody>
                            <tr>
                                <td colSpan='3'>
                                <label for="check-in-date" className="control-label">
                                    Arrive
                                </label>
                                <div className="input-group">
                                <DatePicker className="datepicker2"
                                    selected={this.state.bookedFrom}
                                    selectsStart
                                    startDate={this.state.bookedFrom}
                                    endDate={this.state.bookedTo}
                                    minDate={moment()}
                                    onChange={this.handleChangeStart}
                                    placeholderText="   From"   
                                />
                                </div>
                                </td>
                                <td>
                                <label for="check-out-date" className="control-label">
                                    Depart
                                </label>
                                <DatePicker className="datepicker2"
                                    selected={this.state.bookedTo}
                                    selectsEnd
                                    startDate={this.state.bookedFrom}
                                    endDate={this.state.bookedTo}
                                    minDate={moment(this.state.bookedFrom)}
                                    onChange={this.handleChangeEnd}
                                    placeholderText="   To"
                                />
                                </td>
                                <i className="icon-calendar gt-clickable form-control-feedback no-margin input-lg" aria-hidden="true"></i>
                                <td>
                                <label for="nights" className="control-label">
                                    Nights
                                </label>
                                <input type="text" onChange= {this.changeHandler} className="form-control mock-readonly js-nights input-lg" value={this.state.nights} readonly=""/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6">
                                
                                <label className="control-label">
                                    Guests
                                </label>
                                
                                    <input type="number" className="form-control pointer input-lg" onChange={this.changeHandler} data-tracking-label="guest-selector" tabindex="0" defaultValue={this.state.allowedGuest}/>
                                    
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                    </div>
                    <div className = "col-sm-12 price" style={{marginBottom:"40px"}}>
                        <h4><span> $ {this.props.location.state!=undefined?this.props.location.state.price:""} X {this.state.nights} nights</span><span className="pull-right">$ {this.state.price}</span></h4>
                        <div style={{borderTop:"1px dotted grey",borderBottom:"1px dotted grey"}}>
                        <h4><span><strong>Total:</strong></span><span onChange={this.changeHandler} className="pull-right"><strong>$ {this.state.price}</strong></span></h4>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}
export default Book;