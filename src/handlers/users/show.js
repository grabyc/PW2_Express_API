const database = require("../../database");

module.exports = (route) => {
  route.get("/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = database.DB.filter((item) => item.id === userId)[0];

    if (user) {
      res.status(200).json(user);
    } else {
      res.sendStatus(404);
    }
  });
};
