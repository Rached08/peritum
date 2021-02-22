const mongoose = require("mongoose");


const Publication = mongoose.model(
"Publication",
new mongoose.Schema({
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
);
module.exports = Publication;