const server = require("../../lib/server")
const data = require("../../lib/data");

server.post("/users", (req, res) => {
    console.log("POST at USERS", req.body)
    try {
        if(!req.body.email) {
            throw new Error("an email is needed to create a user")
        }
        if(!req.body.password) {
            throw new Error("a password is needed to create a user")
        }
    
        let newUser = data.collection("users").create(req.body)
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }

})

