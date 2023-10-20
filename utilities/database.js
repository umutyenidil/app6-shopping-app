const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _database;

const mongoConnect = async (callback) => {
    try {
        const connection = await MongoClient.connect('mongodb://localhost:27017');
        // const connection = await MongoClient.connect('mongodb+srv://asusvivobookx571:asusvivobookx571@cluster0.8ufznjv.mongodb.net/?retryWrites=true&w=majority');
        
        console.log('connected');
        _database = connection.db();
        callback(connection);
      } catch(error) {
        console.error(error);
        throw error;
      }
};

const getDatabase = () => {
    if(_database){
        return _database;
    }
    
    throw 'NO DATABASE';
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDatabase = getDatabase;