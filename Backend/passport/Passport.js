const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
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
      console.log(profile);
      done(null, profile);
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: "3607553192852632",
      clientSecret: "a43273e60677506795e7c1f52c176e9f",
      callbackURL: "https://tour-webapp.onrender.com/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, cb) => {
  console.log(user)
    cb(null, user);
})
passport.deserializeUser((user, cb) => {
    console.log(user);
    cb(null, user);
})
module.exports = passport;