// Dependencies 
let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let path = require("path");
let methodOverride = require("method-override");

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

// Override with POST having ?_method=PUT
app.use(methodOverride('_method'));

// Require Handlebars
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main", layoutsDir: __dirname + "/views/layouts"}));
app.set("view engine", "handlebars");

// Make public a static dir
app.use(express.static("public"));

// Database configuration for Mongoose
let databaseUri = "mongodb://localhost/nbascrape";
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseURI);
}
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

// GET request to pull article from MonoDB

// GET request to find article by ObjectId

// POST request for new note or replace existing note

// Listen on port 3000
appl.listen(process.env.PORT || 3000, function() {
    console.log("App running on port 3000.");
});