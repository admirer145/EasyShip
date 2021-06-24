var mongoClient = require("mongodb").MongoClient;

var mongoUrl = "mongodb://localhost:27017/";

function getProductsByFilter(req, res){
    // console.log("get product for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("products", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'products'`);
                }else{
                    var product = req.query;
                    console.log("got product ", product.filter);
                    coll.find({productFilter:product.filter}).sort({productId:-1}).toArray((err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the products ");
                       }else{
                           console.log("Data Found ", data);
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

function getProductsByCategory(req, res){
    // console.log("get product for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("products", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'products'`);
                }else{
                    var product = req.query;
                    console.log("got product ", product.filter, product.category);
                    coll.find({productFilter:product.filter, productCategory:product.category}).sort({productId:-1}).toArray((err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the products ");
                       }else{
                           console.log("Data Found ", data);
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

function  getAllProducts(req, res){
    console.log("get All products");
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("products", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'products'`);
                }else{
                    coll.find({}).toArray((err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the products ");
                       }else{
                           console.log("Data Found ", data);
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

function getProductsById(req, res){
    console.log("get product for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("products", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'products'`);
                }else{
                    var product = req.query;
                    console.log("got product ", product.productId);
                    coll.findOne({productId:product.productId}, (err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the products ");
                       }else{
                           console.log("Data Found ", data);
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

function removeProductbyId(req, res){
    console.log("remove product for ", req.body);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("products", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'products'`);
                }else{
                    var product = req.body;
                    console.log("got product ", product.productId);
                    coll.deleteOne({productId:product.productId}, (err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to remove the products ");
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

function addProduct(req, res){
    console.log("add product for ", req.body);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("products", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'products'`);
                }else{
                    var product = req.body;
                    coll.insertOne(product, (err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to remove the products ");
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

function getProductsByBrand(req, res){
    console.log("get product for ", req.query);
    mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, dbHost)=>{
        if(err){
            res.status(500);
            res.json({messsage:err});
            console.log(`Error occured while connecting to mongodb`);
        }else{
            var db = dbHost.db("EasyShip");
            db.collection("products", (err, coll)=>{
                if(err){
                    res.status(500);
                    res.json({messsage:err});
                    console.log(`Error occured while connecting to collection 'products'`);
                }else{
                    var product = req.query;
                    console.log("got product ", product.brand);
                    coll.find({productBrand:product.brand}).toArray((err, data)=>{
                       if(err){
                            res.status(500);
                            res.json({messsage:err});
                            console.log("Unable to find the products ");
                       }else{
                           console.log("Data Found ", data);
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

module.exports = {getProductsByFilter, getProductsByCategory, getAllProducts, 
                  getProductsById, removeProductbyId, addProduct, getProductsByBrand};