const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Token = require("../models/Token");
const SendEmail = require("../utils/SendEmail");
const crypto = require("crypto");
module.exports.jwtlogin = async (req, res) => {
     try {
    const { email, password } = req.body;
    const user = await User.where({ email }).fetch({ require: false });
    // console.log(user)
    if (!user) {
      return res.status(401).json({message: 'user not found'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.get('password'));

    if (!isPasswordValid) {
      return res.status(401).json({message: 'incorrect password'});
    }
    if (user.get('verified')!==1) {
      let token = await Token.where({ user_id: user.id }).fetch({ require: false });
      if (!token) {
        token=await new Token({
          user_id: user.id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.attributes.token}`;
        await SendEmail(user.attributes.email, "Verify Email", url);
      }
      return res.status(401).json({message: 'An email has been sent'});
    }
    // jwt token
    // console.log(process.env.JWT_SECRET)
       const token = jwt.sign({ userId: user.id, email: user.get('email'), is_admin: user.get('is_admin'), username: user.get('username') }, process.env.JWT_SECRET,);
      //  console.log(token)
     res
       .cookie("accessToken", token, {
         domain: "tour-webapp.onrender.com",
         path: "/",
         httpOnly: true,
         sameSite: "none",
         secure: true,
         expiresIn: "2d",
       })
       .status(200)
       .json({ message: "Logged in successfully", user, token });
  }
  catch (error) {
    res.status(500).json(error.message);
    // console.log(error);
  }
}