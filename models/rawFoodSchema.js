
const mongoose = require("mongoose");

const rawFoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  filename: {
    type: String,
    required: false,
  },
  mimetype: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("rawFood", rawFoodSchema);
