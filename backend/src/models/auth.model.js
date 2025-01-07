const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs"); 
const AuthSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    mobile:{
        type:String
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePhoto: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ["shopkeeper", "customer"],
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: function () {
            return this.role === "customer"
        }
    },
    accessToken: {
        type: String,
    },
    refreshToken:{
        type:String
    }
}, { timestamps: true });

AuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})
AuthSchema.methods.IsCorrectPassword = async function (password) {
    return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model("Auth", AuthSchema);
