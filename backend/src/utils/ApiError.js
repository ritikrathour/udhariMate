class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors= [],
        stack= "",
        success= false
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.stack = stack
        this.errors = errors
        if(stack){
            console.log(stack);
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}
module.exports = ApiError;