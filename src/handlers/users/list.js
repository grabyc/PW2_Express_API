const database = require("../../database");

module.exports = (route) => {
  route.get("/", (req, res) => {
    const filter = req.query.filterName;

    let users = database.list();

    if (filter) {
      users = users.filter((item) => item.name.includes(filter));
    }

    res.status(201).json(users);
  });
};
