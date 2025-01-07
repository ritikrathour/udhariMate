 
const ApiError = require("../utils/ApiError");
const AsyncHandler = require("../utils/AsyncHandler");
const Auth = require("../models/auth.model.js")
const jwt = require("jsonwebtoken");
const VerifyUser = AsyncHandler(async (req, _, next) => {
    const AccessToken = req?.cookies?.accessToken; 
    if (!AccessToken) {
        throw new ApiError(401, "Unauthorized User!");
    }
    const validAccessToken = jwt.verify(AccessToken, process.env.JWT_SECREt);  
    const user = await Auth.findById({ _id: validAccessToken?._id }).select("-password"); 
    if(!user){
        throw new ApiError(401,"Unauthorized AccessToken!")
    } 
    req.user = user;
    next()
})
module.exports = VerifyUser;