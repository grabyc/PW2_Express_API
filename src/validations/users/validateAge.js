const { body } = require("express-validator");

module.exports = body("age")
  .notEmpty()
  .withMessage("Campo obligatorio")
  .bail()
  .isInt({ min: 18, max: 120 })
  .withMessage(
    "El valor debe ser un número y debe estar comprendido entre 18 y 120"
  );
