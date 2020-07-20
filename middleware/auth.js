const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //retrive token from header
  const token = req.header("x-auth-token");

  //Check if token exist
  if (!token) {
    return res.status(401).json({ msg: "No token found! Access denied." });
  }

  // Verify the token
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    // console.log("[AUTH-MIDDLEWARE]:Decoded Token:", decoedToken);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token not valid! Access denied." });
  }
};
