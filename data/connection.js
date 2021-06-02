require('dotenv').config();

const mongoclient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;

const client = new mongoclient(uri);

let instance = null;

const getConnection = () =>{
    if(instance == null){
        try {
            instance = client.connect();
        } catch (error) {
            console.log(error.message);
            throw new Error('problemas al conectarse con mongo');
        }
    }
    return instance;
}

module.exports = {getConnection};