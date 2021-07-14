const http = require('http');
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;


//Inject a logger to be able to log requests.


module.exports = {
    init: (logger) => {
        
        this.server = http.createServer((req, res) => {

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
        
            //Get payloads
            const decoder = new StringDecoder('utf-8');
            let buffer = '';
            req.on('data', (data) => {
                //When the request receives data, it will decode it and append it to the buffer
                buffer += decoder.write(data);
            });
            req.on('end', () => {
                //The end event will always be called so we can safely add our finishing logic here 
                buffer += decoder.end();
        
                //Select handler for the request.
                // console.log(router[trimmedPath])
            
                //Send the response
                //Log the path to file
                if(logger) {
                    logger.info(method + " " + parsedUrl.pathname + (parsedUrl.search ?? ""));
                }
           
                //If method is GET
                if(method === "GET") {              
                    if(this.getRoutes["/" + trimmedPath]) {
                        this.getRoutes["/" + trimmedPath]()
                        
                    } else {
                        
                    }
                } 
            
                res.end(parsedUrl.pathname);
                if(buffer) {
                    console.log("PAYLOAD: ", buffer)
                }
        
            })
        
        })
        
    },
    listen: (PORT, callback) => {
        this.server.listen(PORT, () => {})
        callback()
        
    },
    get: (path, callback) => {
        console.log("\x1b[33m" + "[GET] created route at path: " + path + "\x1b[0m")
        //Add to getRoutes this path with the callback
        if(typeof this.getRoutes === 'undefined') {
            this.getRoutes = {}
        }
        this.getRoutes[path] = callback
        
        //Add to getRoutes this path with the callback
        // this.getRoutes[path] = callback();
    },
   
} 

