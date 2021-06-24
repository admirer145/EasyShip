var mongoClient = require("mongodb").MongoClient;

var mongoUrl = "mongodb://localhost:27017/";

function checkUser(req, res){
    console.log("Validate User ", req.body);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("users", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'users'`);
                }else{
                    var user = req.body;
                    coll.findOne({email:user.email, password:user.password}, (err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the user " + user);
                       }else{
                           console.log("Data Found ", data);
                           if(data){
                               res.status(200);
                               res.json({message:true});
                           }else{
                               res.status(201);
                               res.json({message:false});
                           }
                       }
                    });
                }
            });
        }
    });
}

function insertUser(req, res){
    console.log("Inserted User ", req.body);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("users", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'users'`);
                }else{
                    var user = req.body;
                    coll.insertOne({email:user.email, phone:user.mobileNumber, password:user.password}, (err, data)=>{
                        if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("error occured while inserting the user");
                        }else{
                            console.log("inserted data successfully ", data);
                            res.status(200);
                            res.json({messsage:true});
                        }
                    });
                }
            });
        }
    });
}

function checkUserExists(req, res){
    console.log("Check for user Exist ", req.body);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("users", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'users'`);
                }else{
                    var user = req.body;
                    coll.findOne({email:user.email}, (err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the user " + user);
                       }else{
                           console.log(data);
                           if(data){
                               res.status(200);
                               res.json({message:true});
                           }else{
                               res.status(201);
                               res.json({message:false});
                           }
                       }
                    });
                }
            });
        }
    });
}

function getUserAddressByEmail(req, res){
    console.log("get user for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("users", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'users'`);
                }else{
                    var user = req.query;
                    console.log("got user ", user.email);
                    coll.findOne({email:user.email}, (err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the users ");
                       }else{
                           console.log("User Data Found ", data);
                           if(data && data["address"]){
                               res.status(200);
                               res.json({message:data["address"]});
                           }else{
                               res.status(201);
                               res.json({message:[]});
                           }
                       }
                    });
                }
            });
        }
    });
}

function getUserDetailsByEmail(req, res){
    console.log("get user details for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("users", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'users'`);
                }else{
                    var user = req.query;
                    console.log("got user email ", user.email);
                    coll.findOne({email:user.email},{projection: {_id:0, password:0}}, (err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the users ");
                       }else{
                           console.log("User Details Found ", data);
                           if(data){
                               res.status(200);
                               res.json({message:data});
                           }else{
                               res.status(201);
                               res.json({message:{}});
                           }
                       }
                    });
                }
            });
        }
    });
}

function updateUserDetailsByEmail(req, res){
    console.log("get user details for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("users", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'users'`);
                }else{
                    var user = req.query;
                    console.log("got user email ", user.email);
                    var obj = {};
                    obj[user.key] = user.value;
                    coll.updateOne({email:user.email}, {$set:obj}, {upsert: true}, (err, data)=>{
                        if(err){
                            console.log("Error while updating ", err);
                            res.status(500);
                            res.json({message:err});
                        }else{
                            if(data){
                                res.status(200);
                                res.json({message:true});
                            }else{
                                res.status(201);
                                res.json({message:false});
                            }
                        }
                    });
                }
            });
        }
    });
}

function updateUserAddressByEmail(req, res){
    console.log("get user details for ", req.body);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("users", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'users'`);
                }else{
                    var user = req.body;
                    // var address = user.address;
                    console.log("got user email ", user.email, " user address ", user.address);
                    
                    coll.updateOne({email:user.email}, {$addToSet:{address: user.address}}, {upsert: true}, (err, data)=>{
                        if(err){
                            console.log("Error while updating ", err);
                            res.status(500);
                            res.json({message:err});
                        }else{
                            if(data){
                                res.status(200);
                                res.json({message:true});
                            }else{
                                res.status(201);
                                res.json({message:false});
                            }
                        }
                    });
                }
            });
        }
    });
}


module.exports = {checkUser, insertUser, checkUserExists, getUserAddressByEmail,
                    getUserDetailsByEmail, updateUserDetailsByEmail, updateUserAddressByEmail};