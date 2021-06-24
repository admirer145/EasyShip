var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
// var querystring = require("querystring");

var usersRoute = require("./routes/usersRoute");
var ordersRoute = require("./routes/ordersRoute");
var productsRoute = require("./routes/productsRoute");

var PORT = 3000;
var app = express();

app.use(express.static(path.join(__dirname, "public", "dist","EasyShip")))
// Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

app.use("/api", usersRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/products", productsRoute);

app.listen(PORT, (err)=>{
    if(err){
        console.log("Error occured while listening on port "+PORT);
    }else{
        console.log(`Server Listening on port ${PORT} ...`);
    }
})

