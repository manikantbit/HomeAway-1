import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

var moment=require('moment');

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state={
           location: (this.props.searchValue) ? this.props.searchValue.location :'',
           availFrom: (this.props.searchValue) ? moment(this.props.searchValue.availFrom):'',
           availTo: (this.props.searchValue) ? moment(this.props.searchValue.availTo):'',
           allowedGuest:(this.props.searchValue) ? this.props.searchValue.allowedGuest: '',
           msg:'',
           arrayData:[]
        }
        this.validate= this.validate.bind(this);
        this.search=this.search.bind(this);
    }
    options=()=>{
        var input = document.querySelector(".place");
        //var dropdown = new google.maps.places.Autocomplete(input);
    }
    changeHandler =(e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
    validate(){
        let isError = false;
        if(this.state.location ==="" || this.state.availFrom==="" || this.state.availTo ==="" || this.state.allowedGuest===""){
            isError = true;
        }
        if(isError){
            this.setState({msg:"Please fill in all details"})
        } else{
            this.setState({msg:""}) 
        }
        return isError;
    }
    search(e) {
        e.preventDefault();
        let err= this.validate();
        if(!err){
            let startdate = [...this.state.availFrom];
            let enddate=[...this.state.availTo]
            var dstart= new Date(this.state.availFrom);
            let start = dstart.toISOString().slice(0,10);
            var dend= new Date(this.state.availTo);
            let end = dend.toISOString().slice(0,10);
            console.log(startdate,enddate)
            let data ={
                location:this.state.location,
                availFrom:start,
                availTo:end,
                allowedGuest:this.state.allowedGuest
            }

            axios.get("http://localhost:7777/getPropBySearch",{params:data})
            .then(response => {
                console.log(response.data.data);
                this.setState({arrayData:response.data.data}, () => {
                    if(this.props.where !=="search"){
                    this.props.history.push({
                        pathname:'/usersearch',
                        data: this.state.arrayData,
                        state:{search: data}
                    })
                } else {
                    this.props.sendData(this.state.arrayData);
                }
                })
            })
        }
    }
    handleChangeEnd=(date)=>{
        
        this.setState({availTo:date})
        this.toggleCalendar();
    }
    handleChangeStart=(date)=>{
        console.log(date);
        this.setState({availFrom:date})
        this.toggleCalendar();
    }
    toggleCalendar= (e)=> {
        e && e.preventDefault()
        this.setState({isOpen: !this.state.isOpen})
      }
      
    render(){
        let error = [];
        if(this.state.msg!==""){
            error.push(<div className="alert alert-danger fade in">
                        <a href="#" className="close" data-dismiss="alert"></a>
                        <strong>Error!</strong> {this.state.msg}
                    </div>)
        }
        return (
            <form className="col-sm-offset-1 col-sm-10 col-sm-offset-1" action='' style={{marginTop:'25px'}}>
                {error}
                <div className="form-group row">
                <div className="col-sm-4">
                <div className="input-group">
                    <span class="input-group-addon"><i className="fas fa-map-marker-alt"/>  </span>
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" name ="location" placeholder="Where do you want to go?" defaultValue={this.state.location} id="place" onAutocomplete={this.options}/>  
                </div>
                </div>
                {/*<div className="col-sm-2">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fas fa-calendar-alt"></i> </span>
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" name ="availFrom" placeholder= "From" id="fromdate" defaultValue={this.state.availFrom}/>
                </div>
                </div>
                <div className="col-sm-2">
                <div className="input-group">
                <span class="input-group-addon"><i className="fas fa-calendar-alt"></i></span>
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" name="availTo" placeholder= "To" id="todate" defaultValue={this.state.availTo}/>
                </div>
                </div>*/}
                <div className="col-sm-2">
                <div className="input-group">
                <span class="input-group-addon"><i className="fas fa-calendar-alt"></i></span>
                <DatePicker className="datepicker"
                    selected={this.state.availFrom}
                    selectsStart
                    startDate={this.state.availFrom}
                    endDate={this.state.availTo}
                    minDate={moment()}
                    onChange={this.handleChangeStart}
                    placeholderText="   From"
                />
                </div>
                </div>
                <div className="col-sm-2">
                <div className="input-group">
                <span class="input-group-addon"><i className="fas fa-calendar-alt"></i></span>
                <DatePicker className="datepicker"
                    selected={this.state.availTo}
                    selectsEnd
                    startDate={this.state.availFrom}
                    endDate={this.state.availTo}
                    minDate={moment(this.state.availFrom)}
                    onChange={this.handleChangeEnd}
                    placeholderText="   To"
                />
                </div>
                </div>
                <div className="col-sm-2">
                <div className="input-group">
                    <span class="input-group-addon"><i className="fas fa-user-friends"></i></span>
                    <input type="number" onChange={this.changeHandler} className="form-control input-lg" name="allowedGuest" placeholder= "Guest" id="guest" defaultValue={this.state.allowedGuest}/>
                </div>
                </div>
                
                <div className="col-sm-2">
                <button onClick={this.search} className="btn btn-primary input-lg col-sm-12" style={{borderRadius: '100px'}}>Submit</button>
                </div>
                </div>
            </form>
            
        )
    }
}
export default SearchForm;