const database = require("../../database");
const validateName = require("../../validations/users/validateName");
const validateAge = require("../../validations/users/validateAge");
const validateErrors = require("../../validations/validateErrors");

module.exports = (route) => {
  route.put(
    "/:userId",
    validateName,
    validateAge,
    validateErrors,
    (req, res) => {
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
    }
  );
};
