const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    salary:Number,
    visibility:Boolean,
    score:Number,
    role:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    },
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"
      }
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = User;
