const database = require("../../database");

module.exports = (route) => {
  route.get("/", (req, res) => {
    res.status(201).json(database.list());
  });
};
