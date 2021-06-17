const moment = require("moment");

let id = 1;
const DB = [
  {
    id: id,
    name: "Juan",
    age: 30,
    username: "Juan",
    password: "johnny",
    created: moment(new Date()).format("YYYY-MM-DD"),
    updated: null,
  },
];

const list = () => {
  return DB.sort((user1, user2) => {
    if (user1.name > user2.name) {
      return 1;
    }
    if (user1.name < user2.name) {
      return -1;
    }
    return 0; //user1.name === user2.name
  });
};

const get = (idUser) => {
  return DB.filter((item) => item.id === idUser)[0];
};

const erase = (idUser) => {
  const userIndex = DB.findIndex((item) => item.id === idUser);

  if (userIndex > -1) {
    DB.splice(userIndex, 1);
  }

  return userIndex;
};

const add = (req) => {
  const newUser = {
    id: ++id,
    name: req.body.name,
    age: req.body.age,
    created: moment(new Date()).format("YYYY-MM-DD"),
  };

  const userIndex = DB.findIndex((item) => item.name === newUser.name);

  if (userIndex === -1) {
    DB.push(newUser);
  }

  return userIndex;
};

const update = (req, idUser) => {
  const user = DB.find((u) => u.id === idUser);

  if (user) {
    user.name = req.body.name;
    user.age = req.body.age;
    user.updated = moment(new Date()).format("YYYY-MM-DD");
  }

  return user;
};

const search = (query) => {
  let results = DB;

  for (const [key, value] of Object.entries(query)) {
    results = results.filter((record) => record[key] === value);
  }

  return results;
};

module.exports = {
  id,
  DB,
  list,
  get,
  erase,
  add,
  update,
  search,
};
