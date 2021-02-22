const mongoose = require("mongoose");

const Skill = mongoose.model(
"Skill",
new mongoose.Schema({
    name :String,

})
);
module.exports = Skill ;