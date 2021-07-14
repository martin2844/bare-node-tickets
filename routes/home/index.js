const server = require("../../lib/server");

server.get("/home", (req, res) => {
    console.log("EXECUTING CALLBACK FUNCTION");
    res.status(200).send("Todo")
})

server.post("/home", (req, res) => {
    // console.log("POST at Home", req.body)
    res.status(202)
})

server.delete("/home", (req, res) => {
    // console.log("POST at Home", req.body)
    res.status(202)
})
