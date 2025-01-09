const Auth = require("../models/auth.model");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const AsyncHandler = require("../utils/AsyncHandler.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const Shop = require("../models/Shop.model.js"); 
const { mongoose } = require("mongoose");
const Borrower = require("../models/borrower.model.js");
const UploadOnCloudinary = require("../utils/Cloudinary.js");
const accessTokenOptions = {
    path: "/",
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
}
const refreshTokenOptions = {
    ...accessTokenOptions,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
} 
// sign up route 
const SignUp = AsyncHandler(async (req, res) => {
    const { userName, email, password, role, shopId, shopName } = req.body;
    if (!userName || !email || !password === " ") {
        throw new ApiError(400, "All fields are required")
    }
    if (!['shopkeeper', 'customer'].includes(role)) {
        throw new ApiError(400, "Invalid role!")
    }
    if (role === 'customer' && !shopId) {
        throw new ApiError(400, "Borrower must be associated with a shopkeeper!")
    }
    const isPresent = await Auth.findOne({ email });
    if (isPresent) {
        throw new ApiError(402, "User Already exist!")
    }
    if (role === "shopkeeper") {
        if (!shopName) {
            throw new ApiError(400, "Shop Name Is Required!")
        }
        const shop = new Shop({
            shopName
        })
        if (!shop) {
            throw new ApiError(400, "Shop Not Created Yet!")
        }
        await shop.save();
        const shopkeeper = new Auth({
            userName,
            email,
            password,
            role,
            shopId: shop?._id
        })
        if (!shopkeeper) {
            throw new ApiError(400, "ShopKeeper could not Sign up!")
        }
        await shopkeeper.save();
        shop.shopkeeper = shopkeeper._id;
        await shop.save();
        const savedShopKeeper = await Auth.findById(shopkeeper._id).select("-password");
        res.status(201).json(new ApiResponse(201, savedShopKeeper, "ShopKeeper sign up successfully!"))
    } else if (role === "customer") {
        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            throw new ApiError(400, "Shop Id is required for Customers!")
        }
        const shop = await Shop.findById(shopId);
        if (!shop) {
            throw new ApiError(404, "Shop Not Found for this ID!")
        }
        const customer = await Auth.create({
            userName,
            email,
            role,
            password,
            shopId
        })
        if (!customer) {
            throw new ApiError(400, "User could not Sign up!")
        };
        shop.customers.push(customer._id)
        await shop.save();
        await Borrower.create({
            borrower: customer._id,
            shopKeeper: shop.shopkeeper,
            shopId
        })
        const savedCustomer = await Auth.findById(customer._id).select("-password");
        res.status(201).json(new ApiResponse(201, savedCustomer, "User sign up successfully!"))
    } else {
        throw new ApiError(400, "Invalid role specified!")
    }
})
// sign in route 
const SignIn = AsyncHandler(async (req, res) => { 
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "email and password are required!")
    } 
    const existUser = await Auth.findOne({ email });
    if (!existUser) {
        throw new ApiError(400, "User Not Found!");
    }
    const checkPassword = await bcrypt.compare(password, existUser.password);
    if (!checkPassword) {
        throw new ApiError(401, "Invalid password!")
    }
    const accessToken = jwt.sign({ role: existUser?.role, _id: existUser._id }, process.env.JWT_SECRET, {
        expiresIn: "5d"
    });
    const refreshToken = jwt.sign({ role: existUser?.role, _id: existUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    if (!accessToken) {
        throw new ApiError(401, "Something is wrong for generating jwtToken!")
    }
    const signInUser = await Auth.findById(existUser._id).select("-password");
    signInUser.refreshToken = refreshToken;
    signInUser.save();
    if (!signInUser) {
        throw new ApiError(400, "Something went wrong!")
    }
    res.status(200).cookie("accessToken", accessToken, accessTokenOptions).cookie("refreshToken", refreshToken, refreshTokenOptions).json(new ApiResponse(200, signInUser, "User Logged in Successfully!"));
})
// sign out route       
const SignOut = AsyncHandler(async (req, res) => {
    await Auth.findByIdAndUpdate(req?.user?._id, {
        $unset: {
            refreshToken: null
        }
    }, {
        new: true
    })
    res.status(200).clearCookie("accessToken", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(Date.now())
    }).clearCookie("refreshToken", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(Date.now())
    }).json(new ApiResponse(200, {}, "User Logged out Successfully!"));
})
const GetCurrUser = AsyncHandler(async (req, res) => { 
    res.status(200).json(new ApiResponse(200, req?.user, "Successfully Get User!"))
})
const ChangePassowrd = AsyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Please Fill All Fields!")
    };
    // valid old password 
    const currUser = await Auth.findOne({ email: req.user.email });
    if (!currUser) {
        throw new ApiError(404, "User Not Found!")
    }
    const validOldPassword = await currUser.IsCorrectPassword(oldPassword);
    if (!validOldPassword) {
        throw new ApiError(400, "InValid! Please Enter Valid Password!")
    }
    const updatePassword = currUser.password = newPassword;
    if (!updatePassword) {
        throw new ApiError(400, "Could't Updated Password");
    }
    currUser.save();
    res.json(new ApiResponse(201, {}, "Password Changed Successfully!"))
})
const UpdateProfile = AsyncHandler(async (req, res) => {
    const { userName, mobile } = req.body;
    if (mobile && mobile?.length !== 10) {
        throw new ApiError(400, "Mobile Number Must Be 10 Digit!")
    }
    const updateProfile = await Auth.findByIdAndUpdate(req.user._id, { mobile, userName }, {
        new: true
    });
    if (!updateProfile) {
        throw new ApiError(404, "User Profile Not Updated!");
    }
    res.json(new ApiResponse(200, updateProfile, "User Profile Updated Successfully!"))
})
const UploadeUserImage = AsyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError("Access denied!")
    }
    const uploadedImagePath = await UploadOnCloudinary(req.file.path);
    if (!uploadedImagePath) {
        throw new ApiError(400, "Can't Uploaded image!")
    }
    const getUser = await Auth.findByIdAndUpdate(user?._id, {
        profilePhoto: uploadedImagePath
    }, {
        new: true
    });
    res.status(200).json(new ApiResponse(200, { imageUrl: getUser }, "Image Uploaded Successfully!"))

})
const RefreshAccessToken = AsyncHandler(async (req, res) => {
    const incommingRefeshToken = req.cookies?.refreshToken;
    if (!incommingRefeshToken) {
        throw new ApiError(401, "Unauthorized Request!");
    }
    const decodedRefreshToken = jwt.verify(incommingRefeshToken, process.env.JWT_SECRET)//process.env.REFRESH_TOKEN_SECRET
    if (!decodedRefreshToken) {
        throw new ApiError(400, "User Not Veryfied!")
    }
    const user = await Auth.findById(decodedRefreshToken?._id);
    if (!user) {
        throw new ApiError(401, "Invalid refreshToken");
    }
    const accessToken = jwt.sign({ role: user.role, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    const refreshToken = jwt.sign({ role: user.role, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });
    if (!accessToken) {
        throw new ApiError(401, "Something is wrong for generating jwtToken!")
    }
    return res.status(200).cookie("accessToken", accessToken, accessTokenOptions).cookie("refreshToken", refreshToken, refreshTokenOptions).json(new ApiResponse(200, { accessToken, refreshToken }, "accessToken refreshed"));
})

module.exports = { SignUp, SignIn, SignOut, GetCurrUser, ChangePassowrd, UpdateProfile, RefreshAccessToken, UploadeUserImage };
