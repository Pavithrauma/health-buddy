const express = require('express')
const category = require("../models/categorySchema");
const router = express.Router()
const validation = require("../validation/validation");
const categorySchema = validation.categorySchema;
const jwt = require("jsonwebtoken");
const secretKey = "tyf9887-hjbgyHG-77jhbuy"; 
const bcrypt = require('bcrypt');
const saltRounds = 10;

function verifyToken(req, res, next) {
  let tokenAuthorization = req.header("Authorization");
  const headerParts = tokenAuthorization.split(" ");
  const token = headerParts[1];
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
  category.find().then(data=>{
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


router.post("/create-category", verifyToken, async (req, res) => {
  const type = req.user;
  const categoryDetails = req.body
  const query = { type: 1 };
  if(type === 1){
  if (req.body.type == 1) {
    category.find().then(data=>{
        if (data) {
          console.log("An admin user exists:", user);
          return res
            .status(400)
            .json({ error: "An admin user already exists." });
        }
      })
      .catch((err) => {
        console.error("Error finding user:", err);
      });
  } else {
    try {
      const result = categorySchema.validate(req.body);
      if (result.error) {
        res.send(result.error);
        return;
      }
      category.create(categoryDetails).then(data=>{
        res.send(data);
      }).catch(err  => {
        res.status(500).send(err);
      })
    } catch (err) {
      res.send(`Error ${err}`);
    }
  }
} else {
   return res.status(400).json({ error: "An admin can only create category." });
}
});



router.patch("/update-category/:id", verifyToken, async (req, res) => {
  const type = req.user; 
  if (type === 1) {
    try {
      category.findByIdAndUpdate(req.params.id,req.body).then(data=>{
        res.send(data);
      }).catch(err  => {
        res.status(500).send(err);
      })
    } catch (err) {
      res.send(`Error ${err}`);
    }
  } else {
    return res.status(400).json({ error: "An admin can only create category." });
  }
});

router.delete("/delete-category/:id", verifyToken, async (req, res) => {
  const type = req.user; 
  if (type === 1) {
    category.findByIdAndDelete(req.params.id).then(data=>{
      res.send(data);
    }).catch(err  => {
      res.status(500).send(err);
    })  
  } else {
    return res.status(400).json({ error: "An admin can only create category." });
  }
});
module.exports = router;