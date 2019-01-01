import React,{Component} from 'react';
import Navbar from '../layout/navbar';

class Logout extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount() {

        this.props.history.push('/');
      }
    
    render(){
        return (
            <div>
                Logout
            </div>
        )
    }
}
export default Logout;