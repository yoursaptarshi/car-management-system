const express = require("express");
const {register,login} = require("../controllers/User");
const {isAuthenticated} = require("../middlewares/auth")
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);



module.exports = router;