const AsyncHandler = require("../utils/AsyncHandler");
const Transaction = require("../models/transaction.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Borrower = require("../models/borrower.model");

const CreateDebt = AsyncHandler(async (req, res) => {
    const { description, amount, borrower,date } = req.body;
    if (!description || !amount || !borrower === " ") {
        throw new ApiError(400, "All fields are required!")
    }
    const debtTransaction = await Transaction.create({
        borrower,
        shopkeeper: req.user._id,
        amount,
        description,
        type: "DEBT",
        date
    }) 
    if (!debtTransaction) {
        throw new ApiError(400, "Debt Transaction not created!")
    }
    const getBorrower = await Borrower.findById(borrower);
    if (!getBorrower) {
        throw new ApiError(400, "Borrower could not updated!")
    }
    getBorrower.transactions.push(debtTransaction._id)

    if (getBorrower.advancedPayment > 0) { 
        getBorrower.advancedPayment = getBorrower.advancedPayment - amount
        if (getBorrower.advancedPayment < 0) {
            getBorrower.debt = Math.abs(getBorrower.advancedPayment);
            getBorrower.advancedPayment = 0
        }
    } else {
        getBorrower.debt = Number(getBorrower.debt) + Number(amount);
    }
    const updateBorrower = await getBorrower.save();
    if (!updateBorrower) {
        throw new ApiError(400, "Borrower could not updated!")
    }
    res.status(200).json(new ApiResponse(200, debtTransaction, "Debt recorded Successfully!"))
});
const CreatePayment = AsyncHandler(async (req, res) => {
    const { description, amount, borrower,date } = req.body;
    if (!amount || !borrower || borrower === " ") {
        throw new ApiError(400, "All fields are required!")
    }
    const paymentTransaction = await Transaction.create({
        borrower,
        shopkeeper: req.user._id,
        amount,
        type: "PAYMENT",
        description,
        date
    }); 
    if (!paymentTransaction) {
        throw new ApiError(400, "Payment Transactions not created!")
    }
    const getBorrower = await Borrower.findById(borrower); 
    if (!getBorrower) {
        throw new ApiError(404, "Borrower Not Fund!")
    }
    let updateFields = {
        $inc: { advancedPayment: getBorrower.advancedPayment },
        $inc: { debt: getBorrower.debt },
        $push: { transactions: paymentTransaction._id }
    };
    let remainingDebt = getBorrower.debt - amount; 
    if (remainingDebt <= 0) { 
        updateFields.$set = { debt: 0 }
        updateFields.$inc = { advancedPayment: Math.abs(remainingDebt) }
    } else {
        updateFields.$inc = { debt: -remainingDebt }
    }

    const updateBorrower = await Borrower.findByIdAndUpdate(borrower, updateFields, { new: true })
    if (!updateBorrower) {
        throw new ApiError(400, "Borrower could not Updated!")
    }
    res.status(200).json(new ApiResponse(200, paymentTransaction, "Payment Paid Successfully!"))
})
const GetTransactions = AsyncHandler(async (req, res) => {
    const { id } = req.params;   
    if (!id) {
        throw new ApiError(400, "Borrower ID is required!")
    }
    const transactions = await Transaction.find({ borrower: id }).select("amount createdAt _id type description");
    res.json(new ApiResponse(200,transactions,"Transactions Get Successfully!"))
})

module.exports = {
    CreateDebt, CreatePayment, GetTransactions
}