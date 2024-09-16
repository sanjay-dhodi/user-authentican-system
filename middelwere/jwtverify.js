const jwt = require("jsonwebtoken");

const jwtVerify = async (req, resp, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return resp.status(401).json("Authorization header missing");
    }
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, decodedUser) => {
      if (err) {
        return resp.status(403).json("invalid or expired token");
      }

      req.user = decodedUser.id;
      next();
    });
  } catch (error) {
    return resp.status(500).json(error.toString());
  }
};

module.exports = jwtVerify;
