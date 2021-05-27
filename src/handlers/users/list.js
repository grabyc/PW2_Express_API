const database = require("../../database");

module.exports = (route) => {
  route.get("/", (req, res) => {
    res.json(database.DB);
  });
};
