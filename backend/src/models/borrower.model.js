const mongoose = require("mongoose");
const BorrowerSchema = new mongoose.Schema({
    borrower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    }, 
    shopKeeper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    debt:{
        type:Number,
        default:0
    },
    paid:{
        type:Number,
        default:0
    }, 
    advancedPayment:{
        type:Number,
        default:0
    },
    transactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transaction",
        }
     ]
},{timestamps:true})
module.exports = mongoose.model("Borrower",BorrowerSchema)