const Borrower = require("../models/borrower.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const AsyncHandler = require("../utils/AsyncHandler");

const GetBorrowers = AsyncHandler(async (req, res) => {
    const { category, sort, limit, page, search } = req.query; 
    if (search) {
        // Aggregation pipeline to filter borrowers by email or username in the Auth model
        const borrowers = await Borrower.aggregate([
            {
                $lookup: {
                    from: "auths", // The name of the referenced collection (Auth model)
                    localField: "borrower",
                    foreignField: "_id",
                    as: "borrowerDetails",
                },
            },
            { $unwind: "$borrowerDetails" }, // Unwind the array to access borrower details
            {
                $match: {
                    $or: [
                        { "borrowerDetails.userName": { $regex: search, $options: "i" } },
                        { "borrowerDetails.email": { $regex: search, $options: "i" } },
                    ],
                },
            },
            {
                $project: {
                    _id: 1,
                    debt: 1,
                    paid: 1,
                    advancedPayment: 1,
                    "borrowerDetails.userName": 1,
                    "borrowerDetails.email": 1, 
                },
            },
        ]);

        return res.status(200).json(new ApiResponse(200, borrowers, "Successfully get borrowers"));
        
    } 
    const shopKeeperId = req.user._id
    let query = {};
    if (category) query.role = category;
    query.shopKeeper = shopKeeperId;
    const pageSize = parseInt(limit) || 9;
    const currentPage = parseInt(page) || 1;
    const sortBy = sort ? sort.split(",").join(' ') : 'createdAt';
 
    const borrowers = await Borrower.find(query).sort(sortBy).skip((currentPage - 1) * pageSize).limit(pageSize).select("-password").
        populate("borrower", "email userName profilePhoto createdAt");
    if (borrowers?.length < 1) {
        throw new ApiError(404, "Borrowers Not Found!")
    }
    const totalBorrowers = await Borrower.countDocuments(query);
    let totalPages = Math.ceil(totalBorrowers / pageSize);
    res.status(200).json(new ApiResponse(200, {
        borrowers, count: borrowers.length, totalBorrowers, currentPage,
        totalPages
    }, "Get Users Successfully!"))
})
const GetBorrowerById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Borrower Id Must Be Required!")
    }
    let borrower;
    if (req.user.role === "shopkeeper") {
        borrower = await Borrower.findOne({ _id: id }).select("-password").populate("borrower", "email userName profilePhoto").populate("transactions");
    } else {
        borrower = await Borrower.findOne({ borrower: req.user._id }).select("-password").populate("borrower", "email userName profilePhoto").populate("transactions");
    }  
    
    if (!borrower) {
        throw new ApiError(404, "Borrower Not Found!");
    }
    res.status(200).json(new ApiResponse(200, borrower, "Successfully Get Borrower throw BorrowerId!"))
})
module.exports = {
    GetBorrowers,
    GetBorrowerById
}