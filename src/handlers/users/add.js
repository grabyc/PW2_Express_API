const moment = require("moment");
const database = require("../../database");
const { body, validationResult } = require("express-validator");

module.exports = (route) => {
  route.post(
    "/",
    body("name").notEmpty().withMessage("Campo obligatorio"),
    body("age")
      .notEmpty()
      .withMessage("Campo obligatorio")
      .isInt({ min: 18, max: 120 })
      .withMessage(
        "El valor debe ser un número y debe estar comprendido entre 18 y 120"
      ),

    (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
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
    }
  );
};
