const jwt = require("jsonwebtoken");
const Responder = require("../Helpers/Responder");
const { json } = require("body-parser");
const secretKey = "tyf9887-hjbgyHG-77jhbuy"; 
function Controller(){
  this.UserTokenVerification = async (req, res, next)=>{      
    
    try {
      
      const receivedToken = req.headers["authorization"];
      const bearerToken = receivedToken.split(" ")[1];      
      if (bearerToken == null) {
        return res.json({
          status: "token null",
        });
      }
      
      jwt.verify(bearerToken, secretKey, async (err, user) => {
          console.log(`decoded ${JSON.stringify(user)}`);
          req.user = user.type;
        if(user.type != "admin"){
            return Responder.sendFailure(res, "Invalid access", 422);
        }
        if (err) return Responder.sendFailure(res, "Invalid access token", 422);
                req.user = user;
                next();
      });
    } catch (error) {
      return Responder.sendFailure(res, "Invalid user", 500);
    }
  }
}

module.exports = new Controller();