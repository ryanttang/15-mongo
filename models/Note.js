// Require Mongoose
let mongoose = require("mongoose");

// Create a schema class with mongoose
let Schema = mongoose.Schema;

// make NoteSchema a Schema
let NoteSchema = new Schema({
    note: {
        type: String
    }
});

// Save the model using NoteSchema
let Note = mongoose.model("Note", NoteSchema);

// Export model
module.exports = Note;