import React,{Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router'
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';

class UserTrip extends Component{
    constructor(props){
        super(props)
        this.state={
            arrayData:[]
        }
    }
    componentDidMount(){
        let user_id = localStorage.getItem("user_id");
        console.log(user_id);
        axios.get("http://localhost:7777/mytrip",{params:{"user_id":user_id}})
        .then(response =>{
            console.log(response.data)
            if(response.status ===200){
                this.setState({arrayData: response.data.result})
            }
        })

    }
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        let trip = this.state.arrayData.map(data=>{
            return (
                <div className="card-dash col-sm-3" style={{fontSize:'14px',margin:"5px"}}>
                    <div className="card-body">
                    <div id={`myCarousel-${data.prop_id}`} className="carousel slide" data-ride="carousel" data-interval = "false">
                    <div className="carousel-inner">
                        <div className="item active">
                        {(data.property.image1 !== null) ?
                        <img src={`${process.env.PUBLIC_URL}/images/${data.property.image1}`} alt="image1"/>
                        : <img src="http://placehold.it/350x250" alt="image1"/>}
                       </div>
                    {(data.property.image2 != null) ?   
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.property.image2}`} alt="image2"/>
                    </div> : null}
                    {((data.property.image3 !==null)) ?
                    (<div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.property.image3}`} alt="image3"/>
                    </div>):null}
                    {(data.property.image4 !== null) ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.property.image4}`} alt="image4"/>
                    </div>:null}
                </div>
                {(data.property.image2 !== null || data.property.image3 !== null || data.property.image4 !== null) ?
                (<div className="arrow">
                <a className="left carousel-control" href={`#myCarousel-${data.prop_id}`} data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href={`#myCarousel-${data.prop_id}`} data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>):null}
                </div>
                    <h4 className="card-title">{data.property.headline}</h4>
                    <h6 className="card-subtitle mb-2 text-muted"><i className="fas fa-map-marker-alt"></i> {data.property.location}</h6>
                    <p className="card-text">{data.description.substring(0,40)}...</p>
                    <div className="col-sm-6">
                    <span><strong>Booked From</strong></span>
                    </div>
                <div className="col-sm-6">
                <span><strong>Booked To</strong></span>
                </div>
                <div className="col-sm-6 ">
                    <span>{data.bookedFrom}</span>
                </div>
                <div className="col-sm-6">
                <span>{data.bookedTo}</span>
                </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span><strong>Total Nights:</strong></span>
                    </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span>{data.nights}</span>
                </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span><strong>Booked Price:</strong></span>
                    </div>
                <div className="col-sm-6" style={{marginTop:"20px"}}>
                    <span>{data.price}</span>
                </div>  
                
                </div>
                </div>
            )
        })
        return (
            <div className="container-fluid">
                {redirectVar}
                <Navbar logoFlag={true} navBlue={true}/>
                <ul className="nav nav-pills" style = {{borderBottom:'1px solid #dfdfdf',marginBottom:'40px'}}>
                <li ><a href="/inbox">Inbox</a></li>
                <li className='tab'><a href="/mytrip">My trips</a></li>
                <li ><a href="/profile">Profile</a></li>
                <li ><a href="#">Account</a></li>
                </ul>
                <div className="col-sm-offset-1 col-sm-11">
                {trip}
                </div>
                <div style={{marginTop:'40px'}}>
                <Footer/>
                </div>
            </div>
        )
    
    }
}

export default UserTrip;
