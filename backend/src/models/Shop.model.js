const mongoose =  require("mongoose");

const ShopSchema = new mongoose.Schema({
    shopName:{
        type:String,
        required:true
    },
    shopkeeper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },
    customers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Borrower",
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true});
module.exports = mongoose.model("Shop",ShopSchema)