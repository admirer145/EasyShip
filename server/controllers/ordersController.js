var mongoClient = require("mongodb").MongoClient;
// var querystring = require("querystring");

var mongoUrl = "mongodb://localhost:27017/";

function getOrdersByEmail(req, res){
    console.log("Into the getOrdersByEmail for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({message:err});
            console.log("unable to connect to server");
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("orders", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({message:err});
                    console.log("unable to connect to collection orders");
                }else{
                    var userEmail = req.query.userEmail;
                    console.log("got userEmail ", userEmail);
                    coll.find({email:userEmail}).sort({_id:-1}).toArray((err, data)=>{
                        if(err){
                            res.status(500);
                            res.json({message:err});
                            console.log("Unable to find user email from collection orders");
                        }else{
                            // console.log("data read ", data);
                            if(data){
                                res.status(200);
                                res.json({message:data});
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

function updateOrders(req, res){
    console.log("Into the updateOrders at controller");
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({message:err});
            console.log("unable to connect to server");
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("orders", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({message:err});
                    console.log("unable to connect to collection orders");
                }else{
                    var orderArray = req.body;
                    console.log("got orderArray ", orderArray);

                    coll.insertMany(orderArray, (err)=>{
                        if(err){
                            console.log("error while inserting the array");
                            res.status(500);
                            res.json({message:false})
                        }else{
                            console.log("inserted array of objects");
                            res.status(200);
                            res.json({message:true});
                        }
                    })

                }
            });
        }
    });
}

module.exports = {getOrdersByEmail, updateOrders};
