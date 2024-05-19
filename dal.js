const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
// const url = "mongodb://localhost:27017";
let db = null;
const url = process.env.MONGO_URL;
console.log(url)


// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected successfully to db server");
  // connect to database
  
  db = client.db("myproject");
});

// create user account
function create(name, email, uid) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, uid, balance: 0 };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
  });
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, findOne, find, update, all };
