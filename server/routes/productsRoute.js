var express = require("express");
var productsController = require("../controllers/productsController");

var router = express.Router();

router.get("/byFilter", productsController.getProductsByFilter);
router.get("/byCategory", productsController.getProductsByCategory);
router.get("/byProductId", productsController.getProductsById);
router.get("/byBrand", productsController.getProductsByBrand);
router.post("/removeProductbyId", productsController.removeProductbyId);
router.post("/addProduct", productsController.addProduct);
router.get("/", productsController.getAllProducts);

module.exports = router;