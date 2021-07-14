const server = require('./lib/server')
const LoggerService = require("./lib/logger");
const logger = new LoggerService(module);


//Create Server
server.init(logger);
//Require routes
require("./routes")

process.on('unhandledRejection', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason) );
    throw reason;
});

process.on('unhandledException', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason));
    throw reason;
});

const data = require("./lib/data");

data.createCollection("/tickets", "tickets", {hello: "world2"}, (err, success) => {
    console.log(err, success)
}, logger)

//Server listen
const PORT = 6969
server.listen(PORT, () => {
    logger.info("Server Started and Listening @ " + PORT)
});





