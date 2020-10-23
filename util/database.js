// mongoDB setup
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://sanatanghosh:Sanatan1997@cluster0-expressjs.vsm7g.mongodb.net/<dbname>?retryWrites=true&w=majority"
      )
        .then( client => {
            console.log('connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
          });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database Found';
};



exports.mongoConnect = mongoConnect;
exports.getDb = getDb;





// mysql pool manulally -------

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'products-expressjs'
// });

// module.exports = pool.promise();
