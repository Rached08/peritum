const mongoose = require("mongoose");

const Offer = mongoose.model(
    "Offre",
    new mongoose.Schema({
    bill:{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    },
    date:Date,
    owner : {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    author:{

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})
);
module.exports = Offer ;