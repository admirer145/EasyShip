var express = require("express");
var ordersController = require("../controllers/ordersController");

var router = express.Router();

router.put("/updateOrder", ordersController.updateOrders);
router.get("/", ordersController.getOrdersByEmail);

module.exports = router;