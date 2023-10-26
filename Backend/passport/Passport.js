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
      callbackURL: "https://tour-app-zcms.onrender.com/auth/google/callback",
    },
    async function (profile, email, cb) {
      try {
        const user = await User.where({
          email: email.emails[0].value,
        }).fetch({ require: false });
        if (!user) {
          const user = new User({
            email: email.emails[0].value,
            username: email._json.name,
          });
          await user.save();
        }
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.get("email"),
            is_admin: user.get("is_admin"),
            username: user.get("username"),
          },
          process.env.JWT_SECRET
        );
        console.log(token);
        return cb(null, profile, token);
        // console.log(email.emails[0].value);
        // console.log(email._json.name);
      } catch (error) {
        console.log(error);
      }
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