const fs = require('fs');
const path = require("path");


module.exports = {
    //attaches a logger to the lib
    addLogger: function (logger) {
        this.logger = logger
        
    },
    baseDir: path.join(__dirname, '../../dataBase'),
    //Base directory of the Data folder
    checkFolder: (folderPath) => {
        // Throw error if folder path doesn't exist
        if (!folderPath) throw Error('folder path is required');
        // Check folder exists in the path using `fs.existsSync`
        const isFolderExist = fs.existsSync(folderPath);
        return isFolderExist;
    },
    checkFile: (filePath) => {
        return fs.existsSync(filePath)
    },
    //Saves data to a file
    createCollection: function (collectionName, callback) {
        const dir = "/" + collectionName;
        try {
        //Before anything create the data directory;
        if(!this.checkFolder(this.baseDir)){
            fs.mkdirSync(this.baseDir);
        }
        //first check if directory exists
        if(!this.checkFolder(this.baseDir + dir)){
            fs.mkdirSync(this.baseDir + dir, { recursive: true })
        }
        //then check if file exists
        if(!this.checkFile(this.baseDir + dir + "/" + collectionName + ".json")) {
            fs.writeFileSync(this.baseDir + dir + "/" + collectionName + ".json", JSON.stringify({
                collectionName: collectionName,
                createdAt: new Date(),
                data: [

                ]
            }))
          
            if(this.logger) {
             
                this.logger.info(collectionName + ".json" + " collection created successfuly")
                callback(collectionName + ".json" + " created successfuly", null)
                return;
            }
        } else {
            if(this.logger) {
                this.logger.info(collectionName + ".json" + " collection allready exists")
                return;
            }
        }
        //return message for case no logger is added
        callback(collectionName + ".json" + " collection created successfuly", null);
        return;
        } catch (error) {
            //return error message
            callback(false, error)
        }
       
     
    },
    collection: function (collectionName) {
        const dir = "/" + collectionName + "/" + collectionName + ".json";
        const collectionMethods = {
            findAll: () => {
               let file = JSON.parse(fs.readFileSync(this.baseDir + dir));
               return file.data
            },
            create: (newObj) => {
                let file = JSON.parse(fs.readFileSync(this.baseDir + dir));
                newObj.id = file.data.length + 1;
                let existingData = file.data
                existingData = [...existingData, newObj]
                fs.writeFileSync(this.baseDir + dir, JSON.stringify(
                    {
                        collectionName: file.collectionName,
                        createdAt: file.createdAt,
                        data: existingData
                    }
                ))
                //returns the newley created obj
                return newObj;
            }
        } 
        try {
            if(!this.checkFolder(this.baseDir + dir)) {
                throw new Error("collection: '" + collectionName + "' does not exist, create it before operating on it")
            }
            return collectionMethods
        } catch (error) {
            throw error
        }
     
    }
}