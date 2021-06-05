const database = require("../../database");
const { validationResult } = require("express-validator");
const validateName = require("../../validations/users/validateName");
const validateAge = require("../../validations/users/validateAge");
const ValidationError = require("../../validations/validationError");

module.exports = (route) => {
  route.put("/:userId", validateName, validateAge, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const user = database.update(req, parseInt(req.params.userId));

    if (user) {
      res.status(201).json({
        message: "Elemento actualizado.",
      });
    } else {
      res.status(409).json({
        message: "Elemento no pudo actualizarse.",
      });
    }
  });
};
