import React, {Component} from 'react';
import Navbar from '../layout/navbar';
import cookie from 'react-cookies';
import SearchForm from './searchForm';

class Home extends Component {
    
    render(){
        return (
            <div className='mainApp'>
            <Navbar logoFlag = {false} navBlue={false}/>
            <div className="container-fluid"> 
            <div className="Search" style={{marginTop:'100px'}}>
                <h1 className="display-1 col-sm-offset-1 col-sm-10">
                    <span>Book beach houses, cabins,</span>
                </h1>
                <h1 className="col-sm-offset-1 col-sm-10 display-1">
                    <span>condos and more, worldwide</span>
                </h1>
            </div>
            <SearchForm {...this.props} where = "home"/>
            <div className='col-sm-12' style={{marginTop:'100px',color:'white',marginBottom:'50px'}}>
            <ul className='list-inline text-center' >
            <li className='col-xs-4 list-inline-item'>
            <h4 className="list-group-item-heading">Your whole vacation starts here</h4>
            <span className="list-group-item-text">Choose a rental from the world's best selection</span>
            </li>
            <li className='col-xs-4 list-inline-item'>
            <h4 className="list-group-item-heading">Book and stay with confidence</h4>
            <span className="list-group-item-text"><a href="#" style={{color:'white'}}> Secure payments, peace of mind</a></span>
            </li>
            <li className='col-xs-4 list-inline-item'>
                <h4 className="list-group-item-heading">Your vacation your way</h4>
                <span className="list-group-item-text">More space, more privacy, no compromises</span>
            </li>
            </ul>
            </div>
             </div>
             </div>  

        )
    }
}
export default Home;