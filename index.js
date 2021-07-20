const server = require('./lib/server')
const LoggerService = require("./lib/logger");
const logger = new LoggerService(module);


//Create Server
server.init(logger);
//Require routes
require("./routes")

const data = require("./lib/data");
data.addLogger(logger);

//Create Database collections
data.createCollection("tickets", (success, error) => {
    if(success) {
        console.log("DB Collection: " + success);
    } else {
        console.log(error);
    }
})

//Creates collection user.
data.createCollection("users", (success, error) => {
    if(success) {
        console.log("DB Collection: " + success);
    } else {
        console.log(error);
    }
})

//Creates a user
// data.collection("users").create({
//     email: "test@test.com",
//     password: "tester25"
// })


// console.log(data.collection("users").findAll())

process.on('unhandledRejection', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason) );
    throw reason;
});

process.on('unhandledException', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason));
    throw reason;
});


//Server listen
const PORT = 6969
server.listen(PORT, () => {
    logger.info("Server Started and Listening @ " + PORT)
});





