// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const express = require('express')
const users = require("../models/userSchema");
const router = express.Router()
const validation = require("../validation/validation");
const userSchema = validation.userSchema;
const jwt = require("jsonwebtoken");
  const secretKey = "tyf9887-hjbgyHG-77jhbuy"; 
  const bcrypt = require('bcrypt');

  const saltRounds = 10;
function verifyToken(req, res, next) {
 let tokenAuthorization = req.header("Authorization");
 const headerParts = tokenAuthorization.split(" ");
 const token = headerParts[1];
// console.log("headerParts" + headerParts);
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTg3MzU0NjAsImV4cCI6MTY5ODczOTA2MH0.cWWesKhqkkuPUID3perqD8SdYf6F5UQyv2c8aYt3GP4";
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: `Invalid token ${err}` });
    }
    console.log(`decoded ${JSON.stringify(user)}`);
    req.user = user.type;
    next();
  });
}

router.get('/' , async (req,res) => {
  users.find().then(data=>{
    res.send(data);
  }).catch(err  => {
    res.status(500).send(err);
  })
}) 

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.send(`Error ${err}`);
  }
});

router.post("/create-user", verifyToken, async (req, res) => {
  const type = req.user;
  const userDetails = req.body
  const query = { type: 1 };
  if(type === 1){
  if (req.body.type == 1) {
    users.find().then(data=>{
      if (users) {
        console.log("An admin user exists:", user);
        return res
          .status(400)
          .json({ error: "An admin user already exists." });
      }
    }).catch(err  => {
      res.status(500).send(err);
    })      
  } else {
    try {
      const result = userSchema.validate(req.body);
      if (result.error) {
        res.send(result.error);
        return;
      }
      bcrypt.hash(userDetails.password, saltRounds, function(err, hash) {
        userDetails.password =hash;
        console.log("userDetails"+userDetails)
        users.create(userDetails).then(data=>{
          res.send(data);
        }).catch(err  => {
          res.status(500).send(err);
        })
        // Store hash in your password DB.
    });
    
      // const a1 = await user.save();
      // res.json(a1);
    } catch (err) {
      res.send(`Error ${err}`);
    }
  }
} else {
   return res.status(400).json({ error: "An admin can only create users." });
}
});



router.patch("/update-user/:id", verifyToken, async (req, res) => {
  const type = req.user; 
  if (type === 1) {
    try {
      users.findByIdAndUpdate(req.params.id,req.body).then(data=>{
        res.send(data);
      }).catch(err  => {
        res.status(500).send(err);
      })
    } catch (err) {
      res.send(`Error ${err}`);
    }
  } else {
    return res.status(400).json({ error: "An admin can only create users." });
  }
});

router.delete("/delete-user/:id", verifyToken, async (req, res) => {
  const type = req.user; 
  if (type === 1) {
    users.findByIdAndDelete(req.params.id).then(data=>{
      res.send(data);
    }).catch(err  => {
      res.status(500).send(err);
    })  
  } else {
    return res.status(400).json({ error: "An admin can only create users." });
  }
});
module.exports = router;