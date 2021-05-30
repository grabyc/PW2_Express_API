const database = require("../../database");

module.exports = (route) => {
  route.get("/", (req, res) => {
    res.status(200).json(
      database.DB.sort((user1, user2) => {
        if (user1.name > user2.name) {
          return 1;
        }
        if (user1.name < user2.name) {
          return -1;
        }
        return 0; //user1.name === user2.name
      })
    );
  });
};
