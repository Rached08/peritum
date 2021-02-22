const mongoose = require("mongoose");

const Expert = mongoose.model(
  "Expert",
  new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    analyses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analyse"
      }
    ],
    listofdp: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = User;