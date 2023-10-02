const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.jwtlogin = async (req, res) => {
     try {
    const { email, password } = req.body;
    const user = await User.where({ email }).fetch();
    // console.log(user)
    if (!user) {
      return res.status(401).json('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.get('password'));

    if (!isPasswordValid) {
      return res.status(401).json('Invalid credentials');
    }
    // jwt token
    // console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ userId: user.id,email: user.get('email'),is_admin: user.get('is_admin') },  process.env.JWT_SECRET, { expiresIn: '1h' });
     res
       .cookie("accessToken", token, {
         domain: "tour-app-zcms.onrender.com",
         path: "/",
         httpOnly: true,
         sameSite: "none",
         secure: true,
         expiresIn: "10d",
       })
       .status(200)
       .json({ message: "Logged in successfully", user, token });
  }
  catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
}