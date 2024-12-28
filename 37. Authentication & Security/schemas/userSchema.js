const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoonse = require('passport-local-mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    secret: {
        type: String,
    }
});

userSchema.plugin(passportLocalMongoonse);

// Create the model
const User = mongoose.model('User', userSchema);

// Set up Passport authentication using the User model's strategy and session management
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;