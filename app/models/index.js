const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.bill = require("./bill.model");
db.like = require("./like.model");
db.comment = require("./comment.model")
db.offer = require("./offer.model");
db.publication = require("./publication.model");
db.skill = require("./skill.model");

db.ROLES = ["Admin", "Expert"];

module.exports = db;