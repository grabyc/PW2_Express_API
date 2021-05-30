const moment = require("moment");
const database = require("../../database");

module.exports = (route) => {
  route.post("/", (req, res) => {
    const newUser = {
      name: req.body.name,
      age: req.body.age,
      created: moment(new Date()).format("YYYY-MM-DD"),
    };

    const userIndex = database.DB.findIndex(
      (item) => item.name === newUser.name
    );

    if (userIndex === -1) {
      if (!(newUser.name === "" || newUser.age === "")) {
        // TRUE only if name <> "" && age <> ""
        if (newUser.age >= 18 && newUser.age <= 120) {
          // TRUE only if name <> "" && age <> ""

          database.add(newUser);
          res.status(201).json({
            message: "Elemento nuevo agregado.",
          });
        } else {
          res.status(400).json({
            message:
              "Elemento no cumple con las valicaciones de edad requeridas.",
          });
        }
      } else {
        res.status(400).json({
          message:
            "Elemento no cumple con las validaciones de nombre y edad requeridas.",
        });
      }
    } else {
      res.status(409).json({
        message: "Elemento duplicado no será agregado.",
      });
    }
  });
};
