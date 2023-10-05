const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json( "Email address already exists." );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error." );
  }
};
