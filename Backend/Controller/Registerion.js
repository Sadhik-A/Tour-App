const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/Token");
const SendEmail = require("../utils/SendEmail");
const crypto = require("crypto");
module.exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    let existingUser = await User.where({ email }).fetch({ require: false });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, username });
      await user.save();
      const token = await new Token({
        user_id: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.attributes.token}`;
      await SendEmail(user.attributes.email, "Verify Email", url);
      // console.log(user.email)
      return res.status(201).json({ message: "An email has been sent" });
    } else {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
module.exports.verify = async (req, res) => {
  try {
    const user = await User.where({ id: req.params.id }).fetch({
      require: false,
    });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = await Token.where({ user_id: req.params.id }).fetch({
      require: false,
    });
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    await User.where({ id: user.attributes.id }).save(
      { verified: true },
      { patch: true }
    );
    console.log(token);
    await Token.where({ user_id: token.attributes.user_id }).destroy();
    return res.redirect("https://tour-sadhik.netlify.app/email-verified");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
