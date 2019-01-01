import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Footer from '../layout/footer';
import SearchForm from '../homepage/searchForm';
import Navbar from '../layout/navbar';

class UserSearch extends Component{
    constructor(props){
        super(props)
        this.state={
            errMsg:'',
            place:'',
            fromDate:'',
            toDate:'',
            allowedGuest:'',
            msg:'',
            render_first:"",
            arrayData:[]
        }
        this.getState = this.getState.bind(this);
    }
    getState(value){
        this.setState({arrayData:value,render_first:"done"})
    }
    navigate(id){
        this.props.history.push({
                pathname:`/usersearch/${id}`,
                data: this.props.location.state.search,
        })
    }
    render(){
        let mapping = null;
        let dash= null;
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/"/>
        }
        if(this.state.render_first ===""){
            mapping = (this.props.location.data!=="undefined" ? this.props.location.data:null );
        } else{
            mapping = this.state.arrayData;
        }
        if(mapping!=null || mapping!=undefined){
            dash = (mapping).map(data=>{
             return (
                <div className='card row' style ={{margin:'30px'}}>
                <div className="col-md-4 col-xs-4">  
                <div id={`myCarousel-${data.propid}`} className="carousel slide" data-ride="carousel" data-interval = "false">
                    <div className="carousel-inner">
                        <div className="item active">
                        {data.image1 != null ?
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image1}`} alt="image1"/>
                        : <img src="http://placehold.it/350x250" alt="image1"/>}
                       </div>
                    {data.image2 != null ?   
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image2}`} alt="image2"/>
                    </div> : null}
                    {data.image3 != null ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image3}`} alt="image3"/>
                    </div>:null}
                    {data.image4 != null ?
                    <div className="item">
                        <img src={`${process.env.PUBLIC_URL}/images/${data.image4}`} alt="image4"/>
                    </div>:null}
                </div>
                {(data.image2 !==null || data.image3!==null || data.image4!==null) ?
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
                <div className="item-search col-md-6 col-xs-8">
                    <h4><a onClick={this.navigate.bind(this,data.propid)}>{data.headline}</a></h4>
                    <h4>{`${data.proptype} `} <i className="fas fa-circle fa-xs"></i> {`${data.noOfRooms}BR `} <i className="fas fa-circle fa-xs"></i>   {`${data.noOfBath}BA `} <i className="fas fa-circle fa-xs"></i>  {`Sleeps ${data.allowedGuest}`}</h4>
                <h4 style={{marginTop:'30px'}}><i className="fas fa-map-marker-alt"></i> {data.location}</h4>
                <h4 style={{marginTop:'40px'}}>${data.price} per night</h4>
                </div>
            </div>
            )
        })
    }
        return (
            <div className="container-fluid">
            {redirectVar}
            <div>
            <Navbar logoFlag={true} navBlue={true}/>
            <SearchForm {...this.props} searchValue = {this.props.location.state!=undefined ? this.props.location.state.search:null} where="search" sendData={this.getState}/>
            </div>
            <div className="filter">
                <span>Price <i className="fas fa-chevron-down"></i></span>
                <span>Bedrooms <i className="fas fa-chevron-down"></i></span>
                <span>Instant Confirmation  <i className="fas fa-chevron-down"></i></span>
                <span>Group type <i className="fas fa-chevron-down"></i></span>
                <span>More filters <i className="fas fa-chevron-down"></i></span>
            </div>         
            {dash}
            <div style={{margin:'50px'}}>
            <Footer />
        </div>
               
        </div>
        )
    }
}
export default UserSearch;