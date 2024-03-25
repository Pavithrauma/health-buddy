// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const express = require('express');
const app = express(); 
const Validation = require("../Middlewares/Validators/AdminValidation");
const TokenVerification = require("../Middlewares/verification");
const RawFoodsController = require('../Controllers/RawFoodsController');
var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create-rawfood", TokenVerification.UserTokenVerification, Validation.rawFoods, (req, res) => {
    return RawFoodsController.rawFoodCreate(req, res);
});

app.post("/update-rawfood/:rawFoodId", TokenVerification.UserTokenVerification, Validation.rawFoods, (req, res) => {
  return RawFoodsController.rawFoodUpdate(req, res);
});

app.get("/rawfood-list", TokenVerification.UserTokenVerification,  (req, res) => {
  return RawFoodsController.rawFoodList(req, res);
});

// app.post("/update-delete", TokenVerification.TokenVerification, rawFoodSchema.validate, (req, res) => {
//   return UsersController.userCreate(req, res);
// });
module.exports = app;

