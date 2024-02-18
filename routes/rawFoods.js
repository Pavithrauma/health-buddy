const express = require('express')
const rawFoods = require("../models/rawFoodSchema");
const router = express.Router();
const multer = require("multer");
const validation = require("../validation/validation");
const productSchema = validation.productSchema;
const fileSchema = validation.fileSchema;
const jwt = require("jsonwebtoken");
const secretKey = "tyf9887-hjbgyHG-77jhbuy";
const upload = multer({ dest: "uploads/files/" });




//console.log(`productSchema ${JSON.stringify(productSchema)}`);
function verifyToken(req, res, next) {
  console.log("tokenAuthorization" + req);
    let tokenAuthorization = req.header("Authorization");
    
    if (!tokenAuthorization) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const headerParts = tokenAuthorization.split(" ");
    const token = headerParts[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: `Invalid token ${err}` });
      }
      req.user = user.type;
      next();
    });
}

router.get('/' , async (req,res) => {
    try{
        const product = await Product.find();
        res.json(product);
    } catch(err){
        res.send(`Error ${err}`);
    }
})
 
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.send(`Error ${err}`);
  }
});


router.post("/create-rawFood", upload.single("image"),verifyToken, async (req, res) => {
  const type = req.user;
  const rawFoodDetails = req.body
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
      const result = rawFoodSchema.validate(req.body);
      if (result.error) {
        res.send(result.error);
        return;
      } else {
        
      }
      // res.json(a1);
    } catch (err) {
      res.send(`Error ${err}`);
    }
  }
} else {
   return res.status(400).json({ error: "An admin can only create users." });
}
});
 
router.patch("/:id", upload.single("image"), verifyToken, async (req, res) => {
  console.log("req", req);
  const type = req.user;  
  const imageFile = req.file;
  if (type === 1) {
    try {
      const product         = await Product.findById(req.params.id);     
      product.product_name  = req.body.product_name;
      product.prize         = req.body.prize;
      product.image         = imageFile.filename;
      product.filename      = imageFile.filename;
      product.mimetype      = imageFile.mimetype;
      product.size          = imageFile.size;
      product.description   = req.body.description;
      product.count         = req.body.count;
      product.modifiedAt    = new Date();
      const a1              = await product.save();
      res.json(a1);
    } catch (err) {
      res.send(`Error ${err}`);
    }
  } else {
    return res
      .status(400)
      .json({ error: "An admin can only create products." });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const type = req.user; 
  
  if (type === 1) {
    try {
      const product = await Product.deleteOne({
        _id: req.params.id,
      });
      res.json(product);
    } catch (err) {
      res.send(`Error ${err}`);
    }
  } else {
    return res.status(400).json({ error: "An admin can only create products." });
  }
});
module.exports = router;