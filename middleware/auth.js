const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (!req.get("Authorization")) {
    return res.status(401).json({
      error: "You must Log in",
    });
  }

  const token = req.get("Authorization").split(" ")[1].trim();

  if (!token) {
    return res.status(401).json({
      error: "You must Log in",
    });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWTKey);

    req.user = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Couldn't Verify you. Please Login again",
    });
  }
};
