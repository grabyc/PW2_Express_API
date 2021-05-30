const database = require("../../database");

module.exports = (route) => {
  route.get("/:userId", (req, res) => {
    const user = database.get(parseInt(req.params.userId));

    if (user) {
      res.status(200).json(user);
    } else {
      res.sendStatus(404);
    }
  });
};
