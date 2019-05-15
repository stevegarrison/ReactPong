const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:password1@ds123603.mlab.com:23603/heroku_5lxdp3bs", { useNewUrlParser: true });

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/options", { useNewUrlParser: true });

// Every NPM start creates default options and DB
db.options
  .remove({})
  .then(() => db.options.create({
    player1Color: "white",
    player2Color: "white",
    ballColor: "white",
    imageURL: "",
    player1Size: 130,
    player2Size: 130,
    value: 5,
    multiBall: "false",
    paddleShrink: "false",
    fastBall: "false"
  }))
  
  .then(function (dbOptions) {
    // If saved successfully, print the new Library document to the console
    console.log("Options logged from main server.js file: " + dbOptions);
  })
  .catch(function (err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  });


// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

mongoose.connection.on('connected', function(){  
  console.log("Mongoose default connection is open to " + "mongodb://localhost/options");
});

mongoose.connection.on('error', function(err){
  console.log("Mongoose default connection has occured "+err+" error");
});

mongoose.connection.on('disconnected', function(){
  console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination");
      process.exit(0)
  });
});

process.on('SIGTERM', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});