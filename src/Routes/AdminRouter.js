const express = require("express");
const app = express();
const AdminController = require("../Controllers/AdminController");
const RoleController = require("../Controllers/RolesController");
const Validation = require("../Middlewares/Validators/AdminValidation");
const Responder = require('../Helpers/Responder');
const TokenVerification = require("../Middlewares/verification");
const EventRouter = require("../Routes/EventRouter");

app.post("/create-community", TokenVerification.AnglerTokenVerification, Validation.addCommunity, (req, res) => {
    return AdminController.communityCreate(req, res);
});

app.post("/create-role", TokenVerification.AnglerTokenVerification, (req, res) => {
    return RoleController.createRole(req, res);
});



module.exports = app;
