import React,{Component} from 'react';
import Footer from './footer';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            errMsg:'',
            propid:'',
            msg:'',
            arrayData:[]
        }
    }
    componentDidMount(){
        let userid = localStorage.getItem("id");
        axios.get("http://localhost:7777/getPropByUser",{params:{"id": userid}})
        .then(response => {
            console.log(response.data.data);
            this.setState({arrayData:response.data.data})
        })
    }
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }
        let dash = this.state.arrayData.map(data=>{
             return (
                <div className='card row' style ={{margin:'30px'}}>
                <div className="col-md-4 col-xs-4"> 
                <div id={`myCarousel-${data.propid}`} className="carousel slide" data-ride="carousel" data-interval = "false">

                    <div className="carousel-inner">
                        <div className="item active">
                        {(data.image1 !== null) ?
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image1}`} alt="image1"/>
                        : <img src="http://placehold.it/350x250" alt="image1"/>}
                       </div>
                    {(data.image2 != null) ?   
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image2}`} alt="image2"/>
                    </div> : null}
                    {((data.image3 !==null)) ?
                    (<div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image3}`} alt="image3"/>
                    </div>):null}
                    {(data.image4 !== null) ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image4}`} alt="image4"/>
                    </div>:null}
                </div>
                {(data.image2 !== null || data.image3 !== null || data.image4 !== null) ?
                (<div className="arrow">
                <a className="left carousel-control" href={`#myCarousel-${data.propid}`} data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href={`#myCarousel-${data.propid}`} data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>) : null}
                </div> 
                </div>
                <div className="col-md-6 col-xs-8">
                    <h4><a href={`/ownerhome/${data.propid}`}>{data.headline}</a></h4>
                    <h4>{`${data.proptype} `} <i className="fas fa-circle fa-xs"></i> {`${data.noOfRooms}BR `} <i className="fas fa-circle fa-xs"></i>   {`${data.noOfBath}BA `} <i className="fas fa-circle fa-xs"></i>  {`Sleeps ${data.allowedGuest}`}</h4>
                <h4 style={{marginTop:'30px'}}><i className="fas fa-map-marker-alt"></i> {data.location}</h4>
                <h4 style={{marginTop:'40px'}}>${data.price} per night</h4>
                </div>
            </div>
            )
        })
        return (
            <div className="container-fluid">
            {redirectVar}
            <div className="text-center">
            <h1>Dashboard</h1>
            <h3>Your Property Listings</h3>
            </div>            
            {dash}
            <div style={{margin:'50px'}}>
            <Footer />
        </div>
               
        </div>
        )
    }
}
export default Dashboard;