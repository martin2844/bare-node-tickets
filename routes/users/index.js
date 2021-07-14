const server = require("../../lib/server")

server.post("/users", (req, res) => {
    console.log("POST at USERS", req.body)
    res.status(201).send("User created")
})

