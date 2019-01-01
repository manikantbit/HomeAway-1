import React,{Component} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Home from './homepage/home';
import TravelerLogin from './login/travelerLogin';
import TravelerSign from './login/travelerSign';
import SignUpHome from './homepage/signUpHome';
import Inbox from './pages/inbox';
import Profile from './pages/profile';
import Logout from './pages/logout';
import OwnerLogin from './login/ownerLogin';
import OwnerHome from './homepage/ownerHome';
import OwnerSignup from './login/ownerSignup';
import AddNewProp from './pages/addnewprop';
import PropertyDetail from './pages/propdetail';
import EditProp from './pages/editprop';
import UserSearch from './pages/userSearch';
import Book from './pages/booknow';
import UserTrip from './pages/userTrip';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
   		    <Switch>
   			<Route exact path="/" component={Home} />
   			<Route exact path="/travelerLogin" component={TravelerLogin} />
            <Route exact path="/travelerSignup" component={TravelerSign} />
            <Route exact path="/signuphome" component={SignUpHome} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/ownerlogin" component={OwnerLogin}/>
            <Route exact path="/ownerhome" component={OwnerHome}/>
            <Route exact path="/ownersignup" component={OwnerSignup}/>
            <Route exact path="/addnewprop" component={AddNewProp}/>
            <Route exact path="/editprop" component={EditProp}/>
            <Route exact path="/usersearch" component={UserSearch}/>
            <Route exact path="/mytrip" component={UserTrip}/>
            <Route path="/ownerhome/:propid" component={PropertyDetail}/>
            <Route path="/usersearch/:propid" component={PropertyDetail}/>
            <Route path="/booknow/:propid" component={Book}/>
   		</Switch>
   </BrowserRouter>
        )
    }
}
export default Router;