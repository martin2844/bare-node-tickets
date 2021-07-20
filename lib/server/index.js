const http = require('http');
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;


//Inject a logger to be able to log requests.


module.exports = {
    init: (logger) => {
        this.getRoutes = {};
        this.postRoutes = {};
        this.putRoutes = {};
        this.deleteRoutes = {};
        this.server = http.createServer((req, res) => {
            
            //Get the URL and parse it
            const parsedUrl = url.parse(req.url, true);
        
            //Get the Path requested
            const requestedPath = parsedUrl.pathname;
            const trimmedPath = requestedPath.replace(/\/+$/g, "");
        
            //Get Query String parameters
            const queryStringObject = parsedUrl.query;
            
            //Get Headers
            const headers = req.headers;
            
            //Get HTTP method
            const method = req.method;
        
            //Get payloads
            const decoder = new StringDecoder('utf-8');
            let buffer = '';

            let timeInit = Date.now();
            req.on('data', (data) => {
                
                //When the request receives data, it will decode it and append it to the buffer
                buffer += decoder.write(data);
            });
            req.on('end', () => {
                //The end event will always be called so we can safely add our finishing logic here 
                buffer += decoder.end();

                //Format aimed for  GET /v1/notifications/unread-count 304 28ms +547ms
                const log = (status, timeStarted) => {
                    console.log("LOGGER TRIGGERED")
                    if(logger) {
                        if(timeStarted && status) {
                            logger.info(method 
                                + " " 
                                + parsedUrl.pathname 
                                + (parsedUrl.search ?? "") 
                                + " \x1b[36m" 
                                + status
                                + " \x1b[35m"
                                + (timeStarted - Date.now()) 
                                + "ms"
                                + "\x1b[0m"
                                );
                        } else {
                            logger.info(method + " " + parsedUrl.pathname + (parsedUrl.search ?? ""));
                        }
                        
                    }
                }
                
                //Data Object constructed from receiving request.
                const requestData = {
                    path: trimmedPath,
                    query: queryStringObject,
                    method: method,
                    headers: headers,
                    body: buffer ? JSON.parse(buffer) : ""
                }

                const resMethods = {
                    statusCode: 200,
                    sendData: null,
                    status: function (x) {
                        this.statusCode = x;
                        //IF there is no data at next tick, directly end
                        process.nextTick(() => {
                            if(!this.sendData) {
                                res.writeHead(this.statusCode);
                                res.end("");
                                log(this.statusCode, timeInit)
                            }
                        })
                       
                        return this
                    },
                    send: function (x) {
                        this.sendData = x;
                        if(typeof this.sendData === 'object') {
                            console.log("Recognized as object")
                            res.setHeader("Content-Type", "application/json")
                            this.sendData = JSON.stringify(this.sendData);
                        }
                        res.writeHead(this.statusCode);
                        log(this.statusCode, timeInit)
                        res.end(this.sendData);
                        return this
                    } 
                }
        
                //Select handler for the request.
        
            
                //Send the response
                //Log the path to file

             
           
    
                //Routes handler
                if(this[method.toLowerCase()+"Routes"][trimmedPath]) {
                         //This evaluates to for example to: this.getRoutes["/home"](requestData, resMethods)
                        this[method.toLowerCase()+"Routes"][trimmedPath](requestData , resMethods)
                        return
                }
                
                log(404, timeInit);
                res.writeHead(404)
                res.end("Can not " + method + " " + parsedUrl.pathname);
               
          
        
            })
        
        })
        
    },
    listen: (PORT, callback) => {
        this.server.listen(PORT, () => {})
        callback()
        
    },
    get: (path, callback) => {
        console.log("\x1b[33m" + "[GET]    created route at path: " + path + "\x1b[0m")
        //Add to getRoutes this path with the callback
        this.getRoutes[path] = callback
    },
    post: (path, callback) => {
        console.log("\x1b[33m" + "[POST]   created route at path: " + path + "\x1b[0m")
        //Add to routes
        this.postRoutes[path] = callback
    },
    put: (path, callback) => {
        console.log("\x1b[33m" + "[PUT]    created route at path: " + path + "\x1b[0m")
        //Add to routes
        this.putRoutes[path] = callback
    },
    delete: (path, callback) => {
        console.log("\x1b[33m" + "[DELETE] created route at path: " + path + "\x1b[0m")
        //Add to routes
        this.deleteRoutes[path] = callback
    }
   
} 

