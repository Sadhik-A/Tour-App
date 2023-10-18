const bcrypt = require("bcrypt");
const User = require("../models/user");


module.exports.register = async (req, res) => {
  try {
    const { email, password,username } = req.body;
    const existingUser = await User.where({ email }).fetch({ require: false });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword,username});
      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
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
