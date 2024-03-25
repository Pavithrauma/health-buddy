const express = require('express')
const users = require("../Models/UserModel");
const router = express.Router()
const validation = require("../validation/validation");
const userSchema = validation.userSchema;
const jwt = require("jsonwebtoken");
const secretKey = "tyf9887-hjbgyHG-77jhbuy"; 
const bcrypt = require('bcrypt');

const saltRounds = 10;
 
function Controller() {

    this.userCreate = async (req, res) => {
        bcrypt.hash(userDetails.password, saltRounds, function(err, hash) {
            userDetails.password =hash;
            users.create(userDetails).then(data=>{
                return Responder.sendSuccess( res,"User Created Successfully",201,data);
            }).catch(err  => {
                return Responder.sendFailure(res,"Something went wrong",422);
            })
        });
    }

    this.userUpdate = async (req, res) => {
        userId = req.params.id;
        const userDetails = req.body;
        bcrypt.hash(userDetails.password, saltRounds, function(err, hash) {            
            userDetails.password =hash;
            users.updateOne({ _id: userId }, { $set: userDetails }).then(data => {
                return Responder.sendSuccess( res,"User Updated Successfully",201,data);
            }).catch(err  => {
                return Responder.sendFailure(res,"Something went wrong",422);
            })
        });
    }
}

module.exports = new Controller();