const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Logincontrol=require('../../Controller/Login')
const passport = require('passport')
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
router.post(
  "/api/login",
  [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Login control logic
    Logincontrol.jwtlogin(req, res);
  }
);

// const clientURL = "http://localhost:3001";
const clientURL = "https://tour-sadhik.netlify.app";

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: `${clientURL}/redirect`,
  })
);
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
    successRedirect: `${clientURL}/redirect`,
  })
);
router.get("/login/success", async (req, res) => {
  if (req.user) {
    try {
      let email;
      if (req.user.emails && req.user.emails.length > 0) {
        email = req.user.emails[0].value;
      } else if (req.user.profileUrl) {
        // In case of GitHub, you might use another attribute as the email, e.g., profileUrl
        email = req.user.profileUrl;
      } else {
        // Handle the case where email isn't available.
        return res
          .status(400)
          .json({ success: false, message: "Email not provided." });
      }

      const user = await User.where({ email }).fetch({ require: false });

      if (!user) {
        const user = new User({
          email: email,
          username: req.user.displayName || req.user.username,
        });
        await user.save();
      }

      const token = jwt.sign(
        {
          userId: user.get("id"),
          email: user.get("email"),
          is_admin: user.get("is_admin"),
          username: user.get("username"),
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ message: "Logged in successfully", user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "User information not provided." });
  }
});

module.exports = router;
