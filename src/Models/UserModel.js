const mongoose = require("mongoose");

const usreSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  phoneNumber: {
      type: Number,
      //unique: true,
      required: true,
  },
  email: {
      type: String,
    // unique: true,
      required: true,
  },
  role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
  },
  loginType: {
      type: String,
      enum: ['gmail', 'facebook'],
      required: true,
  },
  isActive: {
      type: Boolean,
      required: true,
      default: true
  },
  createdAt: {
      type: Date,
      required: false,
      default: Date.now
  },
  createdBy: {
      type: Date,
      required: false,
  },
  modifiedAt: {
      type: Date,
      required: false,
  },
  modifiedBy: {
      type: Date,
      required: false,
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "favourites" }],
});

module.exports = mongoose.model("users", usreSchema);
