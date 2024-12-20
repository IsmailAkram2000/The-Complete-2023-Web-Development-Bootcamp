const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Article = require("./schemas/schemas");   // Import Article model

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from 'public' folder

// Connect to MongoDB
mongoose.connect("mongodb+srv://Ismail_Akram:Angel0068@cluster0.f3qjk.mongodb.net/wikiDB");

// Set EJS as the templating engine
app.set("view engine", "ejs");


/* ALL Article Routes */
// Get    => (Get All Articles)
// Post   => (Insert New Article)
// Delete => (Delete All Articles)
app.route('/articles').get(async function(req, res) {
    try {
        const allArticles = await Article.find();
        res.send(allArticles);
    } catch (err) {
        res.status(500).send("An error occurred while fetching articles.");
    }
})
.post(async function(req, res) {
    try {
        await Article.insertMany([
            {
                title: req.body.title,
                content: req.body.content
            }
        ]);
    
        res.status(201).send("New article inserted successfully.");
    } catch (err) {
        res.status(500).send("An error occurred while inserting articles.");
    }
})
.delete(async function(req, res) {
    try {
        await Article.deleteMany({});
        res.status(200).send("All articles deleted successfully.");
    } catch (err) {
        res.status(500).send("An error occurred while deleting articles.");
    }
});

/* Specific Article Routes */
// Get    => (Get Article)
// Put    => (Update Article)
app.route('/articles/:title').get(async function(req, res) {
    try {
        const title = req.params.title;

        const article = await Article.findOne({title: title});
        if (!article) {
            return res.status(404).send("Article not found.");
        }

        res.send(article);
    } catch (err) {
        res.status(500).send("An error occurred while fetching article.");
    }
}).put(async function(req, res) {
    try {
        const title = req.params.title;
        const { newTitle, newContent } = req.body;

        const updatedArticle = await Article.findOneAndUpdate(
            {title: title},
            {title: newTitle, content: newContent},
            {new: true}
        );

        if (!updatedArticle) {
            return res.status(404).send("Article not found.");
        }

        res.send(updatedArticle);
    } catch (err) {
        res.status(500).send("An error occurred while updating the article.");
    }
}).delete(async function(req, res) {
    try {
        const title = req.params.title;

        const deletedArticle = await Article.findOneAndDelete(
            {title: title},
        );

        if (!deletedArticle) {
            return res.status(404).send("Article not found.");
        }

        res.status(200).send(`Article titled "${title}" deleted successfully.`);
    } catch (err) {
        res.status(500).send("An error occurred while updating the article.");
    }
});


// Set the port to listen for incoming requests
const PORT = 3000 || process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});