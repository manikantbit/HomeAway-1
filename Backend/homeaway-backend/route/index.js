var express = require('express');
const router = express.Router();
var path = require('path');
const Sequelize = require('sequelize');
var User = require('../model/user');
var Property = require('../model/property');
var Order = require('../model/order');

var bcrypt = require('bcrypt');
var multer = require('multer');
// multer storage code for images upload
var storage =   multer.diskStorage({
    destination: '/home/prince/Documents/CMPE-273-Enterprise Distributed Systems/Lab1-012539306/Frontend/homeaway-frontend/public/images',
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
})
var upload = multer({ storage : storage });

//General: Route for login
router.post('/login',function(req,res){
    console.log("Inside Log in Request at Backend")
    let data = req.body;
    User.findOne({ where: { email: data.email ,type: data.type } })
			.then(user => {

				if(!user) {
					res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("User does not exists. Please sign up.");

					return;		
				}
				
                bcrypt.compare(data.password, user.password)
                .then(function(result) { 
                if (result === true) {
				    res.cookie('cookie',data.email,{maxAge: 900000, httpOnly:false, path : '/'});
                    req.session.user = data.email;
                    console.log("cookie")
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    let output = {
                        "first_name": user.first_name,
                        "last_name":user.last_name,
                        "type":user.type,
                        "phone":user.phone,
                        "user_id":user.id,
                        "profile_image":user.profile_image
                    }
                    console.log("User logged in successfully", output)
                    res.end(JSON.stringify(output));
                    return;
                } else  {
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Username/Password is not correct");
                    return;
                }
                })
                .catch(err=>{
                    res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                    })
                    res.end("Username/Password is not correct");
                    return;
                })
            })
            .catch(err => {
                console.log("error")
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Username/Password is not correct");
            }
    );
});
//Route to Sign Up new users & owners   
router.post('/signup',function(req,res){
    console.log("Inside Sign Up Request at Backend")
    let data = req.body;
    console.log(data);
    bcrypt.hash(data.password, 10, function(err, hashkey) {
				
        let pdata = data;
        User.findOne({ where: { email: data.email , type: data.type } })
        .then (user => {
            if(user){
            console.log("in user check")
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("This user already exists. Please log in.");
            return;
            }
            else {
                pdata.password = hashkey;
                User.create(data)
                .then( result =>{
                console.log("Result is",result.id);
                res.cookie('cookie',data.email,{maxAge: 900000, httpOnly:false, path : '/'});
                req.session.user = data.email;
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                let output = {
                    "user_id":result.id
                }
                console.log("New User created at Backend: ", output)
                res.end(JSON.stringify(output));
                });
            }
        })
        .catch(err =>{
            console.log("catch")
            pdata.password = hashkey;
                User.create(data)
                .then( result =>{
                res.cookie('cookie',data.email,{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = user;
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Signup");
                });
            }
        )
        })
    })

    //Common: Route for logout
    router.post("/logout",function(req,res){
        console.log("Inside Logout Route at server")
        req.session.user = '';
		req.session.destroy();
        res.end();
    })
    //User: Route to get Profile
    router.get("/getprofile",function(req,res){
        console.log("Inside get Profile at Backend")
        let data = req.query.email;
        console.log(req.query)
        User.findOne({
            where: {
              email: data
            }
          }).then(user => {

            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            let output = {
                "first_name": user.first_name,
                "last_name":user.last_name,
                "profile_image": user.profile_image,
                "about": user.about,
                "city": user.city,
                "hometown":user.hometown,
                "company":user.company,
                "school":user.school,
                "languages":user.languages,
                "gender":user.gender,
                "phone":user.phone,
                "type":user.type
            }
            console.log("Profile returned:", output)
            res.end(JSON.stringify(output));	   
          });
    })
//User: Route to update Profile
    router.post("/profile",function(req,res){
        let data = req.body;
        console.log(data);
        User.update(data, { where : { email : data.email }  })
		.then( result => {
            console.log(result)
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful update");
        })
    })
// User: Route to upload Profile pic
    router.post("/profileimage",upload.any(),function(req,res){
        console.log("At Image upload")
        console.log(req.body);
        console.log(req.files);
        let data = {profile_image:req.files[0].filename} 
        console.log(data);
        User.update(data,{where: {email:req.body.email}})
        .then(result=>{
        if (result){
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify({data: req.files[0].filename}))
            return;
        } else{
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error uploading file.");
            return;
        }

        
    })
    .catch(err=>{
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
        res.end("Error uploading file.");
        return;
    })
    });
//Owner: Route to add new Property
    router.post("/addprop",function(req,res){
        let data = req.body;
        console.log(data);
        Property.create(data)
        .then(result=>{
            console.log("Success")
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            console.log("Success2")
            res.end(JSON.stringify({"propid":result.propid})); 
            return;
        })
        .catch(err=>{
            console.log("error")
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end(err,"There was error in database"); 
        })
    })
//Owner: Route to upload Property Images
    router.post("/imageUpload",upload.any(),function(req,res){
            console.log("At Image upload")
            console.log(req.body);
            console.log(req.files); 
            let data=new Object();
            req.files.forEach(function(item){
                let tag = item.fieldname;
                let value = item.filename;
                data[tag] = value;
            })
            console.log(data);
            Property.update(data,{where: {propid:req.body.propid}})
            .then(result=>{
            if (result){
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("File is uploaded")
                return;
            } else{
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Error uploading file.");
                return;
            }

            
        })
        .catch(err=>{
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error uploading file.");
            return;
        })
    });
    
// Owner: Route to get Property by User ID
    router.get('/getPropByUser',function(req,res){
        let id = req.query.id;
        console.log("Route to get Property for Owner")
        console.log("At node", id)
        Property.findAll({where: {user_id : id}})
        .then(result=>{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            console.log(result)
            res.end(JSON.stringify({ "data" : result }));
        })
        .catch(err=>{
            console.log("Error",err)
        })
    })
    //General: Route to get details by Property ID
    router.get('/getPropById',function(req,res){
        let id = req.query.id;
        console.log("Get Property Details at Backend")
        console.log("At node", id)
        Property.findOne({where: {propid : id}})
        .then(result=>{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            console.log("Property Data: ",result )
            res.end(JSON.stringify({ "data" : result }));
        })
        .catch(err=>{
            console.log("Error",err)
        })
    })

    //Owner: Route to update Property
    router.post("/updateprop",function(req,res){
        let propid = req.body.propid;
        console.log("At update property",propid,req.body);
        Property.update(req.body,{where :{propid:propid}})
        .then(result=>{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Updated Successfully");
        })
        .catch(err=>{
            console.log("Error",err)
        })
    })
//Users: Route to search Property
    router.get('/getPropBySearch',function(req,res){
        console.log("At Property search using User query")
        console.log(req.query);
        let search = req.query;
        console.log(`%${search.location}%`)
        const Op = Sequelize.Op;
         
        Property.findAll({where:{[Op.and]:[ 
                                    {   location: {
                                        [Op.like]: `%${search.location}%`
                                    }

                                    },                       
                                     {   availFrom: {
                                            [Op.lte] :search.availFrom
                                             }
                                            },
                                    {availTo: {
                                            [Op.gte] : search.availTo
                                             }
                                            },
                                 { allowedGuest: {
                                        [Op.gte]:search.allowedGuest
                                         }}
                                        ]
                        }})
        .then(result=>{
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end(JSON.stringify({ "data" : result }));
        })
        .catch(err=>{
        console.log("Error",err)
        })
    })

//User: Route to book order
router.post("/orders",function(req,res){
    let data = req.body;
    console.log("Order Creation start");
    Order.create(data)
    .then(result =>{
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        console.log("Order ID generated: ", result)
        res.end(JSON.stringify({ "id" : result.orderid }));
        })
        .catch(err=>{
        console.log("Error",err)
        })
    })
//User: Show the trip history
router.get("/mytrip", function(req,res){
    console.log("At User Trips Backend");
    let id = req.query.user_id;
    Order.findAll({
        where:{user_id:id},include:[Property]
    })
    .then(result =>{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            console.log("Trip Data: ", result)
            res.end(JSON.stringify({result }));
            })
            .catch(err=>{
            console.log("Error",err)
            })
    })
module.exports = router;
