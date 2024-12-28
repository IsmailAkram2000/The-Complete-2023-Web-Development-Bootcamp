const mongoose = require('mongoose');

// Define the items schema
const itemsSchema = new mongoose.Schema({
    name: String
});

// Create the items model
const Item = mongoose.model('Item', itemsSchema);

// Define the List schema
const listScheme = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
})

// Create the list model
const List = mongoose.model('List', listScheme);

// Export the model
module.exports = List;