const express = require("express");
const usersRouting = require("./users");
const ValidationError = require("../validations/validationError");

const apiRouting = express.Router();

apiRouting.use("/api", usersRouting);

apiRouting.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({ errors: err.formatError() });
  } else {
    res.status(500).json({ errors: err.message });
  }
});

module.exports = apiRouting;
