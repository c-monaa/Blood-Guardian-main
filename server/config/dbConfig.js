// const mongoose = require('mongoose');
// require('dotenv').config();
// // console.log(process.env.mongo_url);
// mongoose.connect(process.env.mongo_url);
// const connection = mongoose.connection;
// //verify connection
// connection.on('connected',()=>{
//     console.log('MongoDb connection successfull');
// })

// //verify connection error
// connection.on('error',(err)=>{
//     console.log('MongoDb connection error',err) ;
// })

const mongoose = require('mongoose');
require('dotenv').config();

// Specify the MongoDB replica set write concern
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: 'majority', // Set the write concern mode to 'majority'
};

mongoose.connect(process.env.mongo_url, mongooseOptions);
const connection = mongoose.connection;

// Verify connection
connection.on('connected', () => {
  console.log('MongoDb connection successful');
});

// Verify connection error
connection.on('error', (err) => {
  console.log('MongoDb connection error', err);
});