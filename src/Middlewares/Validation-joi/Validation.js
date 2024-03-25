const Joi = require("joi"); 
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  type: Joi.number().min(1).required(),
  mobile: Joi.number().min(10).required(),
  password: Joi.string().min(3).required(),
});


const rawFoodSchema = Joi.object({
  name: Joi.string().min(3).required(),
  //category_id: Joi.objectId().required(),
  description: Joi.string(),
  image: Joi.array().required()
});

const categorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string(),
});

const productSchema = Joi.object({
  // _id:Object
  product_name: Joi.string().min(3).required(),
  image: Joi.binary()
    //.encoding('base64') // Ensure the image data is base64-encoded
    .required(),
  filename: Joi.string()
    .max(100) // Set a maximum length for the filename
    .required(),
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "image/gif") // Define valid image MIME types
    .required(),
  size: Joi.number()
    .max(10 * 1024 * 1024) // Set a maximum file size (e.g., 10MB)
    .required(),
  prize: Joi.number().min(10).required(),
  description: Joi.string().min(3).required(),
  count: Joi.number().min(10).required(),
});

const orderSchema = Joi.object({
  product_id: Joi.objectId().required(),
  user_id: Joi.objectId().required(),
  order_count: Joi.number().min(1).required(),
  order_amount: Joi.number().required(),
  payment_type: Joi.string().required(),
  description: Joi.string(),
});

module.exports.userSchema     = userSchema;
module.exports.productSchema  = productSchema;
module.exports.orderSchema    = orderSchema;
module.exports.categorySchema = categorySchema;
module.exports.rawFoodSchema = rawFoodSchema;
