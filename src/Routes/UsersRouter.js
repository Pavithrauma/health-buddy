// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const express = require('express');
const app = express();
const users = require("../Models/UserModel");
const Validation = require("../Middlewares/Validators/AdminValidation");

const jwt = require("jsonwebtoken");
const secretKey = "tyf9887-hjbgyHG-77jhbuy"; 
const bcrypt = require('bcrypt');
const TokenVerification = require("../Middlewares/verification");
const saltRounds = 10;


app.post("/create-user", TokenVerification.UserTokenVerification, Validation.users, (req, res) => {
    return UsersController.userCreate(req, res);
});

app.post("/login", TokenVerification.UserTokenVerification, (req, res) => {
  return UsersController.userCreate(req, res);
});
module.exports = app;

