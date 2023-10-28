const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "567986154419-3sv7rfacn3r3b7t67mnko98k6dh3spp0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://tour-webapp.onrender.com/auth/google/callback",
      // callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, cb) =>{
    cb(null, user);
})
passport.deserializeUser((user, cb) =>{
    cb(null, user);
})
module.exports = passport;