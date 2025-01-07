const express = require("express");
const VerifyUser = require("../middleware/VerifyUser"); 
const IsShopkeeper = require("../middleware/IsShopkeeper.middleware");
const { CreateDebt, CreatePayment, GetTransactions } = require("../controllers/Transaction.controller");
const TransactionRoute = express.Router(); 
TransactionRoute.route("/create-debt").post(VerifyUser,IsShopkeeper,CreateDebt);
TransactionRoute.route("/create-payment").post(VerifyUser,IsShopkeeper,CreatePayment);
TransactionRoute.route("/transactions/:id").get(VerifyUser,GetTransactions);
module.exports = TransactionRoute;