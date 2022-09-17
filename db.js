const {MongoClient} = require('mongodb');

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/meghasBookStore')
            .then((client) => {
                  dbConnection =  client.db()
                //   console.log(client);
                  console.log("client recieved/...");
                  return cb()
            })
            .catch((err) => {
                console.log("no error");
                return cb(err)

            })
    },
    
    getDb: () => dbConnection
}