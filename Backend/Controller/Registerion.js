const bcrypt = require('bcrypt');
const User = require('../models/user');
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json("User registered successfully");
    // res.redirect('/');
  }
  catch (error) {
    // console.log(error);
   
    if (error.code === 11000 && error.keyPattern.email) {
      
      res.status(400).json({ error: "Email address already exists." });
    } else {
     
      res.status(500).json({ error: "Internal server error." });
    }
  }
}
