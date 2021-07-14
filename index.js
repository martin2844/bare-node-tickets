const server = require('./lib/server')
const LoggerService = require("./lib/logger");
const logger = new LoggerService(module);


//Initialize Server
server.init(logger)


server.get("/home", () => {
    console.log("EXECUTING CALLBACK FUNCTION");
})


process.on('unhandledRejection', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason) );
    throw reason;
});

process.on('unhandledException', (reason, p) => {
    logger.error('exception occurred \n' + JSON.stringify(reason));
    throw reason;
});

const PORT = 6969
server.listen(PORT, () => {
    logger.info("Server Started and Listening @ " + PORT)
})


const handlers = {}

handlers.sample = (data, callback) => {
    //callback http status code and a a payload object
    callback(200, {"test": "sample handler"})
}

handlers.notFound = (data, callback) => {
    callback(404)
}


const router = {
    'sample': handlers.sample 
}