const Debt = require("../models/debt.model.js");
const Payment = require("../models/payment.model");
const Transaction = require("../models/transaction.model.js")
module.exports.RecordDebt = async (borrowerId, description, amount, lender) => {
    try {
        const debt = new Debt({
            borrowerId,
            description,
            amount,
            lender
        })
        await debt.save();
        const lastTransaction = await Transaction.findOne({ borrowerId }).sort({ createdAt: -1 });
        const previousBalance = lastTransaction ? lastTransaction?.balance : 0;
        const newBalance = +(previousBalance) + amount;
        const transaction = new Transaction({
            borrowerId,
            type: "DEBT",
            amount,
            balance: newBalance, 
            description
        })
        await transaction.save();
        return newBalance
    } catch (error) {
        console.log(error);
    }
}
module.exports.RecordPayment = async (borrowerId, paymentAmount, description) => {
    try {
        const lastTransaction = await Transaction.findOne({ borrowerId }).sort({ createdAt: -1 });
        const previousBalance = lastTransaction ? lastTransaction?.balance : 0
        let advancedPayment = 0;
        let newBalance = previousBalance - paymentAmount;
        if (newBalance < 0) {
            advancedPayment = Math.abs(newBalance);
            newBalance = 0
        }
        const payment = new Payment({
            borrowerId, amountPaid:paymentAmount, advancedPayment, description
        });
        await payment.save();
        const transaction = new Transaction({
            borrowerId,
            type: "PAYMENT",
            amount:paymentAmount,
            balance: newBalance,
            description
        })
        await transaction.save()
        return transaction
    } catch (error) {
        console.log(error);
    }
}