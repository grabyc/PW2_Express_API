const database = require("../../database");
const validateName = require("../../validations/users/validateName");
const validateAge = require("../../validations/users/validateAge");
const validateErrors = require("../../validations/validateErrors");

module.exports = (route) => {
  route.post("/", validateName, validateAge, validateErrors, (req, res) => {
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
