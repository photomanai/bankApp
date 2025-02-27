const jwt = require("jsonwebtoken");

module.exports.verify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "You are not authenticated!" });
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.user = user;
    next();
  });
};
