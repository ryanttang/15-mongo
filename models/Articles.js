// Require Mongoose
let mongoose = require("mongoose");

// Create a schema class with Mongoose
let Schema = mongoose.Schema;

// Make LibrarySchema 
let ArticleSchema = new Schema({
    // name: a unique string
    title: {
        type: String,
        unique: true
    },
    link: {
        type: String
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Save the model using the LibrarySchema
let Article = mongoose.model("Article", ArticleSchema);

// Export model
module.exports = Article;