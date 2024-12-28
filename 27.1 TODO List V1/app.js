const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // Custom date module
const List = require("./schemas"); // Mongoose schema for lists

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from 'public' folder

// Connect to MongoDB
mongoose.connect("mongodb+srv://Ismail_Akram:Angel0068@cluster0.f3qjk.mongodb.net/todolistDB");

// Set EJS as the templating engine
app.set("view engine", "ejs");

/**
 * Route: GET '/'
 * Description: Render the default list page with tasks
 */
app.get("/", async function (req, res) {
    let day = date.getDate(); // Get the current day

    try {
        // Fetch the default list (name is empty string)
        const items = await List.findOne({ name: "" });
        const itemNames = items && items.items ? items.items.map(el => el.name) : []; // Extract item names

        res.render("list", {
            day: day, // Current date
            listItem: "", // Default list name
            items: itemNames, // Items to render
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching tasks.");
    }
});

/**
 * Route: POST '/'
 * Description: Add a new item to the default list
 */
app.post("/", async function (req, res) {
    const newItem = req.body.newItem; // Get the new task from the form

    try {
        // Check if the default list exists
        const list = await List.findOne({ name: "" });

        if (!list) {
            // If no default list exists, create a new one
            const newList = new List({
                name: "",
                items: [{ name: newItem }],
            });
            await newList.save();
        } else {
            // Add the new item to the existing list
            list.items.push({ name: newItem });
            await list.save();
        }

        res.redirect("/"); // Redirect to the default list
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding new task.");
    }
});

/**
 * Route: GET '/:customListName'
 * Description: Render a custom list page with tasks
 */
app.get("/:customListName", async function (req, res) {
    const customListName = req.params.customListName; // Get the custom list name from URL
    let day = date.getDate(); // Get the current day

    try {
        // Fetch the custom list by name
        const items = await List.findOne({ name: customListName });
        const itemNames = items && items.items ? items.items.map(el => el.name) : []; // Extract item names

        res.render("list", {
            day: day, // Current date
            listItem: customListName, // Custom list name
            items: itemNames, // Items to render
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching tasks.");
    }
});

/**
 * Route: POST '/delete'
 * Description: Delete an item from a specific list
 */
app.post("/delete", async function (req, res) {
    const customListName = req.body.currentList; // Get the list name from the form
    const itemToDelete = req.body.currentItem; // Get the item name from the form

    try {
        // Find the list by name
        const currentList = await List.findOne({ name: customListName });

        if (!currentList) {
            return res.status(404).send("List not found.");
        }

        // Remove the item from the list's items array
        currentList.items = currentList.items.filter(item => item.name !== itemToDelete);
        await currentList.save(); // Save the updated list

        // Redirect back to the appropriate list page
        res.redirect("/" + customListName);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting task.");
    }
});

/**
 * Route: POST '/:customListName'
 * Description: Add a new item to a custom list
 */
app.post("/:customListName", async function (req, res) {
    const customListName = req.params.customListName; // The name of the custom list
    const newItem = req.body.newItem; // Get the new task from the form

    try {
        // Find the custom list by name
        const currentlist = await List.findOne({ name: customListName });

        if (!currentlist) {
            // If the list does not exist, create a new one
            const newList = new List({
                name: customListName,
                items: [{ name: newItem }],
            });
            await newList.save();
        } else {
            // If the list exists, add the new item to its items array
            currentlist.items.push({ name: newItem });
            await currentlist.save();
        }

        // Redirect back to the custom list page
        res.redirect("/" + customListName);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding new task.");
    }
});

// Set the port to listen for incoming requests
const PORT = 3000 || process.env.PORT;
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});