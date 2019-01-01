import React,{Component} from 'react';
import NavbarOwner from '../layout/navbarOwner';
import Footer from '../layout/footer';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class PropertyForm extends Component {
    constructor(props){
        super(props)
        this.state={
            errMsg:'',
            msg:'',
            propid:'',
            location: '',
            proptype: '',
            headline: '',
            noOfRooms: '',
            noOfBath: '',
            allowedGuest: '',
            image: '',
            price: 0.00,
            amenities: '',
            availFrom: '',
            availTo:'',
            image1:'',
            image2:'',
            image3:'',
            image4:''
        }
        this.AddProperty= this.AddProperty.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
        this.UpdateProperty=this.UpdateProperty.bind(this);
        this.ImageUpload=this.ImageUpload.bind(this);
    }
    componentDidMount(){
        if(this.props.form === "edit" && this.props.location.data!=undefined){
            axios.get("http://localhost:7777/getPropById",{params:{"id": this.props.location.data}})
            .then(response => {     
                if(response.status===200){
                    this.setState({
                    propid:response.data.data.propid,
                    location: response.data.data.location,
                    proptype: response.data.data.proptype,
                    headline: response.data.data.headline,
                    noOfRooms: response.data.data.noOfRooms,
                    noOfBath: response.data.data.noOfBath,
                    allowedGuest: response.data.data.allowedGuest,
                    price: response.data.data.price,
                    amenities: response.data.data.amenities,
                    availFrom: response.data.data.availFrom,
                    availTo:response.data.data.availTo,
            })
            }
                
            })
        }
    }

    changeHandler(e){
        switch (e.target.name) {
            case 'image1':
              this.setState({ image1: e.target.files[0] });
              break;
            case 'image2':
              this.setState({ image2: e.target.files[0] });
              break;
            case 'image3':
              this.setState({ image3: e.target.files[0] });
              break;
            case 'image4':
              this.setState({ image4: e.target.files[0] });
              break;
            default:
              this.setState({ [e.target.name]: e.target.value });
          }
        }
    AddProperty(e){
        e.preventDefault();
        let id = localStorage.getItem("id");
        let data = {
            "user_id":id,
            "location": this.state.location,
            "proptype": this.state.proptype,
            "headline": this.state.headline,
            "noOfRooms": this.state.noOfRooms,
            "noOfBath": this.state.noOfBath,
            "allowedGuest": this.state.allowedGuest,
            "price": parseFloat(this.state.price),
            "amenities": this.state.amenities,
            "availFrom": this.state.availFrom,
            "availTo":this.state.availTo,
        }
        axios.post('http://localhost:7777/addprop',data)
        .then(response => {
            if(response.status === 200){
                this.setState({propid:response.data.propid,msg:"Your property has been added successfully to the listing."})
            } else {
                this.setState({errMsg:"There was error in updating data"});
            }
        })

    }
    UpdateProperty(e){
        e.preventDefault();
        let data = {
            "propid":this.state.propid,
            "location": this.state.location,
            "proptype": this.state.proptype,
            "headline": this.state.headline,
            "noOfRooms": this.state.noOfRooms,
            "noOfBath": this.state.noOfBath,
            "allowedGuest": this.state.allowedGuest,
            "price": parseFloat(this.state.price),
            "amenities": this.state.amenities,
            "availFrom": this.state.availFrom,
            "availTo":this.state.availTo,
        }
        axios.post('http://localhost:7777/updateprop',data)
        .then(response => {
            if(response.status === 200){
                this.setState({msg:"Your property has been updated successfully to the listing."})
            } else {
                this.setState({errMsg:"There was error in updating data"});
            }
        })
    }
    ImageUpload(e){
        e.preventDefault();
        let formData = new FormData();
        (this.state.image1!=="") ?formData.append('image1',this.state.image1): null;
        (this.state.image2!=="") ? formData.append('image2',this.state.image2):null;
        (this.state.image3!=="") ? formData.append('image3',this.state.image3):null;
        (this.state.image4!=="") ? formData.append('image4',this.state.image4):null;
        formData.append('propid',this.state.propid);
        axios.post("http://localhost:7777/imageUpload",formData)
        .then(response=>{
            if(response.status === 200){
            this.setState({msg:"All the images are uploaded successfully."})
            }
        }).catch(err=>{
            console.log(err)
            this.setState({msg:"Images are not uploaded successfully. Please try again."})
        })
    } 
    render(){
        let messages = null;
        if (this.state.msg){
         messages =(
             <div className="imageupload">
             <div className="text-success" style={{marginBottom:'20px'}}>{this.state.msg}
            </div>
             <h3>Image Upload</h3>
             <h5>Please upload upto maximum of four images.</h5>
            <form id="frmUploader" encType="multipart/form-data" action="">
                <div className="gapping" style={{margin:'20px'}}>
                <label for> Image 1: </label>
                <input type="file" onChange={this.changeHandler} name="image1"/>
                </div>
                <div className="gapping" style={{margin:'20px'}}>
                <label for> Image 2: </label>
                <input type="file" onChange={this.changeHandler} name="image2" />
                </div>
                <div className="gapping" style={{margin:'20px'}}>
                <label for> Image 3: </label>
                <input type="file" onChange={this.changeHandler} name="image3" />
                </div>
                <div className="gapping" style={{margin:'20px'}}>
                <label for> Image 4: </label>
                <input type="file" onChange={this.changeHandler} name="image4" />
                </div>
                <button className= "btn btn-primary btn-lg" style={{margin:'20px'}} onClick ={this.ImageUpload.bind(this)} name="submit" id="btnSubmit">Upload</button>
            </form>

            <a href="/ownerhome" className="col-sm-offset-9 col-sm-3">Go to Dashboard</a>
            </div>
        )
        }
        let Button = null;
        if(this.props.form ==="edit"){
            Button = (
                <button onClick={this.UpdateProperty} className="btn btn-primary col-sm-offset-1 col-lg-4 input-lg" style={{marginTop:'10px',paddingLeft:'30px'}}>Update Property</button>
               )
        } else {
            Button = (
                <button onClick={this.AddProperty} className="btn btn-primary col-sm-offset-1 col-lg-4 input-lg" style={{marginTop:'10px',paddingLeft:'30px'}}>Add Property</button>
            )
        }
        if(!this.state.msg) {
            messages = (
                <div className="text-danger" style={{marginBottom:'20px'}}>{this.state.errMsg}
                
                <div className='col-sm-6 form-group' style={{marginTop:'10px'}} >
                    <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Location" id="location" name="location" defaultValue={this.state.location}/> 
                </div>
                <div className='col-sm-6 form-group' style={{marginTop:'10px'}}>
                    <select type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Property Type" id="ptype" name="proptype" value = {this.state.proptype}>
                    <option value='' selected disabled>Select Property Type</option>
                    <option value='House'>House</option>
                    <option value='Hotel'>Hotel</option>
                    <option value='Guest House'>Guest House</option>
                    <option value='Hostel'>Hostel</option>
                    </select>
                </div>
                <div className="col-sm-8 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Headline" id="hline" name="headline" defaultValue={this.state.headline}/>
                </div>
                <div className="col-sm-12 form-group" style={{marginTop:'10px'}}>
                    <textarea className="form-control" rows="5" onChange={this.changeHandler} placeholder="Description" name = "amenities" id="amenities" value = {this.state.amenities}></textarea>
                </div>
                
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Bedrooms"  name="noOfRooms" defaultValue={this.state.noOfRooms}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Bathrooms" name="noOfBath" defaultValue={this.state.noOfBath}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Accomodates" name="allowedGuest" defaultValue={this.state.allowedGuest}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="date" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Available From" name="availFrom" defaultValue={this.state.availFrom}/>
                </div>
                <div className="col-sm-6 form-group" style={{marginTop:'10px'}}>
                <input type="date" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Available To" name="availTo" defaultValue={this.state.availTo}/>
                </div>
                <div className="col-sm-5 form-group input-group" style={{marginTop:'20px',bottom:'-10px',paddingLeft:'20px'}}>
                <span className="input-group-addon"><i class="fas fa-dollar-sign"></i></span>
                <input type="text" onChange={this.changeHandler} className="form-control input-lg" placeholder ="Price per night" name="price" value={this.state.price}/>
                </div>
                <div className='col-lg-8'>
                    {Button}  
                </div>
                </div>
               
            )
        }
        return(
                <div className="col-sm-offset-2 col-lg-8 col-sm-offset-2 property-form" style={{border:'1px solid grey',margin:'20px',padding:'20px'}}>
            <form action="">
                <h2>Property Information</h2>
                {messages}
            </form> 
            </div>  
            
        )
    }
}
export default PropertyForm;