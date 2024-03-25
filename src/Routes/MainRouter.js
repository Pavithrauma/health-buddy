let express = require('express');
let app = express();

 
app.use("/api/showtime/login",require("./UsersRouter"));
app.use("/api/healthBuddy/user",require("./UsersRouter"));
app.use("/api/healthBuddy/rawFood",require("./RawFoodsRouter"));
module.exports = app;
