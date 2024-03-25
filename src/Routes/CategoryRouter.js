const express = require('express')
const category = require("../Model/CategoryModel");
const router = express.Router()
const validation = require("../validation/validation");
const categorySchema = validation.categorySchema;
const jwt = require("jsonwebtoken");
const secretKey = "tyf9887-hjbgyHG-77jhbuy"; 


const express = require('express');
const app = express(); 
const Validation = require("../Middlewares/Validators/AdminValidation");
const TokenVerification = require("../Middlewares/verification");
const RawFoodsController = require('../Controllers/CategoryController');
var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post("/create-rawfood", TokenVerification.UserTokenVerification, Validation.category, (req, res) => {  
    return RawFoodsController.rawFoodCreate(req, res);
});

module.exports = router;