//Require modules from node

const http = require('http');
const url = require("url");
const LoggerService = require("./lib/logger");
const logger = new LoggerService();

const server = http.createServer((req, res) => {

    //Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    //Get the Path requested
    const requestedPath = parsedUrl.pathname;
    const trimmedPath = requestedPath.replace(/^\/+|\/+$/g, "");

    //Get Query String parameters
    const queryStringObject = parsedUrl.query;
    
    //Get Headers
    const headers = req.headers;
    
    //Get HTTP method
    const method = req.method;
    
    //Send the response

    //Log the path to file
    console.log("info:* " + method + " " + parsedUrl.pathname + (parsedUrl.search ?? ""))
    logger.log("info", method + " " + parsedUrl.pathname + (parsedUrl.search ?? ""))
    res.end(parsedUrl.pathname);
})

const PORT = 6969

server.listen(PORT, () => {
    logger.log("info", "Server Started and Listening @ " + PORT)
    console.log("info:* Server Started and Listening @ " + PORT)
})