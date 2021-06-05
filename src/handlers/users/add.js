const database = require("../../database");
const { validationResult } = require("express-validator");
const ValidationError = require("../../validations/validationError");
const validateName = require("../../validations/users/validateName");
const validateAge = require("../../validations/users/validateAge");

module.exports = (route) => {
  route.post("/", validateName, validateAge, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const userIndex = database.add(req);

    if (userIndex === -1) {
      res.status(201).json({
        message: "Elemento nuevo agregado.",
      });
    } else {
      res.status(409).json({
        message: "Elemento duplicado no será agregado.",
      });
    }
  });
};
