const fs = require("fs");
const path = require("path")

//Format aimed for  GET /v1/notifications/unread-count 304 28ms +547ms
module.exports = class Logger {

    constructor(module) {
        this.module = module;
        if(module) {
            const parts = module.filename.split(path.sep);
            this.file = path.join(parts[parts.length - 2], parts.pop());
        }
    }

    //Checks if folder exists.
    checkFolder = (folderPath) => {
        // Throw error if folder path doesn't exist
        if (!folderPath) throw Error('folder path is required');
        // Check folder exists in the path using `fs.existsSync`
        const isFolderExist = fs.existsSync(folderPath);
        return isFolderExist;
    };

    checkFile = (filePath) => {
        return fs.existsSync(filePath)
    }

    write = (level, message) => {
        //Check if folder exists
        if(!this.checkFolder("logs")) {
            fs.mkdirSync("logs", { recursive: true })
        }
        //Check if file exists if it doesn't exist create it
        if(!this.checkFile("logs/log.txt")){
            fs.writeFileSync("logs/log.txt", (this.file ? "[" + this.file + "]": "") + "[" + level + "]" + ": " + message + "\n");
            return
        }
        //Write to file
        fs.appendFileSync("logs/log.txt", (this.file ? "[" + this.file + "]": "") + "[" + level + "]" + ": " + message + "\n");

    }

    log = (level, message) => {
        this.write(level, message);
        let color;
        switch(level){
            case "info":
                color = "\x1b[32m";
                break;
            case "error": 
                color = "\x1b[31m";
                break;
            case "warn":
                color = "\x1b[33m"
                break;
            default:
                color = "\x1b[32m";
                break
        }
        console.log((this.file ? "[" + this.file + "]": "") + color +  "[" + level + "]" + ": " + "\x1b[0m" + message + "\n")
    }

    info = (message) => {
        this.log("info", message)
    }

    error = (message) => {
        this.log("error", message)
    }

    warn = (message) => {
        this.log("warn", message)
    }


}