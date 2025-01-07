 const AsyncHandler = (requestHandler) => {
    return async (req, res,next) => {
        try {
            return await requestHandler(req,res,next);  
        } catch (error) {            
            res.status(error.statusCode || 500).json({
                status: error.statusCode,
                success: false,
                message: error.message
            })
        } 
    }
}
module.exports = AsyncHandler;

// const assyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// } 