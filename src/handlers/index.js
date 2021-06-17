const express = require("express");
const usersRouting = require("./users");
const ValidationError = require("../validations/validationError");
const authRouting = require("./auth");
const authenticateJWT = require("../middleware/authenticateJWT");

const apiRouting = express.Router();

apiRouting.use("/api", authRouting, authenticateJWT, usersRouting);

apiRouting.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({ errors: err.formatError() });
  } else {
    res.status(500).json({ errors: err.message });
  }
});

module.exports = apiRouting;
