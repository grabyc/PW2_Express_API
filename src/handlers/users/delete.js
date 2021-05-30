const database = require("../../database");

module.exports = (route) => {
  route.delete("/:userId", (req, res) => {
    const userIndex = database.erase(parseInt(req.params.userId));

    if (userIndex > -1) {
      res.status(200).json({
        message: "Elemento eliminado",
      });
    } else {
      res.sendStatus(404);
    }
  });
};
