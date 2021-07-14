# Barebones Ticket-Api
The idea of this project is to just recreate my nestJS ticket-api with nodejs, no dependencies but same functionalities.

## Functionalities should be:

1. Fully capable REST API which:  
    a. Creates, Reads, Updates and Deletes Tickets.  
    b. Creates, Reads, Updates and Deletes Users. 
2. Has a user Auth System with roles.
3. Has a logger which logs to console and files. Wont be as good as winston probably, but the idea is bare bones.


# Libraries

At the lib folder you'll be able to find libraries made from scratch to solve functionalities in this no-dependency project.

## logger

A basic logger which logs to console with colors and to a txt file.
Inspired on winston.

### Basic Usage

To use it just:
`const LoggerService = require("./lib/logger")`    
and create a new instance  
`const logger = new LoggerService(module)`  

the module parameter is optional, if you pass it you'll be able to see the file that is generating the log.


```
//Example with module:  

[barebone\index.js][info]: Server Started and Listening @ 6969

//Example without module:  
[info]: Server Started and Listening @ 6969

```

## server

A basic http server heavily inspired on expressJs. 

To run the server you just require the server index.js   
`const server = require("./lib/server")`  
and down to business. 

### Basic Usage

```javascript
//Require it first
const server = require("./lib/server")
//To initialize the server
server.init()

//Add routes - only GET, POST, PUT, DELETE verbs are available
server.get("/home", (req, res) => {
    console.log("This is my home route");
    res.status(200).send("Todo")
})

server.post("/users", (req, res) => {
    Users.save({
        ...req.body
    })
    res.status(201).send("User created")
})

//to start listening - Pass in a PORT as a INT
server.listen(PORT, () => {
    //You can add a log as a callback
    logger.info("Server Started and Listening @ " + PORT)
});
```


Since node_modules are singletons by default, you can require the server from any file and add routes at any file, such as this projects.  
**Just remember to require them at your entry point**