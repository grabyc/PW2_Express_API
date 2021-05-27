const database = require("../../database");

module.exports = (route) => {
  route.post("/", (req, res) => {
    const user = {
      name: req.body.name.concat(" ", database.id++),
      age: req.body.age,
    };

    database.add(user);
    res.json(user);
  });
};
