const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
