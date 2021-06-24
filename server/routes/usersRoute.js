var express = require("express");
var usersController = require("../controllers/usersController");

var router = express.Router();

router.post("/login", usersController.checkUser);
router.post("/signup", usersController.insertUser);
router.post("/userExists", usersController.checkUserExists);
router.get("/userAddress", usersController.getUserAddressByEmail);
router.get("/getUserDetails", usersController.getUserDetailsByEmail);
router.get("/updateUserDetails", usersController.updateUserDetailsByEmail);
router.post("/updateUserAddress", usersController.updateUserAddressByEmail);

module.exports = router;