 
const { SignUp, SignIn, SignOut, GetCurrUser, ChangePassowrd, UpdateProfile, RefreshAccessToken, UploadeUserImage } = require("../controllers/Auth.controller.js"); 
const upload = require("../middleware/multer.middleware.js")
const VerifyUser = require("../middleware/VerifyUser.js"); 
const AuthRoute = require("express").Router();
  
AuthRoute.route("/signup").post(SignUp);
AuthRoute.route("/signin").post(SignIn);
AuthRoute.route("/user/signout").put(VerifyUser, SignOut);
AuthRoute.route("/user").get(VerifyUser, GetCurrUser); 
AuthRoute.route("/user/change-password").post(VerifyUser, ChangePassowrd); 
AuthRoute.route("/user/update-profile").post(VerifyUser, UpdateProfile); 
AuthRoute.route("/user/refresh-access-token").post(RefreshAccessToken); 
AuthRoute.route("/user/uploadImage").put(VerifyUser,upload.single("image"),UploadeUserImage);  

module.exports = AuthRoute;

