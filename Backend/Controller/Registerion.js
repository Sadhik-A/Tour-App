const bcrypt = require("bcrypt");
const User = require("../models/user");


module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.where({ email }).fetch({ require: false });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      return res.status(201).json("User registered successfully");
    } else {
      return res.status(400).json("User with this email already exists");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error.");
  }
};
