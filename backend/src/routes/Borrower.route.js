const { GetBorrowers, GetBorrowerById } = require("../controllers/Borrower.controller");
const IsShopkeeper = require("../middleware/IsShopkeeper.middleware");
const VerifyUser = require("../middleware/VerifyUser");

const BorrowerRouter = require("express").Router();

BorrowerRouter.route("/borrowers").get(VerifyUser,IsShopkeeper,GetBorrowers)
BorrowerRouter.route("/borrower/:id").get(VerifyUser,GetBorrowerById)

module.exports = BorrowerRouter