const mongoose = require("mongoose");
const transationSchema = new mongoose.Schema({
    borrower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Borrower",
        required:true
    },
    shopkeeper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    type:{
        type:String,
        enum:["DEBT","PAYMENT"],
        required:true
    },
    amount:{
        type:Number,
        require:true
    }, 
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
module.exports = mongoose.model("Transaction",transationSchema);