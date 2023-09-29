const jwt=require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
    // console.log(req.cookies.accessToken);
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token not valid" });
    }
      console.log(payload);
    req.userId = payload.userId;
    req.is_admin = payload.is_admin;
    next();
  });
};
