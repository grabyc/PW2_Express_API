const moment = require("moment");

let id = 2;
const DB = [
  {
    id: 1,
    name: "Juan",
    age: 30,
    created: moment(new Date()).format("YYYY-MM-DD"),
    updated: null,
  },
];

module.exports = {
  id,
  DB,
  add(user) {
    id++;
    user.id = id;

    DB.push(user);
  },
};
