const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
  description: {
    type: String,
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

module.exports = mongoose.model("category", categorySchema);
