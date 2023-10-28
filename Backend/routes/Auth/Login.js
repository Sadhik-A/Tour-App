const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Logincontrol=require('../../Controller/Login')
const passport = require('passport')

router.post(
  '/api/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Logincontrol.jwtlogin(req, res);
  }
);
const clientURL = "https://tour-sadhik.netlify.app";
// const clientURL = "http://localhost:3001";
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/", 
    successRedirect: `${clientURL}/redirect`,
  }),
  router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
})
  // async (req, res) => {
  //   const authInfo = req.authInfo
  //   res.cookie("googleaccesstoken", authInfo, {
  //     domain: "tour-webapp.onrender.com",
  //     path: "/",
  //     httpOnly: true,
  //     sameSite: "none",
  //     secure: true,
  //     expiresIn: "2d",
  //   });
  // }
    //  return res.status(200).json(responseData);
    // console.log(req.authInfo);
    //  res.redirect(`${clientURL}/register`);
    // return res.status(200).json({ message: "Login successful" });
  //}
)
module.exports = router;