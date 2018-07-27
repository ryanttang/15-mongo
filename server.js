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
let databaseURI = "mongodb://localhost/nbascrape";
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
app.get("/", function(req, res) {
    // Grab every doc in the Articles array
    Article.find((), function(error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // or Send doc to browser as JSON object
        else {
            res.render("index", {artciles: doc});
        }
    });
});

// GET request to scrape the website
app.get("/scrape", function(req, res) {
    // Grab the body of the HTML with request
    request("http://nypost.com/sports/", function(error, response, html) {
        // Load into Cheerio and save as shorthand selector
        var $ = cheerio.load(html);
        // Grab every h2 within an article tag
        $("article h3").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, save as properties of the result
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            // Using Article model, create new entry
            var entry = new Article(result);

            // Save that entry to DB
            entry.save(function(err, doc) {
                // Log Errors
                if (err) {
                    console.log(err);
                }
                // or Log the Doc
                else {
                    console.log(doc);
                }
            });
        });
    });
    // Tell browser scrape is complete
    res.send("Scrape Complete");
    res.redirect("/");
)};

// Get scraped articles from MongoDB
app.get("/articles", function(req, res) {
    // Grabs all article array
    Article.find({}, function(error, doc) {
        // Log Errors
        if (error) {
            console.log(error);
        }
        // Otherwise, send doc to the browser as JSON object
        else {
            res.json(doc);
        }
    });
});

// Create a new note or replace an existing note
app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to entry
    var newNote = new Note(req.body);

    // Save the new note the DB
    newNote.save(function(error, doc) {
        // Log Errors
        if (error) {
            console.log(error);
        }
        // Otherwise
        else {
                // Use Article ID to find and update its note
                Article.findOneandUpdatee({ "_id": req.params.id }, { "note": doc._id })
                // Execute the above query
                .exec(function(err, doc) {
                    // Log Errors
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // or Send Document to the browser
                        res.send(doc);
                    }
                });
        }
    });
});
// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log("App running on port 3000.");
});