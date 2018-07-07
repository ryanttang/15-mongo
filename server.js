// Dependencies 
let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");

// Require Note and Article models
let Note = require("./models/Note.js");
let Article = require("./models/Articles.js");

// Scraping Tools
let request = require("request");
let cheerio = require("cheerio");

// Set Mongoose to ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
let app = express();

// Use Morgan and Body Parser with app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

Require Handlebars
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Make static dir public
app.use(express.static("public"));

// Database configuration for mongoose
mongoose.connect("");
let db = mongoose.connection;

// Show Mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Login Success
db.once("open", function() {
    console.log("Mongoose Connection Successful.");
});

// Routes
// GET request to scrape website

// GET request to pull article from MongoDB

// GET request to find article by ObjectId

// POST request for new note or replace existing note

// Listen on port 3000
appl.listen(process.env.PORT || 3000, function() {
    console.log("App running on port 3000.");
});