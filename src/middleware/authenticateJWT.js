const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [bearer, token] = authHeader.split(" ");

    jwt.verify(token, JWT_SECRET, (err, session) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.session = session;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
