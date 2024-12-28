const mongoose = require('mongoose');

// Define the items schema
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

// Create the article model
const Article = mongoose.model('Articles', articleSchema);

// Export the model
module.exports = Article;