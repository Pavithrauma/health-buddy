const express = require('express')
const RawFoodsModel = require("../Models/RawFoodModel");
const Responder = require("../Helpers/Responder");
const router = express.Router();

function Controller() {
    this.rawFoodCreate = async (req, res) => {
        const rawFoodData = req.body
        RawFoodsModel.create(rawFoodData).then(data=>{
            return Responder.sendSuccess( res,"RawFoods Created Successfully",201,data);
        }).catch(err  => {
            return Responder.sendFailure(res,"Something went wrong",422);
        })
    }

    this.rawFoodUpdate = async (req, res) => {
        const rawFoodData         = await RawFoodsModel.findById(req.params.rawFoodId);
        console.log("req.body"+req.body)
        console.log("req.body"+req.params.id)
        const { name, description  } = req.body;
        rawFoodData.name = name;
        rawFoodData.description = description;
        RawFoodsModel.create(rawFoodData).then(data=>{
            return Responder.sendSuccess( res,"RawFoods Updated Successfully",201,data);
        }).catch(err  => {
            return Responder.sendFailure(res,"Something went wrong",422);
        })
    }
    this.rawFoodList = async (req, res) => {

        RawFoodsModel.find().then(data=>{
            return Responder.sendSuccess( res,"RawFoods Listed Successfully",201,data);
          }).catch(err  => {
            return Responder.sendFailure(res,"Something went wrong",422);
        })
    }
}

module.exports = new Controller();