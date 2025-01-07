const app = require("./src/app.js");
const DBConnection = require("./src/database/index.js"); 
const Port = process.env.DBPort || 7000; 
DBConnection().then(() => {
    app.listen(Port, () => {
        console.log(`server is running at http://localhost:${Port}`);
    })
}).catch((error) => {
    console.log("server connection faild...", error);
}) 
const shutDown = () => {
    console.log("shutting down server....");
    server.close(()=>{
        console.log("closed Server...");
        mongoose.connection.close(false,()=>{
            console.log("Closed DB connection");
            process.exit(0)
        })
    })
}
process.on("SIGINT",shutDown)
process.on("SIGTERM",shutDown)

