const ApiError = require("../utils/ApiError")

const AsyncHandler = require("../utils/AsyncHandler");

const IsShopkeeper = AsyncHandler(async (req, _ , next) => {
   const shopkeeper = req?.user;   
   if ( shopkeeper?.role !== "shopkeeper") {
      throw new ApiError(400, "Access Denied!")
   }
   next()
})
module.exports = IsShopkeeper;