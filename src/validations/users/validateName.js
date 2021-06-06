const { body } = require("express-validator");

module.exports = body("name")
  .notEmpty()
  .withMessage("Campo obligatorio")
  .bail()
  .isLength({ min: 3 })
  .withMessage("Debe tener como mínimo 3 caracteres.");
