const express = require("express");
const cookieParser  = require("cookie-parser");
const AuthRoute = require("./routes/Auth.route.js");  
const TransactionRoute = require("./routes/Transaction.route.js");
const BorrowerRouter = require("./routes/Borrower.route.js");
const app = express(); 
const cors = require("cors");
const dotenv = require("dotenv"); 
dotenv.config({}); 
// middlewares 
const allowedOrigins = [process.env.CORS_ORIGIN] // Replace with your production domain 
app.use(cors({
    origin: (origin, callback) => { 
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }, 
    methods:["PUT","GET","POST","PATCH"],
    credentials:true, 
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()) 
// routes
app.use("/api/v1",AuthRoute); 
app.use('/api/v1',TransactionRoute);
app.use('/api/v1',BorrowerRouter); 
module.exports  = app;
