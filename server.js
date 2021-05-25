const express = require("express");
const { PORT } = require("./config");
const app = express();

app.use(express.json());

let id = 2;
const DB = [{ id: 1, name: "Juan", age: 30 }];

app.get("/api/users", (req, res) => {
  res.json(DB);
});

app.post("/api/users", (req, res) => {
  const user = {
    id: id++,
    name: req.body.name.concat(" ", id),
    age: req.body.age,
  };

  DB.push(user);

  res.json(user);
});

app.get("/api/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = DB.filter((item) => item.id === userId)[0];

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/api/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = DB.findIndex((item) => item.id === userId);

  if (userIndex > -1) {
    DB.splice(userIndex, 1);

    res.status(200).json({
      message: "Elemento eliminado",
    });
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.info(`Express Server listening on port ${PORT}.`);
});
