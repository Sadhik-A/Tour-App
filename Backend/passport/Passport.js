const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
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
  new GithubStrategy(
    {
      clientID: "9579f62075346824935f",
      clientSecret: "b321f68f07dd993626f28b3e5c66e5cee8ab6e83",
      callbackURL: "https://tour-webapp.onrender.com/auth/github/callback",
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