const mongoose = require("mongoose");

const Bill = mongoose.model(
"Bill",
new mongoose.Schema(
    {
        date :Date,
        price:Number,
    }
)
);
module.exports = Bill ;