import React,{Component} from 'react';

class SocialButton extends Component{
    render(){
        return (
            <div className="social">
                <div className="social-button">
                <button className="btn btn-primary fab fa-facebook col-sm-offset-2 col-sm-8 input-lg" style={{fontSize:'16px'}}>
                  <span>  |  </span>Login with Facebook
                </button>
                <div style={{paddingBottom:'50px'}}></div>
                <button className="btn btn-default fab fa-google col-sm-offset-2 col-sm-8 input-lg" style={{fontSize:'16px'}}>
                <span>  |  </span>
                  Login with Google
                </button>
                </div>
                <div style={{paddingTop:'50px'}}/>
                <p id="fb-p"><small>We don't post anything without your permission.</small></p>
             </div>   
        )
    }
}
export default SocialButton;