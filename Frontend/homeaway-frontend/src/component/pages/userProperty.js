import React,{Component} from 'react';
import NavbarOwner from '../layout/navbarOwner';
import PropertyPage from '../layout/property';
import Footer from '../layout/footer';
import SearchForm from '../homepage/searchForm';

class UserProperty extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="container-fluid">
                <NavbarOwner/>
                <SearchForm/>
                <PropertyPage {...this.props} propid = {this.props.match.params.propid} type="user"/>
                <Footer/>
            </div>
        )
    }
}
export default UserProperty;