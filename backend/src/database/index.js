const mongoose = require("mongoose"); 

// db connnection 

const DBConnection = async ()=>{
    try { 
        await mongoose.connect(process.env.MONGODB_URI+"/"+process.env.DB_NAME); 
        
        console.log("Data Base Connected successefully..."); 
    } catch (error) {
        console.log("Data Base connection failed...", error);
        process.exit(1)
    }
}

module.exports = DBConnection;