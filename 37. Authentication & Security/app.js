// Environment Variables
require('dotenv').config();

// Pachages
const express = require('express');
const mongoose = require('mongoose');
const bodyParcer = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Schemas
const User = require('./schemas/userSchema');

// Middleware
app.use(express.static('public'));
app.use(bodyParcer.urlencoded({extended: true}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use the session in our app
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Initialize and set up passport 
app.use(passport.initialize());
app.use(passport.session());

// Connect to the database
mongoose.connect(process.env.DB_KEY);

/* Routes */
// Default Routes
app.get('/', (req, res) => {
    res.render('home');
});

// Login Routes
app.route('/login').get(function(req, res) {
    res.render('login');
}).post(async function(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    // Use passport's authenticate method to handle login
    passport.authenticate('local', (err, user) => {
        // Handle server error during authentication
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Handle invalid login credentials
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Log the user in and redirect
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Login failed' });
            }
            // Redirect to a protected route after successful login
            return res.redirect('/secrets');
        });
    })(req, res);
});

// Register Routes
app.route('/register').get((req, res) => {
    res.render('register');
}).post(function(req, res) {
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to create user' });
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect('/secrets')
            })
        }
    })
});

// Logout Route
app.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.redirect('/'); // Redirect to the home page after successful logout
    });
});

// Secrets Route
app.get('/secrets', async function(req, res) {
    if(req.isAuthenticated()) {
        secrets = await User.find({secret: {$ne: null}}, {secret: 1, _id: 0});

        res.render('secrets', {secrets: secrets});
    } else {
        res.redirect('/login');
    }
});

// Submit Route
app.route('/submit').get((req, res) => {
    if(req.isAuthenticated()) {
        res.render('submit');
    } else {
        res.redirect('/login');
    }
}).post(async function(req, res) {
    if(!req.isAuthenticated()) {
        res.redirect('/login');
    }
    const userId = req.user.id;
    const secret = req.body.secret;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.secret = secret;

        await user.save();
        res.redirect('/secrets');
    } catch (err) {
        res.status(500).send('An error occurred while saving the secret');
    }
});

// Listening to the port 
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listning on port ${PORT}`);
})